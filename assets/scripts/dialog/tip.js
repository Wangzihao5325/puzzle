// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        warp:cc.Node,
        show:{
            type:Boolean,
            default:false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const x=this.warp.x;
        const y=this.warp.y;
        this.warp.setPosition(x,y+60)
        this.warp.opacity=0
        cc.tween(this.warp)
        .to(0.2, { position: cc.v2(x, y), opacity: 255})
        .call(()=>{
            cc.tween(this.warp)
            .to(1, { position: cc.v2(x, y+8)})
            .to(1, { position: cc.v2(x, y-8)})
            .union()
            .repeatForever()
            .start()
        })
        .start()
        this.show=true

        this.timer= setTimeout(()=>{
            cc.tween(this.warp)
            .to(1, { opacity: 0})
            .call(()=>{
                this.warp.destroy()
            })
            .start()
        },5000)


    },

    start () {

    },

    // update (dt) {},
});
