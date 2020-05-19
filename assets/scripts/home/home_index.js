import { CACHE } from '../global/usual_cache';
import { SCENE } from '../global/app_global_index';
import { HOME_CACHE  } from '../global/home_global';

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
        feed_warp: cc.Prefab,
        dress_warp: cc.Prefab,


    },

    stateUpdate() {
        CACHE.scene = SCENE.HOME;
    },

    init() {
        this.stateUpdate();
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

    initCatPost(){
        var spine = this.ske_anim;
        var ske_com = spine.getComponent(sp.Skeleton);
        this.ske_com = ske_com;
        const catPostList=['Zou00','PA00','Zhan00']
        this.ske_com.clearTrack(0);
        //随机姿势
        if(HOME_CACHE.cat_post===undefined){
            HOME_CACHE.cat_post=Math.round(Math.random() * 2)
        }
        const currentPost=catPostList[HOME_CACHE.cat_post]
        this.ske_com.setAnimation(0, currentPost, true)
    },

    initDress(){
        let dressWarpInstan = cc.instantiate(this.dress_warp)
        var warp_parent = cc.find(`Canvas`)
        dressWarpInstan.parent=warp_parent
        dressWarpInstan.setPosition(0, -868);
        dressWarpInstan.active=false
        let obj = dressWarpInstan.getComponent('dress')
        obj.init()

    },

    onLoad() {
        this.initCatPost()

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
