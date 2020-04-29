// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const SIZES_0 = [[0, 0, 406, 351], [303, 0, 341, 353], [0, 351 - 13, 333, 310], [235, 353 - 90, 409, 371], [0, 857 - 362, 399, 362], [644 - 342, 857 - 369, 342, 369]];//01图片尺寸 23图片起始点坐标
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
            item_node.width = item[2];
            item_node.height = item[3];
            // console.log("item_node.getComponent('item_puzzle')",item_node.getComponent('item_puzzle'))
            item_node.getChildByName('item_puzzle').width = item[2];
            item_node.getChildByName('item_puzzle').height = item[3];
            item_node.parent = this.game_bg;
            let y_index = Math.floor(index / type[0]);
            let x_index = index % type[0];
            //一负一正是为了块排列顺序与切割顺序一致
            const positionarr=this.claPosition(index,item)
            let position = cc.v2(positionarr[0],positionarr[1]);
            item_node.setPosition(position);
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

    claPosition(index,item){
        const x=item[2]/2-BG_WIDTH/2+item[0];
        let y;
        if(index===0||index===1){
            y=BG_HEIGHT/2-item[3]/2
        }else if(index===4||index===5){
            y=-BG_HEIGHT/2+item[3]/2
        }else{
            y=0
        }
        return [x,y]
    },

    start () {

    },

    // update (dt) {},
});
