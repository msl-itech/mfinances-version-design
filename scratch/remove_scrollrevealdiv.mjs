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
  const originalContent = content;

  // 1. Remove the function ScrollRevealDiv(...) definition completely
  content = content.replace(/function\s+ScrollRevealDiv\s*\([^)]*\)\s*(?::\s*[^\{]+)?\{[\s\S]*?return\s*\([\s\S]*?<\/[a-zA-Z]+>\s*\);\s*\}/g, '');

  // 2. Replace <ScrollRevealDiv delay={0.1} className="..."> with <div data-anim="fade-up" data-delay="0.1" className="...">
  content = content.replace(/<ScrollRevealDiv([^>]*)>/g, (match, attrs) => {
    let newAttrs = attrs;
    let delayMatch = attrs.match(/delay=\{([^}]+)\}/);
    let delayStr = '';
    if (delayMatch) {
        delayStr = ` data-delay="${delayMatch[1].replace(/['"]/g, '')}"`;
        newAttrs = newAttrs.replace(delayMatch[0], '');
    }
    return `<div data-anim="fade-up"${delayStr}${newAttrs}>`;
  });
  
  // 3. Replace </ScrollRevealDiv> with </div>
  content = content.replace(/<\/ScrollRevealDiv>/g, '</div>');

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ScrollRevealDiv in: ${path.basename(file)}`);
    modifiedCount++;
  }
}

console.log(`Successfully updated ${modifiedCount} files.`);
