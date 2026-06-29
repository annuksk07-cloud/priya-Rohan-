const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove the old text container
html = html.replace(/<div class="diya-text-container">[\s\S]*?<\/div>\s*<\/div>\s*<div id="screen-1"/, '</div>\n  </div>\n  <div id="screen-1"');

fs.writeFileSync('index.html', html);
