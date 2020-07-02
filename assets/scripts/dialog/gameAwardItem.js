// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        icon_warp: cc.Node,
        icon_content: cc.Node,
        good_name: cc.Node,
        good_new: cc.Node,
        good_rare: cc.Node,
        good_pic: cc.Sprite,
        rare_bg: cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.icon_warp.opacity = 0
        this.showAnimation()
    },

    start() {

    },
    showAnimation() {
        const positionx = this.icon_warp.x
        const positionY = this.icon_warp.y
        this.icon_warp.setPosition(cc.v2(-400, -positionY))

        cc.tween(this.icon_warp)
            .delay(.5)
            .to(.4, { position: cc.v2(positionx + 100, positionY), opacity: 255 },)
            .to(.1, { position: cc.v2(positionx, positionY) },)
            .start()
    },
    init(item, index) {
        this.good_name.getComponent(cc.Label).string = item.name;
        cc.loader.load(item.iconUrl, (err, texture) => {
            this.good_pic.spriteFrame = new cc.SpriteFrame(texture)
        });
        if (item.goodsQuality === 1) {// 本来为item.goodsType，因为稀有度展示不对，修改为goodsQuality
            this.icon_warp.getComponent(cc.Sprite).spriteFrame = this.rare_bg
            this.icon_content.getComponent(cc.Sprite).spriteFrame = this.rare_bg
            this.good_rare.active = true
            this.good_rare.opacity = 0
            const positionx = this.good_rare.x
            const positionY = this.good_rare.y
            this.good_rare.setPosition(cc.v2(-400, positionY))
            cc.tween(this.good_rare)
                .delay(1.5)
                .to(.2, { position: cc.v2(positionx, positionY), opacity: 255 },)
                .start()
        }
        if (item.exist === false) {
            this.good_new.active = true
            this.good_new.opacity = 0
            const positionx = this.good_new.x
            const positionY = this.good_new.y
            this.good_new.setPosition(cc.v2(-400, positionY))
            cc.tween(this.good_new)
                .delay(1.5)
                .to(.2, { position: cc.v2(positionx, positionY), opacity: 255 },)
                .start()
        }
    },

    // update (dt) {},
});
