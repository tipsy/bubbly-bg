# bubbly-bg

Beautiful bubbly backgrounds in 699 bytes (gzipped).

![Bubbly examples](https://tipsy.github.io/bubbly-bg/bubbly.png)

## Usage
Add bubbly to your webpage and call `bubbly()`: 
```html
<body>
  ...
  <script src="bubbly-bg.js"></script>
  <script>bubbly();</script>
<body
```

## Implementation
Bubbly creates a `canvas` element and appends it to the `body`. This element has `position: fixed` and `z-index: -1`, and always fills the width/height of the viewport, which should make it plug and play for most projects.

## Configuration

```javascript
  bubbly({
    animate: true, // default is false
    blur: 1, // default is between 2 and 7
    bubbleFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)` // default is () => `hsla(0, 0%, 100%, ${r() * 0.1})`)
    bubbles: 100, // default is Math.floor((canvas.width + canvas.height) * 0.02);
    colorStart: "#fff4e6", // default is blue-ish
    colorStop: "#ffe9e4", // default is blue-ish
    compose: "source-over", // default is "lighter"
    shadowColor: "#0ff", // default is #fff
  });
```
