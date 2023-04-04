## bubbly-bg

Beautiful bubbly backgrounds in less than 1kB (750 bytes gzipped).

### Usage
Add bubbly to your webpage and call `bubbly()`: 
```html
<body>
  ...
  <script src="https://cdn.jsdelivr.net/npm/bubbly-bg@1.0.0/dist/bubbly-bg.js"></script>
  <script>bubbly();</script>
</body>
```

Bubbly creates a `canvas` element and appends it to the `body`. 
This element has `position: fixed` and `z-index: -1`, and always fills the
width/height of the viewport, which should make it plug and play for most projects.

You can also use bubbly with a canvas you create yourself,
by including `{canvas: yourCanvas}` in the configuration.

# Live demo: https://tipsy.github.io/bubbly-bg

## Config generator: https://tipsy.github.io/bubbly-bg/generator    

### Gif demo:
![Bubbly animated](https://tipsy.github.io/bubbly-bg/bubbly.gif)

### PNG demo:
![Bubbly examples](https://tipsy.github.io/bubbly-bg/bubbly.png)

### Installation
* cdn: https://cdn.jsdelivr.net/npm/bubbly-bg@1.0.0/dist/bubbly-bg.js
* node: `npm install bubbly-bg`
* download: https://raw.githubusercontent.com/tipsy/bubbly-bg/master/dist/bubbly-bg.js

### Configuration / Docs / Options

```javascript
bubbly({
    canvas: document.querySelector("#background"), // default is created and attached automatically
    compose: "lighter", // default is "lighter"
    animate: false, // default is true
    bubbles: Math.random() * 100, // default is Math.floor((canvas.width + canvas.height) * 0.02);
    shadowColor: "#0ff", // default is #fff
    shadowBlur: 1, // default is 4
    fillFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`, // default is () => `hsla(0, 0%, 100%, ${r() * 0.1})`)
    angleFunc: () => Math.random() * Math.PI * 2, // default is this
    velocityFunc: () => 0.1 + Math.random() * 0.5, // default is this
    radiusFunc: () => 4 + Math.random() * 25 // default is 4 + Math.random() * width / 25
});
```

### Config from examples

#### Blue with white bubbles
```javascript
bubbly();
```

#### Black/red with red bubbles
```javascript
bubbly({
    gradientStart: "#111",
    gradientStop: "#422",
    fillFunc: () => `hsla(0, 100%, 50%, ${Math.random() * 0.25})`
});
```

#### Purple with multicolored bubbles
```javascript
bubbly({
    gradientStart: "#4c004c",
    gradientStop: "#1a001a",
    fillFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`
});
```

#### Yellow/pink with red/orange/yellow bubbles
```javascript
bubbly({
    gradientStart: "#fff4e6",
    gradientStop: "#ffe9e4",
    shadowBlur: 1,
    compose: "source-over",
    fillFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`
});
```
