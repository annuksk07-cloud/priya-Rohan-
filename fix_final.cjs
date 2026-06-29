const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startMarker = '// Diya Loader Logic';
const endMarker = 'function generateSprockets() {';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newLogic = `// Diya Loader Logic
      const loader = document.getElementById('diya-loader');
      const screen1 = document.getElementById('screen-1');
      const screen2 = document.getElementById('screen-2');
      const mainContent = document.getElementById('main-content');
      const btnReveal = document.getElementById('btn-reveal');
      const btnEnter = document.getElementById('btn-enter');
      const s1t1 = document.getElementById('s1-t1');
      const s1t2 = document.getElementById('s1-t2');
      const s2t1 = document.getElementById('s2-t1');
      const s2t2 = document.getElementById('s2-t2');

      // Starting state on page load
      if(loader) { loader.style.display = 'flex'; loader.style.opacity = '1'; loader.style.zIndex = '999999'; }
      if(screen1) { screen1.style.display = 'none'; screen1.style.opacity = '0'; screen1.style.zIndex = '9000'; }
      if(screen2) { screen2.style.display = 'none'; screen2.style.opacity = '0'; screen2.style.zIndex = '8000'; }
      if(mainContent) { mainContent.style.display = 'block'; mainContent.style.opacity = '0'; mainContent.style.zIndex = '1'; }
      
      // Loader Animation Phases
      setTimeout(() => {
        const dc = document.getElementById('diya-container');
        if(dc) dc.classList.add('visible');
      }, 500);

      setTimeout(() => {
        const fw = document.getElementById('diya-flame-wrapper');
        if(fw) {
          fw.classList.add('ignited');
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

      // Transition from Loader to Screen 1 (4.5s)
      setTimeout(() => {
        if(loader) {
          loader.style.transition = 'opacity 0.5s ease';
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
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
    });

    // Screen 1 to Screen 2
    document.addEventListener('click', (e) => {
      if (e.target.id === 'btn-reveal') {
        const screen1 = document.getElementById('screen-1');
        const screen2 = document.getElementById('screen-2');
        const s2t1 = document.getElementById('s2-t1');
        const s2t2 = document.getElementById('s2-t2');
        const btnEnter = document.getElementById('btn-enter');
        
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
      }
      
      // Screen 2 to Main Content
      if (e.target.id === 'btn-enter') {
        const screen2 = document.getElementById('screen-2');
        const mainContent = document.getElementById('main-content');
        
        if(screen2) {
          screen2.style.opacity = '0';
          setTimeout(() => {
            screen2.style.display = 'none';
            if(mainContent) {
              mainContent.style.display = 'block';
              void mainContent.offsetWidth;
              mainContent.style.opacity = '1';
              mainContent.style.pointerEvents = 'auto';
              document.body.style.overflow = 'auto';
              if (typeof setActiveFrame === 'function' && window.framesInitialized) setActiveFrame(0);
            }
          }, 500);
        }
      }
    });

    // Custom cursor interactions
    document.addEventListener('mouseover', (e) => {
      const cursor = document.getElementById('customCursor');
      if (cursor && (e.target.id === 'btn-reveal' || e.target.id === 'btn-enter')) {
        cursor.style.transform = 'scale(2.5)';
        cursor.style.background = '#fff8e7';
      }
    });
    document.addEventListener('mouseout', (e) => {
      const cursor = document.getElementById('customCursor');
      if (cursor && (e.target.id === 'btn-reveal' || e.target.id === 'btn-enter')) {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = '#C9A96E';
      }
    });
    
    // Empty block for previous function definition that is no longer needed but kept for structure
    // `;

  html = html.substring(0, startIndex) + newLogic + '\n      ' + html.substring(endIndex);
  fs.writeFileSync('index.html', html);
  console.log("Replaced logic");
} else {
  console.log("Could not find markers.");
}
