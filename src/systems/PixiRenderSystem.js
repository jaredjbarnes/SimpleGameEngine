export default class PixiRenderSystem {
  constructor(pixiApp) {
    this.name = "pixi-render-system";
    this.pixiApp = pixiApp;
  }

  update(time) {}

  activated(world) {}

  deactivated(world) {}

  entityAdded(entity) {}

  entityRemoved(entity) {}

  componentAdded(entity, component) {}

  componentRemove(entity, component) {}
}
