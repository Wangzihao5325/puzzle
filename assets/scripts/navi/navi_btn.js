import { SCENE } from '../global/app_global_index';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

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

    // update (dt) {},
});
