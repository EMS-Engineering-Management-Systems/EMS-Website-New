import { AboutSection } from './sections/AboutSection.jsx';
import { BackToTopSection } from './sections/BackToTopSection.jsx';
import { CaseStudiesSection } from './sections/CaseStudiesSection.jsx';
import { CertificationsStripSection } from './sections/CertificationsStripSection.jsx';
import { ContactSection } from './sections/ContactSection.jsx';
import { FAQSection } from './sections/FAQSection.jsx';
import { FooterSection } from './sections/FooterSection.jsx';
import { HeroSection } from './sections/HeroSection.jsx';
import { NavbarSection } from './sections/NavbarSection.jsx';
import { PanelAnatomySection } from './sections/PanelAnatomySection.jsx';
import { PartnersSection } from './sections/PartnersSection.jsx';
import { PreloaderSection } from './sections/PreloaderSection.jsx';
import { ProductsSection } from './sections/ProductsSection.jsx';
import { ServicesSection } from './sections/ServicesSection.jsx';
import { StickyCTASection } from './sections/StickyCTASection.jsx';
import { TeamSection } from './sections/TeamSection.jsx';
import { ZetaPlatformSection } from './sections/ZetaPlatformSection.jsx';

/**
 * Full-page layout. Edit each block under `website/sections/` and `website/fragments/`.
 * Products: `website/sections/ProductsSection.jsx` + `website/data/`.
 */
export function Website() {
  return (
    <>
      <PreloaderSection />
      <StickyCTASection />
      <BackToTopSection />
      <NavbarSection />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ZetaPlatformSection />
      <CertificationsStripSection />
      <PartnersSection />
      <CaseStudiesSection />
      {/* <TeamSection /> */}
      {/* <ProductsSection /> */}
      {/* <PanelAnatomySection /> */}
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
