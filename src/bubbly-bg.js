window.bubbly = function (config) {
    let c = config || {};
    let rand = () => Math.random();
    const canvas = document.createElement("canvas");
    canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, c.colorStart || "#25A6E1");
    gradient.addColorStop(1, c.colorStop || "#176EB5");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height); // gradient bg
    context.globalCompositeOperation = c.compose || "lighter"; // add/blend color values
    context.shadowColor = "#fff";
    let nrBubbles = c.bubbles || Math.floor((canvas.width + canvas.height) * 0.02);
    context.shadowBlur = c.blur || (2 + rand() * 5);
    for (let i = 0; i < nrBubbles; i++) {
        context.beginPath();
        context.arc(
            rand() * canvas.width, // x position
            rand() * canvas.height, // y position
            4 + (rand() * canvas.width / 25),
            0,
            Math.PI * 2
        );
        context.fillStyle = (c.bubbleFunc || (() => `hsla(0, 0%, 100%, ${rand() * 0.1})`)).call();
        context.fill();
    }
    document.body.appendChild(canvas);
};
