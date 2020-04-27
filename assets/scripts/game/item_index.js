cc.Class({
    extends: cc.Component,

    properties: {
        label_num: cc.Label,
        sp_item: cc.Sprite
    },

    init(num) {
        this.num = num;
        this.label_num.string = this.num
    },

    setSpItem(spt) {
        this.sp_item.spriteFrame = spt
    },

    setTouch() {
        // this.node.on(cc.Node.EventType.TOUCH_START, () => {
        //     console.log(`点击开始${this.num}`);
        // })
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            if (this.item_node) {
                //console.log(`点击中${this.num}__有node`);
                console.log(this.item_node);
                let delta = event.touch.getDelta();
                let newPositin = cc.v2(this.item_node.x + delta.x, this.item_node.y + delta.y)
                this.item_node.setPosition(newPositin);
            }
        })
        // this.node.on(cc.Node.EventType.TOUCH_END, () => {
        //     console.log(`点击结束${this.num}`);
        // })
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
