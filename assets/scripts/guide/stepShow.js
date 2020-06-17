import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';


cc.Class({
    extends: cc.Component,

    properties: {
        hand: cc.Prefab,
        excal: cc.Prefab,
        guideToast: cc.Prefab,
        guideToastArrow: cc.Prefab
    },

    onLoad() {
        if (!CACHE.isShowGuide) {
            return;
        }
        if (CACHE.userInfo && typeof CACHE.userInfo.stage == 'number' && CACHE.userInfo.stage !== 99) {
            if (CACHE.userInfo.stage == 2) {
                this.isSetTouch = true;
                this.node.zIndex = 1000;
                this.guideStep = 1;

                this.guideToastNode = cc.instantiate(this.guideToast);
                let guideToastObj = this.guideToastNode.getComponent('guideToast');
                if (guideToastObj) {
                    this.guideToastNode.item_obj = guideToastObj;
                    guideToastObj.setContentStr("<color=#887160>不同展台会产生不同收益\n猫粮展台可以获得<color=#e37974>[高级猫粮]</color>!\n快去试试吧!</color>");
                }
                this.guideToastNode.parent = this.node;
                this.guideToastNode.setPosition(0, -300);
                this.guideToastArrowNode = cc.instantiate(this.guideToastArrow);
                let arrowObj = this.guideToastArrowNode.getComponent('guideToastArrow');
                if (arrowObj) {
                    arrowObj.animate();
                }
                this.guideToastArrowNode.scaleX = 0.5;
                this.guideToastArrowNode.scaleY = 0.5;
                this.guideToastArrowNode.parent = this.node;
                this.guideToastArrowNode.setPosition(0, 200);
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            } else if (CACHE.userInfo.stage == 4) {
                this.isSetTouch = true;
                this.node.zIndex = 1000;
                this.guideStep = 1;

                this.guideToastNode = cc.instantiate(this.guideToast);
                let guideToastObj = this.guideToastNode.getComponent('guideToast');
                if (guideToastObj) {
                    this.guideToastNode.item_obj = guideToastObj;
                    guideToastObj.setContentStr("<color=#887160>哇！这么多人来看我们的展品！\nTA们的喜爱可以汇成<color=#e37974>喜爱度</color></color>");
                }
                this.guideToastNode.parent = this.node;
                this.guideToastNode.setPosition(0, 50);
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            }
        }
    },

    stepFiveAddExcal() {
        this.excalNode = cc.instantiate(this.excal);
        this.excalNode.scaleX = 0.7;
        this.excalNode.scaleY = 0.7;
        this.excalNode.parent = this.node;
        this.excalNode.setPosition(cc.v2(-200, -450));
        let obj = this.excalNode.getComponent('guideExcal');
        if (obj) {
            obj.animate();
        }
    },

    isUserPressIn(event) {
        let originNode;
        let pos;
        let btn;
        if (CACHE.userInfo.stage == 2 && this.guideStep == 1) {
            // 获取触摸点，转为Canvas画布上的坐标
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 2) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 3) {
            // 获取触摸点，转为Canvas画布上的坐标
            originNode = cc.find('Canvas/root/table');
            btn = cc.find('Canvas/root/table/item_showcase_3/putongzhan');
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 4) {
            originNode = cc.find(`Canvas/bag/bagTable/scrollView/view/content`);
            btn = cc.find(`Canvas/bag/bagTable/scrollView/view/content/item_goods_0`);
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 5) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 6) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 7) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 8) {
            originNode = cc.find(`Canvas/root/footer_navi`);
            btn = cc.find(`Canvas/root/footer_navi/button_travel`);
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 1) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 2) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 3) {
            originNode = cc.find(`Canvas/root/heart`);
            btn = cc.find(`Canvas/root/heart/jiasu1`);
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 4) {
            originNode = cc.find(`Canvas/speedUpPop/bg`);
            btn = cc.find(`Canvas/speedUpPop/bg/label3`);
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 5) {
            originNode = cc.find(`Canvas/root/table`);
            btn = cc.find(`Canvas/root/table/item_showcase_3/putongzhan`);
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 6) {
            originNode = cc.find(`Canvas/root/table/item_showcase_3`);
            btn = cc.find(`Canvas/root/table/item_showcase_3/anniulan`);
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 7) {
            originNode = cc.find(`Canvas/root/footer_navi`);
            btn = cc.find(`Canvas/root/footer_navi/button_home`);
        }
        if (!originNode || !btn) {
            return false;
        }
        pos = originNode.convertToNodeSpaceAR(event.getLocation());
        // 获取相应按钮的大小范围
        let rect = btn.getBoundingBox();
        return rect.contains(pos);
    },

    guide(isEnd) {
        if (CACHE.userInfo.stage == 2 && this.guideStep == 1) {
            if (isEnd) {
                this.guideToastNode.setPosition(0, -100);
                this.guideToastArrowNode.setPosition(100, 370);
                this.guideToastNode.item_obj.setContentStr("<color=#887160>参与主题展可以额外获得奖励哦！\n现在的主题是<color=#e37974>[美食节]</color>!\n快放一些<color=#e37974>[美食]</color>到展台上吧！</color>");
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 2) {
            if (isEnd) {
                let handPosition = cc.v2(0, 100);
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
                this.guideToastArrowNode.active = false;
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 3) {
            if (isEnd) {
                this.handNode.setPosition(cc.v2(-200, 300));
                this.guideToastNode.setPosition(0, 0);
                this.guideToastNode.item_obj.setContentStr("<color=#887160>选择一个美食，如果是<color=#e37974>稀有物品</color>!\n会获得<color=#e37974>双倍</color>收益哦！</color>");
                this.guideToastNode.active = true;
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 4) {
            if (isEnd) {
                this.handNode.active = false;
                this.guideToastNode.setPosition(0, -300);
                this.guideToastNode.item_obj.setContentStr("<color=#887160>时间到了就可以收获奖励啦～</color>");
                this.guideToastNode.active = true;
                this.guideToastArrowNode.setPosition(0, 0);
                this.guideToastArrowNode.active = true;
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 5) {
            if (isEnd) {
                this.guideToastNode.setPosition(0, -300);
                this.guideToastNode.item_obj.setContentStr("<color=#887160>打卡景点可以，有几率获得物品\n物品越丰富，越容易<color=#e37974>符合主题展览</color></color>");
                this.guideToastArrowNode.active = false;
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 6) {
            if (isEnd) {
                this.guideToastNode.item_obj.setContentStr("<color=#887160>快去旅行吧~~~</color>");
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 7) {
            if (isEnd) {
                this.guideToastNode.active = false;
                this.guideToastArrowNode.active = false;
                this.handNode.setPosition(cc.v2(0, -500));
                this.handNode.active = true;
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 8) {
            if (isEnd) {
                Api.guideStageComplete({ stage: 2 }, (res) => {
                });
                this.guideStep++;
                CACHE.userInfo.stage++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 1) {
            if (isEnd) {
                this.guideToastNode.item_obj.setContentStr("<color=#887160><color=#e37974>喜爱度</color>可以加速物品收获\n让我们来试一试吧</color>");
                this.guideStep++;
            }
            return true;
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 2) {
            if (isEnd) {
                let handPosition = cc.v2(250, -150);
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
            return false;
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 3) {
            if (isEnd) {
                this.handNode.active = false;
                this.guideToastNode.item_obj.setContentStr("<color=#887160>观看视频可以<color=#e37974>全部加速</color>～</color>");
                this.guideToastNode.active = true;
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 4) {
            if (isEnd) {
                this.handNode.x = 0;
                this.handNode.y = 100;
                this.handNode.active = true;
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 5) {
            if (isEnd) {
                this.handNode.x = 0;
                this.handNode.y = -50;
                this.handNode.active = true;
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 6) {
            if (isEnd) {
                this.handNode.x = -200;
                this.handNode.y = -500;
                this.handNode.active = true;
                this.stepFiveAddExcal();
                this.guideToastNode.setPosition(0, -100);
                this.guideToastNode.item_obj.setContentStr("<color=#887160>恭喜获得<color=#e37974>[高级猫粮]</color>\n家里的小月半饿坏了！\n快去喂它吧</color>");
                this.guideToastNode.active = true;
                this.guideStep++;
            }
            return false;
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 7) {
            if (isEnd) {
                this.guideStep++;
                CACHE.userInfo.stage++
            }
            return false;
        } else {
            return true;
        }
    },

    onTouchStart(event) {
        if (this.isUserPressIn(event)) {
            this.node._touchListener.setSwallowTouches(this.guide());
        }
        else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    onTouchMove(event) {
        this.node._touchListener.setSwallowTouches(true);
    },

    onTouchEnd(event) {
        if (this.isUserPressIn(event)) {
            this.node._touchListener.setSwallowTouches(this.guide(true));
        }
        else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },

});
