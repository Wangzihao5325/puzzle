//standType 0 金币 1 钻石 2 猫粮
cc.Class({
    extends: cc.Component,

    properties: {
        iconSprite: cc.Sprite,
        iconSprite2: cc.Sprite,
        title: cc.Label,
        awardNum: cc.Label,

        needTimes: cc.Label,

        titleNode: cc.Node,
        goodsNode: cc.Node,
        showTimeNode: cc.Node,
    },

    initWithItem(item) {
        this.needTimes.string = `${item.needTime}分钟`//item.timeUnit
        this.awardNum.string = item.awardNum;
        this.title.string = item.standName;
        switch (item.standType) {
            case 0:
                cc.loader.loadRes("normal/jinbi", cc.SpriteFrame, (err, spriteFrame) => {
                    this.iconSprite.spriteFrame = spriteFrame;
                    this.iconSprite2.spriteFrame = spriteFrame;
                });
                break;
            case 1:
                cc.loader.loadRes("normal/zuanshi", cc.SpriteFrame, (err, spriteFrame) => {
                    this.iconSprite.spriteFrame = spriteFrame;
                    this.iconSprite2.spriteFrame = spriteFrame;
                });
                break;
            case 2:
                cc.loader.loadRes("normal/jinbi", cc.SpriteFrame, (err, spriteFrame) => {
                    this.iconSprite.spriteFrame = spriteFrame;
                    this.iconSprite2.spriteFrame = spriteFrame;
                });
                break;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
