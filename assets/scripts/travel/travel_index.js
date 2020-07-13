import { CITIES } from '../global/travel_global_index';
import { CACHE } from '../global/usual_cache';
import { SCENE, SCENE_KEY } from '../global/app_global_index';
import GLOBAL_VAR from '../global/index';
import Action from '../api/api_action';
import Api from '../api/api_index';
import { setTimeOutWithTimeout } from '../utils/utils';

cc.Class({
    extends: cc.Component,

    properties: {
        city_item: cc.Prefab,
        china_map: cc.Node,
        chhina_map_pic: cc.Sprite,
        line_node: cc.Node,
        footer: cc.Prefab,
        header: cc.Prefab,
        layout_root: cc.Node,

        signMask: cc.Node,
        signBtn: cc.Sprite,
        signItem: cc.Prefab,
        signDaySeven: cc.Prefab,
        signBg: cc.Node,
        signRoot: cc.Node,
        signClose: cc.Node,
        signGetGoods: cc.Node,
        taskIcon: cc.Node,
        taskPop: cc.Node,
        taskPopText: cc.Label,
        taskDialog: cc.Prefab,
        storeIcon: cc.Node,
        store: cc.Prefab,
        signNew: cc.Node,
        taskNew: cc.Node,
        signDoubleButton: cc.Node,
        signDoubleImage: cc.Node,
        awardGameBtn:cc.Node,
        map: cc.ScrollView,
        mapMask: cc.Node,

        audio: {
            default: null,
            type: cc.AudioClip
        },
        adButton: cc.Node,
    },

    locationCity() {
        let cityStateArr = CITIES;
        let item = null,
            x = 0,
            y = 0;
        if (CACHE.isShowGuide && CACHE.userInfo.stage !== 99) {
            item = cityStateArr[0];
        } else {
            cityStateArr.every((innerItem, index) => {
                if (innerItem.isRecommend) {
                    item = cityStateArr[index];
                    return false;
                } else {
                    return true;
                }
            });
        }
        x = item.positionX + 960 - (CACHE.platform.visibleSize.width / 2);
        y = 852 - item.positionY - (CACHE.platform.visibleSize.height / 2);
        this.map.scrollToOffset(cc.v2(x, y), 2);
    },

    drawLine(start, end) {
        //获得组件
        let com = this.line_node.getComponent(cc.Graphics)
        //获得从start到end的向量
        let line = end.sub(start)
        //获得这个向量的长度
        let lineLength = line.mag()
        //设置虚线中每条线段的长度
        let length = 20
        //根据每条线段的长度获得一个增量向量
        let increment = line.normalize().mul(length)
        //确定现在是画线还是留空的bool
        let drawingLine = true
        //临时变量
        let pos = start.clone()
        com.strokeColor = cc.color(102, 136, 101);
        com.lineWidth = 5;
        //只要线段长度还大于每条线段的长度
        for (; lineLength > length; lineLength -= length) {
            //画线
            if (drawingLine) {
                com.moveTo(pos.x, pos.y)
                pos.addSelf(increment)
                com.lineTo(pos.x, pos.y)
                com.stroke()
            }
            //留空
            else {
                pos.addSelf(increment)
            }
            //取反
            drawingLine = !drawingLine
        }
        //最后一段
        if (drawingLine) {
            com.moveTo(pos.x, pos.y)
            com.lineTo(end.x, end.y)
            com.stroke()
        }
    },

    stateUpdate() {
        CACHE.scene = SCENE.TRAVEL;
    },

    setBg() {
        // map: cc.ScrollView,
        // mapMask: cc.Node,
        this.map.node.height = CACHE.platform.visibleSize.height;
        this.map.node.width = CACHE.platform.visibleSize.width;
        this.mapMask.height = CACHE.platform.visibleSize.height;
        this.mapMask.width = CACHE.platform.visibleSize.width;

        const bg_assets = CACHE.assets.bg;
        let travelBgTex = bg_assets[SCENE_KEY.TRAVEL];
        this.chhina_map_pic.spriteFrame = new cc.SpriteFrame(travelBgTex);
    },

    footerInit() {
        let footer = cc.instantiate(this.footer);
        footer.name = 'footer_navi';
        let obj = footer.getComponent('navi_footer');
        obj.initWithScene(CACHE.scene);
        footer.parent = cc.find('Canvas');
        footer.zIndex = 0;
        // footer.setPosition(0, -500);
    },

    headerInit() {
        let header = cc.instantiate(this.header);
        let obj = header.getComponent('header_warp_index');
        this.header_obj = obj;
        header.parent = cc.find('Canvas');
        header.zIndex = 0;
        Action.User.BalanceUpdate((res) => {
            this.awardGameAnimation()
            obj.render();
            this.powerTimer();
        });
    },

    cityPress(itemObj) {
        CACHE.travel_city_press = itemObj;//在cache中存储点击选项，新场景加载后读取，获得传值
        cc.director.loadScene("mission");
    },

    _showTaskCallbackSet(showTaskCallback) {
        if (showTaskCallback) {
            this.showTaskCallback = showTaskCallback;
        }
    },

    showTask() {
        let task = cc.instantiate(this.taskDialog);
        // let obj = header.getComponent('task');
        task.parent = cc.find('Canvas');
        if (this.showTaskCallback) {
            this.showTaskCallback();
        }
    },

    showSignDialog() {
        this.signRoot.active = true;
    },

    showStore() {
        let store = cc.instantiate(this.store);
        const canvas = cc.find('Canvas')
        store.parent = canvas
    },

    signSetTouch() {//signBg
        this.signDoubleButton.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.signDoubleImage.active = !this.signDoubleImage.active;
        });

        this.signMask.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.signMask.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.signMask.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        });

        this.signBtn.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.signBtn.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.signBtn.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            event.stopPropagation();
            this.signRoot.active = true;
        });

        this.signClose.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.signClose.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.signClose.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            event.stopPropagation();
            this.signRoot.active = false;
        });
        this.taskIcon.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.showTask()
            event.stopPropagation();
        });
        this.storeIcon.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.showStore()
            event.stopPropagation();
        });

        this.adButton.on(cc.Node.EventType.TOUCH_END, (event) => {
            Toast.show("广告暂未开放")
            cc.tween(this.adButton)
                .to(.1, { scale: .8 })
                .to(0.1, { scale: .6 })
                .start()
            event.stopPropagation();
        });
        this.awardGameBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            cc.director.loadScene('awardGame');
            event.stopPropagation();
        });

        this.signGetGoods.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.signGetGoods.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });

        this.signGetGoods.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            event.stopPropagation();
            if (CACHE.signData.todaySign) {
                Toast.show('您今天已经签到过!');
            } else {
                Api.doSign({ key: 1 }, (res) => {
                    let dayNode = cc.find(`Canvas/signPop/sign_item${res.data.day}`);
                    let obj = dayNode.getComponent('sign_item_index') || dayNode.getComponent('sign_item_seven');
                    if (obj) {
                        obj.todaySign();
                        setTimeout(()=>{
                            this.closeSign()
                        },1000)
                        CACHE.signData.todaySign = true;
                        this.signNew.active = false;
                        //重新更新任务红点
                        this.loadTaskTips()
                        Action.User.BalanceUpdate((res) => {
                            this.header_obj.render();
                        });
                    }
                });
            }
        });
    },

    signInfo() {
        //设置zIndex 设置蒙版手势
        this.signRoot.zIndex = 10;
        Action.Sign.SignInfoUpdate((res) => {
            if (!CACHE.signData.todaySign) {
                this.signNew.active = true;
                //this.signRoot.active = true;
            }
            CACHE.signData.signList.forEach((item, index) => {
                if (index !== 6) {
                    let itemNode = cc.instantiate(this.signItem);
                    itemNode.name = `sign_item${index + 1}`;
                    itemNode.parent = this.signRoot;
                    let line = Math.floor(index / 3);
                    let y = 140 - line * 175;
                    let x = -180 + (index % 3) * 180;
                    itemNode.setPosition(x, y);
                    let obj = itemNode.getComponent('sign_item_index');
                    if (obj) {
                        obj.initWithItem(item, index);
                        obj.setXY(x, y)
                    }
                } else {
                    let itemNode = cc.instantiate(this.signDaySeven);
                    itemNode.name = `sign_item${index + 1}`;
                    itemNode.parent = this.signRoot;
                    itemNode.setPosition(0, -230);
                    let obj = itemNode.getComponent('sign_item_seven');
                    if (obj) {
                        obj.initWithItem(item);
                    }
                }
            });
        });
    },

    closeSign(){
        cc.tween(this.signRoot)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.signRoot.destroy()
        })
        .start()
    },

    cityMissionInit() {
        Api.travelRoute((res) => {
            let isDone = false;
            res.data.forEach((item, index) => {
                CITIES.every((innerItem, innerIndex) => {
                    if (innerItem.key == item.chapterId) {
                        innerItem.missionDone = item.completeAmount;
                        innerItem.missionNum = item.hurdleAmount;
                        if (index == 0) {
                            if (item.completeAmount !== item.hurdleAmount) {
                                innerItem.isLocked = false;
                                innerItem.isRecommend = true;
                            } else {
                                innerItem.isLocked = false;
                                innerItem.isRecommend = false;
                            }
                        } else {
                            if (isDone) {
                                innerItem.isLocked = false;
                                if (item.completeAmount !== item.hurdleAmount) {
                                    innerItem.isRecommend = true;
                                } else {
                                    innerItem.isRecommend = false;
                                }
                            } else {
                                innerItem.isLocked = true;
                                innerItem.isRecommend = false;
                            }
                        }
                        return false;
                    }
                    return true;
                });
                if (item.completeAmount == item.hurdleAmount) {
                    isDone = true;
                } else {
                    isDone = false;
                }
            });

            CITIES.forEach((item, index) => {
                /*画线*/
                if (index !== 0) {
                    let startPt = CITIES[index - 1];
                    if (!isNaN(item.middleX)) {
                        this.drawLine(cc.v2(startPt.positionX, startPt.positionY), cc.v2(item.middleX, item.middleY));
                        this.drawLine(cc.v2(item.middleX, item.middleY), cc.v2(item.positionX, item.positionY));
                    } else {
                        this.drawLine(cc.v2(startPt.positionX, startPt.positionY), cc.v2(item.positionX, item.positionY));
                    }
                }
                /*生成关卡*/
                let cityItemNode = cc.instantiate(this.city_item);
                cityItemNode.name = `city_item-${item.key}`;
                cityItemNode.parent = this.china_map;
                /*获取itembg_index对象*/
                let obj = cityItemNode.getComponent('travel_city');
                if (obj) {
                    /*在对象中保存节点引用，便于后续调用*/
                    obj.item_node = cityItemNode;
                    obj.init(item);
                    obj.setTouch(this.cityPress);
                }
            });

            this.locationCity();
        })
    },

    powerTimer() {
        //会出现倒计时较快问题
        const power = CACHE.power;
        if (power.num >= GLOBAL_VAR.powerMax) {
            this.header_obj.timeRender(true, '00:00');
        } else {
            if (!this.powerTimerReg) {
                this.powerTimerReg = setTimeOutWithTimeout(power.time * 1000, (res) => {
                    this.header_obj.timeRender(false, res);
                }, () => {
                    this.powerTimerReg = null;
                    Action.User.BalanceUpdate((res) => {
                        this.header_obj.render();
                        this.powerTimer();
                    });
                });
            }
        }
    },

    init() {
        this.stateUpdate();
        this.setBg();
        this.footerInit();
        this.headerInit();
        this.signInfo();
        this.signSetTouch();
        this.cityMissionInit();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        setTimeout(() => {
            cc.find("sound").getComponent("sound").playBg()
        }, 100)

        //设置红点显示或隐藏
        this.loadTaskTips();
    },

    start() {

        this.init();

    },

    onDestroy() {
        if (this.powerTimerReg) {
            this.powerTimerReg();
            this.powerTimerReg = null;
        }
    },
    loadTaskTips() {
        Api.task_tips((res) => {
            if (res.code === 0) {
                CACHE.btnTips = {
                    ...CACHE.btnTips,
                    ...res.data
                }
                this.taskPop.active = res.data.taskDescribe ? true : false
                this.taskPopText.string = res.data.taskDescribe ? res.data.taskDescribe : ''
                this.updateTaskTips()
            } else {
                //请求异常处理
            }
        })
    },
    updateTaskTips() {
        this.taskNew.active = CACHE.btnTips.task;
    },

    awardGameAnimation(){

        if(CACHE.userData.star<10){
            return false
        }

        const holo=cc.find('holo',this.awardGameBtn)
        const icon=cc.find('min',this.awardGameBtn)
        const d1=cc.find('d1',this.awardGameBtn)
        const d2=cc.find('d2',this.awardGameBtn)
        const newIcon=cc.find('new',this.awardGameBtn)
        holo.active=true
        newIcon.active=true
        cc.tween(holo)
            .to(100, { angle:3600 })
            .union()
            .repeatForever()
            .start()


            setTimeout(()=>{
                cc.tween(d1)
                .delay(0.5)
                .to(.15, { position: cc.v2(d1.x,d1.y+20) })
                .to(.15, { position: cc.v2(d1.x,d1.y) })
                .union()
                .repeatForever()
                .start()
            },0)

        setTimeout(()=>{
            cc.tween(d2)
            .delay(0.5)
            .to(.15, { position: cc.v2(d2.x,d2.y+20) })
            .to(.15, { position: cc.v2(d2.x,d2.y) })
            .union()
            .repeatForever()
            .start()
        },150)
        setTimeout(()=>{
            cc.tween(icon)
            .delay(0.5)
            .to(.15, { position: cc.v2(icon.x,icon.y+20) })
            .to(.15, { position: cc.v2(icon.x,icon.y) })
            .union()
            .repeatForever()
            .start()
        },450)




    }

    // update (dt) {},
});
