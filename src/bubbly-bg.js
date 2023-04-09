window.bubbly = function (userConfig = {}) {
    // we need to create a canvas element if the user didn't provide one
    const cv = userConfig.canvas ?? (() => {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        return canvas;
    })();
    const ctx = cv.getContext("2d");
    // we destructure the config object (with default values as fallback)
    const {compose, bubbles, background, animate} = {
        compose: userConfig.compose ?? "lighter",
        bubbles: Object.assign({ // default values
            count: Math.floor((cv.width + cv.height) * 0.02),
            radius: () => 4 + Math.random() * window.innerWidth / 25,
            fill: () => `hsla(0, 0%, 100%, ${Math.random() * 0.1})`,
            angle: () => Math.random() * Math.PI * 2,
            velocity: () => 0.1 + Math.random() * 0.5,
            shadow: () => null, // ({blur: 4, color: "#fff"})
            stroke: () => null, // ({width: 2, color: "#fff"})
        }, userConfig.bubbles ?? {}),
        background: userConfig.background ?? (() => "#2AE"),
        animate: userConfig.animate !== false,
    }
    // this function contains a lot of references to its parent scope,
    // so it must be defined after the config is created
    bubbles.objectCreator = userConfig.bubbles?.objectCreator ?? (() => ({
        r: bubbles.radius(),
        f: bubbles.fill(),
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        a: bubbles.angle(),
        v: bubbles.velocity(),
        sh: bubbles.shadow(),
        st: bubbles.stroke(),
        draw: (ctx, bubble) => {
            if (bubble.sh) {
                ctx.shadowColor = bubble.sh.color;
                ctx.shadowBlur = bubble.sh.blur;
            }
            ctx.fillStyle = bubble.f;
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
            ctx.fill();
            if (bubble.st) {
                ctx.strokeStyle = bubble.st.color;
                ctx.lineWidth = bubble.st.width;
                ctx.stroke();
            }
        }
    }));
    let bubbleArray = Array.from({length: bubbles.count}, bubbles.objectCreator);
    requestAnimationFrame(draw);
    function draw() {
        if (cv.parentNode === null) {
            bubbleArray = [];
            return cancelAnimationFrame(draw);
        }
        if (animate) {
            requestAnimationFrame(draw);
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = background(ctx);
        ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.globalCompositeOperation = compose;
        for (const bubble of bubbleArray) {
            bubble.draw(ctx, bubble);
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
        }
    }
};
