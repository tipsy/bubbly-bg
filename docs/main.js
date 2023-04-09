function configToText(config) {
    return `
bubbly({
    canvas: ${config.cv},
    compose: ${config.compose ? `"${config.compose}"` : undefined},
    bubbles: {
        count: ${config.bubbles?.count},
        radius: ${config.bubbles?.radius},
        fill: ${config.bubbles?.fill},
        angle: ${config.bubbles?.angle},
        velocity: ${config.bubbles?.velocity},
        shadow: ${config.bubbles?.shadow},
        stroke: ${config.bubbles?.stroke},
        objectCreator: ${formatFunction(config.bubbles?.objectCreator, 12)},
    },
    background: ${formatFunction(config.background, 8)},
    animate: ${config.animate},
});`.trim()
        .split('\n')
        .filter(line => !line.includes(': undefined,')) // remove undefined values
        .join('\n');
}

function formatFunction(func, targetIndent) {
    if (!func) return undefined
    if (func.toString().split("\n").length === 1) return func.toString();
    const lines = func.toString().split("\n");
    const indentOfFirstLine = lines[1].match(/^\s*/)[0].length;
    if (indentOfFirstLine === targetIndent) {
        return func.toString
    } else if (indentOfFirstLine < targetIndent) {
        const indent = targetIndent - indentOfFirstLine;
        return lines.map((line, i) => i === 0 ? line : " ".repeat(indent) + line).join('\n');
    } else if (indentOfFirstLine > targetIndent) {
        const indent = indentOfFirstLine - targetIndent;
        return lines.map(line => line.replace(" ".repeat(indent), "")).join('\n');
    }
}
