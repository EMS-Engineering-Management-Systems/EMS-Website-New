import parse from 'html-react-parser';
import html from '../fragments/BackToTop.html?raw';

/**
 * Static markup lives in: `website/fragments/BackToTop.html`
 */
export function BackToTopSection() {
  return <>{parse(html)}</>;
}
