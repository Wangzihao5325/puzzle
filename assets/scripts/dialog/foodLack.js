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
        confirmBtn:cc.Node,
        closeBtn:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setTouch()
    },

    start () {

    },



    handleClose(){
        console.log("点击关闭")

        this.modal.destroy();
    },

    setTouch() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleClose()
            event.stopPropagation();
        })
        this.confirmBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleConfirm()
            event.stopPropagation();
        })
        
    },
    handleConfirm(){
        console.log("点击确认")
        this.modal.destroy();
    },

   
    // update (dt) {},
});
