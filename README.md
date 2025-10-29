<div align="center">

# 🫧 bubbly-bg

**Beautiful bubbly backgrounds in less than 1kB gzipped**

[![npm version](https://img.shields.io/npm/v/bubbly-bg.svg)](https://www.npmjs.com/package/bubbly-bg)
[![jsDelivr downloads](https://data.jsdelivr.com/v1/package/npm/bubbly-bg/badge)](https://www.jsdelivr.com/package/npm/bubbly-bg)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/badge/gzipped-841%20bytes-brightgreen.svg)](dist/bubbly-bg.js)

[**Live Demo**](https://tipsy.github.io/bubbly-bg)

![Bubbly animated](https://tipsy.github.io/bubbly-bg/bubbly.gif)

</div>

---

## ✨ Features

- 🪶 **Lightweight** - Only 1.6kB minified, 841 bytes gzipped
- 🎨 **Customizable** - Full control over colors, gradients, and animations
- 🚀 **Zero dependencies** - Pure vanilla JavaScript
- 📦 **Easy to use** - Just include and call `bubbly()`
- 🎯 **TypeScript support** - Full type definitions included
- 🔧 **Flexible** - Works with your own canvas or creates one automatically

## 🚀 Quick Start

Add bubbly to your webpage and call `bubbly()`:

```html
<body>
  ...
  <script src="https://cdn.jsdelivr.net/npm/bubbly-bg@1.0.0/dist/bubbly-bg.js"></script>
  <script>bubbly();</script>
</body>
```

That's it! Bubbly creates a `canvas` element with `position: fixed` and `z-index: -1`, filling the viewport. It's plug-and-play for most projects.

### Custom Canvas

You can also use your own canvas element:

```javascript
bubbly({ canvas: document.querySelector("#my-canvas") });
```

## 📦 Installation

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/bubbly-bg@1.0.0/dist/bubbly-bg.js"></script>
```

### npm
```bash
npm install bubbly-bg
```

### Direct Download
[Download bubbly-bg.js](https://raw.githubusercontent.com/tipsy/bubbly-bg/master/dist/bubbly-bg.js)

## ⚙️ Configuration

### All Options

```javascript
bubbly({
    canvas: document.querySelector("#background"), // default is created and attached automatically
    compose: "lighter", // default is "lighter"
    animate: false, // default is true
    background: (ctx) => "#2AE", // default background, can be a color string or function returning gradient
    bubbles: {
        count: 100, // default is Math.floor((canvas.width + canvas.height) * 0.02)
        radius: () => 4 + Math.random() * 25, // default is () => 4 + Math.random() * window.innerWidth / 25
        fill: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`, // default is () => `hsla(0, 0%, 100%, ${Math.random() * 0.1})`
        angle: () => Math.random() * Math.PI * 2, // default is this
        velocity: () => 0.1 + Math.random() * 0.5, // default is this
        shadow: () => ({blur: 4, color: "#fff"}), // default is () => null
        stroke: () => ({width: 2, color: "#fff"}), // default is () => null
        objectCreator: () => ({...}) // advanced: custom bubble object creator
    }
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `canvas` | `HTMLCanvasElement` | auto-created | Canvas element to use |
| `compose` | `string` | `"lighter"` | Global composite operation |
| `animate` | `boolean` | `true` | Whether to animate bubbles |
| `background` | `string \| function` | `"#2AE"` | Background color or gradient function |
| `bubbles.count` | `number` | auto-calculated | Number of bubbles |
| `bubbles.radius` | `function` | auto-calculated | Function returning bubble radius |
| `bubbles.fill` | `function` | white with opacity | Function returning bubble fill color |
| `bubbles.angle` | `function` | random | Function returning movement angle |
| `bubbles.velocity` | `function` | random | Function returning velocity |
| `bubbles.shadow` | `function` | `null` | Function returning shadow config |
| `bubbles.stroke` | `function` | `null` | Function returning stroke config |
| `bubbles.objectCreator` | `function` | default creator | Advanced: custom bubble creator |

## 🎨 Examples

### Default (Blue with white bubbles)
```javascript
bubbly();
```

### Black/Red with red bubbles
```javascript
bubbly({
    background: (ctx) => {
        const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
        gradient.addColorStop(0, "#111");
        gradient.addColorStop(1, "#422");
        return gradient;
    },
    bubbles: {
        fill: () => `hsla(0, 100%, 50%, ${Math.random() * 0.25})`,
        shadow: () => ({blur: 4, color: "#fff"})
    }
});
```

### Purple with multicolored bubbles
```javascript
bubbly({
    background: (ctx) => {
        const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
        gradient.addColorStop(0, "#4c004c");
        gradient.addColorStop(1, "#1a001a");
        return gradient;
    },
    bubbles: {
        fill: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`,
        shadow: () => ({blur: 4, color: "#fff"})
    }
});
```

### Yellow/Pink with red/orange/yellow bubbles
```javascript
bubbly({
    background: (ctx) => {
        const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
        gradient.addColorStop(0, "#fff4e6");
        gradient.addColorStop(1, "#ffe9e4");
        return gradient;
    },
    compose: "source-over",
    bubbles: {
        fill: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`,
        shadow: () => ({blur: 1, color: "#fff"})
    }
});
```

## 🔧 Advanced Usage

### Custom Bubble Creator

For complete control over bubble creation and rendering:

```javascript
bubbly({
    bubbles: {
        objectCreator: function() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 10,
                a: Math.random() * Math.PI * 2,
                v: 1,
                draw: (ctx, bubble) => {
                    // Custom drawing logic
                    ctx.fillStyle = "red";
                    ctx.fillRect(bubble.x, bubble.y, bubble.r, bubble.r);
                }
            };
        }
    }
});
```

## 📝 TypeScript

Full TypeScript definitions are included:

```typescript
import { bubbly, BubblyConfig } from 'bubbly-bg';

const config: BubblyConfig = {
    animate: true,
    bubbles: {
        count: 50
    }
};

bubbly(config);
```

## 📄 License

Apache-2.0 © [David Åse](https://github.com/tipsy)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

<div align="center">

Made with ❤️ by [David Åse](https://github.com/tipsy)

</div>

