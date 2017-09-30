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
    blur: 3, // default is between 2 and 7
    bubbleFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`, // default is () => `hsla(0, 0%, 100%, ${r() * 0.1})`)
    bubbles: 100, // default is Math.floor((canvas.width + canvas.height) * 0.02);
    colorStart: "#4c004c", // default is blue-ish
    colorStop: "#1a001a",// default is blue-ish
    compose: "lighter", // default is "lighter"
    shadowColor: "#0ff", // default is #fff
});
```
