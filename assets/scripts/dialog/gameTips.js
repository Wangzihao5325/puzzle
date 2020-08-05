// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        warp:cc.Node,
        modal:cc.Node,
        close:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:
 
    // onLoad () {},

    start () {
        this.setTouch()
        this.init()
    },
    init(type){

        this.warp.setScale(0.2)
        cc.tween(this.warp)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()
    },


    

    closeDia(){
        cc.tween(this.warp)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.modal.destroy()
        })
        .start()
    },

    setTouch() {


        this.close.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.closeDia()
            event.stopPropagation();
        })
    }
    // update (dt) {},
});
