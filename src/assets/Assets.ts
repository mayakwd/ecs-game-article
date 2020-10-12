import {Loader, LoaderResource, Texture} from 'pixi.js';

/**
 * Assets gives you an opportunity to load images and atlases.
 * As an optional generic parameter you can pass type with defined fields, that corresponds with preferred assets names.
 * Type is optional and affects only typing.
 *
 * For example, if you'll define assets list type like:
 * ```typescript
 * type AssetsList = {
 *   common: "Common assets atlas",
 *   hero: "Hero image"
 * }
 *
 * const assets = new Assets<AssetsList>();
 * ```
 *
 * And pass it as generic parameter, then you will be able to see in possible values "common" and "hero" in your IDE:
 * ```typescript
 * assets.add(<completion hot-key will give you here options: "common" and "hero">
 * ```
 *
*/
export class Assets<R = any, T extends keyof R = keyof R> {
  private _loaded: boolean = false;
  private _started: boolean = false;

  private loader: Loader;
  private resources?: Partial<Record<T | string, PIXI.LoaderResource>>;

  public constructor() {
    this.loader = new Loader();
  }

  /**
   * Indicates whether loading is started
   * @returns {boolean}
   */
  public get started(): boolean {
    return this._started;
  }

  /**
   * Indicates whether assets queue is loaded
   * @returns {boolean}
   */
  public get loaded(): boolean {
    return this._loaded;
  }

  /**
   * Adds asset in the loading queue.
   * If you want to load texture atlas, then put as url parameter link to '.json' of the atlas, image will be loaded
   * automatically.
   *
   * @param {string} name Name of the asset.
   * @param {string} url Url of the asset
   * @returns {this}
   */
  public add(name: T | string, url: string): this {
    this.loader.add(name, url);
    return this;
  }

  /**
   * Loads assets added to the loading queue
   *
   * @returns {Promise<void>}
   */
  public async load(): Promise<void> {
    return new Promise((resolve) => {
      this.loader.load((loader, resources) => {
        this.resources = resources as Partial<Record<T | string, LoaderResource>>;
        this._loaded = true;
        resolve();
      });
    });
  }

  /**
   * Searches texture with name textureName in the loaded resources and if it's found returns it,
   * otherwise returns undefined.
   *
   * If texture is defined in the atlas, then you need to specify atlasName.
   *
   * @param {string} textureName Name of the texture to search
   * @param {string?} atlasName (Optional) Name of the atlas
   * @returns {PIXI.Texture | undefined}
   */
  public getTexture(textureName: string, atlasName?: T | string): Texture | undefined {
    if (atlasName !== undefined) {
      return this.resources?.[atlasName]?.textures?.[textureName];
    }
    return this.resources?.[textureName]?.texture;
  }
}
