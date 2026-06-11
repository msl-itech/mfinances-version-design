import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src/pages');

// Utility to recursively find all .tsx files
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

const heroRegex = /<section className="([^"]*bg-primary[^"]*py-12 md:py-24[^"]*relative overflow-hidden[^"]*)"/g;
const imageContainerRegex = /<div className="relative rounded-\[24px\] overflow-hidden shadow-2xl aspect-\[4\/5\] group([^"]*)">/g;

let modifiedCount = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Skip files already containing Stamp to avoid double injects
  if (content.includes('import Stamp')) {
    continue;
  }

  let modified = false;

  // 1. Add precision grid to hero section
  if (heroRegex.test(content)) {
    content = content.replace(heroRegex, (match, classes) => {
      if (!classes.includes('bg-precision-grid-light')) {
        return `<section className="${classes} bg-precision-grid-light"`;
      }
      return match;
    });
    modified = true;
  }

  // 2. Add Stamp to image container and cut-corner
  if (imageContainerRegex.test(content)) {
    content = content.replace(imageContainerRegex, (match, restClasses) => {
      let newClasses = restClasses;
      if (!newClasses.includes('cut-corner')) {
        newClasses += ' cut-corner';
      }
      return `<div className="absolute -top-12 -right-6 z-20 hidden md:block">\n                  <Stamp className="text-accent drop-shadow-lg" />\n                </div>\n                <div className="relative rounded-[24px] overflow-hidden shadow-2xl aspect-[4/5] group${newClasses}">`;
    });
    modified = true;
  }

  // 3. Import Stamp if modified
  if (modified) {
    // Find last import statement
    const importMatch = content.match(/import .*;?\n/g);
    if (importMatch && importMatch.length > 0) {
      const lastImport = importMatch[importMatch.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      content = content.substring(0, lastImportIndex + lastImport.length) + 
                `import Stamp from "@/components/ui/Stamp";\n` + 
                content.substring(lastImportIndex + lastImport.length);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated: ${path.basename(file)}`);
    modifiedCount++;
  }
}

console.log(`Successfully updated ${modifiedCount} files.`);
