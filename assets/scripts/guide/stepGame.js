import { CACHE } from '../global/usual_cache'
cc.Class({
    extends: cc.Component,

    properties: {
        handSlip: cc.Prefab,
        hand: cc.Prefab,
    },

    awardDone() {
        this.guideStep++;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.handNode.active = false;
        Toast.show('已经掉落啦');
    },

    showDone() {
        this.guideStep++;
        this.handPressNode = cc.instantiate(this.hand);
        this.handPressNode.scaleX = 0.7;
        this.handPressNode.scaleY = 0.7;
        this.handPressNode.parent = this.node;
        this.handPressNode.setPosition(-230, 480);
        let obj = this.handPressNode.getComponent('guideHand');
        if (obj) {
            obj.handAnimate();
        }
    },

    failedDone() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.handNode.active = false;
    },

    rebornDone() {
        this.timer = setTimeout(() => {
            if (this.handNode) {
                this.handNode.active = true;
            }
        }, 10000);
    },


    onTouchStart(event) {
        if (this.guideStep == 1) {
            if (this.handNode) {
                this.handNode.active = false;
                if (!this.timer) {
                    this.timer = setTimeout(() => {
                        if (this.handNode) {
                            this.handNode.active = true;
                        }
                    }, 10000);
                } else {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        if (this.handNode) {
                            this.handNode.active = true;
                        }
                    }, 10000);
                }
            }
            this.node._touchListener.setSwallowTouches(false);
        }
    },

    onLoad() {
        if (CACHE.userInfo && typeof CACHE.userInfo.stage == 'number' && CACHE.userInfo.stage !== 99) {
            if (CACHE.userInfo.stage == 1) {
                this.isSetTouch = true;
                this.node.zIndex = 10000;
                this.guideStep = 1;

                this.handNode = cc.instantiate(this.handSlip);
                this.handNode.scaleX = 0.7;
                this.handNode.scaleY = 0.7;
                this.handNode.parent = this.node;
                this.handNode.setPosition(cc.v2(-250, -500));
                let obj = this.handNode.getComponent('pluzzeGuide');
                if (obj) {
                    obj.handAnimate();
                }

                //设置callback
                let conraol = cc.find('Canvas/root/menuWarp');
                if (conraol) {
                    let conraolComponent = conraol.getComponent('conraol');
                    if (conraolComponent) {
                        conraolComponent._guideCallbackSetting(() => this.awardDone(), () => this.showDone(), () => this.failedDone(), () => this.rebornDone());
                    }
                }
                // 触摸监听
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            } else if (CACHE.userInfo.stage == 3) {
                this.isSetTouch = true;
                this.node.zIndex = 10000;
                this.guideStep = 1;

                this.handNode = cc.instantiate(this.handSlip);
                this.handNode.scaleX = 0.7;
                this.handNode.scaleY = 0.7;
                this.handNode.parent = this.node;
                this.handNode.setPosition(cc.v2(-250, -500));
                let obj = this.handNode.getComponent('pluzzeGuide');
                if (obj) {
                    obj.handAnimate();
                }

                //设置callback
                let conraol = cc.find('Canvas/root/menuWarp');
                if (conraol) {
                    let conraolComponent = conraol.getComponent('conraol');
                    if (conraolComponent) {
                        conraolComponent._guideCallbackSetting(() => this.awardDone(), () => this.showDone(), () => this.failedDone(), () => this.rebornDone());
                    }
                }
                // 触摸监听
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            }
        }
    },

    start() {

    },
});
