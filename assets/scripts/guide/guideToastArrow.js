cc.Class({
    extends: cc.Component,

    properties: {
        arrowNode: cc.Node
    },

    animate() {
        cc.tween(this.arrowNode)
            .to(0.1, { position: cc.v2(10, 0) })
            .to(0.1, { position: cc.v2(0, 0) })
            .to(0.1, { position: cc.v2(10, 0) })
            .to(0.1, { position: cc.v2(0, 0) })
            .delay(1)
            .union()
            .repeatForever()
            .start()
    },

    start() {

    },

});
