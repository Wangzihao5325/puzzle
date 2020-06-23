// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


cc.Class({
    extends: cc.Component,

    properties: {
        modal:cc.Node,
        content:cc.Node,
        confirmBtn:cc.Node,
        closeBtn:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.content.setScale(0.2)
        cc.tween(this.content)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()
        this.setTouch()
    },

    start () {

    },



    handleClose(){

        cc.tween(this.content)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.modal.active=false;
            this.modal.destroy()
        })
        .start()
    },

    setTouch() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.handleClose()
            event.stopPropagation();
        })
        this.confirmBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.handleConfirm()
            event.stopPropagation();
        })
        
    },
    handleConfirm(){
        // this.modal.destroy();
        this.handleClose()
    },

   
    // update (dt) {},
});
