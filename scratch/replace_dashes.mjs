import fs from 'fs';
import path from 'path';

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(' — ')) {
      // Exclude comments, titles, alts, breadcrumbs, periods, step numbers
      if (line.trim().startsWith('{/*') || line.trim().startsWith('//')) continue;
      if (line.match(/title=|alt=|description=|<title>|<SEOHead|0\d\s*—|Janv|Févr|Mars|Avr|Mai|Juin|Juil|Août|Sept|Oct|Nov|Déc/)) continue;
      if (line.includes(' — MFinances')) continue;
      if (line.includes(' — Bruxelles')) continue;
      if (line.includes(' — Belgique')) continue;
      if (line.includes('Uccle —')) continue;
      if (line.includes(' — c\'est')) {
        lines[i] = line.replace(/ — c'est/g, ", c'est");
        changed = true;
      } else if (line.match(/ — (tout|nous|pour)/)) {
        lines[i] = line.replace(/ — /g, " : ");
        changed = true;
      } else if (line.includes(' — salaire et dividendes — ')) {
         lines[i] = line.replace(' — salaire et dividendes — ', ' (salaire et dividendes) ');
         changed = true;
      } else if (line.includes(' — ')) {
        lines[i] = line.replace(/ — /g, " : ");
        changed = true;
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`Updated ${file}`);
  }
}
