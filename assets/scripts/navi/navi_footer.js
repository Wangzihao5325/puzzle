import { SCENE } from '../global/app_global_index';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        home_btn: cc.Button,
        travel_btn: cc.Button,
        show_btn: cc.Button,
        pin: cc.Prefab
    },

    initBtnBg(sceneType) {
        const NAVI_BG_ASSETS = CACHE.assets.naviAssets;
        this.home_btn.normalSprite = sceneType == SCENE.HOME ? new cc.SpriteFrame(NAVI_BG_ASSETS[1]) : new cc.SpriteFrame(NAVI_BG_ASSETS[0]);
        this.travel_btn.normalSprite = sceneType == SCENE.TRAVEL ? new cc.SpriteFrame(NAVI_BG_ASSETS[3]) : new cc.SpriteFrame(NAVI_BG_ASSETS[2]);
        this.show_btn.normalSprite = sceneType == SCENE.SHOW ? new cc.SpriteFrame(NAVI_BG_ASSETS[5]) : new cc.SpriteFrame(NAVI_BG_ASSETS[4]);
    },

    initAnimate() {
        let pinNode = this.pin.item_node;
        let obj = pinNode.getComponent('navi_pin');
        if (obj) {
            obj.animatStart();
        }
        cc.tween(this.travel_btn.node)
            .to(1, { scale: 1.05 })
            .to(1, { scale: 1 })
            .union()
            .repeatForever()
            .start()
    },

    initPin() {
        let pinNode = cc.instantiate(this.pin);
        pinNode.parent = this.travel_btn.node;
        pinNode.setPosition(-50, -20);
        this.pin.item_node = pinNode;
    },

    initWithScene(sceneType) {
        this.initBtnBg(sceneType);
        if (sceneType == SCENE.TRAVEL) {
            this.initPin();
            this.initAnimate();
        }
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
