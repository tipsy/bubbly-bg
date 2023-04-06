window.bubbly = function (cfg = {}) {
    const cv = cfg.canvas || (() => {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        return canvas;
    })();
    const ctx = cv.getContext("2d");
    const c = { // create config by merging defaults with user config
        compose: cfg.compose ?? "lighter",
        bubbles: {
            count: cfg.bubbles?.count ?? Math.floor((cv.width + cv.height) * 0.02),
            radius: cfg.bubbles?.radius ?? (() => 4 + Math.random() * window.innerWidth / 25),
            fill: cfg.bubbles?.fill ?? (() => `hsla(0, 0%, 100%, ${Math.random() * 0.1})`),
            angle: cfg.bubbles?.angle ?? (() => Math.random() * Math.PI * 2),
            velocity: cfg.bubbles?.velocity ?? (() => 0.1 + Math.random() * 0.5),
            shadow: cfg.bubbles?.shadow ?? (() => null), // ({blur: 4, color: "#fff"})
            stroke: cfg.bubbles?.stroke ?? (() => null), // ({width: 2, color: "#fff"})
        },
        background: cfg.background ?? (() => "#2AE"),
        animate: cfg.animate !== false,
    }
    c.bubbles.objectCreator = cfg.bubbles?.objectCreator ?? (() => ({
        r: c.bubbles.radius(),
        f: c.bubbles.fill(),
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        a: c.bubbles.angle(),
        v: c.bubbles.velocity(),
        sh: c.bubbles.shadow(),
        st: c.bubbles.stroke(),
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
    let bubbles = Array.from({length: c.bubbles.count}, c.bubbles.objectCreator);
    requestAnimationFrame(draw);
    function draw() {
        if (cv.parentNode === null) {
            bubbles = [];
            return cancelAnimationFrame(draw);
        }
        if (c.animate) {
            requestAnimationFrame(draw);
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = c.background(ctx);
        ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.globalCompositeOperation = c.compose;
        bubbles.forEach(bubble => {
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
        });
    }
};
