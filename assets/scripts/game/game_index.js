// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const SIZES_0 = [[0, 0, 406, 351], [303, 0, 341, 353], [0, 351 - 13, 333, 310], [235, 353 - 90, 409, 317], [0, 857 - 362, 399, 362], [644 - 342, 857 - 369, 342, 369]];//01图片尺寸 23图片起始点坐标
const TYPES = [[2, 3], [4, 6], [6, 8]];
const BG_WIDTH = 644;
const BG_HEIGHT = 857;

cc.Class({
    extends: cc.Component,

    properties: {
        game_bg: cc.Node,
        pre_item: cc.Prefab,
        spframe_puzzle: cc.SpriteFrame,
        sp_puzzle: cc.Sprite
    },

    onLoad() {
        this.init();
    },

    init() {
        //设置绿色背景布
        this.game_bg.width = 640;
        this.game_bg.height = 1136;
        // let item_node = cc.instantiate(this.pre_item);
        // item_node.parent = this.game_bg;

        /*截取一块
        this.picCut();
        this.sp_puzzle.spriteFrame = this.spframe_puzzle
        */
        //初始化所有的块

        this.initItem(0);
    },

    initItem(typeKey) {
        //根据key取type
        let type = TYPES[typeKey];
        //根据type取size
        let sizeArr = SIZES_0;
        //一负一正是为了块排列顺序与切割顺序一致
        let x_start = -1 * Math.floor(BG_WIDTH / 2);
        let y_start = Math.floor(BG_HEIGHT / 2);
        let widthSeparate = Math.floor(BG_WIDTH / type[0] / 2);
        let heightSeparate = Math.floor(BG_HEIGHT / type[1] / 2);
        //图片切割起点积累量
        let dy = 0;
        let dx = 0;
        //遍历size根据size生成item
        sizeArr.forEach((item, index) => {
            let item_node = cc.instantiate(this.pre_item);
            item_node.width = item[2];
            item_node.height = item[3];
            item_node.parent = this.game_bg;
            let y_index = Math.floor(index / type[0]);
            let x_index = index % type[0];
            //一负一正是为了块排列顺序与切割顺序一致
            let position = cc.v2(x_start + (2 * x_index + 1) * widthSeparate, y_start - (2 * y_index + 1) * heightSeparate);
            item_node.setPosition(position);
            let obj = item_node.getComponent('item_index');
            if (obj) {
                obj.init(index);
                obj.setSpItem(this.defaultRect(item));
                obj.item_node = item_node;
            }
        });
    },


    defaultRect(item) {
        let rect = new cc.Rect(item[0], item[1], item[2], item[3]);
        let spframe_puzzle_clone = this.spframe_puzzle.clone();
        spframe_puzzle_clone.setRect(rect);
        return spframe_puzzle_clone
    },

    picCut() {
        let rect = new cc.Rect(0, 0, 406, 351);
        this.spframe_puzzle.setRect(rect);
    },
});
