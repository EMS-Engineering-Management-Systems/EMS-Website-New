import parse from 'html-react-parser';
import html from '../fragments/CaseStudiesSection.html?raw';

/**
 * Static markup lives in: `website/fragments/CaseStudiesSection.html`
 */
export function CaseStudiesSection() {
  return <>{parse(html)}</>;
}
