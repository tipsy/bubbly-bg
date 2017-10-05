'use strict';

function bubbly() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var r = function r() {
        return Math.random();
    };

    var canvas = config.canvas || document.createElement("canvas");
    var width = canvas.width;
    var height = canvas.height;

    if (canvas.parentNode === null) {
        canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
    }

    var context = canvas.getContext("2d");
    context.shadowColor = config.shadowColor || "#fff";
    context.shadowBlur = config.blur || 4;

    var gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, config.colorStart || "#2AE");
    gradient.addColorStop(1, config.colorStop || "#17B");

    var nrBubbles = config.bubbles || Math.floor((width + height) * 0.02);
    var bubbles = [];

    for (var i = 0; i < nrBubbles; i++) {
        bubbles.push({
            f: (config.bubbleFunc || function () {
                return "hsla(0, 0%, 100%, " + r() * 0.1 + ")";
            }).call(), // fillStyle
            x: r() * width, // x-position
            y: r() * height, // y-position
            r: 4 + r() * width / 25, // radius
            a: r() * Math.PI * 2, // angle
            v: 0.1 + r() * 0.5 // velocity
        });
    }

    (function draw() {
        if (canvas.parentNode === null) {
            return cancelAnimationFrame(draw);
        }
        if (config.animate !== false) {
            requestAnimationFrame(draw);
        }

        context.globalCompositeOperation = "source-over";
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = config.compose || "lighter";

        bubbles.forEach(function (bubble) {
            context.beginPath();
            context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
            context.fillStyle = bubble.f;
            context.fill();
            // update positions for next draw
            bubble.x += Math.cos(bubble.a) * bubble.v;
            bubble.y += Math.sin(bubble.a) * bubble.v;
            if (bubble.x - bubble.r > width) {
                bubble.x = -bubble.r;
            }
            if (bubble.x + bubble.r < 0) {
                bubble.x = width + bubble.r;
            }
            if (bubble.y - bubble.r > height) {
                bubble.y = -bubble.r;
            }
            if (bubble.y + bubble.r < 0) {
                bubble.y = height + bubble.r;
            }
        });
    })();
}

module.exports = bubbly;
