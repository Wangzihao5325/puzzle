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
        receiveBtn: cc.Node,

        timerNode: cc.Node,
        timerIcon: cc.Sprite,
        timerLabel: cc.Label
    },

    turnToUnplace() {
        this.touchable = true;
        this.titleNode.active = true;
        this.getNumNode.active = true;
        this.showTimeNode.active = true;

        this.goodsNode.node.active = false;
        this.receiveBtn.active = false;
        this.timerNode.active = false;
    },

    turnToTimer(url, placeId, receiveTime) {
        this.touchable = false;
        cc.loader.load(url, (err, texture) => {
            this.goodsNode.spriteFrame = new cc.SpriteFrame(texture);
        });
        this.timer = setTimeOutWithTimeStamp(receiveTime, (res) => {
            if (this.timerLabel) {
                this.timerLabel.string = res;
            } else {
                this.timer();
                this.timer = null;
            }
        }, () => {
            this.turnToReceive();
            delete this.data_item.goodId;
            delete this.data_item.goodExpectReceiveTime;
            this.timer();
            this.timer = null;
        })
        this.data_item.placeId = placeId;
        this.goodsNode.node.active = true;
        this.getNumNode.active = true;
        this.timerNode.active = true;

        this.showTimeNode.active = false;
        this.titleNode.active = false;
        this.receiveBtn.active = false;
    },

    turnToReceive() {
        this.touchable = false;
        this.goodsNode.node.active = true;
        this.receiveBtn.active = true;

        this.timerNode.active = false;
        this.showTimeNode.active = false;
        this.getNumNode.active = false;
        this.titleNode.active = false;
    },

    setTouch(callback, receiveCallback) {
        this.header.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.header.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();

        })
        this.header.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (callback && this.touchable) {
                callback(this.data_item);
            } else {
                Toast.show('请收取物品后再进行操作');
            }
            event.stopPropagation();
        })

        this.receiveBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.receiveBtn.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();

        })
        this.receiveBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (receiveCallback) {
                receiveCallback(this.data_item);
            }
            event.stopPropagation();
        })
    },

    initWithItem(item) {
        this.touchable = true;
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
            this.touchable = false;//背包是否可打开
            let iconPath = `${IMAGE_SERVER}/${item.icon}.png`;
            cc.loader.load(iconPath, (err, texture) => {
                this.goodsNode.spriteFrame = new cc.SpriteFrame(texture);
            });

            this.titleNode.active = false;
            this.goodsNode.node.active = true;
            this.showTimeNode.active = false;

            let nowTime = new Date().getTime();
            if (nowTime >= item.goodExpectReceiveTime) {//收取状态
                this.getNumNode.active = false;
                this.receiveBtn.active = true;
            } else {//定时状态
                this.timerNode.active = true;
                this.timer = setTimeOutWithTimeStamp(item.goodExpectReceiveTime, (res) => {
                    if (this.timerLabel) {
                        this.timerLabel.string = res;
                    } else {
                        this.timer();
                        this.timer = null;
                    }
                }, () => {
                    this.turnToReceive();
                    delete this.data_item.goodId;
                    delete this.data_item.goodExpectReceiveTime;
                    this.timer();
                    this.timer = null;
                })
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onDestory() {
        if (this.timer) {
            this.timer();
        }
    }

    // update (dt) {},
});
