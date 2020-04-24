// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bgPic: {
            type: dragonBones.ArmatureDisplay,
            default: null
        }
    },

    start() {
        console.log('dddd');
        console.log(this.bgPic);
    },

    // update (dt) {},
});
