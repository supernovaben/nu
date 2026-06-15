(function () {
    const ASCII = [
      "                                                                                                    ",
      "                                                                                                    ",
      "                                                                                                    ",
      "                                                                                                    ",
      "    ∞∞∞∞∞∞∞∞∞∞∞∞                   ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞                                               ",
      "    ∞∞∞∞∞∞∞∞∞∞∞∞∞∞                 ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞                                               ",
      "        ∞∞∞∞∞∞∞∞∞∞∞                     ∞∞∞∞∞∞                                                    ",
      "          ∞∞∞∞∞∞∞∞∞∞                    ∞∞∞∞∞                                                     ",
      "          ∞∞∞∞∞∞∞∞∞∞∞∞                   ∞∞∞∞                                                     ",
      "          ∞∞∞∞∞∞∞∞∞∞∞∞∞                  ∞∞∞∞                                                     ",
      "          ∞∞∞∞ ∞∞∞∞∞∞∞∞∞∞                ∞∞∞∞                                                     ",
      "          ∞∞∞∞  ∞∞∞∞∞∞∞∞∞∞               ∞∞∞∞                                                     ",
      "          ∞∞∞∞    ∞∞∞∞∞∞∞∞∞∞             ∞∞∞∞         ∞∞∞∞∞∞∞∞∞             ∞∞∞∞∞∞                ",
      "          ∞∞∞∞     ∞∞∞∞∞∞∞∞∞∞            ∞∞∞∞        ∞∞∞∞∞∞∞∞∞∞∞           ∞∞∞∞∞∞∞                ",
      "          ∞∞∞∞       ∞∞∞∞∞∞∞∞∞∞          ∞∞∞∞       ∞∞∞∞ ∞∞∞∞∞∞∞∞          ∞∞∞∞∞∞∞                ",
      "          ∞∞∞∞        ∞∞∞∞∞∞∞∞∞∞         ∞∞∞∞       ∞∞∞   ∞∞∞∞∞∞∞          ∞∞∞∞∞∞                 ",
      "          ∞∞∞∞          ∞∞∞∞∞∞∞∞∞∞       ∞∞∞∞       ∞∞∞    ∞∞∞∞∞∞∞         ∞∞∞∞∞∞                 ",
      "          ∞∞∞∞           ∞∞∞∞∞∞∞∞∞∞      ∞∞∞∞               ∞∞∞∞∞∞∞        ∞∞∞∞∞                  ",
      "          ∞∞∞∞            ∞∞∞∞∞∞∞∞∞∞∞    ∞∞∞∞               ∞∞∞∞∞∞∞        ∞∞∞∞                   ",
      "          ∞∞∞∞              ∞∞∞∞∞∞∞∞∞∞   ∞∞∞∞                ∞∞∞∞∞∞∞      ∞∞∞∞                    ",
      "          ∞∞∞∞               ∞∞∞∞∞∞∞∞∞∞∞ ∞∞∞∞                 ∞∞∞∞∞∞      ∞∞∞                     ",
      "          ∞∞∞∞                 ∞∞∞∞∞∞∞∞∞∞∞∞∞∞                 ∞∞∞∞∞∞∞    ∞∞∞∞                     ",
      "          ∞∞∞∞                  ∞∞∞∞∞∞∞∞∞∞∞∞∞                  ∞∞∞∞∞∞∞  ∞∞∞∞                      ",
      "          ∞∞∞∞                    ∞∞∞∞∞∞∞∞∞∞∞                   ∞∞∞∞∞∞ ∞∞∞∞                       ",
      "          ∞∞∞∞                     ∞∞∞∞∞∞∞∞∞∞                   ∞∞∞∞∞∞∞∞∞∞                        ",
      "          ∞∞∞∞                       ∞∞∞∞∞∞∞∞                    ∞∞∞∞∞∞∞∞                         ",
      "          ∞∞∞∞∞                       ∞∞∞∞∞∞∞                     ∞∞∞∞∞∞                          ",
      "        ∞∞∞∞∞∞∞∞                        ∞∞∞∞∞                     ∞∞∞∞∞                           ",
      "    ∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞                     ∞∞∞∞                      ∞∞∞                            ",
      "                                           ∞                                                       ",
      "                                                                                                    ",
      "                                                                                                    ",
      "                                                                                                    ",
      "                                                                                                    ",
      "                                                                                                    ",
      "                                                                                                    "
    ];
  
    const canvas = document.querySelector('.ascii-bg');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
  
    const BASE_FONT = 14;
    const RIPPLE_SPEED = 2;
    const RIPPLE_WAVELENGTH = 45;
    const BASE_ALPHA = 0.18;
    const PEAK_ALPHA = 0.75;
  
    const rows = ASCII.length;
    const cols = Math.max(...ASCII.map(r => r.length));
  
    const charCenterRow = rows / 2;
    const charCenterCol = cols / 2;
  
    let charPositions = [];
    let fontSize, lineHeight, charWidth;
    let contentMinCol = cols, contentMaxCol = 0, contentMinRow = rows, contentMaxRow = 0;
  
    function buildCharMap() {
      charPositions = [];
      contentMinCol = cols; contentMaxCol = 0;
      contentMinRow = rows; contentMaxRow = 0;
      for (let r = 0; r < rows; r++) {
        const line = ASCII[r];
        for (let c = 0; c < line.length; c++) {
          const ch = line[c];
          if (ch !== ' ') {
            charPositions.push({ ch, r, c });
            if (c < contentMinCol) contentMinCol = c;
            if (c > contentMaxCol) contentMaxCol = c;
            if (r < contentMinRow) contentMinRow = r;
            if (r > contentMaxRow) contentMaxRow = r;
          }
        }
      }
    }
  
    function computeScale() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const padding = 0.92;
      const scaleX = (w * padding) / (cols * BASE_FONT * 0.6);
      const scaleY = (h * padding) / (rows * BASE_FONT * 1.2);
      const scale = Math.min(scaleX, scaleY);
      fontSize = BASE_FONT * scale;
      lineHeight = fontSize * 1.2;
      charWidth = fontSize * 0.6;
    }
  
    function resize() {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
      computeScale();
    }
  
    function draw(time) {
      const t = time * 0.001;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
  
      const contentW = (contentMaxCol - contentMinCol + 1) * charWidth;
      const contentH = (contentMaxRow - contentMinRow + 1) * lineHeight;
      const offsetX = (w - contentW) / 2 - contentMinCol * charWidth;
      const offsetY = (h - contentH) / 2 - contentMinRow * lineHeight;
  
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${fontSize}px "Courier New", Courier, monospace`;
      ctx.textBaseline = 'top';
  
      const waveDisp = fontSize * 0.16;
  
      for (let i = 0; i < charPositions.length; i++) {
        const { ch, r, c } = charPositions[i];
  
        const dr = r - charCenterRow;
        const dc = c - charCenterCol;
        const dist = Math.sqrt(dr * dr + dc * dc);
  
        const wave = Math.sin(dist / RIPPLE_WAVELENGTH * Math.PI * 2 - t * RIPPLE_SPEED);
        const alpha = BASE_ALPHA + (PEAK_ALPHA - BASE_ALPHA) * (wave * 0.5 + 0.5);
  
        const yOff = wave * waveDisp;
  
        const x = offsetX + c * charWidth;
        const y = offsetY + r * lineHeight + yOff;
  
        ctx.fillStyle = `rgba(232, 232, 232, ${alpha.toFixed(3)})`;
        ctx.fillText(ch, x, y);
      }
  
      requestAnimationFrame(draw);
    }
  
    buildCharMap();
    resize();
    window.addEventListener('resize', resize);
    if (window.ResizeObserver && canvas.parentElement) {
      new ResizeObserver(() => resize()).observe(canvas.parentElement);
    }
    requestAnimationFrame(draw);
  })();
  