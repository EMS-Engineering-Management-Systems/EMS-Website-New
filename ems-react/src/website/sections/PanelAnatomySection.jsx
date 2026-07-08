import parse from 'html-react-parser';
import html from '../fragments/PanelAnatomySection.html?raw';

/**
 * Static markup lives in: `website/fragments/PanelAnatomySection.html`
 */
export function PanelAnatomySection() {
  return <>{parse(html)}</>;
}
