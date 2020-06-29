// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// import { CHACH  } from '../global/usual_cache';


cc.Class({
    extends: cc.Component,

    properties: {
        awardWarp:cc.Node,
        awardContent: cc.Node,
        goodsWarp: cc.Node,
        goodsContent:cc.Node,
        adButon:cc.Node,
        close:cc.Node,
        noAdButton:cc.Node,
        awardGoodsItem:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.setAnimation()
    },

    start() {
        this.setTouch()
    },

    closeDia(){
        cc.tween(this.awardContent)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.awardWarp.destroy()
        })
        .start()
    },

    setAnimation() {

        //弹窗动画
        this.awardContent.setScale(.2)
        cc.tween(this.awardContent)
            .to(.4, { scale:1.2 } )
            .to(.2, { scale:1.0})
            .start()

    },

    init(list, callBack,data) {
        this.callBackData=data
        this.callBack=callBack
        if(list.length){
            list.map(item=>{
                let newNode = cc.instantiate(this.awardGoodsItem)
                let obj = newNode.getComponent('awardGoodsItem')
                obj.init(item)
                newNode.parent = this.goodsContent
            })
        }



    },



    setTouch() {

        this.adButon.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            cc.tween(this.adButon)
                .to(.1,{scale:.8})
                .to(0.1,{scale:1})
                .start()
            this.handleAd()
            event.stopPropagation();
        })
        this.close.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.closeDia()
            event.stopPropagation();
        })
        this.noAdButton.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleNoAd()
            event.stopPropagation();
        })
    },

    handleNoAd(){
        this.callBack(false,this.callBackData)
        this.closeDia()

    },
    handleAd(){
        //播放广告
        Toast.show('广告暂未开放')
    },


    // update (dt) {},
});
