import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { MiniNavigation } from "./components/MiniNavigation";
import { Projects } from "./components/Projects";
import { ScrollContainer } from "./components/ScrollContainer";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <div className="bg-bg">
      <ThemeToggle />
      <ScrollContainer sectionIds={["hero", "about", "experience", "projects"]}>
        <Hero />
        <About />
        <Experience />
        <Projects />
      </ScrollContainer>
      <MiniNavigation />
    </div>
  );
}

export default App;
