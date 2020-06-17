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

    circleAnimate() {
        this.handPartNode.active = false;
        this.handBgNode.scaleX = 0.2;
        this.handBgNode.scaleY = 0.2;
        cc.tween(this.handBgNode)
            .to(0.4, { scale: 0.8 })
            .to(0.1, { scale: 1, opacity: 0 })
            .to(0.05, { scale: 0.2 })
            //.to(0.1, { scale: 0.5 })
            .delay(0.5)
            .call(() => {
                this.handBgNode.opacity = 255;
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
