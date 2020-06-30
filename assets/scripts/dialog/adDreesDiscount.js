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
        iconNode:cc.Node,
        icon:cc.Sprite,
        currencyIcon1:cc.Sprite,
        currencyIcon2:cc.Sprite,
        currencyIcon3:cc.Sprite,
        price:cc.Label,
        price1:cc.Label,
        priceDiscount:cc.Label,
        adButon:cc.Node,
        close:cc.Node,
        noAdButton:cc.Node,
        diamond:cc.SpriteFrame,
        debris:cc.SpriteFrame,
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
            .to(.4, { scale:1 } )
            .to(.2, { scale:.8})
            .start()

    },

    init(data, callBack) {
        this.callBack=callBack
        // if(list.length){
        //     list.map(item=>{
        //         let newNode = cc.instantiate(this.awardGoodsItem)
        //         let obj = newNode.getComponent('awardGoodsItem')
        //         obj.init(item)
        //         newNode.parent = this.goodsContent
        //     })
        // }
        cc.loader.load(data.iconImg, (err, texture)=> {
            const width=texture.width;
            const height=texture.height;
            if(width>=height){
                this.iconNode.height=130*height/width
                this.iconNode.height=130
            }else{
                this.iconNode.width=130*width/heigh
                this.iconNode.height=130
            }
            this.icon.spriteFrame=new cc.SpriteFrame(texture)
        });
        const costIcon={
            12:this.diamond,
            13:this.debris
        }
        this.currencyIcon1.spriteFrame=costIcon[data.costGoodsType]
        this.currencyIcon2.spriteFrame=costIcon[data.costGoodsType]
        this.currencyIcon3.spriteFrame=costIcon[data.costGoodsType]
        this.price.string=data.costNum;
        this.price1.string=data.costNum;
        this.priceDiscount.string=data.preferentialNum;

    },



    setTouch() {

        this.adButon.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            cc.tween(this.adButon)
                .to(.1,{scale:1.0})
                .to(0.1,{scale:.8})
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
        this.callBack(false,)
        this.closeDia()

    },
    handleAd(){
        //播放广告
        Toast.show('广告暂未开放')
    },


    // update (dt) {},
});
