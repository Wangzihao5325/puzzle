import { CACHE } from '../global/usual_cache'
cc.Class({
    extends: cc.Component,

    properties: {
        handSlip: cc.Prefab,
        hand: cc.Prefab,
        guideToast: cc.Prefab,
        guideToastArrow: cc.Prefab
    },

    awardDone() {
        this.guideStep++;

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
            this.isGameOver = true;
        }
        this.handNode.active = false;

        //第一次需要增加提示
        if (CACHE.userInfo && CACHE.userInfo.stage == 1) {
            this.guideToastNode = cc.instantiate(this.guideToast);
            let obj = this.guideToastNode.getComponent('guideToast');
            if (obj) {
                this.guideToastNode.item_obj = obj;
                obj.setContentStr("<color=#887160>恭喜你获得了旅游物品\n可以用它来<color=#e37974>[展览]</color>，赚小钱钱</color>");
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
            this.guideToastArrowNode.setPosition(0, 0);
        }
    },

    showDone() {
        this.isGameOver = true;
        this.showAppear = true;
        if (this.guideToastNode) {
            this.guideToastNode.active = false;
        }
        if (this.guideToastArrowNode) {
            this.guideToastArrowNode.active = false;
        }

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
        this.isGameOver = true;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.handNode.active = false;
    },

    rebornDone() {
        this.isGameOver = false;
        this.timer = setTimeout(() => {
            if (this.handNode) {
                this.handNode.active = true;
            }
        }, 10000);
    },


    onTouchStart(event) {
        if (!this.isInitDone) {
            return;
        }
        if (this.guideStep == 1) {
            if (this.handNode && !this.isGameOver) {
                this.handNode.active = false;
                if (!this.timer) {
                    this.timer = setTimeout(() => {
                        this.guideHandShow();
                    }, 10000);
                } else {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.guideHandShow();
                    }, 10000);
                }
            }
            this.node._touchListener.setSwallowTouches(false);
        } else if (this.guideStep == 2) {
            //此时分享弹窗已经出现，不能让玩家乱点
            let originNode = cc.find('Canvas/root/game_share/container/poster');
            if (originNode) {
                let pos = originNode.convertToNodeSpaceAR(event.getLocation());
                let btn = cc.find('Canvas/root/game_share/container/poster/back');
                let rect = btn.getBoundingBox();
                if (rect.contains(pos)) {
                    this.node._touchListener.setSwallowTouches(false);
                } else {
                    this.node._touchListener.setSwallowTouches(true);
                }
                return;
            } else {
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
        }
    },

    onTouchStartWithoutGuide() {
        if (!this.isInitDone) {
            return;
        }
        if (this.handNode) {
            this.handNode.active = false;
        }
        if (!this.timer) {
            this.timer = setTimeout(() => {
                this.guideHandShow();
            }, 10000);
        } else {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.guideHandShow();
            }, 10000);
        }
        this.node._touchListener.setSwallowTouches(false);
    },

    guideHandShow() {
        if (this.handNode) {
            this.handNode.active = true;
        } else {
            this.handNode = cc.instantiate(this.handSlip);
            this.asyncTimer = setTimeout(() => {
                this.handNode.scaleX = 0.7;
                this.handNode.scaleY = 0.7;
                this.handNode.parent = this.node;
                this.handNode.setPosition(cc.v2(-250, -500));
                let obj = this.handNode.getComponent('pluzzeGuide');
                if (obj) {
                    obj.handAnimate();
                }
                this.asyncTimer = null;
                this.isInitDone = true;//判断引导中手势是否加载完毕，加载完毕后才允许用户点击
            }, 1000);
        }
    },

    onLoad() {
        if (!CACHE.isShowGuide) {
            return;
        }
        if (CACHE.userInfo && CACHE.userInfo.stage !== 99) {
            if (CACHE.userInfo.stage == 1 || CACHE.userInfo.stage == 3 || CACHE.userInfo.stage == 6) {
                this.isSetTouch = true;
                this.node.zIndex = 10000;
                this.guideStep = 1;

                // this.guideHandShow();

                //设置callback
                let conraol = cc.find('Canvas/root/menuWarp');
                if (conraol) {
                    let conraolComponent = conraol.getComponent('conraol');
                    if (conraolComponent) {
                        conraolComponent._guideCallbackSetting(() => this.awardDone(), () => this.showDone(), () => this.failedDone(), () => this.rebornDone());
                    }
                }

                //设置掉落结束的callback
                let gameTestNode = cc.find('Canvas');
                if (gameTestNode) {
                    let gameTest = gameTestNode.getComponent('game_test');
                    if (gameTest) {
                        gameTest._setPliceAnimationCallback(() => this.guideHandShow());
                    }
                }
                // 触摸监听
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            }
        } else if (CACHE.userInfo.stage == 99) {
            //第一次进入难度大于12块的拼图,引导使用道具
            if (CACHE.hard_level > 0 && CACHE.userInfo.firstTwoStarHurdle) {
                this.guideToastNode = cc.instantiate(this.guideToast);
                let obj = this.guideToastNode.getComponent('guideToast');
                if (obj) {
                    this.guideToastNode.item_obj = obj;
                    obj.setContentStr("<color=#887160>恭喜你获得了旅游物品\n可以用它来<color=#e37974>[展览]</color>，赚小钱钱</color>");
                }
                this.guideToastNode.parent = this.node;
                this.guideToastNode.setPosition(0, -300);

            }
            //未导航时长时间不操作处理
            this.node.zIndex = 10000;
            this.timer = setTimeout(() => {
                this.guideHandShow();
            }, 10000);

            let gameTestNode = cc.find('Canvas');
            if (gameTestNode) {
                let gameTest = gameTestNode.getComponent('game_test');
                if (gameTest) {
                    gameTest._setPliceAnimationCallback(() => { setTimeout(() => { this.isInitDone = true }, 1000) });
                }
            }

            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartWithoutGuide, this);
        }
    },

    onDestroy() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.asyncTimer) {
            clearTimeout(this.asyncTimer);
            this.asyncTimer = null;
        }
    }
});
