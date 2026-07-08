import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sectionsDir = path.join(__dirname, '..', 'src', 'website', 'sections');

const pairs = [
  ['PreloaderSection', 'Preloader.html'],
  ['StickyCTASection', 'StickyCTA.html'],
  ['BackToTopSection', 'BackToTop.html'],
  ['NavbarSection', 'Navbar.html'],
  ['HeroSection', 'HeroSection.html'],
  ['AboutSection', 'AboutSection.html'],
  ['ServicesSection', 'ServicesSection.html'],
  ['ZetaPlatformSection', 'ZetaPlatformSection.html'],
  ['PartnersSection', 'PartnersSection.html'],
  ['CertificationsStripSection', 'CertificationsStrip.html'],
  ['CaseStudiesSection', 'CaseStudiesSection.html'],
  ['TeamSection', 'TeamSection.html'],
  ['PanelAnatomySection', 'PanelAnatomySection.html'],
  ['FAQSection', 'FAQSection.html'],
  ['ContactSection', 'ContactSection.html'],
  ['FooterSection', 'FooterSection.html'],
];

fs.mkdirSync(sectionsDir, { recursive: true });

for (const [comp, frag] of pairs) {
  const body = `import parse from 'html-react-parser';
import html from '../fragments/${frag}?raw';

/**
 * Static markup lives in: \`website/fragments/${frag}\`
 */
export function ${comp}() {
  return <>{parse(html)}</>;
}
`;
  fs.writeFileSync(path.join(sectionsDir, `${comp}.jsx`), body, 'utf8');
}

console.log('Wrote', pairs.length, 'section components');
