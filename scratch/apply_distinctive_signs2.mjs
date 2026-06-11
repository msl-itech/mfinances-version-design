import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src/pages');

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, filesList);
    } else if (fullPath.endsWith('.tsx')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

const allFiles = getFiles(pagesDir);

let modifiedCount = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  let modified = false;

  // Find the first <section> with bg-primary and add bg-precision-grid-light
  const sectionRegex = /<section[^>]*className="([^"]*bg-primary[^"]*)"/i;
  const match = content.match(sectionRegex);
  
  if (match && !match[1].includes('bg-precision-grid-light')) {
    const newClasses = match[1] + " bg-precision-grid-light";
    content = content.replace(match[1], newClasses);
    modified = true;
  }

  // Find aspect-[4/5] or aspect-video or similar hero images and add Stamp and cut-corner
  // Only if they are inside group/hero or similar, or just the first image container.
  // Actually, let's just do cut-corner for any rounded-[24px] or rounded-[28px] that doesn't have it.
  const imageContainerRegex = /<div className="relative rounded-\[(24px|28px|32px)\] overflow-hidden[^"]*group[^"]*">/g;
  
  if (imageContainerRegex.test(content)) {
    content = content.replace(imageContainerRegex, (match) => {
      if (match.includes('cut-corner')) return match;
      
      const newMatch = match.replace('">', ' cut-corner">');
      
      // If we haven't already injected the Stamp in this file, inject it here
      if (!content.includes('<Stamp')) {
        return `<div className="absolute -top-12 -right-6 z-20 hidden md:block">\n                  <Stamp className="text-accent drop-shadow-lg" />\n                </div>\n                ${newMatch}`;
      }
      return newMatch;
    });
    modified = true;
  }

  if (modified) {
    if (!content.includes('import Stamp')) {
      const importMatch = content.match(/import .*;?\n/g);
      if (importMatch && importMatch.length > 0) {
        const lastImport = importMatch[importMatch.length - 1];
        const lastImportIndex = content.lastIndexOf(lastImport);
        content = content.substring(0, lastImportIndex + lastImport.length) + 
                  `import Stamp from "@/components/ui/Stamp";\n` + 
                  content.substring(lastImportIndex + lastImport.length);
      }
    }
    fs.writeFileSync(file, content);
    console.log(`Updated: ${path.basename(file)}`);
    modifiedCount++;
  }
}

console.log(`Successfully updated ${modifiedCount} files.`);
