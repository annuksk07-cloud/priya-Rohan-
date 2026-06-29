const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const earlyCloseStr = `      }, 4500);
    });

    // Screen 1 to Screen 2
    document.addEventListener('click', (e) => {`;

const replacedEarlyCloseStr = `      }, 4500);

    // Screen 1 to Screen 2
    document.addEventListener('click', (e) => {`;

if (html.includes(earlyCloseStr)) {
  html = html.replace(earlyCloseStr, replacedEarlyCloseStr);
  fs.writeFileSync('index.html', html);
  console.log("Fixed early close!");
} else {
  console.log("Not found.");
}
