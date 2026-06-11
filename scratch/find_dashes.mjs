import fs from 'fs';
import path from 'path';

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(' — ')) {
      // Exclude titles, alts, breadcrumbs, periods, step numbers
      if (line.match(/title=|alt=|description=|<title>|<SEOHead|0\d\s*—|Janv|Févr|Mars|Avr|Mai|Juin|Juil|Août|Sept|Oct|Nov|Déc/)) continue;
      if (line.includes(' — MFinances')) continue;
      if (line.includes(' — Bruxelles')) continue;
      if (line.includes(' — Belgique')) continue;
      if (line.includes('Uccle —')) continue;
      
      console.log(`${file}:${i + 1}: ${line.trim()}`);
    }
  }
}
