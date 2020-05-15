// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CAR_FOOD } from "../global/home_global"

cc.Class({
    extends: cc.Component,

    properties: {
        cat_food:cc.Node,
        hiq_cat_food:cc.Node,
        catnip:cc.Node,
        close:cc.Node

    },

    // LIFE-CYCLE CALLBACKS:
    init(){
        this.setTouch()

    },
    onLoad () {
        this.init()
    },

    start () {

    },
    feed(type){
        console.log("feed ",type)
        const toast=type===2?`幸运值+${CAR_FOOD[type].lucky}`:`饱食度+${CAR_FOOD[type].energy}`
        Toast.show(toast)
    },
    handleClose(){
        var feedWarp = cc.find(`Canvas/feedWarp`)
        cc.tween(feedWarp)
        .to(.2, { position: cc.v2(0, -768) },{ easing: 'sineOutIn'})
        .start()

    },

    setTouch() {
        this.cat_food.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.feed(0)
            event.stopPropagation();
        })
        this.hiq_cat_food.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.feed(1)
            event.stopPropagation();
        })
        this.catnip.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.feed(2)
            event.stopPropagation();
        })
        this.close.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleClose(2)
            event.stopPropagation();
        })
    }
    // update (dt) {},
});
