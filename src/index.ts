import * as PIXI from 'pixi.js';
import {Application} from 'pixi.js';
import {Game} from './game/Game';
import {gsap} from 'gsap';
import {PixiPlugin} from 'gsap/PixiPlugin';

/**
 * Game width in pixels
 * @type {number}
 */
const GAME_WIDTH = 400;
/**
 * Game height in pixels
 * @type {number}
 */
const GAME_HEIGHT = 600;

/**
 * We need to register plugin for GSAP, that will help us to tween several properties in pixi-objects.
 * And it requires to have PIXI namespace in the global scope.
 */
function prepareEnvironment() {
  window.PIXI = PIXI;
  gsap.registerPlugin(PixiPlugin);
}

/**
 * Simplistic version of initialization of Pixi.JS Application with specified application dimensions.
 */
function initApp(): Application {
  return new Application({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  });
}

/**
 * Initialization of the game itself.
 */
function initGame() {
  const app = initApp();
  new Game(app)
    .initialize()
    .catch((e) => {
      console.log('Game initialization failed', e);
    });
}

/**
 * Entry point of the application
 */
function init(): void {
  prepareEnvironment();
  initGame();
}

init();
