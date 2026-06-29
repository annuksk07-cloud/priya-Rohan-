const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// --- FIX 1 & 2: TEXT CONTRAST & PADDING ---
html = html.replace(/\bopacity:\s*0\.5;/g, 'opacity: 0.85;');
html = html.replace(/\bopacity:\s*0\.6;/g, 'opacity: 0.9;');
html = html.replace(/\bopacity:\s*0\.7;/g, 'opacity: 0.9;');
html = html.replace(/\.frame-num\s*\{[^}]*opacity:\s*0\.85;/g, match => match.replace('0.85', '0.85'));
html = html.replace(/\.frame-date\s*\{[^}]*opacity:\s*0\.9;/g, match => match.replace('0.9', '0.9'));
html = html.replace(/\.person-parents\s*\{([^}]*)color:\s*#555;/g, '.person-parents {$1color: #888;');
html = html.replace(/\.venue-address\s*\{([^}]*)color:\s*#666;/g, '.venue-address {$1color: #999;');
html = html.replace(/\.explore-text\s*\{([^}]*)color:\s*#555;/g, '.explore-text {$1color: #888;');
html = html.replace(/\.story-text\s*\{([^}]*)color:\s*#888;/g, '.story-text {$1color: #aaa;');
html = html.replace(/\.scroll-label\s*\{([^}]*)color:\s*#555;/g, '.scroll-label {$1color: #888;');
html = html.replace(/\.photo-subtext\s*\{([^}]*)color:\s*#555;/g, '.photo-subtext {$1color: #888;');

html = html.replace(/padding:\s*100px\s*20px;/g, 'padding: 140px 24px;');
html = html.replace(/padding:\s*80px\s*20px;/g, 'padding: 120px 24px;');

html = html.replace(/(\.couple-ornament|\.countdown-ornament|\.venue-ornament|\.gallery-ornament|\.rsvp-ornament)\s*\{([^}]*)margin-bottom:\s*16px;/g, '$1 {$2margin-bottom: 24px;');
html = html.replace(/(\.couple-header|\.countdown-header|\.venue-header|\.gallery-header|\.rsvp-header)\s*\{([^}]*)margin-bottom:\s*48px;/g, '$1 {$2margin-bottom: 64px;');
html = html.replace(/\.couple-layout\s*\{([^}]*)gap:\s*40px;/g, '.couple-layout {$1gap: 60px;');
html = html.replace(/\.venue-layout\s*\{([^}]*)gap:\s*24px;/g, '.venue-layout {$1gap: 32px;');
html = html.replace(/\.countdown-container\s*\{([^}]*)gap:\s*16px;/g, '.countdown-container {$1gap: 20px;');
html = html.replace(/\.rsvp-field\s*\{([^}]*)margin-bottom:\s*24px;/g, '.rsvp-field {$1margin-bottom: 32px;');

html = html.replace(/\.film-strip\s*\{([^}]*)\}/, (match, p1) => {
    return `.film-strip {${p1} margin: 60px 0 40px 0; }`;
});

const mobileCSS = `
    @media (max-width: 480px) {
      .title, .diya-line3, .person-name, .countdown-number, .gallery-title, .rsvp-title {
        background: none !important;
        -webkit-text-fill-color: #C9A96E !important;
        color: #C9A96E !important;
      }
    }
`;
html = html.replace(/(<\/style>)/, mobileCSS + '\n$1');

// --- FIX 3: ANIMATIONS ---
html = html.replace(/transition:\s*opacity\s*0\.5s\s*ease,\s*transform\s*0\.5s\s*ease;/g, 'transition: opacity 0.8s ease, transform 0.8s ease;');
html = html.replace(/transition:\s*transform\s*0\.3s\s*ease;/g, 'transition: transform 0.5s ease;');
html = html.replace(/transition:\s*transform\s*0\.4s\s*cubic-bezier\(0\.34,1\.56,0\.64,1\);/g, 'transition: transform 0.7s cubic-bezier(0.34,1.56,0.64,1);');
html = html.replace(/transition:\s*opacity\s*0\.4s\s*ease;/g, 'transition: opacity 0.7s ease;');
html = html.replace(/\.photo-frame\s*\{[^}]*transition:\s*0\.4s\s*ease;/g, match => match.replace('0.4s', '0.5s'));
html = html.replace(/\.venue-card\s*\{[^}]*transition:\s*all\s*0\.4s\s*ease;/g, match => match.replace('0.4s', '0.6s'));
html = html.replace(/\.venue-btn\s*\{[^}]*transition:\s*0\.3s\s*ease;/g, match => match.replace('0.3s', '0.5s'));
html = html.replace(/\.map-quick-link\s*\{[^}]*transition:\s*0\.3s\s*ease;/g, match => match.replace('0.3s', '0.5s'));
html = html.replace(/\.stepper-btn\s*\{[^}]*transition:\s*0\.3s;/g, match => match.replace('0.3s', '0.5s ease'));
html = html.replace(/\.frame\s*\{([^}]*)transition:\s*all\s*0\.6s\s*ease;/g, '.frame {$1transition: all 1s ease;');
html = html.replace(/transition:\s*opacity\s*0\.8s\s*ease,\s*transform\s*0\.8s\s*ease;/g, 'transition: opacity 1.2s ease, transform 1.2s ease;');
html = html.replace(/setInterval\(\(\)\s*=>\s*\{([^}]*)\},\s*2500\)/g, 'setInterval(() => {$1}, 3500)');
html = html.replace(/animation:\s*shimmer\s*3s\s*linear\s*infinite;/g, 'animation: shimmer 5s linear infinite;');
html = html.replace(/animation:\s*shimmer\s*4s\s*linear\s*infinite;/g, 'animation: shimmer 6s linear infinite;');

// --- FIX 12: GALLERY HOVER EFFECTS ---
html = html.replace(/\.photo-placeholder\s*\{([^}]*)\}/, (match, p1) => {
    let replaced = p1.replace(/transition:\s*0\.3s\s*ease;/, 'transition: all 0.6s ease;');
    return `.photo-placeholder {${replaced} filter: brightness(0.8); transform: scale(1); }`;
});
html = html.replace(/\.photo-placeholder:hover\s*\{([^}]*)\}/, (match) => {
    return `.photo-placeholder:hover { transform: scale(1.04); filter: brightness(1.1); border-color: #C9A96E; box-shadow: 0 0 30px rgba(201,169,110,0.3), 0 8px 30px rgba(0,0,0,0.5); z-index: 2; }`;
});
html = html.replace(/\.photo-icon-lg\s*\{([^}]*)opacity:\s*0\.1;/g, '.photo-icon-lg {$1opacity: 0.15; transition: 0.6s ease;');
html = html.replace(/(<\/style>)/, `.photo-placeholder:hover .photo-icon-lg { opacity: 0.4; transform: scale(1.2); }\n$1`);
html = html.replace(/\.gallery-row\s*\{([^}]*)margin-bottom:\s*12px;/g, '.gallery-row {$1margin-bottom: 20px;');
html = html.replace(/\.gallery-note\s*\{([^}]*)\}/, (match, p1) => {
    return `.gallery-note { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-style: italic; color: #888; letter-spacing: 2px; margin-top: 48px; display: block; }`;
});

// --- FIX 8: CURSOR GLOW ---
const cursorCSS = `
    @media (hover: hover) and (pointer: fine) {
      * { cursor: none !important; }
    }
`;
html = html.replace(/(<\/style>)/, cursorCSS + '\n$1');

const cursorJS = `
    const cursor = document.createElement('div');
    cursor.id = 'customCursor';
    cursor.style.cssText = \`
      position: fixed; width: 8px; height: 8px;
      background: #C9A96E; border-radius: 50%;
      pointer-events: none; z-index: 999998;
      transition: transform 0.1s ease;
      mix-blend-mode: difference; display: none;
    \`;
    document.body.appendChild(cursor);

    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = \`
      position: fixed; width: 40px; height: 40px;
      background: radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%);
      border-radius: 50%; pointer-events: none;
      z-index: 999997; transition: transform 0.3s ease, left 0.15s ease, top 0.15s ease;
      display: none;
    \`;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return;
      cursor.style.display = 'block';
      cursorGlow.style.display = 'block';
      cursor.style.left = (e.clientX - 4) + 'px';
      cursor.style.top = (e.clientY - 4) + 'px';
      cursorGlow.style.left = (e.clientX - 20) + 'px';
      cursorGlow.style.top = (e.clientY - 20) + 'px';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.display = 'none';
      cursorGlow.style.display = 'none';
    });

    document.querySelectorAll('button, a, .frame, [onclick], .photo-placeholder, .venue-btn, .map-quick-link').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2.5)';
        cursor.style.background = '#fff8e7';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = '#C9A96E';
      });
    });
`;
html = html.replace(/(<\/script>\s*<\/body>)/, cursorJS + '\n$1');

// --- FIX 9: SCROLL PROGRESS BAR ---
const scrollCSS = `
    #scrollProgress {
      position: fixed; top: 0; left: 0; width: 0%; height: 2px;
      background: linear-gradient(90deg, #8B6914, #C9A96E, #fff8e7, #C9A96E);
      z-index: 99998; transition: width 0.1s ease;
      box-shadow: 0 0 8px rgba(201,169,110,0.6);
    }
`;
html = html.replace(/(<\/style>)/, scrollCSS + '\n$1');
html = html.replace(/(<body>)/, '$1\n  <div id="scrollProgress"></div>');
const scrollJS = `
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      document.getElementById('scrollProgress').style.width = progress + '%';
    });
`;
html = html.replace(/(<\/script>\s*<\/body>)/, scrollJS + '\n$1');

// --- FIX 10: CTA LANGUAGE UPGRADE ---
html = html.replace(/CONFIRM ATTENDANCE\s*→/g, 'RESERVE YOUR SEAT →');
html = html.replace(/Confirm Your Attendance/g, 'Join Our Celebration');
html = html.replace(/Aapka aana hamare jashn ko poora karega/g, 'Aapki maujoodgi hamare jashn ki sabse khaas yaad banegi');
html = html.replace(/Shukriya!\s*🎊/g, 'Aapka Shukriya! ✨');
html = html.replace(/Aapka RSVP mil gaya[^\n]*/g, 'Aap hamare dil ke kareeb hain.<br>Milte hain uss khaas shaam mein!');
html = html.replace(/SCROLL TO EXPLORE/g, 'UNFOLD OUR STORY');
html = html.replace(/Click any frame to explore/g, 'Click to relive the moment');
html = html.replace(/A Cinematic Celebration/g, 'Our Cinematic Love Story');
html = html.replace(/A CINEMATIC CELEBRATION/g, 'OUR CINEMATIC LOVE STORY');
html = html.replace(/THE ONES YOU ARE CELEBRATING/g, 'TWO SOULS, ONE DESTINY');
html = html.replace(/FRAMES FROM OUR STORY/g, 'MOMENTS WE WILL CHERISH FOREVER');
html = html.replace(/WHERE THE MAGIC HAPPENS/g, 'WHERE MEMORIES WILL BE BORN');
html = html.replace(/THE WAIT IS ALMOST OVER/g, 'THE MOST AWAITED MOMENT');

// --- FIX 11: FOOTER EMOTIONAL LINE ---
html = html.replace(/Aapka aana hi hamare jashn ki sabse khoobsurat yaad hogi\./, 'Every love story is beautiful,<br>but ours is our favourite');
html = html.replace(/— Aapke aane ka intezaar rahega —/, '— Thank you for being part of ours —');
html = html.replace(/Crafted with love for the beginning of forever/, 'Made with love for the people who matter the most ♥');

html = html.replace(/\.footer-message\s*\{[^}]*\}/, ".footer-message { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-style: italic; color: #C9A96E; text-align: center; letter-spacing: 1px; margin-bottom: 16px; }");
html = html.replace(/\.footer-signoff\s*\{[^}]*\}/, ".footer-signoff { font-family: 'Lato', sans-serif; font-size: 9px; color: #666; letter-spacing: 6px; text-align: center; }");
html = html.replace(/\.footer-credits\s*\{[^}]*\}/, ".footer-credits { font-family: 'Cormorant Garamond', serif; font-size: 12px; font-style: italic; color: #444; text-align: center; margin-top: 32px; }");

// --- FIX 2: DIVIDERS ---
const dividerCSS = `
    .section-divider {
      width: 1px; height: 60px;
      background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.3), transparent);
      margin: 0 auto;
    }
`;
html = html.replace(/(<\/style>)/, dividerCSS + '\n$1');

html = html.replace(/<\/section>\s*<section/g, '</section>\n  <div class="section-divider"></div>\n  <section');
html = html.replace(/<\/section>\s*<footer/g, '</section>\n  <div class="section-divider"></div>\n  <footer');

fs.writeFileSync('index.html', html);
