window.bubbly = function (c = {}) {
    c = generateConfig(c);
    const addBubble = () => {
        let radius = c.radiusFunc();
        const bubbleCanvas = document.createElement("canvas");
        bubbleCanvas.width = bubbleCanvas.height = (radius * 2) + c.padding; // bubble + shadow/glow
        const bubbleCtx = bubbleCanvas.getContext("2d");
        bubbleCtx.shadowColor = c.shadowColor;
        bubbleCtx.shadowBlur = c.shadowBlur;
        bubbleCtx.fillStyle = c.fillFunc();
        bubbleCtx.beginPath();
        bubbleCtx.arc(radius + c.padding / 2, radius + c.padding / 2, radius, 0, Math.PI * 2);
        bubbleCtx.fill();
        bubbles.push({
            img: createImage(bubbleCanvas),
            r: radius + c.padding, // bubble + shadow/glow
            x: Math.random() * c.cv.width,
            y: Math.random() * c.cv.height,
            a: c.angleFunc(),
            v: c.velocityFunc()
        });
    }
    let bubbles = [];
    for (let i = 0; i < c.bubbles; i++) {
        if (c.bubbles > 100 && c.animate) {
            setTimeout(addBubble, 10 * i); // create bubbles async so rendering is not blocked
        } else {
            addBubble(); // block the main thread until all bubbles are created
        }
    }
    c.ctx.globalCompositeOperation = c.compose;
    c.ctx.fillStyle = c.gradient;
    requestAnimationFrame(draw);

    function draw() {
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

    const mergedConfig = Object.assign({
        cv: cv,
        bubbles: Math.floor((cv.width + cv.height) * 0.02),
        compose: "lighter",
        shadowBlur: 4,
        shadowColor: "#fff",
        radiusFunc: () => 4 + Math.random() * window.innerWidth / 25,
        fillFunc: () => `hsla(0, 0%, 100%, ${Math.random() * 0.1})`,
        angleFunc: () => Math.random() * Math.PI * 2,
        velocityFunc: () => 0.1 + Math.random() * 0.5,
        gradientFunc: gradientFunc,
        animate: c.animate !== false,
        ctx: cv.getContext("2d"),
    }, c);
    mergedConfig.gradient = mergedConfig.gradientFunc(mergedConfig.ctx);
    mergedConfig.padding = mergedConfig.shadowBlur * 2 + 2;
    return mergedConfig;
}

const gradientFunc = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    gradient.addColorStop(0, "#2AE");
    gradient.addColorStop(1, "#17B");
    return gradient;
}
