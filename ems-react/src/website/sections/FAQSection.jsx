import parse from 'html-react-parser';
import html from '../fragments/FAQSection.html?raw';

/**
 * Static markup lives in: `website/fragments/FAQSection.html`
 */
export function FAQSection() {
  return <>{parse(html)}</>;
}
