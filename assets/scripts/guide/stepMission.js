import { CACHE } from '../global/usual_cache';
cc.Class({
    extends: cc.Component,

    properties: {
        hand: cc.Prefab,
    },
    /**
     * CACHE.userInfo.stage =1
     * guideStep 
     *           1->第一步 到mission场景选择第一个关卡
     */

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (!CACHE.isShowGuide) {
            return;
        }
        if (CACHE.userInfo && CACHE.userInfo.stage !== 99) {
            if (CACHE.userInfo && CACHE.userInfo.stage === 1) {
                this.isSetTouch = true;
                this.node.zIndex = 10000;
                this.guideStep = 1;
                this.handNode = cc.instantiate(this.hand);
                this.handNode.scaleX = 0.7;
                this.handNode.scaleY = 0.7;
                this.handNode.parent = this.node;
                this.handNode.setPosition(cc.v2(-160, 60));
                let obj = this.handNode.getComponent('guideHand');
                if (obj) {
                    obj.handAnimate();
                }
                // 触摸监听
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            } else if (CACHE.userInfo && CACHE.userInfo.stage === 3) {
                this.isSetTouch = true;
                this.node.zIndex = 10000;
                this.guideStep = 1;
                this.handNode = cc.instantiate(this.hand);
                this.handNode.scaleX = 0.7;
                this.handNode.scaleY = 0.7;
                this.handNode.parent = this.node;
                this.handNode.setPosition(cc.v2(160, 60));
                let obj = this.handNode.getComponent('guideHand');
                if (obj) {
                    obj.handAnimate();
                }
                // 触摸监听
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            } else if (CACHE.userInfo && CACHE.userInfo.stage === 6) {
                this.isSetTouch = true;
                this.node.zIndex = 10000;
                this.guideStep = 1;
                this.handNode = cc.instantiate(this.hand);
                this.handNode.scaleX = 0.7;
                this.handNode.scaleY = 0.7;
                this.handNode.parent = this.node;
                this.handNode.setPosition(cc.v2(-160, -300));
                let obj = this.handNode.getComponent('guideHand');
                if (obj) {
                    obj.handAnimate();
                }
                // 触摸监听
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            }
        }
    },

    onDestroy() {
        // 取消监听
        if (this.isSetTouch) {
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        }
    },

    onTouchStart(event) {
        let originNode;
        let pos;
        let btn;
        if (CACHE.userInfo.stage === 1 && this.guideStep == 1) {
            originNode = cc.find('Canvas/root/missionScrollView/view/content');
            btn = cc.find('Canvas/root/missionScrollView/view/content/mission_item-101001');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        } else if (CACHE.userInfo.stage === 1 && this.guideStep == 2) {
            originNode = this.node.parent;
            btn = cc.find('Canvas/root/mission_level/anniuju');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        } else if (CACHE.userInfo.stage === 3 && this.guideStep == 1) {
            originNode = cc.find('Canvas/root/missionScrollView/view/content');
            btn = cc.find('Canvas/root/missionScrollView/view/content/mission_item-101002');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        } else if (CACHE.userInfo.stage === 3 && this.guideStep == 2) {
            originNode = this.node.parent;
            btn = cc.find('Canvas/root/mission_level/anniuju');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        } else if (CACHE.userInfo.stage === 6 && this.guideStep == 1) {
            originNode = cc.find('Canvas/root/missionScrollView/view/content');
            btn = cc.find('Canvas/root/missionScrollView/view/content/mission_item-101003');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        } else if (CACHE.userInfo.stage === 6 && this.guideStep == 2) {
            originNode = this.node.parent;
            btn = cc.find('Canvas/root/mission_level/anniuju');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        }
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

    onTouchMove(event) {
        this.node._touchListener.setSwallowTouches(true);
    },

    onTouchEnd(event) {
        let originNode;
        let pos;
        let btn;
        if (CACHE.userInfo.stage === 1 && this.guideStep == 1) {
            originNode = cc.find('Canvas/root/missionScrollView/view/content');
            btn = cc.find('Canvas/root/missionScrollView/view/content/mission_item-101001');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        } else if (CACHE.userInfo.stage === 1 && this.guideStep == 2) {
            originNode = this.node.parent;
            btn = cc.find('Canvas/root/mission_level/anniuju');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        } else if (CACHE.userInfo.stage === 3 && this.guideStep == 1) {
            originNode = cc.find('Canvas/root/missionScrollView/view/content');
            btn = cc.find('Canvas/root/missionScrollView/view/content/mission_item-101002');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        } else if (CACHE.userInfo.stage === 3 && this.guideStep == 2) {
            originNode = this.node.parent;
            btn = cc.find('Canvas/root/mission_level/anniuju');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        } else if (CACHE.userInfo.stage === 6 && this.guideStep == 1) {
            originNode = cc.find('Canvas/root/missionScrollView/view/content');
            btn = cc.find('Canvas/root/missionScrollView/view/content/mission_item-101003');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        } else if (CACHE.userInfo.stage === 6 && this.guideStep == 2) {
            originNode = this.node.parent;
            btn = cc.find('Canvas/root/mission_level/anniuju');
            if (!originNode || !btn) {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
        }
        let rect = btn.getBoundingBox();
        // 判断触摸点是否在按钮上
        if (rect.contains(pos)) {
            // 允许触摸事件传递给按钮(允许冒泡)
            this.node._touchListener.setSwallowTouches(false);
            this.guideStep++;
            this.guide();
        }
        else {
            // 吞噬触摸，禁止触摸事件传递给按钮(禁止冒泡)
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    guide() {
        //1缺省默认
        if (this.guideStep == 2) {
            //let location = cc.find('Canvas/root/mission_level/anniuju');
            // 将frame节点移到第二个按钮
            this.handNode.setPosition(cc.v2(0, -260));
        }
    },

    start() {

    },

    // update (dt) {},
});
