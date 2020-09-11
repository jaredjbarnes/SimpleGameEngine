import "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js";

const PIXI_SPRITE_REGISTRY = "pixi-sprite-registry";

export default class PixiSpriteRegistrySystem {
  constructor() {}

  entityAdded(entity) {
    if (entity.hasComponent(PIXI_SPRITE_REGISTRY)) {
      this.componentAdded(entity, entity.getComponent(PIXI_SPRITE_REGISTRY));
    }
  }

  componentAdded(entity, component) {
    if (entity.hasComponent(PIXI_SPRITE_REGISTRY)) {
      PIXI.loader.add(component.images);
    }
  }
}
