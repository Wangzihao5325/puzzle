cc.Class({
    extends: cc.Component,

    properties: {
        handPart: cc.Sprite,
        handBg: cc.Sprite,
        handPartNode: cc.Node,
        handBgNode: cc.Node,
        arrow: cc.Node
    },

    handAnimate() {
        cc.tween(this.handPartNode)
            .call(() => {
                cc.tween(this.handBgNode)
                    .call(() => {
                        this.handBgNode.scaleX = 0.5;
                        this.handBgNode.scaleY = 0.5;
                        this.handBgNode.active = true;
                    })
                    .to(0.5, { scale: 1 })
                    .call(() => {
                        this.handBgNode.active = false;
                    })
                    .start();
            })
            .to(1, { position: cc.v2(294, 519) })
            .call(() => {
                this.handPartNode.x = 0;
                this.handPartNode.y = 0;
            })
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
