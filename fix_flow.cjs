const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The elements we need to create
const screen1 = `
  <div id="screen-1" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9000; background: #000; display: none; opacity: 0; flex-direction: column; justify-content: center; align-items: center; transition: opacity 0.5s ease; color: #C9A96E; font-family: 'Cormorant Garamond', serif; text-align: center;">
    <div style="font-size: 24px; font-style: italic; margin-bottom: 16px; opacity: 0; transform: translateY(20px); transition: all 1s ease;" id="s1-t1">Sitaaron ne tay kiya tha —</div>
    <div style="font-size: 24px; font-style: italic; margin-bottom: 40px; opacity: 0; transform: translateY(20px); transition: all 1s ease 0.5s;" id="s1-t2">aaj woh waqt aa gaya hai</div>
    <button id="btn-reveal" style="padding: 12px 32px; background: transparent; border: 1px solid #C9A96E; color: #C9A96E; font-family: 'Lato', sans-serif; letter-spacing: 2px; font-size: 12px; cursor: pointer; transition: 0.3s ease; opacity: 0; transform: translateY(20px); transition: all 1s ease 1s;">REVEAL THE DATE</button>
  </div>
`;

const screen2 = `
  <div id="screen-2" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 8000; background: #000; display: none; opacity: 0; flex-direction: column; justify-content: center; align-items: center; transition: opacity 0.5s ease; color: #C9A96E; font-family: 'Playfair Display', serif; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 24px; background: linear-gradient(135deg, #C9A96E, #fff8e7, #C9A96E); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 5s linear infinite; opacity: 0; transform: scale(0.9); transition: all 1s ease;" id="s2-t1">12 &bull; 12 &bull; 2026</div>
    <div style="font-size: 24px; font-family: 'Cormorant Garamond', serif; font-style: italic; margin-bottom: 40px; color: rgba(255,255,255,0.7); opacity: 0; transform: translateY(20px); transition: all 1s ease 0.5s;" id="s2-t2">— Priya &amp; Rohan —</div>
    <button id="btn-enter" style="padding: 12px 32px; background: #C9A96E; border: none; color: #000; font-family: 'Lato', sans-serif; letter-spacing: 2px; font-size: 12px; font-weight: bold; cursor: pointer; transition: 0.3s ease; opacity: 0; transform: translateY(20px); transition: all 1s ease 1s;">ENTER OUR WORLD</button>
  </div>
`;

// Insert the new screens right after diya-loader
html = html.replace(/(<\/div>\s*)(<div id="main-content")/, '$1' + screen1 + screen2 + '\n  $2');

// Remove the old text container from diya-loader
html = html.replace(/<div class="diya-text-container">[\s\S]*?<\/div>\s*<\/div>\s*<div id="main-content"/, '</div>\n  <div id="main-content"');

// Locate the Diya Loader Logic within window.onload
// We will replace the entire Diya Loader Logic until "Scroll Fade In" or similar
// Let's use string manipulation to find it
const startString = '// Diya Loader Logic';
const endString = 'document.addEventListener(\'scroll\', checkScroll);';

const startIndex = html.indexOf(startString);
const endIndex = html.indexOf(endString);

if (startIndex !== -1 && endIndex !== -1) {
  const newLogic = `// Diya Loader Logic
      const diyaLoader = document.getElementById('diya-loader');
      const screen1 = document.getElementById('screen-1');
      const screen2 = document.getElementById('screen-2');
      const mainContent = document.getElementById('main-content');
      const btnReveal = document.getElementById('btn-reveal');
      const btnEnter = document.getElementById('btn-enter');
      const s1t1 = document.getElementById('s1-t1');
      const s1t2 = document.getElementById('s1-t2');
      const s2t1 = document.getElementById('s2-t1');
      const s2t2 = document.getElementById('s2-t2');

      // Starting state
      if(diyaLoader) { diyaLoader.style.display = 'block'; diyaLoader.style.opacity = '1'; diyaLoader.style.zIndex = '999999'; }
      if(screen1) { screen1.style.display = 'none'; screen1.style.opacity = '0'; screen1.style.zIndex = '9000'; }
      if(screen2) { screen2.style.display = 'none'; screen2.style.opacity = '0'; screen2.style.zIndex = '8000'; }
      if(mainContent) { mainContent.style.display = 'block'; mainContent.style.opacity = '0'; mainContent.style.zIndex = '1'; }
      
      // Phase 2: Diya Appears (0.5s)
      setTimeout(() => {
        const dc = document.getElementById('diya-container');
        if(dc) dc.classList.add('visible');
      }, 500);

      // Phase 3: Flame Ignites (1.2s)
      setTimeout(() => {
        const fw = document.getElementById('diya-flame-wrapper');
        if(fw) {
          fw.classList.add('ignited');
          // Flame sparks
          for(let i = 0; i < 12; i++) {
            const spark = document.createElement('div');
            spark.style.cssText = \`
              position: absolute;
              width: \${1 + Math.random() * 2}px;
              height: \${1 + Math.random() * 2}px;
              background: hsl(\${30 + Math.random()*20}, 100%, \${60 + Math.random()*30}%);
              border-radius: 50%;
              top: \${-30 - Math.random() * 10}px;
              right: \${8 + Math.random() * 8}px;
              animation: sparkFloat \${0.8 + Math.random()*0.7}s ease-out \${Math.random()}s infinite;
            \`;
            spark.style.setProperty('--tx', (Math.random() - 0.5) * 30 + 'px');
            fw.appendChild(spark);
          }
        }
      }, 1200);

      // Phase 4: Light Spreads (2s)
      setTimeout(() => {
        const rl = document.getElementById('diya-radial-light');
        if(rl) { rl.style.width = '120vw'; rl.style.height = '120vw'; }
        const bg = document.getElementById('diya-bg');
        if(bg) bg.classList.add('warm');
        
        const starsContainer = document.getElementById('diya-stars');
        if(starsContainer) {
          for(let i=0; i<80; i++) {
            let star = document.createElement('div');
            star.className = 'diya-star';
            let size = 1 + Math.random();
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            starsContainer.appendChild(star);
            setTimeout(() => {
              star.style.opacity = 0.3 + Math.random() * 0.5;
            }, Math.random() * 500);
          }
        }
      }, 2000);

      // Phase 5: Loader hides, Screen 1 shows (4.5s)
      setTimeout(() => {
        if(diyaLoader) {
          diyaLoader.style.opacity = '0';
          setTimeout(() => {
            diyaLoader.style.display = 'none';
            if(screen1) {
              screen1.style.display = 'flex';
              void screen1.offsetWidth; // force reflow
              screen1.style.opacity = '1';
              
              setTimeout(() => {
                if(s1t1) { s1t1.style.opacity = '1'; s1t1.style.transform = 'translateY(0)'; }
                if(s1t2) { s1t2.style.opacity = '1'; s1t2.style.transform = 'translateY(0)'; }
                if(btnReveal) { btnReveal.style.opacity = '1'; btnReveal.style.transform = 'translateY(0)'; }
              }, 500);
            }
          }, 500);
        }
      }, 4500);

      // Button Events
      if(btnReveal) {
        btnReveal.addEventListener('click', () => {
          if(screen1) {
            screen1.style.opacity = '0';
            setTimeout(() => {
              screen1.style.display = 'none';
              if(screen2) {
                screen2.style.display = 'flex';
                void screen2.offsetWidth;
                screen2.style.opacity = '1';

                setTimeout(() => {
                  if(s2t1) { s2t1.style.opacity = '1'; s2t1.style.transform = 'scale(1)'; }
                  if(s2t2) { s2t2.style.opacity = '1'; s2t2.style.transform = 'translateY(0)'; }
                  if(btnEnter) { btnEnter.style.opacity = '1'; btnEnter.style.transform = 'translateY(0)'; }
                }, 500);
              }
            }, 500);
          }
        });
      }

      if(btnEnter) {
        btnEnter.addEventListener('click', () => {
          if(screen2) {
            screen2.style.opacity = '0';
            setTimeout(() => {
              screen2.style.display = 'none';
              if(mainContent) {
                mainContent.style.opacity = '1';
                mainContent.style.pointerEvents = 'auto';
                document.body.style.overflow = 'auto';
                if (typeof setActiveFrame === 'function' && window.framesInitialized) setActiveFrame(0);
              }
            }, 500);
          }
        });
      }

      // Cursor hover states for new buttons
      const cursor = document.getElementById('customCursor');
      if (cursor) {
        [btnReveal, btnEnter].forEach(btn => {
          if(btn) {
            btn.addEventListener('mouseenter', () => {
              cursor.style.transform = 'scale(2.5)';
              cursor.style.background = '#fff8e7';
            });
            btn.addEventListener('mouseleave', () => {
              cursor.style.transform = 'scale(1)';
              cursor.style.background = '#C9A96E';
            });
          }
        });
      }
      
      `;
  
  html = html.substring(0, startIndex) + newLogic + html.substring(endIndex);
}

fs.writeFileSync('index.html', html);
