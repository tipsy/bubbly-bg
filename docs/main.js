function configToText(config) {
    let configText = "bubbly({\n";
    for (const [key, value] of Object.entries(config)) {
        const stringValue = typeof value === "string" ? `'${value}'` : value;
        configText += `  ${key}: ${stringValue},\n`;
    }
    configText += "});";
    return configText;
}
