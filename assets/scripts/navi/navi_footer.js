import { SCENE } from '../global/app_global_index';
import { CACHE } from '../global/usual_cache';

const PATHS = ['navi/jiaweixuanzhong', 'navi/jiayuan', 'navi/lvxing3', 'navi/zhanlanweixianzhong', 'navi/zhanlan'];

cc.Class({
    extends: cc.Component,

    properties: {
        home_btn: cc.Button,
        travel_btn: cc.Button,
        show_btn: cc.Button
    },

    initBtnBg(sceneType) {
        this.home_btn.normalSprite = sceneType == SCENE.HOME ? NAVI_BG_ASSETS[1] : NAVI_BG_ASSETS[0];
        this.travel_btn.normalSprite = sceneType == SCENE.TRAVEL ? NAVI_BG_ASSETS[2] : NAVI_BG_ASSETS[2];
        this.show_btn.normalSprite = sceneType == SCENE.SHOW ? NAVI_BG_ASSETS[4] : NAVI_BG_ASSETS[3];
    },

    initWithScene(sceneType) {
        cc.loader.loadResArray(PATHS, cc.SpriteFrame, (err, assets) => {
            if (err) cc.error(err);
            NAVI_BG_ASSETS = assets;
            this.initBtnBg(sceneType);
        });
    },

    goToPlay() {
        if (CACHE.scene !== SCENE.TRAVEL) {
            cc.director.loadScene("travel");
        }
    },

    goToMyHome() {
        if (CACHE.scene !== SCENE.HOME) {
            cc.director.loadScene("my_home");
        }
    },

    goToShow() {
        if (CACHE.scene !== SCENE.SHOW) {
            cc.director.loadScene("show");
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
