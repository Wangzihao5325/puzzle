// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        failContent:cc.Node,
        revive: cc.Node,
        noRevive: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //弹窗动画
        this.failContent.setPosition(cc.v2(0,-800))
        cc.tween(this.failContent)
        .to(.4,{position:cc.v2(0,40)},{ easing: 'sineIn'})
        .to(.2,{position:cc.v2(0,0)},{ easing: 'sineIn'})
        .start()

        this.setTouch()
    },

    start() {

    },


    setTouch(callback) {
        this.revive.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleRevive()
            event.stopPropagation();
        })
        this.noRevive.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.handleNoRevive()
            event.stopPropagation();
        })
    },

    handleRevive(){
        console.log("点击复活")
        this.failContent.destroy()
        const menu = cc.find('Canvas/root/menuWarp').getComponent('conraol')
        menu.revive()
    },

    handleNoRevive(){
        console.log("点击取消复活")

        this.failContent.destroy()
        cc.director.loadScene("mission");

    },

    

    // update (dt) {},
});
