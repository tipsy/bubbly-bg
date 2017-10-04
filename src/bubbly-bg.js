window.bubbly = function (options) {
  const config = options || {};

  if (typeof config.canvas === 'string') {
    config.canvas = document.createElement("canvas");
  } else if (!config.canvas || !config.canvas.nodeName.toLowerCase() === 'canvas') {
    config.canvas = document.createElement("canvas");
    config.canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
  }

  let parent = document.querySelector(options.parent) || document.body
  const width = config.canvas.width = parent.offsetWidth
  const height = config.canvas.height = parent.offsetHeight
  const context = config.canvas.getContext("2d");
  const gradient = config.context.createLinearGradient(0, 0, width, height);
  const nrBubbles = config.bubbles || Math.floor((width + height) * 0.02);
  const bubbles = [];
  const r = () => Math.random();

  parent.appendChild(config.canvas)
  context.shadowColor = config.shadowColor || "#fff";
  context.shadowBlur = config.blur || 4;

  gradient.addColorStop(0, config.colorStart || "#25A6E1");
  gradient.addColorStop(1, config.colorStop || "#176EB5");

  for (let i = 0; i < nrBubbles; i++) {
    bubbles.push({
      f: (config.bubbleFunc || (() => `hsla(0, 0%, 100%, ${r() * 0.1})`)).call(), // fillStyle
      x: r() * width, // x-position
      y: r() * height, // y-position
      r: 4 + (r() * width / 25), // radius
      a: r() * Math.PI * 2, // angle
      v: 0.1 + r() * 0.5 // velocity
    });
  }

  (function draw() {
    if (config.animate !== false) {
      requestAnimationFrame(draw);
    }

    context.globalCompositeOperation = "source-over";
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = config.compose || "lighter";

    bubbles.forEach(bubble => {
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
};
