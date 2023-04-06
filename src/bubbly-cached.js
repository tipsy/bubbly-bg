window.bubbly = function (c = {}) {
    c = generateConfig(c);
    const addBubble = () => {
        let radius = c.bubbles.radius();
        const shadowConfig = c.bubbles.shadow();
        const strokeConfig = c.bubbles.stroke();
        const padding = 2 + (shadowConfig?.blur ?? 0) * 2 + (strokeConfig?.width ?? 0) * 2;
        const bubbleCanvas = document.createElement("canvas");
        bubbleCanvas.width = bubbleCanvas.height = (radius * 2) + padding; // bubble + shadow/glow
        const bubbleCtx = bubbleCanvas.getContext("2d");
        if (shadowConfig) {
            bubbleCtx.shadowColor = shadowConfig.color;
            bubbleCtx.shadowBlur = shadowConfig.blur;
        }
        bubbleCtx.fillStyle = c.bubbles.fill();
        bubbleCtx.beginPath();
        bubbleCtx.arc(radius + padding / 2, radius + padding / 2, radius, 0, Math.PI * 2);
        bubbleCtx.fill();
        if (strokeConfig) {
            bubbleCtx.strokeStyle = strokeConfig.color;
            bubbleCtx.lineWidth = strokeConfig.width;
            bubbleCtx.stroke();
        }
        bubbles.push({
            img: createImage(bubbleCanvas),
            r: radius + padding, // bubble + shadow/glow
            x: Math.random() * c.cv.width,
            y: Math.random() * c.cv.height,
            a: c.bubbles.angle(),
            v: c.bubbles.velocity()
        });
    }
    let bubbles = [];
    for (let i = 0; i < c.bubbles.count; i++) {
        addBubble(); // blocks the main thread until all bubbles are created
    }
    c.ctx.globalCompositeOperation = c.compose;
    requestAnimationFrame(draw);

    function draw() {
        c.ctx.fillStyle = c.background(c.ctx);
        if (c.cv.parentNode === null) {
            bubbles = [];
            return cancelAnimationFrame(draw);
        }
        if (c.animate) {
            requestAnimationFrame(draw);
        }
        c.ctx.clearRect(0, 0, c.cv.width, c.cv.height);
        c.ctx.fillRect(0, 0, c.cv.width, c.cv.height);
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
    }
};

const createImage = (canvas) => {
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
}

function generateConfig(c) {
    let cv = c.canvas || (() => {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        return canvas;
    })();

    return {
        cv: cv,
        compose: c.compose ?? "lighter",
        bubbles: {
            count: c.bubbles?.count ?? Math.floor((cv.width + cv.height) * 0.02),
            radius: c.bubbles?.radius ?? (() => 4 + Math.random() * window.innerWidth / 25),
            fill: c.bubbles?.fill ?? (() => `hsla(0, 0%, 100%, ${Math.random() * 0.1})`),
            angle: c.bubbles?.angle ?? (() => Math.random() * Math.PI * 2),
            velocity: c.bubbles?.velocity ?? (() => 0.1 + Math.random() * 0.5),
            shadow: c.bubbles?.shadow ?? (() => null), // ({blur: 4, color: "#fff"})
            stroke: c.bubbles?.stroke ?? (() => null), // ({width: 2, color: "#fff"})
        },
        background: c.background ?? (() => "#2AE"),
        animate: c.animate !== false,
        ctx: cv.getContext("2d"),
    };
}
