cc.Class({
    extends: cc.Component,

    properties: {
        good_name: cc.Node,
        good_pic: cc.Sprite,
        good_bg: cc.Sprite,
        good_mask: cc.Sprite,
        quality_pic: cc.Sprite,
        cityLabel: cc.Label,
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
        this.good_bg.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

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
        let nameLabel = this.good_name.getComponent(cc.Label);
        nameLabel.string = item.name;
        if (item.goodsQuality == 0) {//普通
            nameLabel.node.color = cc.color(94, 94, 94);
            cc.loader.loadRes('mission/putongdi', cc.SpriteFrame, (err, asset) => {
                this.good_bg.spriteFrame = asset;
                cc.loader.load(item.iconUrl, (err, texture) => {
                    this.good_pic.spriteFrame = new cc.SpriteFrame(texture);
                });
            })
        } else {//稀有
            nameLabel.node.color = cc.color(255, 133, 100);
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

    initByOwen(item) {
        this.item = item;
        let nameLabel = this.good_name.getComponent(cc.Label);
        nameLabel.node.active = true;
        nameLabel.string = item.name;
        nameLabel.fontSize = 22.5;
        nameLabel.node.color = cc.color(134, 96, 67);
        this.cityLabel.node.active = true;
        this.cityLabel.string = `[${item.city}]`;
        if (item.goodsQuality == 0) {
            cc.loader.loadRes('normal/white_bg', cc.SpriteFrame, (err, asset) => {
                this.quality_pic.node.active = false;
                this.good_bg.spriteFrame = asset;
                this.good_bg.node.color = cc.color(233, 234, 235);
                cc.loader.load(item.icon, (err, texture) => {
                    this.good_pic.node.scaleX = 0.9;
                    this.good_pic.node.scaleY = 0.9;
                    this.good_pic.node.opacity = 255;
                    this.good_pic.spriteFrame = new cc.SpriteFrame(texture)
                });
            })

        } else {
            cc.loader.loadRes('mission/xiyoudi', cc.SpriteFrame, (err, asset) => {
                this.quality_pic.node.active = true;
                this.good_bg.spriteFrame = asset;
                this.good_bg.node.color = cc.color(255, 255, 255);
                // this.good_mask.spriteFrame = assets[1];
                cc.loader.load(item.icon, (err, texture) => {
                    this.good_pic.node.scaleX = 0.9;
                    this.good_pic.node.scaleY = 0.9;
                    this.good_pic.node.opacity = 255;
                    this.good_pic.spriteFrame = new cc.SpriteFrame(texture);
                });
            })

        }
    },

    initByNotOwn(item) {
        this.item = item;
        this.quality_pic.node.active = false;
        let nameLabel = this.good_name.getComponent(cc.Label);
        nameLabel.node.active = false;
        this.cityLabel.node.active = false;
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
