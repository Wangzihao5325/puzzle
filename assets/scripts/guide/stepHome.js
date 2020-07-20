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
                this.waitting = true;
                this.handNode.active = false;
                this.guideToastNode.setPosition(cc.v2(0, -150));
                this.guideToastNode.active = true;
                this.guideToastNode.item_obj.textAnimate1(() => { this.waitting = false });
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 3) {
            if (isEnd) {
                this.waitting = true;
                this.guideToastNode.item_obj.textAnimate2(() => { this.waitting = false });
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
                let pos = CACHE.platform.isIphoneX ? cc.v2(0, -450) : cc.v2(0, -400);
                this.handNode.setPosition(pos);
                this.handNode.active = true;
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 5 && (this.guideStep == 6 || this.guideStep == 7 || this.guideStep == 8 || this.guideStep == 9)) {
            if (this.guideStep == 6 && !isEnd) {
                let feedWarper = cc.find('Canvas/feedWarp');
                feedWarper.getComponent('feed').setFeedCallback((hungry) => {
                    if (hungry == 500) {
                        this.guideToastNode.setPosition(cc.v2(0, -150));
                        this.guideToastNode.item_obj.setContentStr("<color=#887160>小月半吃饱了,\n走到门边抬头看着你</color>")
                        this.guideToastNode.active = true;
                        this.guideToastTimer = setTimeout(() => {
                            this.guideToastNode.active = false;
                            this.guideToastTimer = null;
                        }, 2000);
                        let pos = CACHE.platform.isIphoneX ? cc.v2(270, -280) : cc.v2(270, -230);
                        this.handNode.setPosition(pos);
                        this.guideStep = 11;
                    }
                })
            }
            if (isEnd) {
                // this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 10) {
            if (isEnd) {
                // this.guideToastNode.setPosition(cc.v2(0, -150));
                // this.guideToastNode.item_obj.setContentStr("<color=#887160>小月半吃饱了,\n走到门边抬头看着你</color>")
                // this.guideToastNode.active = true;
                // this.guideToastTimer = setTimeout(() => {
                //     this.guideToastNode.active = false;
                //     this.guideToastTimer = null;
                // }, 2000);
                // let pos = CACHE.platform.isIphoneX ? cc.v2(270, -280) : cc.v2(270, -230);
                // this.handNode.setPosition(pos);
                // this.guideStep++;
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
                this.waitting = true;
                this.animateNode.active = true;
                this.handNode.active = false;
                setTimeout(() => {
                    cc.tween(this.animateNode)
                        .to(1, { opacity: 0 })
                        .call(() => {
                            this.handNode.active = false;
                            this.guideToastNode.setPosition(cc.v2(0, 0));
                            this.guideToastNode.item_obj.setContentStr("<color=#887160>通关<color=#e37974>[三星难度]</color>景点，\n会有<color=#e37974>[稀有]</color>物品掉落！</color>")
                            this.guideToastNode.active = true;
                        })
                        .delay(2)
                        .call(() => {
                            this.handNode.setPosition(cc.v2(150, 350));
                            this.handNode.active = true;
                            this.guideToastNode.active = false;
                            this.waitting = false;
                        })
                        .start()
                }, 3000);
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 2) {
            if (isEnd) {
                this.guideToastNode.setPosition(cc.v2(0, 100));
                this.guideToastNode.item_obj.setContentStr("<color=#887160>旅游过的景点都在这里</color>")
                this.guideToastNode.active = true;
                this.handNode.setPosition(cc.v2(260, 460));
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 7 && this.guideStep == 3) {
            if (isEnd) {
                this.guideToastNode.active = false;
                this.handNode.setPosition(footerNaviPosition('travel'));
                this.guideStep++;
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
                this.waitting = true;
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, 200));
                //展示引导文字
                this.guideToastNode = cc.instantiate(this.guideToast);
                let guideToastObj = this.guideToastNode.getComponent('guideToast');
                if (guideToastObj) {
                    this.guideToastNode.item_obj = guideToastObj;
                    guideToastObj.setContentStr("<color=#887160>旅行日志记录者满满的回忆</color>");
                }
                this.guideToastNode.parent = this.node;
                this.guideToastNode.setPosition(0, 0);
                this.guideToastTimer = setTimeout(() => {
                    cc.tween(this.guideToastNode)
                        .to(0.5, { opacity: 0 })
                        .call(() => {
                            this.guideToastTimer = null;
                            this.guideToastNode.active = false;
                            this.waitting = false;
                        })
                        .start();
                }, 1500);
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 2) {
            if (isEnd) {
                this.waitting = true;
                this.guideStep++;
                this.handNode.setPosition(cc.v2(-260, -450));

                let guideToastObj = this.guideToastNode.getComponent('guideToast');
                if (guideToastObj) {
                    this.guideToastNode.item_obj = guideToastObj;
                    guideToastObj.setContentStr("<color=#887160>旅行中遇到的每一个人，每\n一件事,每一个美景，都有\n可能成为一生中最难忘的</color>", true);
                }
                this.guideToastNode.setPosition(0, 0);
                this.guideToastNode.opacity = 255;
                this.guideToastNode.active = true;

                this.guideToastTimer = setTimeout(() => {
                    cc.tween(this.guideToastNode)
                        .to(0.5, { opacity: 0 })
                        .delay(0.5)
                        .call(() => {
                            this.guideToastNode.item_obj.setContentStr("<color=#887160>不要吝啬喜欢\n这里可以点赞!</color>");
                            this.guideToastNode.setPosition(-100, -300);
                            this.guideToastNode.opacity = 255;

                            this.guideToastTimer = null;
                            this.waitting = false;
                        })
                        .start();
                }, 1000);
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 3) {
            if (isEnd) {
                this.guideStep++;
                this.guideToastNode.item_obj.setContentStr("<color=#887160>去更多的地方旅行,\n留下美好的回忆吧!</color>");
                this.guideToastNode.setPosition(100, 0);
                this.handNode.setPosition(cc.v2(280, 460));
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 4) {
            if (isEnd) {
                this.guideStep++;
                this.guideToastNode.active = false;
                this.handNode.setPosition(cc.v2(250, 430));
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 5) {
            if (isEnd) {
                this.guideStep++;
                this.handNode.setPosition(footerNaviPosition('travel'));
            }
            return false;
        } else if (CACHE.userInfo.stage == 99 && !CACHE.userInfo.firstRecallEnded && this.guideStep == 6) {
            if (isEnd) {
                CACHE.userInfo.firstRecallEnded = true;
                Api.guideStageSpecialComplete({ event: 1 }, (res) => { });
                /*在最后调取猫咪回来接口，防止冲突
                let homeNode = cc.find('Canvas');
                let homeObj = homeNode.getComponent('home_index');
                if (homeObj) {
                    homeObj.getBackNotice();
                }
                */
            }
            return false;
        }
    },

    onTouchStart(event) {
        if (this.waitting) {
            this.node._touchListener.setSwallowTouches(true);
            return;
        }
        this._isPressIn = this.isUserPressIn(event);
        if (this._isPressIn) {
            this.node._touchListener.setSwallowTouches(this.guide());
        } else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    onTouchMove() {
        this.node._touchListener.setSwallowTouches(true);
    },

    onTouchEnd(event) {
        if (this.waitting) {
            this.node._touchListener.setSwallowTouches(true);
            return;
        }
        if (this._isPressIn && this.isUserPressIn(event)) {
            this.node._touchListener.setSwallowTouches(this.guide(true));
        } else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },



});
