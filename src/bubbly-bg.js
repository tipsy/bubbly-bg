window.bubbly = function (c = {}) {
    c = generateConfig(c);
    let bubbles = Array.from({length: c.bubbles.count}, c.bubbles.objectCreator);
    requestAnimationFrame(draw);
    function draw() {
        if (c.cv.parentNode === null) {
            bubbles = [];
            return cancelAnimationFrame(draw);
        }
        if (c.animate) {
            requestAnimationFrame(draw);
        }
        c.ctx.globalCompositeOperation = "source-over";
        c.ctx.fillStyle = c.background(c.ctx);
        c.ctx.fillRect(0, 0, c.cv.width, c.cv.height);
        c.ctx.globalCompositeOperation = c.compose;
        bubbles.forEach(bubble => {
            bubble.draw(c.ctx, bubble);
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

function generateConfig(c) {
    let cv = c.canvas || (() => {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        return canvas;
    })();

    const cfg = {
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
    // we need to do this after because you can't reference an object before it's defined
    cfg.bubbles.objectCreator = c.bubbles?.objectCreator ?? (() => ({
        r: cfg.bubbles.radius(),
        f: cfg.bubbles.fill(),
        x: Math.random() * cfg.cv.width,
        y: Math.random() * cfg.cv.height,
        a: cfg.bubbles.angle(),
        v: cfg.bubbles.velocity(),
        sh: cfg.bubbles.shadow(),
        st: cfg.bubbles.stroke(),
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
    return cfg;
}
