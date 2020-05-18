import { CITIES } from '../global/travel_global_index';
import { CACHE } from '../global/usual_cache';
import { SCENE } from '../global/app_global_index';

cc.Class({
    extends: cc.Component,

    properties: {
        city_item: cc.Prefab,
        china_map: cc.Node,
        line: cc.Graphics,
        footer: cc.Prefab,
        header: cc.Prefab,
        layout_root: cc.Node,
    },

    stateUpdate() {
        CACHE.scene = SCENE.TRAVEL;
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
        obj.render();
        header.parent = this.layout_root;
        header.setPosition(0, 528);
    },

    cityPress(itemObj) {
        CACHE.travel_city_press = itemObj;//在cache中存储点击选项，新场景加载后读取，获得传值
    },

    init() {
        this.stateUpdate();

        this.footerInit();
        this.headerInit();

        CITIES.forEach((item, index) => {
            /*画线*/
            if (index == 0) {
                // line_graphics.moveTo(item.positionX, item.positionY);
            } else if (index == CITIES.length - 1) {
                // line_graphics.lineTo(item.positionX, item.positionY);
                // line_graphics.close();
                // line_graphics.stroke();
                // line_graphics.fill();
            } else {
                //line_graphics.lineTo(item.positionX, item.positionY);
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
