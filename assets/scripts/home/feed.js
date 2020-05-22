// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CAR_FOOD,HOME_CACHE } from "../global/home_global"
import Api from '../api/api_index'


cc.Class({
    extends: cc.Component,

    properties: {
        cat_food:cc.Node,
        hiq_cat_food:cc.Node,
        hiq_cat_food_icon:cc.Node,
        catnip:cc.Node,
        close:cc.Node,
        cat_food_count:cc.Node,
        hiq_cat_food_count:cc.Node,
        catnip_count:cc.Node,


    },

    // LIFE-CYCLE CALLBACKS:
    init(){
        this.setTouch()
        this.getFoodRemain()
        cc.tween(this.hiq_cat_food_icon)
        .to(1.5, { scale: 1.1 })
        .to(1.5, { scale: 1 })
        .union()
        .repeatForever()
        .start()

    },
    onLoad () {
        this.init()
        this.resetUI()
    },

    resetUI(){
        // HOME_CACHE
        this.cat_food_count.getComponent(cc.Label).string=`x${HOME_CACHE.cat_food[0].count}`
        this.hiq_cat_food_count.getComponent(cc.Label).string=`x${HOME_CACHE.cat_food[1].count}`
        this.catnip_count.getComponent(cc.Label).string=`x${HOME_CACHE.cat_food[2].count}`

    },

    Feed(){

    },

    start () {

    },

    getFoodRemain(){
        Api.petRemainFood((res) => {
            const data = res.data;
            console.log("res",res)
            if(res.code===0){
                HOME_CACHE.cat_food=res.data;
                this.resetUI()
            }
        });
    },
    feed(index){

        var Home_root = cc.find(`Canvas`)

        let homeObj = Home_root.getComponent('home_index');

        const cur=HOME_CACHE.cat_food[index];
        Api.petFeed({goodsId:cur.goodsId},(res) => {
            const data = res.data;
            console.log("res",res)
            if(res.code===0){
                const toast=index===2?`幸运值+${cur.lucky}`:index===1?`饱食度+${cur.hungry} 幸运值+${cur.lucky}`:`饱食度+${cur.hungry}`
                Toast.show(toast)
                HOME_CACHE.pet_info={
                    ...HOME_CACHE.pet_info,
                    ...data
                }
                homeObj.resetUI();
                this.getFoodRemain()
                // HOME_CACHE.pet_info=res.data;
                
            }else{
                Toast.show(res.message)
            }
        });
        // console.log("feed ",type)
        // const toast=type===2?`幸运值+${CAR_FOOD[type].lucky}`:`饱食度+${CAR_FOOD[type].energy}`
        // Toast.show(toast)
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
