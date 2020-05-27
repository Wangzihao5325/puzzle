// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


cc.Class({
    extends: cc.Component,

    properties: {
        coco: cc.Sprite  //是个精灵。
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.coco.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            Toast.show("难道还有这种操作？", 2000);
        });
        this.coco.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

        });
        this.coco.node.on(cc.Node.EventType.TOUCH_END, function (event) {

        });
    },

    start() {

    },

    // update (dt) {},
});
