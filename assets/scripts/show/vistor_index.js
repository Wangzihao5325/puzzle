import { CACHE } from '../global/usual_cache';
const SEX = { MAN: 'manVistor', WOMAN: 'womenVistor' };
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
    },

    randomSexAndAttitude() {
        this.sex = (Math.random() * 2) > 1 ? SEX.MAN : SEX.WOMAN;
        //to do 表情随机

        let index = Math.floor(Math.random() * CACHE.assets.vistorAttitude.length);
        console.log('kkkk');
        console.log(index)
        console.log(CACHE.assets.vistorAttitude);
        this.attitudeAsset = new cc.SpriteFrame(CACHE.assets.vistorAttitude[index]);
    },

    initMan(direction) {
        if (this.sex && this.attitudeAsset) {
            this.man.spriteFrame = new cc.SpriteFrame(CACHE.assets[this.sex][0]);
            this.man.node.scaleX = direction > 0 ? -0.75 : 0.75;
            this.man.node.scaleY = 0.75;
            this.attitude.node.scaleX = 0.75;
            this.attitude.node.scaleY = 0.75;
            this.attitude.spriteFrame = this.attitudeAsset;
            this.attitude.node.active = false;
        }
    },

    manWait() {
        if (this.sex && this.attitudeAsset) {

            this.man.spriteFrame = new cc.SpriteFrame(CACHE.assets[this.sex][1]);;
            this.attitude.node.active = true;
            this.attitude.spriteFrame = new cc.SpriteFrame(CACHE.assets.vistorAttitude[1]);;
            this.attitude.node.scaleX = 0.75;
            this.attitude.node.scaleY = 0.75;
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
