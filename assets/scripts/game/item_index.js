const MASKSIZE = [[0, 0, 406, 351], [0,0,341,353], [0,0,462,431],[0,0,355,276],[0,0,399,362],[0,0,342,369]];//01图片尺寸 23图片起始点坐标

cc.Class({
    extends: cc.Component,

    properties: {
        label_num: cc.Label,
        sp_item: cc.Sprite,
        mask_item: cc.Mask,
        spframe_mask1: cc.SpriteFrame,
        spframe_mask2: cc.SpriteFrame,
        spframe_mask3: cc.SpriteFrame,
        spframe_mask4: cc.SpriteFrame,
        spframe_mask5: cc.SpriteFrame,
        spframe_mask6: cc.SpriteFrame,

    },

    init(num) {
        this.num = num;
        this.label_num.string = this.num
    },

    setSpItem(spt) {
        this.sp_item.spriteFrame = spt
    },

    defaultRect(spframe_mask,index) {

        let rect = new cc.Rect(MASKSIZE[index][0], MASKSIZE[index][1], MASKSIZE[index][2], MASKSIZE[index][3]);
        let spframe_puzzle_clone = spframe_mask.clone();
        spframe_puzzle_clone.setRect(rect);
        return spframe_puzzle_clone
    },


    setMarsk(index,item){
        var urls = ['2x3-1/1', '2x3-1/2'];
        cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            console.log("assets",assets)
            // spriteFrames = assets;
            // ...
        });
        const spframList=[this.spframe_mask1,this.spframe_mask2,this.spframe_mask3,this.spframe_mask4,this.spframe_mask5,this.spframe_mask6]
        this.mask_item.spriteFrame =this.defaultRect(spframList[index],index)
    },

    setTouch() {
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.item_node.zIndex= 10//拿起增加z-index
        })
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            if (this.item_node) {
                let delta = event.touch.getDelta();
                let newPositin = cc.v2(this.item_node.x + delta.x, this.item_node.y + delta.y)
                this.item_node.setPosition(newPositin);
            }
        })
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.item_node.zIndex= 1//恢复z-index
        })
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.num = 0;
        this.setTouch();
    },

    start() {

    },

    // update (dt) {},
});
