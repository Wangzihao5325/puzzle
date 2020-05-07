// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const SIZES_0 = [[0, 0, 406, 351, -119, 253], [303, 0, 341, 353, 151.5, 252], [0, 351 - 82, 333, 310, -155.5, 4.5], [235, 353 - 87, 409, 317, 117.5, 4], [0, 857 - 362, 399, 362, -122.5, -247.5], [644 - 342, 857 - 369, 342, 369, 151, -244]];

const TYPES = [[2, 3], [4, 6], [6, 8]];
const BG_WIDTH = 644;
const BG_HEIGHT = 857;



cc.Class({
    extends: cc.Component,

    properties: {
        game_bg: cc.Node,
        pre_item: cc.Prefab,
        spframe_puzzle: cc.SpriteFrame,
        puzzle_bg: cc.Node,
        // sp_puzzle: cc.Sprite
    },

    onLoad() {
        this.init();
    },

    init() {
        //设置绿色背景布
        this.game_bg.width = 800;
        this.game_bg.height = 180;
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
            item_node.width = item[2]*0.25;
            item_node.height = item[3]*0.25;
            item_node.name=`item_puzzle_splice-${index+1}`
            item_node.defaultIndex=`${index+1}`
            item_node.defaultPostion=[item[4],item[5]]
            item_node.defaultIndex=index
            // console.log("item_node.getComponent('item_puzzle')",item_node.getComponent('item_puzzle'))
            item_node.getChildByName('item_puzzle').width = item[2]*.25;
            item_node.getChildByName('item_puzzle').height = item[3]*.25;
            item_node.parent = this.game_bg;
            let y_index = Math.floor(index / type[0]);
            let x_index = index % type[0];
            //一负一正是为了块排列顺序与切割顺序一致
            let position = cc.v2(-344+(140*index)+20, 0);
            item_node.setPosition(position);
            let obj = item_node.getComponent('splice_item_index');
            // console.log("obj",obj)
            if (obj) {
                obj.init(index);
                obj.setSpItem(this.defaultRect(item));
                obj.setMarsk(index)
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
