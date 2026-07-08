import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', '..');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const start = script.indexOf('function buildCircuitSVG');
const end = script.indexOf('function initCardFlip');
const chunk = script.slice(start, end);
const out = chunk.replace(/^function /, 'export function ');
fs.writeFileSync(path.join(__dirname, '..', 'src', 'circuitSvg.js'), out, 'utf8');
console.log('Wrote circuitSvg.js');
