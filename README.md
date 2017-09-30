## bubbly-bg

Beautiful bubbly backgrounds in less than 1kb (699 bytes gzipped). 

### Usage
Add bubbly to your webpage and call `bubbly()`: 
```html
<body>
  ...
  <script src="https://cdn.jsdelivr.net/npm/bubbly-bg/dist/bubbly-bg.js"></script>
  <script>bubbly();</script>
</body>
```

Bubbly creates a `canvas` element and appends it to the `body`. This element has `position: fixed` and `z-index: -1`, and always fills the width/height of the viewport, which should make it plug and play for most projects.

### Live demo:
https://tipsy.github.io/bubbly-bg

### Gif demo:
![Bubbly animated](https://tipsy.github.io/bubbly-bg/bubbly.gif)

### PNG demo:
![Bubbly examples](https://tipsy.github.io/bubbly-bg/bubbly.png)

### Installation
* cdn: https://cdn.jsdelivr.net/npm/bubbly-bg/dist/bubbly-bg.js
* node: `npm install bubbly-bg`
* download: https://raw.githubusercontent.com/tipsy/bubbly-bg/master/dist/bubbly-bg.js

### Configuration / Docs / Options

```javascript
bubbly({
    animate: false, // default is true
    blur: 3, // default is between 2 and 7
    bubbleFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`, // default is () => `hsla(0, 0%, 100%, ${r() * 0.1})`)
    bubbles: 100, // default is Math.floor((canvas.width + canvas.height) * 0.02);
    colorStart: "#4c004c", // default is blue-ish
    colorStop: "#1a001a",// default is blue-ish
    compose: "lighter", // default is "lighter"
    shadowColor: "#0ff", // default is #fff
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
    colorStart: "#111",
    colorStop: "#422",
    bubbleFunc: () => `hsla(0, 100%, 50%, ${Math.random() * 0.25})`
});
```

#### Purple with colored bubbles
```javascript
bubbly({
    colorStart: "#4c004c",
    colorStop: "#1a001a",
    bubbleFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`
});
```

#### Yellow/pink with red/orange/yellow bubbles
```javascript
bubbly({
    colorStart: "#fff4e6",
    colorStop: "#ffe9e4",
    blur: 1,
    compose: "source-over",
    bubbleFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`
});
```
