// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const SIZES_0 = [[0, 0, 406, 351], [303, 0, 341, 353], [0, 351 - 13, 333, 310], [235, 353 - 90, 409, 371], [0, 857 - 362, 399, 362], [644 - 342, 857 - 369, 342, 369]];//01图片尺寸 23图片起始点坐标
const TYPES = [[2, 3], [4, 6], [6, 8]];
const BG_WIDTH = 644;
const BG_HEIGHT = 857;


cc.Class({
    extends: cc.Component,

    properties: {
        item_node:cc.Node
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
        const self=this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            console.log("touch start")
            // this.opacity = 200;
            let delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
            console.log("position",this.x,this.y)
            self.node.zIndex=5
        }, this.node);
        
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.opacity = 255;
            self.node.zIndex=1
        }, this.node);
    },

    start () {

    },

    claPosition(index,item){
        const x=item[2]/2-BG_WIDTH/2+item[0];
        let y;
        if(index===0||index===1){
            y=BG_HEIGHT/2-item[3]/2
        }else if(index===4||index===5){
            y=-BG_HEIGHT/2+item[3]/2
        }else{
            y=0
        }
        return [x,y]
    },

    // update (dt) {},
});
