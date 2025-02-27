// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Api from '../api/api_index'
import {HOME_CACHE} from '../global/home_global'

cc.Class({
    extends: cc.Component,

    properties: {
        Action_warp: cc.Node,
        container:cc.Node,
        Goout: cc.Node,
        Dress: cc.Node,
        Feed: cc.Node,
        Feed_warp: cc.Prefab,
        Dress_warp: cc.Prefab,
        OutSide: cc.Prefab,
        Home_Warp: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


        //根据姿势设置弹窗高度
        const catPostListHeight = [150, 70, 150]
        this.container.setPosition(cc.v2(0,catPostListHeight[HOME_CACHE.cat_post]))

        //进入动画
        this.Goout.setPosition(cc.v2(-60,0))
        this.Goout.opacity=0

        this.Dress.setPosition(cc.v2(140,0))
        this.Dress.opacity=0


        cc.tween(this.Goout)
        .to(.3, { position: cc.v2(-60, 110), opacity:255}, { easing: 'sineOutIn' })
        .to(.2, { position: cc.v2(-60, 90)}, { easing: 'sineOutIn' })
        .start()

        cc.tween(this.Dress)
        .delay(.1)
        .to(.3, { position: cc.v2(140, 110), opacity:255}, { easing: 'sineOutIn' })
        .to(.2, { position: cc.v2(140, 90)}, { easing: 'sineOutIn' })
        .start()


        this.bounceAnimation()

    },

    //跳动动画
    bounceAnimation(){
        cc.tween(this.Goout)
        .delay(8)
        .to(.3, { position: cc.v2(-60, 110)}, { easing: 'sineOutIn' })
        .to(.2, { position: cc.v2(-60, 90)}, { easing: 'sineOutIn' })
        .union()
        .repeatForever()
        .start()

        setTimeout(()=>{
            cc.tween(this.Dress)
            .delay(8)
            .to(.3, { position: cc.v2(140, 110)}, { easing: 'sineOutIn' })
            .to(.2, { position: cc.v2(140, 90)}, { easing: 'sineOutIn' })
            .union()
            .repeatForever()
            .start()
        },100)

        // setTimeout(()=>{
        //     cc.tween(this.Feed)
        //     .delay(8)
        //     .to(.3, { position: cc.v2(160, 110)}, { easing: 'sineOutIn' })
        //     .to(.2, { position: cc.v2(160, -10)}, { easing: 'sineOutIn' })
        //     .union()
        //     .repeatForever()
        //     .start()
        // },200)






    },

    init() {
        this.setTouch()

    },

    start() {
        this.init()

    },

    init_feed() {
        let feedWarpInstan = cc.instantiate(this.Feed_warp)
        var warp_parent = cc.find(`Canvas`)
        feedWarpInstan.parent = warp_parent
        feedWarpInstan.setPosition(0, -1000);
    },

    //喂养
    show_feed() {
        // ComeBack.show(goodsList)
        this.handleClose()

        let feedWarpInstan = cc.instantiate(this.Feed_warp)
        var warp_parent = cc.find(`Canvas`)
        feedWarpInstan.parent = warp_parent
        feedWarpInstan.setPosition(0, -1000);

        cc.tween(feedWarpInstan)
            .to(.2, { position: cc.v2(0, -288) } )
            .to(.1, { position: cc.v2(0, -388) })
            // .to(.1, { position: cc.v2(0, -408) })
            .start()
        const feed=feedWarpInstan.getComponent('feed')
        feed.resetUI()
    },
    handleClose() {
        this.Action_warp.destroy()
    },

    // initDress() {
    //     let dressModalInstan = cc.instantiate(this.dress_modal)
    //     var warp_parent = cc.find(`Canvas`)
    //     dressModalInstan.parent = warp_parent
    //     dressModalInstan.setPosition(0, 0);
    //     // obj.init()

    // },

    show_dress() {
        this.handleClose()

        //隐藏猫盆
        let homeIndeObj = cc.find('Canvas').getComponent('home_index')
        homeIndeObj.showBowl(false)

        let dressModalInstan = cc.instantiate(this.Dress_warp)
        var warp_parent = cc.find(`Canvas`)
        dressModalInstan.parent = warp_parent
        dressModalInstan.setPosition(0, 0);

        let obj=dressModalInstan.getComponent('dress')
        obj.show_dress()

    },

    setOUtUi() {
        this.handleClose()
        let OutSide = cc.instantiate(this.OutSide)
        var catItem = cc.find(`Canvas/rootWarp/my_home/cat`)
        var my_home = cc.find(`Canvas/rootWarp/my_home`)
        var bowlWarp = cc.find(`Canvas/rootWarp/my_home/bowlWarp`)
        catItem.active = false
        OutSide.parent = my_home
        OutSide.active = true
        bowlWarp.active=false
        //更新宠物信息
        let homeIndeObj = cc.find('Canvas').getComponent('home_index')
        homeIndeObj.getPetInfo()
    },

    checkCanOut(){
        Api.allow_goout((res) => {
            if(res.code===0){
                this.handleGoout()
            }else if (res.code === 20008) {
                //体力不够
                Hunger.show("")
            }
            else if (res.code === 20011) {
                //太累了
                const str = res.message
                const time = str.slice(str.indexOf('=') + 1)
                Tire.show(time)
            }
            else {
                Toast.show(res.message || '外出失败')
            }
        })

    },

    handleGoout() {

        ConfirmOut.show(() => {
            Api.petGoout((res) => {
                if (res.code === 0) {
                    Toast.show("宠物已外出")
                    this.setOUtUi()
                } else if (res.code === 20008) {
                    //体力不够
                    Hunger.show("")
                }
                else if (res.code === 20011) {
                    //太累了
                    const str = res.message
                    const time = str.slice(str.indexOf('=') + 1)
                    Tire.show(time)
                }
                else {
                    Toast.show(res.message || '外出失败')
                }
            })
        },
            ((res) => {
                Toast.show(res.message || '外出失败')

            })
        )

    },

    setTouch() {
        this.Feed.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.show_feed()
            event.stopPropagation();

        })
        this.Dress.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.show_dress()
            event.stopPropagation();

        })
        this.Goout.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.checkCanOut()
            event.stopPropagation();

        })

        this.Action_warp.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleClose()
            event.stopPropagation();
        })

    },

    // update (dt) {},
});
