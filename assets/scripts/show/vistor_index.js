import { CACHE } from '../global/usual_cache';
const SEX = { MAN: 'manVistor', WOMAN: 'womenVistor', OLD_MAN: 'oldManVistor', YOUNG_WOMEN: 'youngWomenVistor' };
const VISTOR_ASSETS_PATH = {
    man: ['show/nance.png', 'show/nanzheng.png'],
    woman: ['show/nvce.png', 'show/nvzheng.png'],
};
const ATTITUDE_ASSET_PATH = ['show/biaoqing01', 'show/biaoqing02', 'show/biaoqing03', 'show/biaoqing04'];
cc.Class({
    extends: cc.Component,

    properties: {
        man: cc.Sprite,
        attitude: cc.Sprite,
        attitudeBg: cc.Sprite,
        attitudeLoading: cc.Label
    },

    randomSexAndAttitude() {
        let manNum = Math.floor(Math.random() * 4);
        console.log('kkkk');
        console.log(manNum);
        switch (manNum) {
            case 0:
                this.sex = SEX.MAN;
                break;
            case 1:
                this.sex = SEX.WOMAN;
                break;
            case 2:
                this.sex = SEX.OLD_MAN;
                break;
            case 3:
                this.sex = SEX.YOUNG_WOMEN;
                break;
        }
        //to do 表情随机

        let index = Math.floor(Math.random() * CACHE.assets.vistorAttitude.length);
        this.attitudeAsset = new cc.SpriteFrame(CACHE.assets.vistorAttitude[index]);
    },

    initMan(direction) {
        if (this.sex && this.attitudeAsset) {
            this.man.spriteFrame = new cc.SpriteFrame(CACHE.assets[this.sex][0]);
            this.man.node.scaleX = direction > 0 ? -0.6 : 0.6;
            this.man.node.scaleY = 0.6;
            this.attitudeBg.node.scaleX = 0.6;
            this.attitudeBg.node.scaleY = 0.6;
            this.attitude.spriteFrame = this.attitudeAsset;
            this.attitude.node.active = false;
        }
    },

    manWait() {
        if (this.sex && this.attitudeAsset) {

            this.man.spriteFrame = new cc.SpriteFrame(CACHE.assets[this.sex][1]);;
            this.attitude.node.active = true;
            this.attitude.spriteFrame = new cc.SpriteFrame(CACHE.assets.vistorAttitude[1]);;
            this.attitudeBg.node.scaleX = 0.75;
            this.attitudeBg.node.scaleY = 0.75;
        }
    },

    animateStart(payload) {
        cc.tween(this.man.node)
            .to(1, { position: cc.v2(0, 20) })
            .to(1, { position: cc.v2(0, 0) })
            .union()
            .repeat(payload.firstPeriod / 2)
            .delay(payload.pausePeriod)
            .to(1, { position: cc.v2(0, 20) })
            .to(1, { position: cc.v2(0, 0) })
            .union()
            .repeat(payload.secondPeriod / 2)
            .start()
    },

    init(direction) {
        this.randomSexAndAttitude();
        this.initMan(direction);
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
