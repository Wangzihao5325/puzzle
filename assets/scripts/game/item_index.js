// const MASKSIZE = [[0, 0, 406, 351], [0,0,341,353], [0,0,462,431],[0,0,355,276],[0,0,399,362],[0,0,342,369]];//01图片尺寸 23图片起始点坐标

cc.Class({
    extends: cc.Component,

    properties: {
        label_num: cc.Label,
        sp_item: cc.Sprite,
        mask_item: cc.Mask,
    },

    init(num) {
        this.num = num;
        this.label_num.string = this.num
    },

    setSpItem(spt) {
        this.sp_item.spriteFrame = spt
    },

    setMarsk(index){
        var urls = ['2x3-1/1', '2x3-1/2','2x3-1/3', '2x3-1/4','2x3-1/5', '2x3-1/6'];
        const self = this;
        cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            console.log("assets",assets)
            self.mask_item.spriteFrame = assets[index]
        });
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
