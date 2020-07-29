import { SCENE } from '../global/app_global_index';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        home_btn_warp: cc.Node,
        home_btn: cc.Button,
        travel_btn: cc.Button,
        show_btn: cc.Button,
        pin: cc.Prefab,
        earLeft: cc.Sprite,
        earRight: cc.Sprite
    },

    initBtnBg(sceneType) {
        const NAVI_BG_ASSETS = CACHE.assets.naviAssets;
        this.home_btn.normalSprite = sceneType == SCENE.HOME ? new cc.SpriteFrame(NAVI_BG_ASSETS[1]) : new cc.SpriteFrame(NAVI_BG_ASSETS[0]);
        this.travel_btn.normalSprite = sceneType == SCENE.TRAVEL ? new cc.SpriteFrame(NAVI_BG_ASSETS[3]) : new cc.SpriteFrame(NAVI_BG_ASSETS[2]);
        this.show_btn.normalSprite = sceneType == SCENE.SHOW ? new cc.SpriteFrame(NAVI_BG_ASSETS[5]) : new cc.SpriteFrame(NAVI_BG_ASSETS[4]);
        if (sceneType == SCENE.HOME) {
            this.earLeft.node.active = true;
            this.earRight.node.active = true;
        }
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

    earAnimate() {
        cc.tween(this.earLeft.node)
            .to(0.05, { angle: -10 })
            .to(0.1, { angle: 10 })
            .to(0.1, { angle: -10 })
            .to(0.05, { angle: 0 })
            .delay(2)
            .union()
            .repeatForever()
            .start();

        cc.tween(this.earRight.node)
            .to(0.05, { angle: -10 })
            .to(0.1, { angle: 10 })
            .to(0.1, { angle: -10 })
            .to(0.05, { angle: 0 })
            .delay(2)
            .union()
            .repeatForever()
            .start();
    },

    initWithScene(sceneType) {
        setTimeout(() => {
            this.initBtnBg(sceneType);
            if (sceneType == SCENE.TRAVEL) {
                this.initPin();
                this.initAnimate();
            } else if (sceneType == SCENE.HOME) {
                this.earAnimate()
            }
        }, 10);
    },

    goToPlay() {
        cc.find("sound").getComponent("sound").tap()
        if (CACHE.scene !== SCENE.TRAVEL) {
            CACHE.targetScene = 'travel';
            cc.director.loadScene("innerLoading");
            //cc.director.loadScene("travel");
        }
    },

    goToMyHome() {
        cc.find("sound").getComponent("sound").tap()
        if (CACHE.scene !== SCENE.HOME) {
            CACHE.targetScene = 'my_home';
            cc.director.loadScene("innerLoading");
            //cc.director.loadScene("my_home");
        }
    },

    goToShow() {
        cc.find("sound").getComponent("sound").tap()
        if (CACHE.scene !== SCENE.SHOW) {
            CACHE.targetScene = 'show';
            cc.director.loadScene("innerLoading");
            //cc.director.loadScene("show");
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (CACHE.platform.isIphoneX && this.home_btn_warp) {
            let warpWidget = this.home_btn_warp.getComponent(cc.Widget)
            warpWidget.bottom = 100
        }
    },

    // update (dt) {},
});
