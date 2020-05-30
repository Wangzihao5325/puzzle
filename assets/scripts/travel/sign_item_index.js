import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Sprite,
        goods: cc.Sprite,
        numberLabel: cc.Label,
        signReg: cc.Sprite,
        lessReg: cc.Sprite,
        dayLabel: cc.Label,
        animateRoot: cc.Node,
    },

    setXY(x, y) {
        this.regXY = [x, y];
    },

    initDaySeven(item, index) {
        cc.loader.load(item.iconUrl, (err, texture) => {
            this.goods.spriteFrame = new cc.SpriteFrame(texture);
        });
        if (item.day > CACHE.signData.daySign) {
            this.signReg.node.active = false;
        }
        cc.loader.loadRes("normal/xiyoudi", cc.SpriteFrame, (err, spriteFrame) => {
            this.bg.spriteFrame = spriteFrame;
            this.lessReg.node.active = true;
        });
        if (index == 1 || index == 0) {
            this.goods.node.scaleX = 0.5;
            this.goods.node.scaleY = 0.5;
        }
    },

    initWithItem(item, index) {
        this.numberLabel.string = `x${item.amount}`;
        cc.loader.load(item.iconUrl, (err, texture) => {
            this.goods.spriteFrame = new cc.SpriteFrame(texture);
        });
        if (item.day > CACHE.signData.daySign) {
            this.signReg.node.active = false;
        }

        this.lessReg.node.active = false;
        if (item.day == 5 || item.day == 6) {
            this.goods.node.scaleX = 0.5;
            this.goods.node.scaleY = 0.5;
        }
        this.dayLabel.string = `第${index + 1}天`;
        if (index % 3 == 1) {
            cc.loader.loadRes("normal/xiyoudi", cc.SpriteFrame, (err, spriteFrame) => {
                this.bg.spriteFrame = spriteFrame;
                this.lessReg.node.active = true;
            });
        }
    },

    addSignReg() {
        this.signReg.node.active = true;
    },

    todaySign() {
        if (this.regXY) {
            this.signReg.node.x = -this.regXY[0];
            this.signReg.node.y = -this.regXY[1];
            this.signReg.node.scaleX = 1.6;
            this.signReg.node.scaleY = 1.6;
            this.signReg.node.active = true;
            cc.tween(this.signReg.node)
                .to(0.12, { position: cc.v2(0, 0), scale: 0.8 })
                .start();
        }
        cc.tween(this.animateRoot)
            .to(0.02, { position: cc.v2(4, 4) })
            .to(0.04, { position: cc.v2(-4, -4) })
            .to(0.04, { position: cc.v2(4, 4) })
            .to(0.02, { position: cc.v2(0, 0) })
            .call(() => this.addSignReg())
            .start();
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
