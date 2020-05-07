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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.game_bg.zIndex=1
        this.init();
    },

    init(){
        this.initItem()
    },

    initItem(typeKey=0) {
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
            item_node.name=`item_puzzle_warp-${index+1}`
            item_node.width = item[2];
            item_node.height = item[3];
            // console.log("item_node.getComponent('item_puzzle')",item_node.getComponent('item_puzzle'))
            item_node.getChildByName('item_puzzle').width = item[2];
            item_node.getChildByName('item_puzzle').height = item[3];
            item_node.parent = this.game_bg;
            let y_index = Math.floor(index / type[0]);
            let x_index = index % type[0];
            //一负一正是为了块排列顺序与切割顺序一致
    
            item_node.setPosition(item[4],item[5]);
            item_node.zIndex=10;
            // if(index===0){
            //     item_node.active=false
            // }
            let obj = item_node.getComponent('itembg_index');
            console.log('obj',obj)
            if (obj) {
                obj.init(index); 
                // obj.setSpItem(this.defaultRect(item));
                obj.setMarsk(index)
                obj.item_node = item_node;
            }
        });
    },



    start () {

    },

    // update (dt) {},
});
