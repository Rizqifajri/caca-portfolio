import { NavigationBar } from "@/components/navigation-bar";
import { HeroSection } from "@/components/hero-section";
import { BrandSection } from "@/components/brand-section";
import { ToolsSection } from "@/components/tools-section";
import { VideoProjectsSection } from "@/components/video-projects-section";
import { GallerySection } from "@/components/gallery-section";
import { ExperienceSection } from "@/components/experience-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BrandSection />
      <ToolsSection />
      <VideoProjectsSection />
      <GallerySection />
      <ExperienceSection />
    </main>
  );
}

