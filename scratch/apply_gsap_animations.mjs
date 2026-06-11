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
let modifiedCount = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;

  // Skip files that already have useGsapReveal
  if (content.includes('useGsapReveal')) {
    continue;
  }

  // 1. Add imports
  let newImports = `import { useGsapReveal } from "@/hooks/use-gsap-reveal";\nimport { useTilt } from "@/hooks/use-tilt";\n`;
  
  // Handle react imports
  if (content.includes('from "react"') || content.includes("from 'react'")) {
    // Replace existing react import to ensure we have useEffect, useRef, useState
    content = content.replace(/import\s+(?:{[^}]*}|\w+(?:\s*,\s*{[^}]*})?)\s+from\s+["']react["'];?/, 'import { useEffect, useRef, useState } from "react";');
  } else {
    newImports = `import { useEffect, useRef, useState } from "react";\n` + newImports;
  }

  // Find the last import and insert our new imports after it
  const importMatch = content.match(/import .*;?\n/g);
  if (importMatch && importMatch.length > 0) {
    const lastImport = importMatch[importMatch.length - 1];
    const lastImportIndex = content.lastIndexOf(lastImport);
    content = content.substring(0, lastImportIndex + lastImport.length) + 
              newImports + 
              content.substring(lastImportIndex + lastImport.length);
  } else {
    content = newImports + content;
  }

  // 2. Remove SR component definition and import
  content = content.replace(/import\s+\{\s*useScrollReveal\s*\}\s+from\s+["']@\/hooks\/use-scroll-reveal["'];?\n?/g, '');
  content = content.replace(/function\s+SR\s*\([^)]*\)\s*\{[\s\S]*?return\s*\([\s\S]*?<\/[a-zA-Z]+>\s*\);\s*\}/g, '');

  // 3. Inject hook setup into the main component
  const componentRegex = /export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/;
  content = content.replace(componentRegex, (match, componentName) => {
    return `${match}
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  useGsapReveal(root, [mounted]);
  useTilt(root, [mounted]);
`;
  });

  // 4. Attach ref={root} to the outermost return element.
  // We look for the first `return (` and then the first element.
  const returnRegex = /return\s*\(\s*<([A-Za-z]+)([^>]*?)>/;
  content = content.replace(returnRegex, (match, tag, rest) => {
    if (!rest.includes('ref={')) {
      return `return (\n    <${tag} ref={root}${rest}>`;
    }
    return match;
  });

  // 5. Replace <SR> components
  // Replace <SR delay={0.1} className="..."> with <div data-anim="fade-up" data-delay="0.1" className="...">
  // First, we extract attributes
  content = content.replace(/<SR([^>]*)>/g, (match, attrs) => {
    let newAttrs = attrs;
    let delayMatch = attrs.match(/delay=\{([^}]+)\}/);
    let delayStr = '';
    if (delayMatch) {
        delayStr = ` data-delay="${delayMatch[1].replace(/['"]/g, '')}"`;
        newAttrs = newAttrs.replace(delayMatch[0], '');
    }
    return `<div data-anim="fade-up"${delayStr}${newAttrs}>`;
  });
  
  content = content.replace(/<\/SR>/g, '</div>');

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated GSAP animations in: ${path.basename(file)}`);
    modifiedCount++;
  }
}

console.log(`Successfully updated ${modifiedCount} files.`);
