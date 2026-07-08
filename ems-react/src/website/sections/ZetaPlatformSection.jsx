import parse from 'html-react-parser';
import html from '../fragments/ZetaPlatformSection.html?raw';

/**
 * Static markup lives in: `website/fragments/ZetaPlatformSection.html`
 */
export function ZetaPlatformSection() {
  return <>{parse(html)}</>;
}
