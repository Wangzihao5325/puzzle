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

    // LIFE-CYCLE CALLBACKS:
    onTouchStart(event) {
        let originNode;
        let pos;
        let btn;
        if (CACHE.userInfo.stage == 2 && this.guideStep == 1) {//引导放置物品
            // 获取触摸点，转为Canvas画布上的坐标
            originNode = cc.find('Canvas/root/table');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/root/table/item_showcase_3/putongzhan');
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 2) {
            originNode = cc.find(`Canvas/bag/bagTable/scrollView/view/content`);
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find(`Canvas/bag/bagTable/scrollView/view/content/item_goods_0`);
        } else if (CACHE.userInfo.stage == 2 && this.guideStep == 3) {
            originNode = cc.find(`Canvas/root/footer_navi`);
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find(`Canvas/root/footer_navi/button_travel`);
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 1) {
            originNode = cc.find(`Canvas/root/heart`);
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find(`Canvas/root/heart/jiasu1`);
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 2) {
            originNode = cc.find(`Canvas/speedUpPop`);
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find(`Canvas/speedUpPop/bg`);
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 3) {
            originNode = cc.find(`Canvas/root/table`);
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find(`Canvas/root/table/item_showcase_3/putongzhan`);
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 4) {
            originNode = cc.find(`Canvas/root/table/item_showcase_3`);
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find(`Canvas/root/table/item_showcase_3/anniulan`);
        } else if (CACHE.userInfo.stage == 4 && this.guideStep == 5) {
            originNode = cc.find(`Canvas/root/footer_navi`);
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find(`Canvas/root/footer_navi/button_home`);
        }
        // 获取相应按钮的大小范围
        let rect = btn.getBoundingBox();
        // 判断触摸点是否在按钮上
        if (rect.contains(pos)) {
            if (CACHE.userInfo.stage == 2 && this.guideStep == 1) {
                setTimeout(() => {
                    this.handNode.setPosition(cc.v2(-200, 300));
                    this.guideStep++;
                }, 200);
            } else if (CACHE.userInfo.stage == 2 && this.guideStep == 2) {
                setTimeout(() => {
                    this.handNode.setPosition(cc.v2(0, -500));
                    this.guideStep++;
                }, 200);
            } else if (CACHE.userInfo.stage == 2 && this.guideStep == 3) {
                Api.guideStageComplete({ stage: 2 }, (res) => {
                    if (res.code == 0) {
                        CACHE.userInfo.stage++;
                    }
                });
            } else if (CACHE.userInfo.stage == 4 && this.guideStep == 1) {
                this.guideStep++;
                this.handNode.active = false;
                //增加提示框
            } else if (CACHE.userInfo.stage == 4 && this.guideStep == 2) {
                this.guideStep++;
                this.handNode.x = 0;
                this.handNode.y = 100;
                this.handNode.active = true;
            } else if (CACHE.userInfo.stage == 4 && this.guideStep == 3) {
                this.guideStep++;
                this.handNode.x = 0;
                this.handNode.y = -50;
                this.handNode.active = true;
            } else if (CACHE.userInfo.stage == 4 && this.guideStep == 4) {
                this.guideStep++;
                this.handNode.x = -200;
                this.handNode.y = -500;
                this.handNode.active = true;
                this.stepFiveAddExcal();
            } else if (CACHE.userInfo.stage == 4 && this.guideStep == 5) {
                this.guideStep++;
                CACHE.userInfo.stage++
            }
            // 允许触摸事件传递给按钮(允许冒泡)
            this.node._touchListener.setSwallowTouches(false);
        }
        else {
            // 吞噬触摸，禁止触摸事件传递给按钮(禁止冒泡)
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    onLoad() {
        if (!CHCHE.isShowGuide) {
            return;
        }
        if (CACHE.userInfo && typeof CACHE.userInfo.stage == 'number' && CACHE.userInfo.stage !== 99) {
            if (CACHE.userInfo.stage == 2) {
                this.isSetTouch = true;
                this.node.zIndex = 1000;
                this.guideStep = 1;
                this.guideToastStep = 1;
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
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);

                //this.guideToastStep = 1添加toast
            } else if (CACHE.userInfo.stage == 4) {
                this.isSetTouch = true;
                this.node.zIndex = 1000;
                this.guideStep = 1;
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
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            }
        }
    },

    start() {

    },

    // update (dt) {},
});
