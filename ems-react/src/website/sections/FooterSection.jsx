import parse from 'html-react-parser';
import html from '../fragments/FooterSection.html?raw';

/**
 * Static markup lives in: `website/fragments/FooterSection.html`
 */
export function FooterSection() {
  return <>{parse(html)}</>;
}
