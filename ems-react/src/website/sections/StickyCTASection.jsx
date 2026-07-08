import parse from 'html-react-parser';
import html from '../fragments/StickyCTA.html?raw';

/**
 * Static markup lives in: `website/fragments/StickyCTA.html`
 */
export function StickyCTASection() {
  return <>{parse(html)}</>;
}
