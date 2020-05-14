import { CACHE } from '../global/usual_cache';
import { SCENE } from '../global/app_global_index';

cc.Class({
    extends: cc.Component,

    properties: {
        root: cc.Node,
        footer: cc.Prefab,
    },

    stateUpdate() {
        CACHE.scene = SCENE.SHOW;
    },

    footerInit() {
        let footer = cc.instantiate(this.footer);
        let obj = footer.getComponent('navi_footer');
        obj.initWithScene(CACHE.scene);
        footer.parent = this.root;
        footer.setPosition(0, -500);
    },

    init() {
        this.stateUpdate();
        this.footerInit();
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.init();
    },

    // update (dt) {},
});
