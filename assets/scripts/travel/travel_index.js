import { CITIES } from '../global/travel_global_index';

cc.Class({
    extends: cc.Component,

    properties: {
        city_item: cc.Prefab,
        china_map: cc.Node,
    },

    cityPress() {
        console.log('dddddd');
    },

    init() {
        CITIES.forEach((item) => {
            let cityItemNode = cc.instantiate(this.city_item);
            cityItemNode.name = `city_item-${item.name}`;
            cityItemNode.parent = this.china_map;
            //cityItemNode.setPosition(item.positionX, item.positionY);
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

    // onLoad () {},

    start() {
        this.init();
    },

    // update (dt) {},
});
