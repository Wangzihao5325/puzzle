// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import {CACHE} from '../global/usual_cache'

cc.Class({
    extends: cc.Component,

    properties: {
        headerWarp:cc.Node,
        energeItem:cc.Node,
        luckyItem:cc.Node,
        energeTip:cc.Prefab,
        luckyTip:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    showTip(type){
        console.log("this.headerWarp.children",this.headerWarp.children)
        if(this.headerWarp.children.length>2){
            const current =this.headerWarp.children[2]
            cc.tween(current)
            .to(.4, { opacity: 0})
            .call(()=>{
                current.destroy()
            })
            .start()
            return false
        }
        const prefabList=[this.energeTip,this.luckyTip]
        const parentsList=[this.energeItem,this.luckyItem]
        let newNode = cc.instantiate(prefabList[type])
        newNode.parent=this.headerWarp
    },

    start () {
        console.log("CACHE.platform.isIphoneX",CACHE.platform.isIphoneX)
        if(CACHE.platform.isIphoneX){
            this.headerWarp.height=140
        }

        this.energeItem.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.showTip(0)
            event.stopPropagation();
        })
        this.luckyItem.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.showTip(1)
            event.stopPropagation();
        })

    },

    // update (dt) {},
});
