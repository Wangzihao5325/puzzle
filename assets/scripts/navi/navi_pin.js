cc.Class({
    extends: cc.Component,

    properties: {
        shadow: cc.Sprite,
        pin: cc.Sprite
    },

    animatStart() {
        cc.tween(this.shadow.node)
            .to(0.1, { position: cc.v2(20, 20) })
            .to(0.1, { position: cc.v2(0, 0) })
            .to(0.1, { position: cc.v2(20, 20) })
            .to(0.1, { position: cc.v2(0, 0) })
            .delay(2)
            .union()
            .repeatForever()
            .start();
        cc.tween(this.pin.node)
            .to(0.1, { position: cc.v2(0, 20) })
            .to(0.1, { position: cc.v2(0, 0) })
            .to(0.1, { position: cc.v2(0, 20) })
            .to(0.1, { position: cc.v2(0, 0) })
            .delay(2)
            .union()
            .repeatForever()
            .start();
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
