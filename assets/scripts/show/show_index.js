import { CACHE } from '../global/usual_cache';
import { SCENE, SCENE_KEY } from '../global/app_global_index';
import Action from '../api/api_action';
import { setTimeOutWithTimeStamp } from '../utils/utils'
import Api from '../api/api_index';

cc.Class({
    extends: cc.Component,

    properties: {
        vistorRoot: cc.Node,
        root: cc.Node,
        root_bg: cc.Sprite,
        table: cc.Node,
        footer: cc.Prefab,
        header: cc.Prefab,
        vistor: cc.Prefab,

        festivalName: cc.Label,
        festivalIcon: cc.Sprite,
        festivalProgress: cc.Label,
        timerLabel: cc.Label,

        showcase: cc.Prefab,
        scroll: cc.ScrollView,
        scrollContent: cc.Node,
        goodsItem: cc.Prefab,
        bagRoot: cc.Node,
        bagMask: cc.Node,
        bagBtn0: cc.Sprite,//美食按钮
        bagBtn1: cc.Sprite,//手工品按钮
        bagBtn2: cc.Sprite,//纪念品按钮
        bagBtn3: cc.Sprite,//文物按钮

        label0: cc.Label,
        label1: cc.Label,
        label2: cc.Label,
        label3: cc.Label,

        catLight: cc.Sprite,
        catBtn: cc.Sprite,

        heartMask: cc.Sprite,
        heartProgress: cc.Label,
        heartLight: cc.Node,

        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    stateUpdate() {
        CACHE.scene = SCENE.SHOW;
    },

    setBg() {
        const bg_assets = CACHE.assets.bg;
        let showBgTex = bg_assets[SCENE_KEY.SHOW];
        this.root_bg.spriteFrame = new cc.SpriteFrame(showBgTex);
    },

    footerInit() {
        let footer = cc.instantiate(this.footer);
        let obj = footer.getComponent('navi_footer');
        obj.initWithScene(CACHE.scene);
        footer.parent = this.root;
        footer.setPosition(0, -500);
        footer.zIndex = 10;
    },

    headerInit() {
        let header = cc.instantiate(this.header);
        let obj = header.getComponent('header_warp_index');
        header.parent = this.root;
        header.setPosition(0, 528);
        header.zIndex = 10;
        this.headerObj = obj;
        this.headerObj.initShowScene();
        Action.User.BalanceUpdate(() => {
            this.headerObj.renderShowScene();
        })
    },

    showcaseInit(standInfoList) {
        standInfoList.forEach((item, index) => {
            let showcaseNode = cc.instantiate(this.showcase);
            showcaseNode.name = `item_showcase_${item.standId}`;
            showcaseNode.parent = this.table;
            showcaseNode.setPosition(-210 + (index * 210), 58);
            let obj = showcaseNode.getComponent('showcase_index');
            if (obj) {
                obj.initWithItem(item, index);
                obj.setTouch((itemData) => this.openBag(itemData), (itemData) => this.bagReceive(itemData), (itemData) => this.speedUpCallback(itemData));
            }
        });
    },

    /*
    payload={
        startPosition:[x,y],
        pausePosition:[x,y],
        endPosition:[x,y],
        //  period必须为2的整数倍,推荐速度 200pt/s
        firstPeriod:number,
        secondPeriod:number,
        pausePeriod:number,
    }
    */
    vistorInit(payload) {
        let vistor = cc.instantiate(this.vistor);
        let obj = vistor.getComponent('vistor_index');
        vistor.parent = this.vistorRoot;//this.root;
        vistor.setPosition(payload.startPosition[0], payload.startPosition[1]);
        let firstDriection = payload.pausePosition[0] - payload.startPosition[0];
        let secondDriection = payload.endPosition[0] - payload.pausePosition[0];
        /*动画*/
        cc.tween(vistor)
            .call(() => {
                obj.init(firstDriection);
                obj.animateStart(payload);
            })
            .to(payload.firstPeriod, { position: cc.v2(payload.pausePosition[0], payload.pausePosition[1]) })
            .call(() => {
                obj.manWait();
            })
            .delay(0.7)
            .call(() => {
                obj.labelSetting('。');
            })
            .delay(0.7)
            .call(() => {
                obj.labelSetting('。。');
            })
            .delay(0.7)
            .call(() => {
                obj.labelSetting('。。。');
            })
            .delay(0.7)
            .call(() => {
                let isAdd = obj.attitudeShow();
                if (isAdd) {
                    this.addHeart();
                }
            })
            .delay(payload.pausePeriod - 2.8)
            .call(() => {
                obj.initMan(secondDriection);
            })
            .to(payload.secondPeriod, { position: cc.v2(payload.endPosition[0], payload.endPosition[1]) })
            .start()
            .removeSelf()
            .call(() => {
                vistor.destory();
            });
    },

    /*
        let payload = {
            startPosition: [0, -400],
            pausePosition: [-200, -400],
            endPosition: [450, -400],
            firstPeriod: 2,
            secondPeriod: 6,
            pausePeriod: 2
        }

    */



    randomCreateVistor() {
        let randomY = -370 - Math.floor((50 * Math.random()));
        let startX = (Math.random() - 0.5) > 0 ? 450 : -450;
        let pauseX = (Math.floor(Math.random() * 400)) - 200;
        let payload = {
            startPosition: [startX, randomY],
            pausePosition: [pauseX, randomY],
            endPosition: [-startX, randomY],
            firstPeriod: Math.abs(startX - pauseX) / 100,
            secondPeriod: Math.abs(-startX - pauseX) / 100,
            pausePeriod: 10
        };
        this.vistorInit(payload);
    },

    vistorTimerSet() {
        if (CACHE.isShowOn[0] || CACHE.isShowOn[1] || CACHE.isShowOn[2]) {
            if (!this.vistorTimer) {
                this.randomCreateVistor();
                this.vistorTimer = setInterval(() => {
                    this.randomCreateVistor();
                }, 10000)
            }
        }
    },

    vistorTimerDestory() {
        if (!CACHE.isShowOn[0] && !CACHE.isShowOn[1] && !CACHE.isShowOn[2]) {
            if (this.vistorTimer) {
                clearInterval(this.vistorTimer);
                this.vistorTimer = null;
            }
        }
    },

    bagInit(type = 1) {
        Api.showGoods(type, (res) => {
            let totalHeight = Math.ceil(res.data.length / 3) * 200;
            this.scrollContent.height = totalHeight;
            this.scrollContent.width = 600;
            let defaultIcon = 'show/meishi';
            switch (type) {
                case 1:
                    defaultIcon = 'show/meishi';
                    break;
                case 3:
                    defaultIcon = 'show/shougognpin';
                    break;
                case 4:
                    defaultIcon = 'show/jininapin';
                    break;
                case 5:
                    defaultIcon = 'show/wenwu';
                    break;
            }
            res.data.forEach((item, index) => {
                let nodeItem = cc.find(`Canvas/bag/bagTable/scrollView/view/content/item_goods_${index}`);
                if (!nodeItem) {
                    nodeItem = cc.instantiate(this.goodsItem);
                    nodeItem.name = `item_goods_${index}`;
                    nodeItem.parent = this.scrollContent;
                    let obj = nodeItem.getComponent('goodItem');
                    if (obj) {
                        obj.setTouch((item) => this.bagGoodsClick(item));
                    }
                }
                nodeItem.active = true;
                let line = Math.floor(index / 3);
                let cloumn = index % 3;
                let y = - 100 - line * 200;
                let x = -200 + cloumn * 200;

                nodeItem.setPosition(cc.v2(x, y));
                let obj = nodeItem.getComponent('goodItem');
                if (obj) {
                    if (item.owned) {//to do:区分物品质量
                        obj.initByOwen({ name: item.name, goodsId: item.goodsId, goodsQuality: item.goodsQuality, icon: item.iconUrl, url: item.iconUrl });
                    } else {
                        obj.initByNotOwn({ icon: defaultIcon, bg: 'show/xukuang' });
                    }
                }
            });
            if (CACHE.lastBagTypeLength > res.data.length) {
                for (let x = res.data.length; x < CACHE.lastBagTypeLength; x++) {
                    let nodeItem = cc.find(`Canvas/bag/bagTable/scrollView/view/content/item_goods_${x}`);
                    if (nodeItem) {
                        nodeItem.active = false;
                    }
                }
            }
            CACHE.lastBagTypeLength = res.data.length;
        })
    },

    bagReceive(itemDate) {
        Api.getShowReceive({ placeId: itemDate.placeId }, (res) => {
            Toast.show(`获得${res.data.name} x${res.data.num}`);
            let showcaseNode = cc.find(`Canvas/root/table/item_showcase_${itemDate.standId}`);
            if (showcaseNode) {
                let obj = showcaseNode.getComponent('showcase_index');
                if (obj) {
                    obj.turnToUnplace();
                    this.vistorTimerDestory();
                }
            }
            if (res.data.festivalInfo) {
                this.festivalUpdate(res.data.festivalInfo);
            }
            Action.User.BalanceUpdate(() => {
                this.headerObj.renderShowScene();
            })
        })
    },

    bagGoodsClick(item) {
        if (item.goodsId) {
            Api.placeGoods({ goodId: item.goodsId, standId: CACHE.show_table_press.standId }, (res) => {
                let showcaseNode = cc.find(`Canvas/root/table/item_showcase_${CACHE.show_table_press.standId}`);
                if (showcaseNode) {
                    let obj = showcaseNode.getComponent('showcase_index');
                    if (obj) {
                        obj.turnToTimer(item.url, res.data.placeId, res.data.expectReceiveTime);
                        /*位置不可调整，必须放在 turnToTimer后*/
                        this.vistorTimerSet();
                    }
                }
                this.bagRoot.active = false;
            });
        }
    },

    bagBtnSetTouch() {
        this.label0.node.color = cc.color(89, 83, 83);
        this.label1.node.color = cc.color(200, 200, 200);
        this.label2.node.color = cc.color(200, 200, 200);
        this.label3.node.color = cc.color(200, 200, 200);
        this.bagBtn0.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.bagBtn0.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.bagBtn0.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.label0.node.color = cc.color(89, 83, 83);
            this.label1.node.color = cc.color(200, 200, 200);
            this.label2.node.color = cc.color(200, 200, 200);
            this.label3.node.color = cc.color(200, 200, 200);
            this.bagInit(1);
            event.stopPropagation();
        })

        this.bagBtn1.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.bagBtn1.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.bagBtn1.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.label0.node.color = cc.color(200, 200, 200);
            this.label1.node.color = cc.color(89, 83, 83);
            this.label2.node.color = cc.color(200, 200, 200);
            this.label3.node.color = cc.color(200, 200, 200);
            this.bagInit(3);
            event.stopPropagation();
        })

        this.bagBtn2.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.bagBtn2.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.bagBtn2.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.label0.node.color = cc.color(200, 200, 200);
            this.label1.node.color = cc.color(200, 200, 200);
            this.label2.node.color = cc.color(89, 83, 83);
            this.label3.node.color = cc.color(200, 200, 200);
            this.bagInit(4);
            event.stopPropagation();
        })

        this.bagBtn3.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.bagBtn3.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.bagBtn3.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.label0.node.color = cc.color(200, 200, 200);
            this.label1.node.color = cc.color(200, 200, 200);
            this.label2.node.color = cc.color(200, 200, 200);
            this.label3.node.color = cc.color(89, 83, 83);
            this.bagInit(5);
            event.stopPropagation();
        })

        this.bagMask.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.bagMask.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.bagMask.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.bagRoot.active = false;
            event.stopPropagation();
        })
    },

    openBag(itemData) {
        this.bagRoot.active = true;
        CACHE.show_table_press = itemData;
    },

    festivalUpdate(item, callback) {
        this.festivalName.string = item.name;
        this.festivalProgress.string = `${item.currentNum}/${item.reachCount}`;
        if (!this.timer) {
            this.timer = setTimeOutWithTimeStamp(item.endTime, (timeStr) => {
                this.timerLabel.string = timeStr;
            }, () => {
                this.timer = null;
                if (callback) {
                    callback();
                }
            });
        }
        if (item.currentNum >= item.reachCount) {//&& !item.isReceive需增加判断条件
            if (item.received) {
                this.catBtn.node.active = false;
                this.catLight.node.active = true;
                this.festivalProgress.node.active = false;
            } else {
                this.catLight.node.active = true;
                this.catBtn.node.active = true;
                this.festivalProgress.node.active = false;
            }
        } else {
            this.catLight.node.active = false;
            this.catBtn.node.active = false;
            this.festivalProgress.node.active = true;
        }
    },

    festivalSetTouch() {
        this.catBtn.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.catBtn.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.catBtn.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            const showData = CACHE.showData;
            Api.festivalReceive({ festivalId: showData.festivalInfo.festivalId }, (res) => {
                if (res.message) {
                    Toast.show(res.message);
                } else {
                    Toast.show(`获得${res.data.extraName}x${res.data.num}`);
                    Action.User.BalanceUpdate(() => {
                        this.headerObj.renderShowScene();
                    })
                    Action.Show.ShowInfoUpdate((res) => {
                        const showData = CACHE.showData;
                        if (showData.festivalInfo) {
                            this.festivalUpdate(showData.festivalInfo);
                        }
                    });
                }
            });
            event.stopPropagation();
        });
    },

    _festivalTimerCallback() {
        Action.Show.ShowInfoUpdate((res) => {
            const showData = CACHE.showData;
            if (showData.festivalInfo) {
                this.festivalUpdate(showData.festivalInfo, () => this._festivalTimerCallback());
            }
        });
    },

    addHeart() {
        Api.addHeartEnergy({ key: 0 }, (res) => {
            CACHE.showData.heartEnergy = res.data
            this.heartRender();
        });
    },

    heartRender() {
        this.heartProgress.string = `${CACHE.showData.heartEnergy}%`;
        this.heartMask.fillRange = CACHE.showData.heartEnergy / 100;
        if (CACHE.showData.heartEnergy == 100) {
            this.heartLight.active = true;
            cc.tween(this.heartLight)
                .to(0, { angle: 0 })
                .to(10, { angle: 360 })
                .union()
                .repeatForever()
                .start();
            //增加动画 可点击
        } else {

        }
    },

    heartTouchSet() {
        this.heartMask.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.heartMask.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.heartMask.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (CACHE.showData.heartEnergy == 100) {
                Toast.show('请选择一个正在展览中的展台');
                CACHE.isShouwSpeedUp = true;
            }
            event.stopPropagation();
        })
    },
    speedUpCallback() { },

    init() {
        this.stateUpdate();
        this.setBg();
        this.footerInit();
        this.headerInit();
        this.bagInit();
        this.bagBtnSetTouch();
        this.festivalSetTouch();
        Action.Show.ShowInfoUpdate((res) => {
            const showData = CACHE.showData;
            if (showData.festivalInfo) {
                this.festivalUpdate(showData.festivalInfo, () => this._festivalTimerCallback());
            }
            this.showcaseInit(showData.standInfoList);
            /*位置不可调整，必须放在 showcaseInit后*/
            this.vistorTimerSet();
            this.heartRender();
            this.heartTouchSet()
        })
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.init();
        if (CACHE.isBGM && !this.currentBGM) {
            this.currentBGM = cc.audioEngine.play(this.audio, true, 1);
        }
    },

    onDestroy() {
        if (this.timer) {
            this.timer();
            this.timer = null;
        }
        if (this.vistorTimer) {
            clearInterval(this.vistorTimer);
        }
        if (this.currentBGM) {
            cc.audioEngine.stop(this.currentBGM);
        }
        CACHE.isShouwSpeedUp = false;
    }

    // update (dt) {},
});
