import parse from 'html-react-parser';
import html from '../fragments/HeroSection.html?raw';

/**
 * Static markup lives in: `website/fragments/HeroSection.html`
 */
export function HeroSection() {
  return <>{parse(html)}</>;
}
