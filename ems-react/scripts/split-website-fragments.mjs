import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, '..', 'src');
const rawBefore = path.join(src, 'raw', 'before.html');
const rawAfter = path.join(src, 'raw', 'after.html');
const outDir = path.join(src, 'website', 'fragments');

fs.mkdirSync(outDir, { recursive: true });

function sliceLines(filePath, startLine, endLine) {
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  return lines.slice(startLine - 1, endLine).join('\n') + '\n';
}

const beforeSplits = [
  ['Preloader.html', 2, 13],
  ['StickyCTA.html', 14, 24],
  ['BackToTop.html', 26, 29],
  ['Navbar.html', 31, 63],
  ['HeroSection.html', 64, 123],
  ['AboutSection.html', 124, 199],
  ['ServicesSection.html', 200, 340],
  ['ZetaPlatformSection.html', 341, 486],
  ['PartnersSection.html', 487, 533],
  ['CertificationsStrip.html', 534, 562],
  ['CaseStudiesSection.html', 563, 647],
  ['TeamSection.html', 648, 751],
];

const afterSplits = [
  ['PanelAnatomySection.html', 2, 458],
  ['FAQSection.html', 460, 571],
  ['ContactSection.html', 573, 673],
  ['FooterSection.html', 675, 780],
];

for (const [name, a, b] of beforeSplits) {
  fs.writeFileSync(path.join(outDir, name), sliceLines(rawBefore, a, b), 'utf8');
}
for (const [name, a, b] of afterSplits) {
  fs.writeFileSync(path.join(outDir, name), sliceLines(rawAfter, a, b), 'utf8');
}

console.log('Wrote', beforeSplits.length + afterSplits.length, 'fragments to', outDir);
