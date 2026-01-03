import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

interface ScrollContainerProps {
  children: ReactNode;
  sectionIds?: string[];
}

const TRANSITION_SECONDS = 0.7;
const WHEEL_THRESHOLD = 40;
const TOUCH_THRESHOLD = 60;

const ScrollContainer: React.FC<ScrollContainerProps> = ({ children, sectionIds }) => {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);
  const totalSections = childrenArray.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const isAnimatingRef = useRef(false);
  const wheelAccumRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchScrollableElRef = useRef<HTMLElement | null>(null);

  const getScrollableEl = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    return (el?.closest?.('[data-scrollable="true"]') as HTMLElement | null) ?? null;
  };

  const canElementScroll = (el: HTMLElement) => el.scrollHeight > el.clientHeight + 1;

  const shouldLetInnerScrollHandleWheel = (event: WheelEvent) => {
    const scrollable = getScrollableEl(event.target);
    if (!scrollable) return false;
    if (!canElementScroll(scrollable)) return false;

    const delta = event.deltaY;
    const atTop = scrollable.scrollTop <= 0;
    const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;

    // If the inner container can scroll further in the wheel direction, let it scroll.
    if (delta < 0 && !atTop) return true;
    if (delta > 0 && !atBottom) return true;
    return false;
  };

  const idToIndex = useMemo(() => {
    const mapping = new Map<string, number>();
    (sectionIds ?? []).forEach((id, index) => mapping.set(id, index));
    return mapping;
  }, [sectionIds]);

  const goToIndex = (nextIndex: number) => {
    if (isAnimatingRef.current) return;
    const clamped = Math.max(0, Math.min(totalSections - 1, nextIndex));
    if (clamped === activeIndex) return;

    setDirection(clamped > activeIndex ? 1 : -1);
    isAnimatingRef.current = true;
    setActiveIndex(clamped);
  };

  useEffect(() => {
    const id = sectionIds?.[activeIndex];
    window.dispatchEvent(
      new CustomEvent("fullpage:change", {
        detail: {
          index: activeIndex,
          id,
        },
      }),
    );
  }, [activeIndex, sectionIds]);

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const onWheel = (event: WheelEvent) => {
      if (shouldLetInnerScrollHandleWheel(event)) return;
      event.preventDefault();
      if (isAnimatingRef.current) return;

      wheelAccumRef.current += event.deltaY;
      if (Math.abs(wheelAccumRef.current) < WHEEL_THRESHOLD) return;

      const delta = wheelAccumRef.current;
      wheelAccumRef.current = 0;
      goToIndex(activeIndex + (delta > 0 ? 1 : -1));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isAnimatingRef.current) return;
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        goToIndex(activeIndex + 1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goToIndex(activeIndex - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goToIndex(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goToIndex(totalSections - 1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      touchScrollableElRef.current = getScrollableEl(event.target);
    };

    const onTouchMove = (event: TouchEvent) => {
      const scrollable = touchScrollableElRef.current;
      if (!scrollable || !canElementScroll(scrollable)) {
        event.preventDefault();
        return;
      }

      // If the inner container can actually scroll, allow it.
      // If it's at the edge in the swipe direction, we'll prevent default so the gesture can trigger section switch on touchend.
      const touch = event.touches[0];
      const startY = touchStartYRef.current;
      if (!touch || startY == null) {
        event.preventDefault();
        return;
      }

      const delta = startY - touch.clientY; // >0 means swipe up
      const atTop = scrollable.scrollTop <= 0;
      const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;

      if (delta > 0 && !atBottom) return; // allow inner scroll down
      if (delta < 0 && !atTop) return; // allow inner scroll up

      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (isAnimatingRef.current) {
        touchStartYRef.current = null;
        touchScrollableElRef.current = null;
        return;
      }
      const startY = touchStartYRef.current;
      touchStartYRef.current = null;
      const scrollable = touchScrollableElRef.current;
      touchScrollableElRef.current = null;
      if (startY == null) return;

      const endY = event.changedTouches[0]?.clientY;
      if (endY == null) return;

      const delta = startY - endY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;

      // If this gesture started in a scrollable container and it could scroll in that direction,
      // do not switch sections.
      if (scrollable && canElementScroll(scrollable)) {
        const atTop = scrollable.scrollTop <= 0;
        const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;
        if (delta > 0 && !atBottom) return;
        if (delta < 0 && !atTop) return;
      }

      goToIndex(activeIndex + (delta > 0 ? 1 : -1));
    };

    const onGoto = (event: Event) => {
      const custom = event as CustomEvent<{ id?: string; index?: number }>;
      if (typeof custom.detail?.index === "number") {
        goToIndex(custom.detail.index);
        return;
      }
      const id = custom.detail?.id;
      if (!id) return;
      const index = idToIndex.get(id);
      if (typeof index === "number") goToIndex(index);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("fullpage:goto", onGoto as EventListener);

    return () => {
      window.removeEventListener("wheel", onWheel as EventListener);
      window.removeEventListener("keydown", onKeyDown as EventListener);
      window.removeEventListener("touchstart", onTouchStart as EventListener);
      window.removeEventListener("touchmove", onTouchMove as EventListener);
      window.removeEventListener("touchend", onTouchEnd as EventListener);
      window.removeEventListener("fullpage:goto", onGoto as EventListener);

      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [activeIndex, idToIndex, totalSections]);

  const variants = {
    enter: (dir: 1 | -1) => ({
      y: dir === 1 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      y: "0%",
      opacity: 1,
    },
    exit: (dir: 1 | -1) => ({
      y: dir === 1 ? "-100%" : "100%",
      opacity: 1,
    }),
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-bg">
      <AnimatePresence
        initial={false}
        custom={direction}
        mode="popLayout"
        onExitComplete={() => {
          isAnimatingRef.current = false;
        }}>
        <motion.div
          key={activeIndex}
          className="absolute inset-0 h-screen w-full"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: TRANSITION_SECONDS, ease: "easeInOut" }}>
          {childrenArray[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ScrollContainer;
