// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        warp:cc.Node,
        content:cc.Node,
        cancel:cc.Node,
        confirm:cc.Node,
        close:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        this.setTouch()
        this.content.setScale(0.2)
        cc.tween(this.content)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()
    },
    handleClose(){
        cc.tween(this.content)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.warp.destroy()
        })
        .start()
    },
    go(){
        console.log("go")
        cc.director.loadScene("travel");

    },

    setTouch() {
        this.warp.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.close.on(cc.Node.EventType.TOUCH_START, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleClose()
            event.stopPropagation();
        })
        this.confirm.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.go()
            event.stopPropagation();
        });
        this.cancel.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleClose()
            event.stopPropagation();
        })
        
    },
    // update (dt) {},
});
