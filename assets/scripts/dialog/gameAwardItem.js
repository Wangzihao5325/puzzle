// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        icon_warp:cc.Node,
        icon_content:cc.Node,
        good_name:cc.Node,
        good_new:cc.Node,
        good_rare:cc.Node,
        good_pic:cc.Sprite,
        rare_bg:cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init(item){
        this.good_name.getComponent(cc.Label).string=item.name;
        cc.loader.load(item.iconUrl, (err, texture)=> {
            this.good_pic.spriteFrame=new cc.SpriteFrame(texture)
        });
        if(item.goodsType===1){
            this.icon_warp.getComponent(cc.Sprite).spriteFrame=this.rare_bg
            this.icon_content.getComponent(cc.Sprite).spriteFrame=this.rare_bg
            this.good_rare.active=true
        }
        if(item.exist===false){
            this.good_new.active=true
        }
    },

    // update (dt) {},
});
