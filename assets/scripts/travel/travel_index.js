import { CITIES } from '../global/travel_global_index';
import { CACHE } from '../global/usual_cache';
import { SCENE, SCENE_KEY } from '../global/app_global_index';
import Action from '../api/api_action';
import Api from '../api/api_index';

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

        signBtn: cc.Sprite,
        signItem: cc.Prefab,
        signRoot: cc.Node,
        signClose: cc.Node,
        signGetGoods: cc.Node,
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
        const bg_assets = CACHE.assets.bg;
        let travelBgTex = bg_assets[SCENE_KEY.TRAVEL];
        this.chhina_map_pic.spriteFrame = new cc.SpriteFrame(travelBgTex);
    },

    footerInit() {
        let footer = cc.instantiate(this.footer);
        let obj = footer.getComponent('navi_footer');
        obj.initWithScene(CACHE.scene);
        footer.parent = this.layout_root;
        footer.setPosition(0, -500);
    },

    headerInit() {
        let header = cc.instantiate(this.header);
        let obj = header.getComponent('header_warp_index');
        header.parent = this.layout_root;
        header.setPosition(0, 528);
        Action.User.BalanceUpdate((res) => {
            obj.render();
        });
    },

    cityPress(itemObj) {
        console.log('city---Pressing!!');
        CACHE.travel_city_press = itemObj;//在cache中存储点击选项，新场景加载后读取，获得传值
        cc.director.loadScene("mission");
    },

    signSetTouch() {
        this.signBtn.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.signBtn.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.signBtn.node.on(cc.Node.EventType.TOUCH_END, (event) => {
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
            event.stopPropagation();
            this.signRoot.active = false;
        });

        this.signGetGoods.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.signGetGoods.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.signGetGoods.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
            if (CACHE.signData.todaySign) {
                Toast.show('您今天已经签到过!');
            } else {
                Api.doSign({ key: 1 }, (res) => {
                    let dayNode = cc.find(`Canvas/layoutRoot/signPop/sign_item${res.data.day}`);
                    let obj = dayNode.getComponent('sign_item_index');
                    if (obj) {
                        obj.todaySign();
                        // Action.User.BalanceUpdate((res) => {

                        // });
                    }
                });
            }
        });
    },

    signInfo() {
        Action.Sign.SignInfoUpdate((res) => {
            if (!CACHE.signData.todaySign) {
                this.signRoot.active = true;
            }
            CACHE.signData.signList.forEach((item, index) => {
                let itemNode = cc.instantiate(this.signItem);
                itemNode.name = `sign_item${index + 1}`;
                let obj = itemNode.getComponent('sign_item_index');
                if (obj) {
                    obj.initWithItem(item);
                }
                itemNode.parent = this.signRoot;
                let line = Math.floor(index / 3);
                let y = 70 - line * 150;
                let x = -150 + (index % 3) * 150;
                itemNode.setPosition(x, y);
            });
        });
    },

    init() {
        this.stateUpdate();
        this.setBg();
        this.footerInit();
        this.headerInit();
        this.signInfo();
        this.signSetTouch();

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
            cityItemNode.name = `city_item-${item.name}`;
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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    start() {
        this.init();
    },

    // update (dt) {},
});
