import { CACHE } from '../global/usual_cache';
import { SCENE } from '../global/app_global_index';

cc.Class({
    extends: cc.Component,

    properties: {
        ske_anim: {
            type: sp.Skeleton, // 
            default: null,
        },
    },

    stateUpdate() {
        CACHE.scene = SCENE.HOME;
    },

    init() {
        this.stateUpdate();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var spine = this.ske_anim;
        spine.debugSlots = true;
        var ske_com = spine.getComponent(sp.Skeleton);
        this.ske_com = ske_com;

        /**
         * 随机选择一种动画循环播放（Zou00,PA00,Zhan00）
         */
        let randomNum = Math.random();
        this.ske_com.clearTrack(0);
        if (randomNum < 0.33) {
            this.ske_com.setAnimation(0, "Zou00", true)
        } else if (randomNum >= 0.33 && randomNum <= 0.66) {
            this.ske_com.setAnimation(0, "PA00", true)
        } else {
            this.ske_com.setAnimation(0, "Zhan00", true)
        }
    },

    start() {
        this.init();
    },

    // update (dt) {},
});
