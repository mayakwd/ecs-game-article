import {Application, Container, Sprite} from 'pixi.js';
import {Assets} from '../assets/Assets';
import {AssetsList} from './AssetsList';

/**
 * Starting point for our game.
 * It is responsible only for initialization steps, such as configuring and loading dependencies.
 */
export class Game {
  /**
   * Assets loader and container
   * @type {Assets<AssetsList>}
   * @private
   */
  private readonly assets: Assets<AssetsList> = new Assets();
  /**
   * Main display list container for our board and elements
   * @type {PIXI.Container}
   * @private
   */
  private readonly container = new Container();

  public constructor(
    private readonly app: Application,
  ) {
    this.app.stage.addChild(this.container);
  }

  /**
   * Initializes game with several steps:
   * - Loads required assets
   * - Configures UI
   * - Adds an application to the DOM list
   * - Start the game itself (you should write this part :-)
   *
   * @returns {Promise<void | Error>}
   */
  public async initialize(): Promise<void | Error> {
    await this.loadAssets();
    this.configureUI();
    this.addToDOM();
  }

  public async loadAssets(): Promise<void> {
    this.assets.add('common', 'assets.json');
    await this.assets.load();
  }

  private addToDOM(): void {
    const root = document.getElementById('root') ?? document.body;
    root.appendChild(this.app.view);
  }

  /**
   * This is starting point for configuring the game UI.
   * For now it contains only code that shows you blue candy in the center of the screen.
   *
   * @private
   */
  private configureUI(): void {
    const screen = this.app.screen;
    const halfScreenWidth = screen.width * 0.5;
    const halfScreenHeight = screen.height * 0.5;
    const candy = this.createCandy(halfScreenWidth, halfScreenHeight);
    this.animateJumpingCandy(candy);
  }

  private createCandy(x: number, y: number): Sprite {
    const candy = new Sprite(this.assets.getTexture('candies/blue', 'common'));
    candy.anchor.set(0.5, 0.5);
    candy.position.set(x, y)
    return this.container.addChild(candy);
  }

  private animateJumpingCandy(candy: Sprite) {
    // TODO: Look at https://medium.com/@rdolivo/ecs-for-gamedev-with-typescript-5a1204f594bc to find out how to
    //  animate the candy with GSAP
  }
}
