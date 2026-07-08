import parse from 'html-react-parser';
import html from '../fragments/AboutSection.html?raw';

/**
 * Static markup lives in: `website/fragments/AboutSection.html`
 */
export function AboutSection() {
  return <>{parse(html)}</>;
}
