// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import alert from '../../component/Alert'

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

    onLoad () {
        this.coco.node.on(cc.Node.EventType.TOUCH_START, function (event) {

            console.log("TOUCH_START this.coco", event.type);
            alert.show.call(this, "确认退出游戏？", "取消", "确认", function (type) {
                if (type == "取消") {
                    console.log("取消");
                }
                if (type == "确认") {
                    console.log("确认");
                }
            });
            });
            
             
            
            this.coco.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            
            console.log("TOUCH_MOVE this.coco", event.type);
            
            });
            
             
            
            this.coco.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            
            console.log("TOUCH_END this.coco", event.type);
            
            });
    },
    // console.log('--this.coco--', this.coco)



    start () {

    },

    // update (dt) {},
});
