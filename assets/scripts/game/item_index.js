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
        // var urls=['2x3-1/1','2x3-1/2','2x3-1/3','2x3-1/4','2x3-1/5','2x3-1/6']
        var urls = ['4x6/01', '4x6/02','4x6/03', '4x6/04','4x6/05', '4x6/06','4x6/07', '4x6/08','4x6/09', '4x6/10','4x6/11', '4x6/12','4x6/13', '4x6/14','4x6/15', '4x6/16','4x6/17', '4x6/18','4x6/19', '4x6/20','4x6/21', '4x6/22','4x6/23', '4x6/24',];
        const self = this;
        cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            self.mask_item.spriteFrame = assets[index]
        });
    },

    setTouch() {
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.item_node.zIndex= 100000000//拿起增加z-index
            // this.item_node.setScale(4)
            this.item_node.setPropagateTouchEvents=false
        })
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            if (this.item_node) {
                let delta = event.touch.getDelta();
                let newPositin = cc.v2(this.item_node.x + delta.x, this.item_node.y + delta.y)
                this.item_node.setPosition(newPositin);
            }
        })
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, ()=>{
            //移动结束
            // this.item_node.setScale(0.25)

        })
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            cc.find("sound").getComponent("sound").tap()
            this.item_node.zIndex= 1//恢复z-index
            // this.item_node.setScale(0.25)

        })
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.node.zIndex=10000;
        this.num = 0;
        this.setTouch();
    },

    start() {

    },

    // update (dt) {},
});
