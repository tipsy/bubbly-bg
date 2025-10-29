/**
 * Configuration options for bubbly-bg
 */
export interface BubblyConfig {
  /**
   * Canvas element to use. If not provided, a new canvas will be created and appended to the body.
   */
  canvas?: HTMLCanvasElement;

  /**
   * Global composite operation for drawing bubbles.
   * @default "lighter"
   */
  compose?: GlobalCompositeOperation;

  /**
   * Whether to animate the bubbles.
   * @default true
   */
  animate?: boolean;

  /**
   * Background color or gradient function.
   * @default (ctx) => "#2AE"
   */
  background?: string | ((ctx: CanvasRenderingContext2D) => string | CanvasGradient);

  /**
   * Bubble configuration options.
   */
  bubbles?: {
    /**
     * Number of bubbles to create.
     * @default Math.floor((canvas.width + canvas.height) * 0.02)
     */
    count?: number;

    /**
     * Function that returns the radius of a bubble.
     * @default () => 4 + Math.random() * window.innerWidth / 25
     */
    radius?: () => number;

    /**
     * Function that returns the fill color of a bubble.
     * @default () => `hsla(0, 0%, 100%, ${Math.random() * 0.1})`
     */
    fill?: () => string;

    /**
     * Function that returns the angle of a bubble's movement.
     * @default () => Math.random() * Math.PI * 2
     */
    angle?: () => number;

    /**
     * Function that returns the velocity of a bubble.
     * @default () => 0.1 + Math.random() * 0.5
     */
    velocity?: () => number;

    /**
     * Function that returns shadow configuration for a bubble.
     * @default () => null
     */
    shadow?: () => { blur: number; color: string } | null;

    /**
     * Function that returns stroke configuration for a bubble.
     * @default () => null
     */
    stroke?: () => { width: number; color: string } | null;

    /**
     * Advanced: Custom bubble object creator function.
     * Allows complete control over bubble creation and rendering.
     */
    objectCreator?: () => BubbleObject;
  };
}

/**
 * Bubble object interface for custom bubble creators
 */
export interface BubbleObject {
  /** Radius or size of the bubble */
  r: number;
  /** Fill color */
  f?: string;
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Angle of movement */
  a: number;
  /** Velocity */
  v: number;
  /** Shadow configuration */
  sh?: { blur: number; color: string } | null;
  /** Stroke configuration */
  st?: { width: number; color: string } | null;
  /** Custom draw function */
  draw: (ctx: CanvasRenderingContext2D, bubble: BubbleObject) => void;
  /** Any additional custom properties */
  [key: string]: any;
}

/**
 * Creates a bubbly background animation
 * @param config - Configuration options
 */
export function bubbly(config?: BubblyConfig): void;

declare global {
  interface Window {
    bubbly: typeof bubbly;
  }
}

