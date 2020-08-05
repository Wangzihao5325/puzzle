// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CACHE } from '../global/usual_cache';
import { SCENE, SCENE_KEY } from '../global/app_global_index';

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        bg:cc.Sprite,
        footer:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        CACHE.scene = SCENE.BACKPACK;

        const bg_assets = CACHE.assets.bg;
        let homeBgTex = bg_assets[SCENE_KEY.HOME];
        this.bg.spriteFrame = new cc.SpriteFrame(homeBgTex);
        this.footerInit();

    },


    
    footerInit() {
        let footer = cc.instantiate(this.footer);
        footer.name = 'footer_navi';
        let obj = footer.getComponent('navi_footer');
        obj.initWithScene(CACHE.scene);
        footer.parent = cc.find('Canvas');
        footer.zIndex = 10;
    },
    // update (dt) {},
});
