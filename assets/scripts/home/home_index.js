import { CACHE } from '../global/usual_cache';
import { SCENE, SCENE_KEY } from '../global/app_global_index';
import { HOME_CACHE } from '../global/home_global';
import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        ske_anim: {
            type: sp.Skeleton, // 
            default: null,
        },
        cat: cc.Node,
        footer: cc.Prefab,
        header: cc.Prefab,
        cat_action: cc.Prefab,
        layout_root: cc.Node,
        home_root: cc.Node,
        home_bg: cc.Sprite,
        hungry_bar: cc.Node,
        lucky_bar: cc.Node,
        feed_warp: cc.Prefab,
        dress_warp: cc.Prefab,
        currency_warp: cc.Prefab,


    },

    stateUpdate() {
        CACHE.scene = SCENE.HOME;
    },

    setBg() {
        const bg_assets = CACHE.assets.bg;
        let homeBgTex = bg_assets[SCENE_KEY.HOME];
        this.home_bg.spriteFrame = new cc.SpriteFrame(homeBgTex);
    },

    init() {
        this.stateUpdate();
        this.setBg();
        this.footerInit();
        this.headerInit();
        this.initDress()
        this.setTouch()
    },

    // LIFE-CYCLE CALLBACKS:

    footerInit() {
        let footer = cc.instantiate(this.footer);
        let obj = footer.getComponent('navi_footer');
        obj.initWithScene(CACHE.scene);
        footer.parent = this.layout_root;
        footer.setPosition(0, -500);
    },

    headerInit() {
        let header = cc.instantiate(this.header);
        let obj = header.getComponent('header_warp_index');
        obj.render();
        header.parent = this.layout_root;
        header.setPosition(0, 528);
    },

    initCatPost() {
        var spine = this.ske_anim;
        var ske_com = spine.getComponent(sp.Skeleton);
        this.ske_com = ske_com;
        const catPostList = ['Zou00', 'PA00', 'Zhan00']
        this.ske_com.clearTrack(0);
        //随机姿势
        if (HOME_CACHE.cat_post === undefined) {
            HOME_CACHE.cat_post = Math.round(Math.random() * 2)
        }
        const currentPost = catPostList[HOME_CACHE.cat_post]
        this.ske_com.setAnimation(0, currentPost, true)
    },

    initDress() {
        let dressWarpInstan = cc.instantiate(this.dress_warp)
        var warp_parent = cc.find(`Canvas`)
        dressWarpInstan.parent = warp_parent
        dressWarpInstan.setPosition(0, -868);
        dressWarpInstan.active = false
        let obj = dressWarpInstan.getComponent('dress')
        obj.init()

    },

    getPetInfo() {
        Api.petHome((res) => {
            const data = res.data;
            console.log("res", res)
            if (res.code === 0) {
                HOME_CACHE.pet_info = res.data;
                this.resetUI()
            }
        });
    },

    getPetHunger(callBack) {
        Api.petHungry((res) => {
            const data = res.data;
            console.log("getPetHunger", res)
            if (res.code === 0) {
                HOME_CACHE.pet_info = {
                    ...HOME_CACHE.pet_info,
                    ...data,
                }
                this.setHungerTimer(data.refreshTime)

                this.resetUI()
                if (callBack) {
                    callBack()
                }
            }
        });
    },

    setHungerTimer(refreshTime) {
        const time = refreshTime - (new Date()).getTime()
        console.log("tiem", time)
        if (hunberTimer) {
            clearTimeout(hunberTimer)
        }
        let hunberTimer = setTimeout(() => {
            this.getPetHunger()
        }, time)
    },

    getFoodRemain(callBack) {
        Api.petRemainFood((res) => {
            const data = res.data;
            console.log("res", res)
            if (res.code === 0) {
                HOME_CACHE.cat_food = res.data;
                this.resetUI()
                if (callBack) {
                    callBack()
                }
            }
        });
    },

    resetUI() {
        var hungry_warp = cc.find(`processText`, this.hungry_bar)
        hungry_warp.getComponent(cc.Label).string = `${HOME_CACHE.pet_info.currentHungry} \ ${HOME_CACHE.pet_info.hungryUpperLimit}`
        this.hungry_bar.width = 200 * HOME_CACHE.pet_info.currentHungry / HOME_CACHE.pet_info.hungryUpperLimit

        var lucky_warp = cc.find(`processText`, this.lucky_bar)
        lucky_warp.getComponent(cc.Label).string = `${HOME_CACHE.pet_info.currentLucky} \ ${HOME_CACHE.pet_info.luckyUpperLimit}`
        this.lucky_bar.width = 200 * HOME_CACHE.pet_info.currentLucky / HOME_CACHE.pet_info.luckyUpperLimit

    },

    onLoad() {
        this.initCatPost()
        this.getPetInfo()
        this.getFoodRemain()
        this.getPetHunger()
        this.resetUI()


        // var spine = this.ske_anim;
        // // spine.debugSlots = true;
        // var ske_com = spine.getComponent(sp.Skeleton);
        // this.ske_com = ske_com;
        // /**
        //  * 随机选择一种动画循环播放（Zou00,PA00,Zhan00）
        //  */
        // let randomNum = Math.random();
        // this.ske_com.clearTrack(0);
        // // this.ske_com.setAnimation(0, "PA00", true)
        // if (randomNum < 0.33) {
        //     this.ske_com.setAnimation(0, "Zou00", true)
        // } else if (randomNum >= 0.33 && randomNum <= 0.66) {
        //     this.ske_com.setAnimation(0, "PA00", true)
        // } else {
        //     this.ske_com.setAnimation(0, "Zhan00", true)
        // }
    },

    start() {
        this.init();
    },
    showCatAction() {
        let catActionInstan = cc.instantiate(this.cat_action)
        catActionInstan.parent = this.home_root
        catActionInstan.setPosition(0, 80);

    },
    setTouch(hardLevel) {
        this.cat.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.showCatAction()
            event.stopPropagation();

        })
    }
    // update (dt) {},
});
