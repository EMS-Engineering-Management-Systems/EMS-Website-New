import parse from 'html-react-parser';
import html from '../fragments/CertificationsStrip.html?raw';

/**
 * Static markup lives in: `website/fragments/CertificationsStrip.html`
 */
export function CertificationsStripSection() {
  return <>{parse(html)}</>;
}
