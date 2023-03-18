class FrameCounter {
    constructor() {
        this.frameCount = 0;
        this.fps = 0;
        this.lastTime = Date.now();
    }

    update() {
        this.frameCount++;
        const now = Date.now();
        const deltaTime = now - this.lastTime;
        if (deltaTime >= 1000) {
            this.fps = Math.round(this.frameCount * 1000 / deltaTime);
            this.frameCount = 0;
            this.lastTime = now;
            console.log(`FPS: ${this.fps}`);
        }
    }
}
