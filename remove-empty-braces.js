const fs = require('fs');
const path = require('path');

const targetDirs = ['components', 'app', 'lib'];
const fileExts = ['.tsx', '.ts', '.jsx', '.js'];

// Regex to find empty {} on a single line or with spaces
const emptyBracesRegex = /^\s*\{\s*\}\s*$/gm;
let totalRemoved = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        walkDir(fullPath);
      }
    } else if (fileExts.includes(path.extname(fullPath))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (emptyBracesRegex.test(content)) {
        const matches = content.match(emptyBracesRegex);
        totalRemoved += matches.length;
        
        // Remove those lines
        content = content.replace(emptyBracesRegex, '');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Cleaned ${matches.length} empty {} from: ${fullPath}`);
      }
    }
  }
}

console.log("Scanning project for empty {}...");
for (const dir of targetDirs) {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    walkDir(fullPath);
  }
}

console.log(`\nDone! Removed a total of ${totalRemoved} empty {} blocks from the codebase.`);
