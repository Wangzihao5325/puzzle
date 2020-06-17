// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hand: cc.Prefab
    },

    animateAtPoint(point) {
        if (this.handNode) {
            this.handNode.setPosition(point);
            this.handNode.active = true;
        } else {
            this.handNode = cc.instantiate(this.hand);
            this.handNode.scaleX = 0.7;
            this.handNode.scaleY = 0.7;
            this.node.zIndex = 1000;
            this.handNode.parent = this.node;
            this.handNode.setPosition(point);
            let obj = this.handNode.getComponent('guideHand');
            if (obj) {
                obj.circleAnimate();
            }
        }
    },

    animateDisappear() {
        if (this.handNode) {
            this.handNode.active = false;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
