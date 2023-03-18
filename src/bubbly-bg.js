window.bubbly = function (c = {}) {
    const r = () => Math.random();
    const cv = c.canvas || createDefaultCanvas();
    const context = cv.getContext("2d");
    const gradient = getGradient(context, cv, c);
    const nrBubbles = c.bubbles || Math.floor((cv.width + cv.height) * 0.02);
    const bubbles = [];
    const padding = (c.blur || 4) * 2;
    for (let i = 0; i < nrBubbles; i++) {
        let radius = (c.radiusFunc || (() => 4 + r() * cv.width / 25)).call();
        const bubbleCanvas = document.createElement("canvas");
        bubbleCanvas.width = bubbleCanvas.height = (radius * 2) + padding;
        const bubbleContext = bubbleCanvas.getContext("2d");
        bubbleContext.shadowColor = c.shadowColor || "#fff";
        bubbleContext.shadowBlur = c.blur || 4;
        bubbleContext.fillStyle = (c.bubbleFunc || (() => `hsla(0, 0%, 100%, ${r() * 0.1})`)).call();
        bubbleContext.beginPath();
        bubbleContext.arc(radius + padding / 2, radius + padding / 2, radius, 0, Math.PI * 2);
        bubbleContext.fill();
        const bubbleImage = new Image();
        bubbleImage.src = bubbleCanvas.toDataURL();
        bubbles.push({
            img: bubbleImage,
            r: radius + padding, // bubble + shadow/glow
            x: r() * cv.width, // x-position
            y: r() * cv.height, // y-position
            a: (c.angleFunc || (() => r() * Math.PI * 2)).call(), // angle
            v: (c.velocityFunc || (() => 0.1 + r() * 0.5)).call() // velocity
        });
    }
    (function draw() {
        if (cv.parentNode === null) {
            return cancelAnimationFrame(draw)
        }
        if (c.animate !== false) {
            requestAnimationFrame(draw);
        }
        context.globalCompositeOperation = "source-over";
        context.fillStyle = gradient;
        context.fillRect(0, 0, cv.width, cv.height);
        context.globalCompositeOperation = c.compose || "lighter";
        bubbles.forEach(bubble => {
            context.drawImage(bubble.img, bubble.x - bubble.r, bubble.y - bubble.r);
            bubble.x += Math.cos(bubble.a) * bubble.v;
            bubble.y += Math.sin(bubble.a) * bubble.v;
            if (bubble.x - bubble.r > cv.width) {
                bubble.x = -bubble.r;
            }
            if (bubble.x + bubble.r < 0) {
                bubble.x = cv.width + bubble.r;
            }
            if (bubble.y - bubble.r > cv.height) {
                bubble.y = -bubble.r;
            }
            if (bubble.y + bubble.r < 0) {
                bubble.y = cv.height + bubble.r;
            }
        });
    })();
};

function getGradient(context, cv, c) {
    const gradient = context.createLinearGradient(0, 0, cv.width, cv.height);
    gradient.addColorStop(0, c.colorStart || "#2AE");
    gradient.addColorStop(1, c.colorStop || "#17B");
    return gradient;
}

function createDefaultCanvas() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    return canvas;
}
