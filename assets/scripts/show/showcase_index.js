//standType 0 金币 1 钻石 2 猫粮
cc.Class({
    extends: cc.Component,

    properties: {
        header: cc.Node,
        iconSprite: cc.Sprite,
        iconSprite2: cc.Sprite,
        title: cc.Label,
        awardNum: cc.Label,

        needTimes: cc.Label,

        titleNode: cc.Node,
        goodsNode: cc.Node,
        showTimeNode: cc.Node,
    },

    setTouch(callback) {
        this.header.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.header.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();

        })
        this.header.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (callback) {
                callback(this.data_item);
            }
            // Toast.show('正在开发ing')
            event.stopPropagation();
        })
    },

    initWithItem(item) {
        this.data_item = item;
        let unitStr = '';
        switch (item.timeUnit) {
            case 'MINUTES':
                unitStr = '分钟';
                break;
            case 'HOURS':
                unitStr = '小时';
                break;
            case 'SECONDS':
                unitStr = '秒';
                break;
        }
        this.needTimes.string = `${item.needTime}${unitStr}`//item.timeUnit
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
