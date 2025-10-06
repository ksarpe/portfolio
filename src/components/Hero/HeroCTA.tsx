import { Button } from "../ui/Button";

export default function HeroCTA() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      const offset = -80; // Offset for better positioning

      window.scrollTo({
        top: offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 items-end">
      <Button className="w-full max-w-sm text-xl" secondText="Let me introduce myself" onClick={() => scrollToSection("about")}>
        About me
      </Button>
      <Button className="w-full max-w-sm text-xl" secondText="Check out my experience" onClick={() => scrollToSection("experience")}>
        Experience
      </Button>
      <Button className="w-full max-w-sm text-xl" secondText="See my work" onClick={() => scrollToSection("projects")}>
        Projects
      </Button>
      <Button className="w-full max-w-sm text-xl" secondText="Get in touch" onClick={() => scrollToSection("contact")}>
        Contact
      </Button>
    </div>
  );
}
