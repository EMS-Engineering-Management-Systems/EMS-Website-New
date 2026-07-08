import parse from 'html-react-parser';
import html from '../fragments/Preloader.html?raw';

/**
 * Static markup lives in: `website/fragments/Preloader.html`
 */
export function PreloaderSection() {
  return <>{parse(html)}</>;
}
