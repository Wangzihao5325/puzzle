// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        item:cc.Node,
        pic: cc.Sprite,
        title:cc.Label,
        num:cc.Label,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},




    init(item) {
        this.title.string = item.name;
        this.num.string=item.amount
        cc.loader.load(item.iconUrl, (err, texture) => {
            this.pic.spriteFrame = new cc.SpriteFrame(texture)

        });

    },


    // update (dt) {},
});
