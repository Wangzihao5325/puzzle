import { IMAGE_SERVER } from '../global/app_global_index';
import { setTimeOutWithTimeStamp } from '../utils/utils';
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
        goodsNode: cc.Sprite,
        showTimeNode: cc.Node,
        getNumNode: cc.Node,

        timerNode: cc.Node,
        timerIcon: cc.Sprite,
        timerLabel: cc.Label
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
                    this.timerIcon.spriteFrame = spriteFrame;
                });
                break;
            case 1:
                cc.loader.loadRes("normal/zuanshi", cc.SpriteFrame, (err, spriteFrame) => {
                    this.iconSprite.spriteFrame = spriteFrame;
                    this.iconSprite2.spriteFrame = spriteFrame;
                    this.timerIcon.spriteFrame = spriteFrame;
                });
                break;
            case 2:
                cc.loader.loadRes("normal/jinbi", cc.SpriteFrame, (err, spriteFrame) => {
                    this.iconSprite.spriteFrame = spriteFrame;
                    this.iconSprite2.spriteFrame = spriteFrame;
                    this.timerIcon.spriteFrame = spriteFrame;
                });
                break;
        }

        if (item.goodId) {
            this.titleNode.active = false;
            this.goodsNode.node.active = true;
            let iconPath = `${IMAGE_SERVER}/${item.icon}.png`;
            cc.loader.load(iconPath, (err, texture) => {
                this.goodsNode.spriteFrame = new cc.SpriteFrame(texture);
            });
            this.showTimeNode.active = false;

            let nowTime = new Date().getTime();
            if (nowTime >= item.goodExpectReceiveTime) {//收取状态

            } else {//定时状态
                this.timerNode.active = true;
                let timer = setTimeOutWithTimeStamp(item.goodExpectReceiveTime, (res) => {
                    this.timerLabel.string = res;
                }, () => {
                    console.log('done');
                })
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
