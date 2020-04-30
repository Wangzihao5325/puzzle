// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const SIZES_1 = [[0, 0, 406, 351, -119, 253], [303, 0, 341, 353, 151.5, 252], [0, 351 - 82, 333, 310, -155.5, 4.5], [235, 353 - 87, 409, 317, 117.5, 4], [0, 857 - 362, 399, 362, -122.5, -247.5], [644 - 342, 857 - 369, 342, 369, 151, -244]];
const SIZES_0 = [
    [0, 0, 198, 180, -223, 338.5],
    [150, 0, 177, 148, -83.5, 354.5],
    [279, 0, 238, 178, 76, 339.5],
    [469, 0, 174, 148, 234, 354.5],
    [0, 134, 191, 164, -226.5, 212.5],
    [145, 104, 184, 185, -85, 232],
    [275, 134, 245, 187, 75.5, 201],
    [470, 100, 174, 222, 235, 217.5],
    [0, 251, 172, 215, -236, 70],
    [117, 241, 248, 219, -81, 78],
    [315, 279, 175, 190, 80.5, 54.5],
    [437, 270, 206, 192, 218, 62.5],
    [0, 420, 170, 183, -237, -83],
    [119, 417, 238, 185, -84, -81],
    [304, 421, 223, 192, 93.5, -88.5],
    [478, 417, 165, 187, 238.5, -82],
    [0, 561, 170, 192, -237, -228.5],
    [119, 560, 238, 185, -84, -224],
    [304, 565, 223, 191, 93.5, -232],
    [478, 564, 165, 183, 238.5, -227],
    [0, 712, 167, 154, -238.5, -360.5],
    [114, 703, 214, 154, -101, -351.5],
    [274, 708, 243, 152, 73.5, -355.5],
    [469, 707, 174, 149, 234, -353]
]
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

        //this.initItem(0);
        this.loadResource();
    },

    loadResource() {
        cc.loader.loadRes("background/haixianbg", cc.SpriteFrame, (err, spriteFrame) => {
            this.spframe_puzzle = spriteFrame;
            this.initItem(0);
            //self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },

    initItem(typeKey) {
        //根据key取type
        let type = TYPES[typeKey];
        //根据type取size
        let sizeArr = SIZES_0;


        //图片切割起点积累量
        let dy = 0;
        let dx = 0;
        //遍历size根据size生成item
        sizeArr.forEach((item, index) => {
            let item_node = cc.instantiate(this.pre_item);
            item_node.width = item[2];
            item_node.height = item[3];
            // console.log("item_node.getComponent('item_puzzle')",item_node.getComponent('item_puzzle'))
            item_node.getChildByName('item_puzzle').width = item[2];
            item_node.getChildByName('item_puzzle').height = item[3];
            item_node.parent = this.game_bg;
            let y_index = Math.floor(index / type[0]);
            let x_index = index % type[0];
            //一负一正是为了块排列顺序与切割顺序一致
            let position = cc.v2(item[4], item[5]);
            item_node.setPosition(position);
            let obj = item_node.getComponent('item_index');
            console.log("obj", obj)
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
