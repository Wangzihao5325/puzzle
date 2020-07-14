import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';

cc.Class({
    extends: cc.Component,

    properties: {
        hand: cc.Prefab,
        guideToast: cc.Prefab,
        guideToastArrow: cc.Prefab,
        zuan1: cc.Node,
        zuan2: cc.Node,
        zuan3: cc.Node,
        zuan4: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (!CACHE.userInfo.firstRewardTaskEnded) {
            this.guideToastArrowNode = cc.instantiate(this.guideToastArrow);
            let arrowObj = this.guideToastArrowNode.getComponent('guideToastArrow');
            if (arrowObj) {
                arrowObj.animate();
            }
            this.guideToastArrowNode.scaleX = 0.5;
            this.guideToastArrowNode.scaleY = 0.5;
            this.guideToastArrowNode.angle = 180;
            this.guideToastArrowNode.parent = this.node;
            let height = cc.view.getVisibleSize().height;
            this.guideToastArrowNode.setPosition(0, height / 2 - 60);

            this.guideToastNode = cc.instantiate(this.guideToast);
            let obj = this.guideToastNode.getComponent('guideToast');
            if (obj) {
                this.guideToastNode.item_obj = obj;
                obj.setContentStr("<color=#887160>累计通关关卡的星星，\n是开启奖励关卡的条件</color>");
            }
            this.guideToastNode.parent = this.node;
            this.guideToastNode.setPosition(0, 400);

            this.guideStep = 1;

            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        }
    },

    start() {

    },

    // update (dt) {},

    isUserPressIn(event) {
        let originNode;
        let pos;
        let btn;
        if (this.guideStep == 1) {
            originNode = cc.find('Canvas');
            btn = cc.find('Canvas/guide');
        } else if (this.guideStep == 2) {
            originNode = cc.find('Canvas/root/content');
            btn = cc.find('Canvas/root/content/goBtn');
        } else {
            return true;
        }
        if (!originNode || !btn) {
            return false;
        }
        pos = originNode.convertToNodeSpaceAR(event.getLocation());
        let rect = btn.getBoundingBox();
        return rect.contains(pos);
    },

    onTouchStart(event) {
        if (this.waiting) {
            this.node._touchListener.setSwallowTouches(true);
            return;
        }
        if (this.isUserPressIn(event)) {
            this.node._touchListener.setSwallowTouches(this.guide());
        } else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    onTouchMove(event) {
        if (this.waiting) {
            this.node._touchListener.setSwallowTouches(true);
            return;
        }
        this.node._touchListener.setSwallowTouches(true);
    },

    onTouchEnd(event) {
        if (this.waiting) {
            this.node._touchListener.setSwallowTouches(true);
            return;
        }
        // 判断触摸点是否在按钮上
        if (this.isUserPressIn(event)) {
            this.node._touchListener.setSwallowTouches(this.guide(true));
        }
        else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },



    guide(isEnd) {
        if (this.guideStep == 1) {
            if (isEnd) {
                this.guideStep++;
                this.guideToastArrowNode.active = false;
                this.guideToastNode.setPosition(0, -350);
                this.guideToastNode.item_obj.setContentStr("<color=#887160>每拼成一个区域，\n都将获得<color=#e37974>【钻石】</color>宝藏！\n总共4份</color>");
                this.waiting = true;
                cc.tween(this.zuan1)
                    .call(() => {
                        this.zuan1.active = true;
                        this.guideToastArrowNode.active = true;
                        this.guideToastArrowNode.angle = -90;
                        this.guideToastArrowNode.setPosition(-87, 282);
                    })
                    .delay(0.3)
                    .to(0.3, { scale: 2, opacity: 0 })
                    .start();

                cc.tween(this.zuan2)
                    .delay(0.6)
                    .call(() => {
                        this.zuan2.active = true;
                        this.guideToastArrowNode.setPosition(84, 282);
                    })
                    .delay(0.3)
                    .to(0.3, { scale: 2, opacity: 0 })
                    .start();

                cc.tween(this.zuan3)
                    .delay(1.2)
                    .call(() => {
                        this.zuan3.active = true;
                        this.guideToastArrowNode.setPosition(-87, 58);
                    })
                    .delay(0.3)
                    .to(0.3, { scale: 2, opacity: 0 })
                    .start();

                cc.tween(this.zuan4)
                    .delay(1.8)
                    .call(() => {
                        this.zuan4.active = true;
                        this.guideToastArrowNode.setPosition(79, 55);
                    })
                    .delay(0.3)
                    .to(0.3, { scale: 2, opacity: 0 })
                    .call(() => {
                        this.guideToastArrowNode.active = false;
                        this.guideToastNode.item_obj.setContentStr("<color=#887160>快去赢钻石吧!</color>");
                        setTimeout(() => {
                            this.waiting = false;
                            this.guideToastNode.active = false;
                            this.handNode = cc.instantiate(this.hand);
                            this.handNode.scaleX = 0.7;
                            this.handNode.scaleY = 0.7;
                            this.handNode.parent = this.node;
                            let handPosition = cc.v2(0, -320);
                            this.handNode.setPosition(handPosition);
                            let obj = this.handNode.getComponent('guideHand');
                            if (obj) {
                                obj.handAnimate();
                            }
                        }, 2000)
                    })
                    .start();
            }
            return true;
        } else if (this.guideStep == 2) {
            if (isEnd) {
                this.guideStep++;
                this.handNode.active = false;
                CACHE.userInfo.firstRewardTaskEnded = true;
                Api.guideStageSpecialComplete({ event: 3 }, (res) => { });
            }
            return false
        } else {
            return false
        }
    },
});
