cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        excal: cc.Node
    },

    animate() {
        cc.tween(this.bg)
            .to(0.4, { angle: -10 })
            .to(0.4, { angle: 0 })
            .to(0.4, { angle: 10 })
            .to(0.4, { angle: 0 })
            .union()
            .repeatForever()
            .start();
        cc.tween(this.excal)
            .to(0.1, { position: cc.v2(this.excal.x, this.excal.y + 5) })
            .to(0.1, { position: cc.v2(this.excal.x, this.excal.y - 5) })
            .to(0.1, { position: cc.v2(this.excal.x, this.excal.y + 5) })
            .to(0.1, { position: cc.v2(this.excal.x, this.excal.y - 5) })
            .delay(1)
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
