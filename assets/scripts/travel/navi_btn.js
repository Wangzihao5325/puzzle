import { CACHE } from '../global/usual_cache';
import { SCENE } from '../global/app_global_index';
cc.Class({
    extends: cc.Component,

    properties: {

    },

    goToTravel: function () {
        if (CACHE.scene !== SCENE.TRAVEL) {
            cc.director.loadScene("travel")
        }
    },

    goToMyHome: function () {
        if (CACHE.scene !== SCENE.HOME) {
            cc.director.loadScene("my_home")
        }
    },

    goToShow: function () {
        if (CACHE.scene !== SCENE.SHOW) {
            cc.director.loadScene("show")
        }
    },

});
