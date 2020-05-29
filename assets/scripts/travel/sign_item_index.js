import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Sprite,
        goods: cc.Sprite,
        numberLabel: cc.Label,
        signReg: cc.Sprite,
        lessReg: cc.Sprite,
        dayLabel: cc.Label
    },

    initWithItem(item, index) {
        this.numberLabel.string = `x${item.amount}`;
        cc.loader.load(item.iconUrl, (err, texture) => {
            this.goods.spriteFrame = new cc.SpriteFrame(texture);
        });
        if (item.day > CACHE.signData.daySign) {
            this.signReg.node.active = false;
        }
        if (item.day == CACHE.signData.daySign && !CACHE.signData.todaySign) {
            this.signReg.node.active = false;
        }
        this.lessReg.node.active = false;
        if (item.day == 5 || item.day == 6) {
            this.goods.node.scaleX = 0.5;
            this.goods.node.scaleY = 0.5;
        }
        this.dayLabel.string = `第${index + 1}天`;
    },

    todaySign() {
        this.signReg.node.active = true;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
