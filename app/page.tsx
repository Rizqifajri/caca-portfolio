import { NavigationBar } from "@/components/navigation-bar";
import { HeroSection } from "@/components/hero-section";
import { ToolsSection } from "@/components/tools-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ToolsSection />
      <ProjectsSection />
      <ExperienceSection />
    </main>
  );
}
