// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CACHE } from '../global/usual_cache';


cc.Class({
    extends: cc.Component,

    properties: {
        awardWarp:cc.Node,
        awardContent: cc.Node,
        start1: cc.Node,
        start2: cc.Node,
        start3: cc.Node,
        start4: cc.Node,
        twinkleWarp: cc.Node,
        title:cc.Label,
        num:cc.Label,
        icon:cc.Sprite,
        adButton:cc.Node,
        noAdButton:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setTouch()
        this.setAnimation()
    },

    start() {

    },

    setAnimation() {

        //弹窗动画
        this.awardContent.setPosition(cc.v2(0, -800))
        cc.tween(this.awardContent)
            .to(.4, { position: cc.v2(0, 40) }, { easing: 'sineIn' })
            .to(.2, { position: cc.v2(0, 0) }, { easing: 'sineIn' })
            .start()

        const startList = [this.start1, this.start2, this.start3, this.start4]

        for (let i = 0; i < 4; i++) {
            let startItem = startList[i]
            startItem.setScale(0.2)
            startItem.opacity = 0
            cc.tween(startItem)
                .delay(0.1*i)
                .to(.5, { scale: 1.3,  opacity: 255 })
                .to(.2, { scale: .8 })
                .to(.2, { scale: 1 })
                .start()
        }

        // const defaultStartArr = startList.splice(startLeavel)
        // defaultStartArr.map(item => {
        //     item.getComponent(cc.Sprite).spriteFrame = this.defaultStart
        // })

        //星星动画
        const twinkleArr = this.twinkleWarp.children

        twinkleArr.map((item) => {
            const delay = Math.ceil(Math.random() * 10) / 10
            cc.tween(item)
                .delay(delay)
                .to(1, { scale: 1 })
                .to(1, { scale: 0 })
                .union()
                .repeatForever()
                .start()
        })

     
    },

init(item){
    this.title.string = item.name;
    this.num.string=item.amount
    cc.loader.load(item.iconUrl, (err, texture) => {
        this.icon.spriteFrame = new cc.SpriteFrame(texture)

    });
},

setTouch(){
    this.adButton.on(cc.Node.EventType.TOUCH_END, (event) => {
        cc.find("sound").getComponent("sound").tap()
        Toast.show("广告暂未开放")
        event.stopPropagation();
    })
    this.noAdButton.on(cc.Node.EventType.TOUCH_END, (event) => {
        cc.find("sound").getComponent("sound").tap()
        this.handleGet()
        event.stopPropagation();
    })
},
handleGet(){
    //关闭查看图片
    const contralObj = cc.find(`Canvas/menuWarp`).getComponent('conraol')
    const header=cc.find("Canvas/headerWarp")
    header.destroy();
    this.awardWarp.destroy();
    contralObj.showShare(undefined,4)
},
    // update (dt) {},
});
