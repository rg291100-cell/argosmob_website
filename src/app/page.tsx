import HeroSection from "@/components/sections/HeroSection";
import LogoBar from "@/components/sections/LogoBar";
import StatsSection from "@/components/sections/StatsSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyUs from "@/components/sections/WhyUs";
import ProcessSection from "@/components/sections/ProcessSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import TechPreview from "@/components/sections/TechPreview";
import TestimonialsPreview from "@/components/sections/TestimonialsPreview";
import CtaSection from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoBar />
      <StatsSection />
      <ServicesOverview />
      <WhyUs />
      <ProcessSection />
      <FeaturedProjects />
      <TechPreview />
      <TestimonialsPreview />
      <CtaSection />
    </>
  );
}
