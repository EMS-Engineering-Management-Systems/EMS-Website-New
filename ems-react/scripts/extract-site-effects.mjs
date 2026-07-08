import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', '..');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

const productsStart = script.indexOf('// ============================================\n// PRODUCTS SECTION');
const preloaderStart = script.indexOf('// ============================================\n// 5 — PRELOADER');

if (productsStart < 0 || preloaderStart < 0) {
  console.error('Markers not found');
  process.exit(1);
}

let out =
  script.slice(0, productsStart) +
  script.slice(preloaderStart);

out = out.replace(
  /document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{/,
  'export function initSiteEffects() {'
);

out = out.replace(
  /initializeFormValidation\(\);\s*\n/g,
  ''
);

out = out.replace(
  /initializeProductsSection\(\);\s*\n\s*initCardFlip\(\);\s*\n/g,
  ''
);

out = out.replace(
  /closeQuoteCart\(\);\s*\n\s*closeQuickView\(\);\s*\n/g,
  ''
);

// React app uses ClickSpark.jsx; omit vanilla initClickSpark from siteEffects.
out = out.replace(
  /initClickSpark\(\);\s*\n\}\);/,
  '}'
);
out = out.replace(
  /\nfunction initClickSpark\(\) \{[\s\S]*?\n\}\n\n(?=\/\/ ============================================\n\/\/ NAVIGATION)/,
  '\n\n'
);

fs.writeFileSync(path.join(__dirname, '..', 'src', 'siteEffects.js'), out, 'utf8');
console.log('Wrote siteEffects.js');
