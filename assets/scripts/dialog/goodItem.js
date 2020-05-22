// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        good_name:cc.Node,
        good_pic:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init(item){
        this.good_name.getComponent(cc.Label).string=item.name;
        cc.loader.load(item.url, (err, texture)=> {
            this.good_pic.spriteFrame=new cc.SpriteFrame(texture)
        });
    },

    // update (dt) {},
});
