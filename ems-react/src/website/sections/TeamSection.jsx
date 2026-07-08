import parse from 'html-react-parser';
import html from '../fragments/TeamSection.html?raw';

/**
 * Static markup lives in: `website/fragments/TeamSection.html`
 */
export function TeamSection() {
  return <>{parse(html)}</>;
}
