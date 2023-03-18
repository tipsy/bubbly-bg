window.bubbly = function (c = {}) {
    c = getConfig(c);
    const bubbles = [];
    for (let i = 0; i < c.bubbles; i++) {
        let radius = c.radiusFunc();
        const bubbleCanvas = document.createElement("canvas");
        bubbleCanvas.width = bubbleCanvas.height = (radius * 2) + c.padding;
        const bubbleCtx = bubbleCanvas.getContext("2d");
        bubbleCtx.shadowColor = c.shadowColor;
        bubbleCtx.shadowBlur = c.blur;
        bubbleCtx.fillStyle = c.bubbleFunc();
        bubbleCtx.beginPath();
        bubbleCtx.arc(radius + c.padding / 2, radius + c.padding / 2, radius, 0, Math.PI * 2);
        bubbleCtx.fill();
        const bubbleImage = new Image();
        bubbleImage.src = bubbleCanvas.toDataURL();
        bubbles.push({
            img: bubbleImage,
            r: radius + c.padding, // bubble + shadow/glow
            x: Math.random() * c.cv.width,
            y: Math.random() * c.cv.height,
            a: c.angleFunc(),
            v: c.velocityFunc()
        });
    }
    (function draw() {
        if (c.cv.parentNode === null) {
            return cancelAnimationFrame(draw)
        }
        if (c.animate !== false) {
            requestAnimationFrame(draw);
        }
        c.ctx.globalCompositeOperation = "source-over";
        c.ctx.fillStyle = c.gradient;
        c.ctx.fillRect(0, 0, c.cv.width, c.cv.height);
        c.ctx.globalCompositeOperation = c.compose;
        bubbles.forEach(bubble => {
            c.ctx.drawImage(bubble.img, bubble.x - bubble.r, bubble.y - bubble.r);
            bubble.x += Math.cos(bubble.a) * bubble.v;
            bubble.y += Math.sin(bubble.a) * bubble.v;
            if (bubble.x - bubble.r > c.cv.width) {
                bubble.x = -bubble.r;
            }
            if (bubble.x + bubble.r < 0) {
                bubble.x = c.cv.width + bubble.r;
            }
            if (bubble.y - bubble.r > c.cv.height) {
                bubble.y = -bubble.r;
            }
            if (bubble.y + bubble.r < 0) {
                bubble.y = c.cv.height + bubble.r;
            }
        });
    })();
};

function getConfig(c) {
    let cv = c.canvas;
    if (!cv) {
        cv = document.createElement("canvas");
        cv.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
        document.body.appendChild(cv);
    }
    let mergedConfig = Object.assign({ // default values
        cv: cv,
        bubbles: Math.floor((cv.width + cv.height) * 0.02),
        compose: "lighter",
        blur: 4,
        shadowColor: "#fff",
        radiusFunc: () => 4 + Math.random() * window.innerWidth / 25,
        bubbleFunc: () => `hsla(0, 0%, 100%, ${Math.random() * 0.1})`,
        angleFunc: () => Math.random() * Math.PI * 2,
        velocityFunc: () => 0.1 + Math.random() * 0.5,
        animate: true,
    }, c);
    mergedConfig.ctx = cv.getContext("2d");
    mergedConfig.gradient = mergedConfig.ctx.createLinearGradient(0, 0, cv.width, cv.height);
    mergedConfig.gradient.addColorStop(0, c.colorStart || "#2AE");
    mergedConfig.gradient.addColorStop(1, c.colorStop || "#17B");
    mergedConfig.padding = mergedConfig.blur * 2
    return mergedConfig;
}
