import { CACHE } from '../global/usual_cache';
cc.Class({
    extends: cc.Component,

    properties: {
        hand: cc.Prefab,
        excal: cc.Prefab,
        guideToast: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:
    stepTwoAddExcal() {
        this.excalNode = cc.instantiate(this.excal);
        this.excalNode.scaleX = 0.7;
        this.excalNode.scaleY = 0.7;
        this.excalNode.parent = this.node;
        this.excalNode.setPosition(cc.v2(200, -450));
        let obj = this.excalNode.getComponent('guideExcal');
        if (obj) {
            obj.animate();
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

    onLoad() {
        if (!CACHE.isShowGuide) {
            return;
        }
        if (CACHE.userInfo.stage !== 99) {
            let handPosition;
            switch (CACHE.userInfo.stage) {
                case 1:
                    handPosition = cc.v2(0, 0);
                    break;
                case 2:
                    {
                        handPosition = cc.v2(200, -500);
                        this.stepTwoAddExcal();

                        //提示展览厅开放
                        this.guideToast = cc.instantiate(this.guideToast);
                        let obj = this.guideToast.getComponent('guideToast');
                        if (obj) {
                            this.guideToast.item_obj = obj;
                            obj.setContentStr("<color=#887160>展览厅开放啦！</color>");
                        }
                        this.guideToast.parent = this.node;
                        this.guideToast.setPosition(0, -200);

                        this.guideToastTimer = setTimeout(() => {
                            if (this.guideToast) {
                                this.guideToast.active = false;
                            }
                        }, 2000)
                    }
                    break;
                case 3:
                    handPosition = cc.v2(0, 0);
                    break;
                case 4:
                    {
                        handPosition = cc.v2(200, -500);
                        this.stepTwoAddExcal();
                        //提示展厅来人
                        this.guideToast = cc.instantiate(this.guideToast);
                        let obj = this.guideToast.getComponent('guideToast');
                        if (obj) {
                            this.guideToast.item_obj = obj;
                            obj.setContentStr("<color=#887160>展览厅来了好多人，好热闹呀！\n我们快去看看吧</color>");
                        }
                        this.guideToast.parent = this.node;
                        this.guideToast.setPosition(0, -200);

                        this.guideToastTimer = setTimeout(() => {
                            if (this.guideToast) {
                                this.guideToast.active = false;
                            }
                        }, 2000)
                    }
                    break;
                case 5:
                    handPosition = cc.v2(-200, -500);
                    this.stepFiveAddExcal();
                    break;
                case 6:
                    handPosition = cc.v2(0, 0);
                    break;
                case 7:
                    {
                        handPosition = cc.v2(-200, -500);
                        this.stepFiveAddExcal();

                        this.guideToast = cc.instantiate(this.guideToast);
                        let obj = this.guideToast.getComponent('guideToast');
                        if (obj) {
                            this.guideToast.item_obj = obj;
                            obj.setContentStr("<color=#887160><color=#e37974>[收集]</color>已开启</color>");
                        }
                        this.guideToast.parent = this.node;
                        this.guideToast.setPosition(0, -200);

                        this.guideToastTimer = setTimeout(() => {
                            if (this.guideToast) {
                                this.guideToast.active = false;
                            }
                        }, 2000)
                    }
                    break;
            }
            this.isSetTouch = true;
            this.node.zIndex = 1000;
            this.guideStep = 1;

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

    onDestroy() {
        // 取消监听
        if (this.isSetTouch) {
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        }

        if (this.guideToastTimer) {
            clearTimeout(this.guideToastTimer);
        }
    },

    onTouchStart(event) {
        let originNode;
        let pos;
        let btn;
        if (CACHE.userInfo.stage == 1 || CACHE.userInfo.stage == 3 || CACHE.userInfo.stage == 6) {
            // 获取触摸点，转为Canvas画布上的坐标
            originNode = this.node.parent.parent;
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/map/view/content/bg/city_item-101/city_image');
        } else if (CACHE.userInfo.stage == 2 || CACHE.userInfo.stage == 4) {
            originNode = cc.find('Canvas/layoutRoot/footer_navi');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/layoutRoot/footer_navi/button_show');
        } else if (CACHE.userInfo.stage == 5 || CACHE.userInfo.stage == 7) {
            originNode = cc.find('Canvas/layoutRoot/footer_navi');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/layoutRoot/footer_navi/button_home');
        } else if (CACHE.userInfo.stage == 8) {
            //需要放一个动画
            originNode = cc.find('Canvas/layoutRoot/footer_navi');;
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/layoutRoot/footer_navi/button_home');
        }
        // 获取相应按钮的大小范围
        let rect = btn.getBoundingBox();
        // 判断触摸点是否在按钮上
        if (rect.contains(pos)) {
            // 允许触摸事件传递给按钮(允许冒泡)
            this.node._touchListener.setSwallowTouches(false);
        }
        else {
            // 吞噬触摸，禁止触摸事件传递给按钮(禁止冒泡)
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    guide() {
        if (this.guideStep == 1) {
            let sign = this.node.parent.getChildByName('signFloat');
            // 将frame节点移到第一个按钮
            this.handNode.setPosition(sign.position);
        }
        else if (this.guideStep == 2) {
            let location = this.node.parent.getChildByName('location');
            // 将frame节点移到第二个按钮
            this.handNode.setPosition(location.position);
        }
    },

    start() {

    },

    // update (dt) {},
});
