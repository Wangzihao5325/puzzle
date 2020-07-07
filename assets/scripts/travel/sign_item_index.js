import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Sprite,
        bgNode: cc.Node,
        goods: cc.Sprite,
        goodsNode: cc.Node,
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
        if (item.day <= CACHE.signData.daySign) {
            this.goodsNode.opacity = 80
        }
        if (item.day > CACHE.signData.daySign) {
            this.signReg.node.active = false;
        }
        this.bgNode.color = new cc.color(254, 249, 207, 255)
        this.lessReg.node.active = true;
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
        if (item.day <= CACHE.signData.daySign) {
            this.goodsNode.opacity = 80
        }
        if (item.day > CACHE.signData.daySign) {
            this.signReg.node.active = false;
        }
        //  else if ((item.day == CACHE.signData.daySign) && !CACHE.signData.todaySign) {
        //     this.signReg.node.active = false;
        // }
        this.lessReg.node.active = false;
        if (item.day == 5 || item.day == 6) {
            this.goods.node.scaleX = 0.5;
            this.goods.node.scaleY = 0.5;
        }
        this.dayLabel.string = `第${index + 1}天`;
        if (index % 3 == 1) {
            this.lessReg.node.active = true;
            this.bgNode.color = new cc.color(254, 249, 207, 255)
        }
    },

    addSignReg() {
        this.signReg.node.active = true;
    },

    todaySign() {
        this.node.zIndex = 10;
        if (this.regXY) {
            this.signReg.node.x = -this.regXY[0];
            this.signReg.node.y = -this.regXY[1];
            this.signReg.node.scaleX = 1.6;
            this.signReg.node.scaleY = 1.6;
            this.signReg.node.active = true;
            cc.tween(this.signReg.node)
                .delay(0.2)
                .to(0.2, { position: cc.v2(0, 0), scale: 0.7 })
                .start();
        }
        cc.tween(this.animateRoot)
            .to(0.02, { position: cc.v2(4, 4) })
            .to(0.04, { position: cc.v2(-4, -4) })
            .to(0.04, { position: cc.v2(4, 4) })
            .to(0.04, { position: cc.v2(-4, -4) })
            .to(0.04, { position: cc.v2(4, 4) })
            .to(0.04, { position: cc.v2(-4, -4) })
            .to(0.04, { position: cc.v2(4, 4) })
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
