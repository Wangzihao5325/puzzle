import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';


cc.Class({
    extends: cc.Component,

    properties: {
        hand: cc.Prefab,
        guideToast: cc.Prefab,
        guideToastArrow: cc.Prefab,
        animateNode: cc.Node
    },

    onTouchStart(event) {
        let originNode;
        let pos;
        let btn;
        if (CACHE.userInfo.stage == 5 && this.guideStep == 1) {
            originNode = cc.find('Canvas');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 2) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/rootWarp/my_home/bowlWarp');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 3) {
            originNode = cc.find('Canvas');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 4) {
            originNode = cc.find('Canvas');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 5) {
            originNode = cc.find('Canvas');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 5 && (this.guideStep == 6 || this.guideStep == 7 || this.guideStep == 8 || this.guideStep == 9 || this.guideStep == 10)) {
            originNode = cc.find('Canvas/feedWarp/container/feedContent');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/feedWarp/container/feedContent/feedItem_2');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 11) {
            originNode = cc.find('Canvas/feedWarp/container');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/feedWarp/container/close');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 12) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/rootWarp/my_home/cat');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 13) {
            originNode = cc.find('Canvas/rootWarp/my_home/cat_action/container');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/rootWarp/my_home/cat_action/container/actionOut');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 14) {
            originNode = cc.find('Canvas/ConfirmOut');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/ConfirmOut/dialogContainer/confirm');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 15) {
            originNode = cc.find('Canvas/navi_footer');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/navi_footer/button_travel');
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 1) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/rootWarp/my_home/collact');
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 2) {
            originNode = cc.find('Canvas/collect_root/warp/content/tabContent');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/collect_root/warp/content/tabContent/tabItem_1');
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 3) {
            originNode = cc.find('Canvas/collect_root/warp/header');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/collect_root/warp/header/close');
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 4) {
            originNode = cc.find('Canvas/navi_footer');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/navi_footer/button_travel');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 1) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/rootWarp/my_home/recall');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 2) {
            originNode = cc.find('Canvas/recallDialog/warp/content/New ScrollView/view/content');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/recallDialog/warp/content/New ScrollView/view/content/recall_item_0');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 3) {
            originNode = cc.find('Canvas/recallInfo/recallInfoContent/commentIcon');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/recallInfo/recallInfoContent/commentIcon/icon-like');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 4) {
            originNode = cc.find('Canvas/recallInfo/recallInfoContent/header');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/recallInfo/recallInfoContent/header/close');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 5) {
            originNode = cc.find('Canvas/recallDialog/warp/header');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/recallDialog/warp/header/close');
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 6) {
            originNode = cc.find('Canvas/navi_footer');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/navi_footer/button_travel');
        }
        let rect = btn.getBoundingBox();
        if (rect.contains(pos)) {
            if (CACHE.userInfo.stage == 5 && this.guideStep == 1) {
                let handPosition = cc.v2(8, -230);
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
                this.node._touchListener.setSwallowTouches(true);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 2) {
                this.handNode.active = false;
                this.guideToastNode.setPosition(cc.v2(0, -150));
                this.guideToastNode.item_obj.setContentStr("<color=#887160><color=#e37974>[高级猫粮]</color>可以大量增加<color=#e37974>饱食度</color>\n同时还可以增加<color=#e37974>幸运值</color>哦</color>")
                this.guideToastNode.active = true;

                this.guideStep++;
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 3) {
                this.guideToastNode.item_obj.setContentStr("<color=#887160><color=#e37974>幸运值</color>越高,猫咪外出获得\n物品的几率越大</color>")
                this.guideStep++;
                this.node._touchListener.setSwallowTouches(true);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 4) {
                this.guideToastNode.item_obj.setContentStr("<color=#887160>使用高级猫粮把小月半喂饱\n吧</color>")
                this.guideStep++;
                this.node._touchListener.setSwallowTouches(true);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 5) {
                this.guideToastNode.active = false;
                this.handNode.setPosition(cc.v2(0, -400));
                this.handNode.active = true;
                this.guideStep++;
                this.node._touchListener.setSwallowTouches(true);
            } else if (CACHE.userInfo.stage == 5 && (this.guideStep == 6 || this.guideStep == 7 || this.guideStep == 8 || this.guideStep == 9)) {
                this.guideStep++;
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 10) {
                this.guideToastNode.setPosition(cc.v2(0, -150));
                this.guideToastNode.item_obj.setContentStr("<color=#887160>小月半吃饱了,\n走到门边抬头看着你</color>")
                this.guideToastNode.active = true;
                this.guideToastTimer = setTimeout(() => {
                    this.guideToastNode.active = false;
                    this.guideToastTimer = null;
                }, 2000);
                this.handNode.setPosition(cc.v2(270, -230));
                this.guideStep++;
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 11) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, 100));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 12) {
                this.guideStep++;
                setTimeout(() => {
                    this.handNode.setPosition(cc.v2(-70, 320));
                }, 500);
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 13) {
                this.guideStep++;
                setTimeout(() => {
                    this.handNode.setPosition(cc.v2(0, -220));
                }, 500);
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 14) {
                this.guideToastNode.setPosition(cc.v2(0, -150));
                this.guideToastNode.item_obj.setContentStr("<color=#887160>小猫猫出去旅行了,\n我们也继续<color=#e37974>[旅行]</color>吧</color>")
                this.guideToastNode.active = true;
                this.guideStep++;
                setTimeout(() => {
                    this.handNode.setPosition(cc.v2(0, -500));
                }, 500);
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 15) {
                Api.guideStageComplete({ stage: 5 }, (res) => {
                })
                CACHE.userInfo.stage++;
                this.guideStep++;
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 7 && this.guideStep == 1) {
                //弹出一个页面再消失
                this.animateNode.active = true;
                setTimeout(() => {
                    cc.tween(this.animateNode)
                        .to(1, { opacity: 0 })
                        .start()
                    this.handNode.setPosition(cc.v2(150, 350));
                }, 1000);
                this.guideStep++;
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 7 && this.guideStep == 2) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(260, 460));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 7 && this.guideStep == 3) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, -500));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 7 && this.guideStep == 4) {
                Api.guideStageComplete({ stage: 7 }, (res) => {
                })
                // CACHE.userInfo.stage = 99;
                CACHE.userInfo.stage++;
                this.guideStep++;
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 1) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, 200));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 2) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(-260, -450));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 3) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(280, 460));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 4) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(250, 430));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 5) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, -500));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 6) {
                Api.guideStageSpecialComplete({ event: 1 }, (res) => {
                    if (res.code == 0) {
                        CACHE.userInfo.firstRecallEnded = true;
                    }
                    this.node._touchListener.setSwallowTouches(false);
                });
            }
        }
        else {
            this.node._touchListener.setSwallowTouches(true);
        }
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
        }
    },

    start() {

    },

});
