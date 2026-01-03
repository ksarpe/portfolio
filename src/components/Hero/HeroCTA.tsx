import { Button } from "../ui/Button";

export default function HeroCTA() {
  const goToSection = (id: string) => {
    window.dispatchEvent(new CustomEvent("fullpage:goto", { detail: { id } }));
  };

  return (
    <div className="flex flex-col gap-6 items-end">
      <Button className="w-full max-w-sm text-xl" secondText="Let me introduce myself" onClick={() => goToSection("about")}>
        About me
      </Button>
      <Button className="w-full max-w-sm text-xl" secondText="Check out my experience" onClick={() => goToSection("experience")}>
        Experience
      </Button>
      <Button className="w-full max-w-sm text-xl" secondText="See my work" onClick={() => goToSection("projects")}>
        Projects
      </Button>
    </div>
  );
}
