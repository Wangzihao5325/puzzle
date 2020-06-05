import { IMAGE_SERVER } from '../global/app_global_index';
import { setTimeOutWithTimeStamp, setTimeOutWithTimeout, setTimeOutWithStartEnd } from '../utils/utils';
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';
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
        timerLabel: cc.Label,
        timerBg: cc.Sprite,

        lockNode: cc.Node,
        lockTitle: cc.Label,
        lockMission: cc.Label,
        loackMask: cc.Sprite
    },

    turnToUnplace() {
        this.touchable = true;
        this.titleNode.active = true;
        this.getNumNode.active = true;
        this.showTimeNode.active = true;

        this.goodsNode.node.active = false;
        this.receiveBtn.active = false;
        this.timerNode.active = false;
        CACHE.isShowOn[this.data_index] = false;
    },

    turnToTimer(url, placeId, receiveTime) {
        this.touchable = false;
        CACHE.isShowOn[this.data_index] = true;
        cc.loader.load(url, (err, texture) => {
            this.goodsNode.spriteFrame = new cc.SpriteFrame(texture);
        });
        this.timer = setTimeOutWithTimeStamp(receiveTime, (res, time) => {
            this.timeLeft = time;
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

    turnToTimerForSpeedUp(placeId, receiveTime) {
        this.touchable = false;
        CACHE.isShowOn[this.data_index] = true;
        this.timer = setTimeOutWithTimeout(receiveTime, (res, time) => {
            this.timeLeft = time;
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

    setTouch(callback, receiveCallback, speedUpCallback) {
        this.header.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.header.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();

        })
        this.header.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (this.timer && CACHE.isShouwSpeedUp) {
                Api.showSpeedUp({ placeId: this.data_item.placeId }, (res) => {
                    CACHE.isShouwSpeedUp = false;
                    const data = res.data
                    if (data) {
                        //一套缩减时间动画
                        if (data.goodReceiveRemainTime > 0) {//大于0缩减时间
                            if (this.timer) {
                                this.timer();
                                this.timer = null;
                            }
                            this.timerLabel.node.color = cc.color(255, 0, 0);
                            this.timerBg.node.color = cc.color(252, 241, 181);
                            this.timerBg.node.opacity = 255;
                            this.shortTimer = setTimeOutWithStartEnd(this.timeLeft, Math.floor(data.goodReceiveRemainTime / 1000), (res) => {
                                if (this.timerLabel) {
                                    this.timerLabel.string = res;
                                } else {
                                    this.shortTimer();
                                    this.shortTimer = null;
                                }
                            }, () => {
                                this.timerLabel.node.color = cc.color(255, 255, 255);
                                this.timerBg.node.color = cc.color(0, 0, 0);
                                this.timerBg.node.opacity = 100;
                                this.turnToTimerForSpeedUp(data.placeId, data.goodReceiveRemainTime);
                            })
                        } else {//小于0
                            if (this.timer) {
                                this.timer();
                                this.timer = null;
                            }
                            this.timerLabel.color = cc.color(255, 0, 0);
                            this.timerBg.node.color = cc.color(252, 241, 181);
                            this.timerBg.node.opacity = 255;
                            this.shortTimer = setTimeOutWithStartEnd(this.timeLeft, Math.floor(data.goodReceiveRemainTime / 1000), (res) => {
                                if (this.timerLabel) {
                                    this.timerLabel.string = res;
                                } else {
                                    this.shortTimer();
                                    this.shortTimer = null;
                                }
                            }, () => {
                                this.timerLabel.color = cc.color(255, 255, 255);
                                this.timerBg.node.color = cc.color(0, 0, 0);
                                this.timerBg.node.opacity = 100;
                                this.turnToReceive();
                                delete this.data_item.goodId;
                                delete this.data_item.goodExpectReceiveTime;
                            })
                        }
                    }
                    speedUpCallback(this.data_item)
                });
            } else {
                if (callback && this.touchable) {
                    callback(this.data_item);
                } else {
                    Toast.show('请收取物品后再进行操作');
                }
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

    maskSetTouch() {
        this.lockNode.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.lockNode.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();

        })
        this.lockNode.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (this.data_item.standId == 1) {
                Toast.show('到达北京解锁');
            } else if (this.data_item.standId == 2) {
                // Toast.show('花费钻石解锁哦');
                if (CACHE.userData.gem >= 200) {
                    Api.openGemShowcase({ key: 1 }, (res) => {
                        if (res.success) {
                            //开放展台
                            Toast.show('已花费200钻石解锁钻石展台!');
                            this.data_item.unlocked = true;
                            this.lockNode.active = false;
                        }
                    })
                } else {
                    Toast.show('需要200钻石才能解锁哦!');
                }
            }
            event.stopPropagation();
        })
    },

    initWithItem(item, index) {
        this.touchable = true;
        this.data_item = item;
        this.data_index = index;
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
                cc.loader.loadRes("normal/weiyang", cc.SpriteFrame, (err, spriteFrame) => {
                    this.iconSprite.spriteFrame = spriteFrame;
                    this.iconSprite2.spriteFrame = spriteFrame;
                    this.timerIcon.spriteFrame = spriteFrame;
                });
                break;
        }

        if (!item.unlocked) {//是否解锁
            this.lockTitle.string = item.standName;
            let lockMissionStr = '';
            switch (item.standId) {
                case 1:
                    lockMissionStr = '到达北京解锁';
                    break;
                case 2:
                    lockMissionStr = '消耗200钻石';
                    break;
            }
            this.lockMission.string = lockMissionStr;
            this.lockNode.active = true;
            this.maskSetTouch();
        } else {
            this.lockNode.active = false;
        }

        if (item.goodId) {
            CACHE.isShowOn[index] = true;
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
                this.timer = setTimeOutWithTimeStamp(item.goodExpectReceiveTime, (res, time) => {
                    this.timeLeft = time;
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
                    CACHE.isShowOn[this.data_index] = false;
                    this.timer();
                    this.timer = null;
                })
            }
        } else {
            CACHE.isShowOn[index] = false;
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
