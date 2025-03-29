const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('❌ Error: Please provide a file path.\nUsage: node scripts/replace-null.js path/to/file.d.ts');
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), inputPath);

if (!fs.existsSync(filePath)) {
  console.error(`❌ Error: File not found at ${filePath}`);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Replace all `| null` (optionally with whitespace) with `| undefined`
content = content.replace(/\|\s*null/g, '| undefined');

fs.writeFileSync(filePath, content);

console.log(`✅ Replaced | null with | undefined in: ${inputPath}`);