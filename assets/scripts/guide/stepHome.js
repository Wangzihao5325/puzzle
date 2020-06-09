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
        } else if (CACHE.userInfo.stage == 5 && (this.guideStep == 2 || this.guideStep == 3 || this.guideStep == 4 || this.guideStep == 5)) {
            originNode = cc.find('Canvas/feedWarp/container/feedContent');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/feedWarp/container/feedContent/feedItem_2');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 6) {
            originNode = cc.find('Canvas/feedWarp/container');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/feedWarp/container/close');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 7) {
            originNode = cc.find('Canvas/rootWarp/my_home');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/rootWarp/my_home/cat');
        } else if (CACHE.userInfo.stage == 5 && this.guideStep == 8) {
            originNode = cc.find('Canvas/rootWarp/my_home/cat_action/container');
            pos = originNode.convertToNodeSpaceAR(event.getLocation());
            btn = cc.find('Canvas/rootWarp/my_home/cat_action/container/actionOut');
        }
        let rect = btn.getBoundingBox();
        if (rect.contains(pos)) {
            if (CACHE.userInfo.stage == 5 && this.guideStep == 1) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, -400));
                //增加提示
            } else if (CACHE.userInfo.stage == 5 && (this.guideStep == 2 || this.guideStep == 3 || this.guideStep == 4)) {
                this.guideStep++;
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 5) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(270, -230));
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 6) {
                this.guideStep++;
                this.handNode.setPosition(cc.v2(0, 100));
            } else if (CACHE.userInfo.stage == 5 && this.guideStep == 7) {
                this.guideStep++;
                setTimeout(() => {
                    let positionNode = cc.find('Canvas/rootWarp/my_home/cat_action/container/actionOut');
                    this.handNode.setPosition(cc.v2(positionNode.x, positionNode.y));
                }, 200);
            }
            this.node._touchListener.setSwallowTouches(false);
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
            }
        }
    },

    start() {

    },

});
