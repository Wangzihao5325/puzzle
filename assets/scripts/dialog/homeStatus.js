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
        energeAdd:cc.Node,
        luckyAdd:cc.Node,
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
        let newNode = cc.instantiate(prefabList[type])
        newNode.parent=this.headerWarp
    },

    //添加能量数字动画
    addAnimation(type,num){
        const currentnode=type===1?this.luckyAdd:this.energeAdd;
        const node=cc.instantiate(currentnode)
        node.parent=currentnode.parent
        node.getComponent(cc.Label).string=`+ ${num}`
        const positionX=node.x
        node.opacity=0
        node.setPosition(cc.v2(positionX,-30))
        cc.tween(node)
        .to(.2,{position:cc.v2(positionX,0),opacity:255})
        .to(.8,{position:cc.v2(positionX,60),opacity:0})
        .call(()=>{
            node.setPosition(cc.v2(positionX,0))
            node.destroy()
        })
        .start()

    },

    start () {
        console.log("CACHE.platform.isIphoneX",CACHE.platform.isIphoneX)
        if(CACHE.platform.isIphoneX){
            this.headerWarp.height=140
        }

        this.energeItem.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            
            this.showTip(0)
            event.stopPropagation();
        })
        this.luckyItem.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            
            this.showTip(1)
            event.stopPropagation();
        })

    },

    // update (dt) {},
});
