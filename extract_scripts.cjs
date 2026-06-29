const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let i = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  const scriptContent = match[1];
  fs.writeFileSync(`script_${i}.js`, scriptContent);
  i++;
}
console.log(`Extracted ${i} scripts.`);
