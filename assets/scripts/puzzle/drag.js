// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
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

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            console.log("touch start")
            // this.opacity = 200;
            let delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
            console.log("position",this.x,this.y)
            this.zIndex=5000
        }, this.node);
        
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.opacity = 255;
        }, this.node);
    },

    start () {

    },

    // update (dt) {},
});
