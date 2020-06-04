import { CACHE } from '../global/usual_cache';
const SEX = { MAN: 'manVistor', WOMAN: 'womenVistor', OLD_MAN: 'oldManVistor', YOUNG_WOMEN: 'youngWomenVistor' };
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

        let attitudeNum = Math.floor(Math.random() * 10);
        this.attitudeIndex = attitudeNum;
    },

    initMan(direction) {
        if (this.sex && (typeof this.attitudeIndex == 'number')) {
            this.man.spriteFrame = new cc.SpriteFrame(CACHE.assets[this.sex][0]);
            this.man.node.scaleX = direction > 0 ? -0.6 : 0.6;
            this.man.node.scaleY = 0.6;
            this.attitude.spriteFrame = new cc.SpriteFrame(CACHE.assets.vistorAttitude[this.attitudeIndex]);
            this.attitudeBg.node.scaleX = 0.6;
            this.attitudeBg.node.scaleY = 0.6;
            switch (this.sex) {
                case SEX.MAN:
                    this.attitudeBg.node.x = 0;
                    this.attitudeBg.node.y = 285;
                    break;
                case SEX.WOMAN:
                    this.attitudeBg.node.x = direction > 0 ? 35 : -35;
                    this.attitudeBg.node.y = 285;
                    break;
                case SEX.OLD_MAN:
                    this.attitudeBg.node.x = direction > 0 ? -20 : 20;
                    this.attitudeBg.node.y = 285;
                    break;
                case SEX.YOUNG_WOMEN:
                    this.attitudeBg.node.x = direction > 0 ? -5 : 5;
                    this.attitudeBg.node.y = 285;
                    break;
            }
            this.attitudeBg.node.active = false;
        }
    },

    manWait() {
        if (this.sex && (typeof this.attitudeIndex == 'number')) {
            this.man.spriteFrame = new cc.SpriteFrame(CACHE.assets[this.sex][1]);
            this.attitudeBg.node.active = true;
        }
    },

    labelSetting(str) {
        this.attitudeLoading.string = str;
    },

    attitudeShow() {
        this.attitude.node.active = true;
        let isAddHeart = false;
        switch (this.attitudeIndex) {
            case 0:
                isAddHeart = true;
                break;
            case 1:
                isAddHeart = false;
                break;
            case 2:
                isAddHeart = true;
                break;
            case 3:
                isAddHeart = true;
                break;
            case 4:
                isAddHeart = false;
                break;
            case 5:
                isAddHeart = false;
                break;
            case 6:
                isAddHeart = false;
                break;
            case 7:
                isAddHeart = true;
                break;
            case 8:
                isAddHeart = false;
                break;
            case 9:
                isAddHeart = true;
                break;
        }
        return isAddHeart;
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
