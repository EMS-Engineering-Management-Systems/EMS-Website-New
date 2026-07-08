import parse from 'html-react-parser';
import html from '../fragments/PartnersSection.html?raw';

/**
 * Static markup lives in: `website/fragments/PartnersSection.html`
 */
export function PartnersSection() {
  return <>{parse(html)}</>;
}
