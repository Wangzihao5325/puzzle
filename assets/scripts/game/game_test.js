import { SIZES } from '../global/piece_index';

cc.Class({
    extends: cc.Component,

    properties: {
        game_bg: cc.Node,
        pre_item: cc.Prefab,
    },

    onLoad() {
        this.init();
    },

    init() {
        this.game_bg.zIndex = 1;
        this.initItem()
    },

    initItem(hardLevel = 0) {// hardLevel: 0->2*3; 1->4*6; 2->6*8
        /*根据难度获取切片数据数组*/
        let sizeArr = SIZES[hardLevel];
        /*遍历sizeArr生成item*/
        sizeArr.forEach((item, index) => {
            /*根据预制资源实例化节点*/
            let item_node = cc.instantiate(this.pre_item);
            /*设置节点属性*/
            item_node.name = `item_puzzle_warp-${index + 1}`
            item_node.width = item[2];
            item_node.height = item[3];
            item_node.getChildByName('item_puzzle').width = item[2];
            item_node.getChildByName('item_puzzle').height = item[3];
            item_node.parent = this.game_bg;
            item_node.setPosition(item[4], item[5]);
            item_node.zIndex = 10;
            /*获取itembg_index对象*/
            let obj = item_node.getComponent('itembg_index');
            if (obj) {
                obj.setMarsk(index, hardLevel)
                /*在对象中保存节点引用，便于后续调用*/
                obj.item_node = item_node;
            }
        });
    },

    start() {

    },

});
