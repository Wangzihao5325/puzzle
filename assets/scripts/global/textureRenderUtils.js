cc.Class({
  extends: cc.Component,

  initTextRender() {
    this.camera = cc.find('Canvas/Camera').getComponent(cc.Camera);
    this._canvas = null
    let texture = new cc.RenderTexture();
    texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc.gfx.RB_FMT_S8);
    this.camera.targetTexture = texture;
    this.texture = texture;
  },
  // create the img element
  createImg() {
    // return the type and dataUrl
    const dataURL = this._canvas.toDataURL("image/png");
    const img = document.createElement("img");
    img.src = dataURL;
    return img;
  },
  // create the canvas and context, filpY the image Data
  createCanvas() {
    var width = this.texture.width;
    var height = this.texture.height;
    if (!this._canvas) {
      this._canvas = document.createElement('canvas');

      this._canvas.width = width;
      this._canvas.height = height;
    } else {
      this.clearCanvas();
    }
    cc.Canvas.instance.node.scaleY = -1;
    var ctx = this._canvas.getContext('2d');
    this.camera.render();
    cc.Canvas.instance.node.scaleY = 1;

    var data = this.texture.readPixels();
    var imageData = ctx.createImageData(width, height);
    var tmpData = new Uint8ClampedArray(data.buffer);
    imageData.data.set(tmpData);

    ctx.putImageData(imageData, 0, 0);
    return this._canvas;
  },

  // show on the canvas
  showImage(img) {
    let texture = new cc.Texture2D();
    texture.initWithElement(img);

    let spriteFrame = new cc.SpriteFrame();
    spriteFrame.setTexture(texture);

    let node = new cc.Node();
    let sprite = node.addComponent(cc.Sprite);
    sprite.spriteFrame = spriteFrame;

    node.zIndex = cc.macro.MAX_ZINDEX;
    node.parent = cc.director.getScene();
    // set position
    let width = cc.winSize.width;
    let height = cc.winSize.height;
    node.x = width / 2;
    node.y = height / 2;
    node.on(cc.Node.EventType.TOUCH_START, () => {
      node.parent = null;
      node.destroy();
    });

    this.captureAction(node, width, height);
  },
  // sprite action
  captureAction(capture, width, height) {
    let scaleAction = cc.scaleTo(1, 0.3);
    let targetPos = cc.v2(width - width / 6, height / 4);
    let moveAction = cc.moveTo(1, targetPos);
    let spawn = cc.spawn(scaleAction, moveAction);
    capture.runAction(spawn);
    let blinkAction = cc.blink(0.1, 1);
    // scene action
    this.node.runAction(blinkAction);
  },

  clearCanvas() {
    let ctx = this._canvas.getContext('2d');
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }
});
