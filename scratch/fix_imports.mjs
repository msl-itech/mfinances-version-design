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
let fixedCount = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Sometimes it's inside `import {`
  const badImport = 'import {\nimport Stamp from "@/components/ui/Stamp";\n';
  if (content.includes(badImport)) {
    content = content.replace(badImport, 'import Stamp from "@/components/ui/Stamp";\nimport {\n');
  }
  
  const badImport2 = 'import {\n  import Stamp from "@/components/ui/Stamp";\n';
  if (content.includes(badImport2)) {
    content = content.replace(badImport2, 'import Stamp from "@/components/ui/Stamp";\nimport {\n  ');
  }

  // Generic fallback if it ended up inside any import { ... }
  // Find any `import Stamp from ...` that has `import {` before it and `} from` after it without a closing `}` in between.
  // Actually, let's just do a string replace of the known exact bad injection.

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${path.basename(file)}`);
    fixedCount++;
  }
}

console.log(`Fixed ${fixedCount} files`);
