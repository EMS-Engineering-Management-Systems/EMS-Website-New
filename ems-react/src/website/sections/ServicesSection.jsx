import parse from 'html-react-parser';
import html from '../fragments/ServicesSection.html?raw';

/**
 * Static markup lives in: `website/fragments/ServicesSection.html`
 */
export function ServicesSection() {
  return <>{parse(html)}</>;
}
