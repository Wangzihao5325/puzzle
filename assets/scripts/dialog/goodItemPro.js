cc.Class({
    extends: cc.Component,

    properties: {
        good_name: cc.Node,
        good_pic: cc.Sprite,
        good_bg: cc.Sprite,
        good_mask: cc.Sprite,
        quality_pic: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    setTouch(callback) {
        this.good_bg.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.good_bg.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.good_bg.node.on(cc.Node.EventType.TOUCH_END, () => {
            if (callback && this.item) {
                callback(this.item);
            }
            event.stopPropagation();
        })
    },
    /*
    item={
        goodsId: 3003
        goodsQuality: 0
        goodsType: 1
        icon: "icon03"
        iconUrl: "https://puzzle.oss-cn-beijing.aliyuncs.com/icon03.png"
        name: "三大炮"
    }
    */

    initWithItem(item) {
        this.item = item;
        this.good_name.getComponent(cc.Label).string = item.name;
        if (item.goodsQuality == 0) {//普通
            cc.loader.loadRes('mission/putongdi', cc.SpriteFrame, (err, asset) => {
                this.good_bg.spriteFrame = asset;
                cc.loader.load(item.iconUrl, (err, texture) => {
                    this.good_pic.spriteFrame = new cc.SpriteFrame(texture);
                });
            })
        } else {//稀有
            cc.loader.loadResArray(['mission/xiyoudi', 'mission/xiyoukuang'], cc.SpriteFrame, (err, assets) => {
                this.quality_pic.node.active = true;
                this.good_bg.spriteFrame = assets[0];
                this.good_mask.spriteFrame = assets[1];
                cc.loader.load(item.iconUrl, (err, texture) => {
                    this.good_pic.spriteFrame = new cc.SpriteFrame(texture);
                });
            })
        }
    },

    // update (dt) {},
});
