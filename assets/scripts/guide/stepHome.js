import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';
import { footerNaviPosition } from '../utils/utils';

cc.Class({
    extends: cc.Component,

    properties: {
        hand: cc.Prefab,
        guideToast: cc.Prefab,
        guideToastArrow: cc.Prefab,
        animateNode: cc.Node
    },

    onLoad() {
        if (!CACHE.isShowGuide) {
            return;
        }
        if (CACHE.userInfo && typeof CACHE.userInfo.stage == 'number' && CACHE.userInfo.stage !== 99) {
            if (CACHE.userInfo.stage == 5) {
                this.isSetTouch = true;
                this.node.zIndex = 1000;
                this.guideStep = 1;

                this.guideToastNode = cc.instantiate(this.guideToast);
                let guideToastObj = this.guideToastNode.getComponent('guideToast');
                if (guideToastObj) {
                    this.guideToastNode.item_obj = guideToastObj;
                    guideToastObj.setContentStr("<color=#887160>看把孩子给饿的，都变瘦了\n赶紧把罐头给小月半加满</color>");
                }
                this.guideToastNode.parent = this.node;
                this.guideToastNode.setPosition(0, -350);

                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            } else if (CACHE.userInfo.stage == 7) {
                this.isSetTouch = true;
                this.node.zIndex = 1000;
                this.guideStep = 1;
                let handPosition = cc.v2(-240, 100);

                this.handNode = cc.instantiate(this.hand);
                this.handNode.scaleX = 0.7;
                this.handNode.scaleY = 0.7;
                this.handNode.parent = this.node;
                this.handNode.setPosition(handPosition);
                let obj = this.handNode.getComponent('guideHand');
                if (obj) {
                    obj.handAnimate();
                }

                this.guideToastNode = cc.instantiate(this.guideToast);
                let guideToastObj = this.guideToastNode.getComponent('guideToast');
                if (guideToastObj) {
                    this.guideToastNode.item_obj = guideToastObj;
                    guideToastObj.setContentStr("<color=#887160>旅行获得的纪念品\n都在这里啦～</color>");
                }
                this.guideToastNode.parent = this.node;
                this.guideToastNode.setPosition(0, 300);

                this.guideToastTimer = setTimeout(() => {
                    this.guideToastNode.active = false;
                    this.guideToastTimer = null;
                }, 2000);

                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            }
        }
        if (CACHE.userInfo && typeof CACHE.userInfo.stage == 'number' && CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded) {
            this.isSetTouch = true;
            this.node.zIndex = 1000;
            this.guideStep = 1;
            let handPosition = cc.v2(-240, -190);

            this.handNode = cc.instantiate(this.hand);
            this.handNode.scaleX = 0.7;
            this.handNode.scaleY = 0.7;
            this.handNode.parent = this.node;
            this.handNode.setPosition(handPosition);
            let obj = this.handNode.getComponent('guideHand');
            if (obj) {
                obj.handAnimate();
            }
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        }
    },

    isUserPressIn(event) {
        let originNode;
        let pos;
        let btn;
        if (CACHE.userInfo.stage == 5 && this.guideStep == 1) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 2) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            btn = cc.find('Canvas/rootWarp/my_home/bowlWarp');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 3) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 4) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 5) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 5 && (this.guideStep == 6 || this.guideStep == 7 || this.guideStep == 8 || this.guideStep == 9 || this.guideStep == 10)) {
            originNode = cc.find('Canvas/feedWarp/container/feedContent');
            btn = cc.find('Canvas/feedWarp/container/feedContent/feedItem_2');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 11) {
            originNode = cc.find('Canvas/feedWarp/container');
            btn = cc.find('Canvas/feedWarp/container/close');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 12) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            btn = cc.find('Canvas/rootWarp/my_home/cat');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 13) {
            originNode = cc.find('Canvas/rootWarp/my_home/cat_action/container');
            btn = cc.find('Canvas/rootWarp/my_home/cat_action/container/actionOut');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 14) {
            originNode = cc.find('Canvas/ConfirmOut');
            btn = cc.find('Canvas/ConfirmOut/dialogContainer/confirm');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 15) {
            originNode = cc.find('Canvas/navi_footer');
            btn = cc.find('Canvas/navi_footer/button_travel');
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 1) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            btn = cc.find('Canvas/rootWarp/my_home/collact');
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 2) {
            originNode = cc.find('Canvas/collect_root/warp/content/tabContent');
            btn = cc.find('Canvas/collect_root/warp/content/tabContent/tabItem_1');
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 3) {
            originNode = cc.find('Canvas/collect_root/warp/header');
            btn = cc.find('Canvas/collect_root/warp/header/close');
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 4) {
            originNode = cc.find('Canvas/navi_footer');
            btn = cc.find('Canvas/navi_footer/button_travel');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 1) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            btn = cc.find('Canvas/rootWarp/my_home/recall');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 2) {
            originNode = cc.find('Canvas/recallDialog/warp/content/New ScrollView/view/content');
            btn = cc.find('Canvas/recallDialog/warp/content/New ScrollView/view/content/recall_item_0');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 3) {
            originNode = cc.find('Canvas/recallInfo/recallInfoContent/commentIcon');
            btn = cc.find('Canvas/recallInfo/recallInfoContent/commentIcon/icon-like');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 4) {
            originNode = cc.find('Canvas/recallInfo/recallInfoContent/header');
            btn = cc.find('Canvas/recallInfo/recallInfoContent/header/close');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 5) {
            originNode = cc.find('Canvas/recallDialog/warp/header');
            btn = cc.find('Canvas/recallDialog/warp/header/close');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 6) {
            originNode = cc.find('Canvas/navi_footer');
            btn = cc.find('Canvas/navi_footer/button_travel');
        }
        if (!originNode || !btn) {
            return false;
        }
        pos = originNode.convertToNodeSpaceAR(event.getLocation());
        let rect = btn.getBoundingBox();
        return rect.contains(pos);
    },

    guide(isEnd) {
        if (CACHE.userInfo.stage == 5 && this.guideStep == 1) {
            if (isEnd) {
                let handPosition = cc.v2(8, -100);
                this.handNode = cc.instantiate(this.hand);
                this.handNode.scaleX = 0.7;
                this.handNode.scaleY = 0.7;
                this.handNode.parent = this.node;
                this.handNode.setPosition(handPosition);
                let obj = this.handNode.getComponent('guideHand');
                if (obj) {
                    obj.handAnimate();
                }
                this.guideToastNode.active = false;
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 2) {
            if (isEnd) {
                this.handNode.active = false;
                this.guideToastNode.setPosition(cc.v2(0, -150));
                this.guideToastNode.item_obj.setContentStr("<color=#887160><color=#e37974>[高级猫粮]</color>可以大量增加<color=#e37974>饱食度</color>\n同时还可以增加<color=#e37974>幸运值</color>哦</color>")
                this.guideToastNode.active = true;
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 3) {
            if (isEnd) {
                this.guideToastNode.item_obj.setContentStr("<color=#887160><color=#e37974>幸运值</color>越高,猫咪外出获得\n物品的几率越大</color>")
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 4) {
            if (isEnd) {
                this.guideToastNode.item_obj.setContentStr("<color=#887160>使用高级猫粮把小月半喂饱\n吧</color>")
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 5) {
            if (isEnd) {
                this.guideToastNode.active = false;
                this.handNode.setPosition(cc.v2(0, -400));
                this.handNode.active = true;
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 5 && (this.guideStep == 6 || this.guideStep == 7 || this.guideStep == 8 || this.guideStep == 9)) {
            if (isEnd) {
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 10) {
            if (isEnd) {
                this.guideToastNode.setPosition(cc.v2(0, -150));
                this.guideToastNode.item_obj.setContentStr("<color=#887160>小月半吃饱了,\n走到门边抬头看着你</color>")
                this.guideToastNode.active = true;
                this.guideToastTimer = setTimeout(() => {
                    this.guideToastNode.active = false;
                    this.guideToastTimer = null;
                }, 2000);
                this.handNode.setPosition(cc.v2(270, -230));
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 11) {
            if (isEnd) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, 100));
            }
            return false;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 12) {
            if (isEnd) {
                this.guideStep++;
                setTimeout(() => {
                    this.handNode.setPosition(cc.v2(-70, 320));
                }, 500);
            }
            return false;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 13) {
            if (isEnd) {
                this.guideStep++;
                setTimeout(() => {
                    this.handNode.setPosition(cc.v2(0, -220));
                }, 500);
            }
            return false;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 14) {
            if (isEnd) {
                this.guideToastNode.setPosition(cc.v2(0, -150));
                this.guideToastNode.item_obj.setContentStr("<color=#887160>小猫猫出去旅行了,\n我们也继续<color=#e37974>[旅行]</color>吧</color>")
                this.guideToastNode.active = true;
                this.guideStep++;
                setTimeout(() => {
                    this.handNode.setPosition(footerNaviPosition('travel'));
                }, 500);
            }
            return false;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 15) {
            if (isEnd) {
                Api.guideStageComplete({ stage: 5 }, (res) => {
                })
                CACHE.userInfo.stage++;
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 1) {
            if (isEnd) {
                this.animateNode.active = true;
                this.handNode.active = false;
                setTimeout(() => {
                    cc.tween(this.animateNode)
                        .to(1, { opacity: 0 })
                        .start()
                    this.handNode.setPosition(cc.v2(150, 350));
                    this.handNode.active = true;
                }, 3000);
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 2) {
            if (isEnd) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(260, 460));
            }
            return false;
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 3) {
            if (isEnd) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, -500));
            }
            return false;
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 4) {
            if (isEnd) {
                Api.guideStageComplete({ stage: 7 }, (res) => {
                })
                CACHE.userInfo.stage++;
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 1) {
            if (isEnd) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, 200));
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 2) {
            if (isEnd) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(-260, -450));
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 3) {
            if (isEnd) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(280, 460));
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 4) {
            if (isEnd) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(250, 430));
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 5) {
            if (isEnd) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, -500));
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 6) {
            if (isEnd) {
                Api.guideStageSpecialComplete({ event: 1 }, (res) => { });
                CACHE.userInfo.firstRecallEnded = true;
            }
            return false;
        }
    },

    onTouchStart(event) {
        if (this.isUserPressIn(event)) {
            this.node._touchListener.setSwallowTouches(this.guide());
        } else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    onTouchMove() {
        this.node._touchListener.setSwallowTouches(true);
    },

    onTouchEnd(event) {
        if (this.isUserPressIn(event)) {
            this.node._touchListener.setSwallowTouches(this.guide(true));
        } else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },



});
