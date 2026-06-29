const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `  <script>
    
    if (loader) {`;

const replacementStr = `  <script>
    const loader = document.getElementById('diya-loader');
    if (loader) {`;

html = html.replace(targetStr, replacementStr);

const targetStr2 = `    window.addEventListener('load', () => {
      document.body.style.overflow = 'hidden';
      
      if (mainContent) {`;

const replacementStr2 = `    window.addEventListener('load', () => {
      document.body.style.overflow = 'hidden';
      const mainContent = document.getElementById('main-content');
      if (mainContent) {`;

html = html.replace(targetStr2, replacementStr2);


html = html.replace(/const loader = document\.getElementById\('diya-loader'\);\s*const screen1 = document\.getElementById\('screen-1'\);\s*const screen2 = document\.getElementById\('screen-2'\);\s*const mainContent = document\.getElementById\('main-content'\);/, "const screen1 = document.getElementById('screen-1');\n      const screen2 = document.getElementById('screen-2');");

fs.writeFileSync('index.html', html);
