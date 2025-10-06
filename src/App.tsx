import { Hero } from "./components/Hero";
import { ThemeToggle } from "./components/ThemeToggle";
import { About } from "./components/About";
import { MiniNavigation } from "./components/MiniNavigation";
import { useScrollPosition } from "./hooks/useScrollPosition";

function App() {
  const isScrolled = useScrollPosition(500); // Show mini nav after scrolling 500px

  return (
    <div className="min-h-screen bg-bg">
      <ThemeToggle />
      <Hero />
      <About />
      <MiniNavigation isVisible={isScrolled} />
    </div>
  );
}

export default App;
