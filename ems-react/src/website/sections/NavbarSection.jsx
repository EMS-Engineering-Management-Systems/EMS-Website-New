import parse from 'html-react-parser';
import html from '../fragments/Navbar.html?raw';

/**
 * Static markup lives in: `website/fragments/Navbar.html`
 */
export function NavbarSection() {
  return <>{parse(html)}</>;
}
