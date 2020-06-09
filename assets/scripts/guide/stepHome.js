import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';


cc.Class({
    extends: cc.Component,

    properties: {
        hand: cc.Prefab,
    },

    onTouchStart(event) {
        let originNode;
        let pos;
        let btn;
        if (CACHE.userInfo.stage == 5 && this.guideStep == 1) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/rootWarp/my_home/bowlWarp');
        } else if (CACHE.userInfo.stage == 5 && (this.guideStep == 2 || this.guideStep == 3 || this.guideStep == 4 || this.guideStep == 5 || this.guideStep == 6)) {
            originNode = cc.find('Canvas/feedWarp/container/feedContent');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/feedWarp/container/feedContent/feedItem_2');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 7) {
            originNode = cc.find('Canvas/feedWarp/container');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/feedWarp/container/close');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 8) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/rootWarp/my_home/cat');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 9) {
            originNode = cc.find('Canvas/rootWarp/my_home/cat_action/container');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/rootWarp/my_home/cat_action/container/actionOut');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 10) {
            originNode = cc.find('Canvas/ConfirmOut');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/ConfirmOut/dialogContainer/confirm');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 11) {
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
        }
        let rect = btn.getBoundingBox();
        if (rect.contains(pos)) {
            if (CACHE.userInfo.stage == 5 && this.guideStep == 1) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, -400));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && (this.guideStep == 2 || this.guideStep == 3 || this.guideStep == 4 || this.guideStep == 5)) {
                this.guideStep++;
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 6) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(270, -230));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 7) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, 100));
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 8) {
                this.guideStep++;
                setTimeout(() => {
                    // let originNode = cc.find('Canvas');
                    // let positionNode = cc.find('Canvas/rootWarp/my_home/cat_action/container/actionOut');
                    // let pos = originNode.convertToNodeSpaceAR(event.getLocation());
                    this.handNode.setPosition(cc.v2(-70, 320));
                }, 500);
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 9) {
                this.guideStep++;
                setTimeout(() => {
                    this.handNode.setPosition(cc.v2(0, -220));
                }, 500);
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 10) {
                this.guideStep++;
                setTimeout(() => {
                    this.handNode.setPosition(cc.v2(0, -500));
                }, 500);
                this.node._touchListener.setSwallowTouches(false);
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 11) {
                Api.guideStageComplete({ stage: 5 }, (res) => {
                    if (res.code == 0) {
                        CACHE.userInfo.stage++;
                    }
                    this.guideStep++;
                    this.node._touchListener.setSwallowTouches(false);
                })
            } else if (CACHE.userInfo.stage == 7 && this.guideStep == 1) {
                //弹出一个页面再消失
                this.guideStep++;
                this.handNode.setPosition(cc.v2(150, 350));
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
                    if (res.code == 0) {
                        CACHE.userInfo.stage++;
                    }
                    this.guideStep++;
                    this.node._touchListener.setSwallowTouches(false);
                })
            }
        }
        else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    onLoad() {
        if (CACHE.userInfo && typeof CACHE.userInfo.stage == 'number' && CACHE.userInfo.stage !== 99) {
            if (CACHE.userInfo.stage == 5) {
                this.isSetTouch = true;
                this.node.zIndex = 1000;
                this.guideStep = 1;
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
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            }
        }
    },

    start() {

    },

});
