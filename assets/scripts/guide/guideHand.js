cc.Class({
    extends: cc.Component,

    properties: {
        handPart: cc.Sprite,
        handBg: cc.Sprite,
        handPartNode: cc.Node,
        handBgNode: cc.Node
    },

    handAnimate() {
        cc.tween(this.handPartNode)
            .call(() => {
                this.handBgNode.active = false
            })
            .to(0.5, { angle: -20 })
            .to(0.5, { angle: 0 })
            .call(() => {
                this.handBgNode.scaleX = 0.5;
                this.handBgNode.scaleY = 0.5;
                this.handBgNode.active = true;
                cc.tween(this.handBgNode)
                    .to(0.5, { scale: 1 })
                    .start();
            })
            .delay(0.5)
            .union()
            .repeatForever()
            .start();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {

    },

    // update (dt) {},
});
