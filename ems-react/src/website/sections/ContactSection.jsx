import parse from 'html-react-parser';
import html from '../fragments/ContactSection.html?raw';

/**
 * Static markup lives in: `website/fragments/ContactSection.html`
 */
export function ContactSection() {
  return <>{parse(html)}</>;
}
