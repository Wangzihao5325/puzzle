// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        good_name: cc.Node,
        good_pic: cc.Sprite,
        good_bg: cc.Sprite,
        root: cc.Node
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
            cc.find("sound").getComponent("sound").tap()

            if (callback && this.item) {
                callback(this.item);
            }
            event.stopPropagation();
        })
    },

    init(item) {
        this.item = item;
        this.good_name.getComponent(cc.Label).node.active = true;
        this.good_name.getComponent(cc.Label).string = `${item.name} x${item.num}`;
        cc.loader.load(item.icon, (err, texture) => {
            this.good_pic.spriteFrame = new cc.SpriteFrame(texture)
            const h=texture.height
            const w=texture.width
            const wh=w>h
            this.good_pic.getComponent(cc.Node).height=parseInt( wh?120*h/w:120)
            this.good_pic.getComponent(cc.Node).width=parseInt(wh?120:120*w/h)
        });
    },

    initByOwen(item) {
        this.item = item;
        this.good_name.getComponent(cc.Label).node.active = true;
        this.good_name.getComponent(cc.Label).string = item.name;
        cc.loader.load(item.icon, (err, texture) => {
            this.good_pic.node.scaleX = 1;
            this.good_pic.node.scaleY = 1;
            this.good_pic.node.opacity = 255;
            this.good_pic.spriteFrame = new cc.SpriteFrame(texture)
        });
        cc.loader.loadRes('show/huilaidi', cc.SpriteFrame, (err, asset) => {
            this.good_bg.spriteFrame = asset;
        });
    },

    initByNotOwn(item) {
        this.item = item;
        this.good_name.getComponent(cc.Label).node.active = false;
        cc.loader.loadRes(item.icon, cc.SpriteFrame, (err, asset) => {
            this.good_pic.node.scaleX = 0.5;
            this.good_pic.node.scaleY = 0.5;
            this.good_pic.node.opacity = 100;
            this.good_pic.spriteFrame = asset;
        });
        cc.loader.loadRes(item.bg, cc.SpriteFrame, (err, asset) => {
            this.good_bg.spriteFrame = asset;
        });
    },

    // update (dt) {},
});
