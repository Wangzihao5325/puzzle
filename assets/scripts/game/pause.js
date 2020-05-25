// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GLOBAL_VAR from '../global/index'

cc.Class({
    extends: cc.Component,

    properties: {
        dialog: cc.Node,
        close: cc.Node,
        sound: cc.Node,
        continue: cc.Node,
        back: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setTouch()
    },

    start() {

    },
    goBack() {
        this.dialog.active = false;
        GLOBAL_VAR.pause = false;
        cc.director.loadScene("travel");
    },

    closeDialog() {
        this.dialog.active = false;
        GLOBAL_VAR.pause = false

    },

    continueGame() {
        this.dialog.active = false;
        GLOBAL_VAR.pause = false
    },

    toglleSound() {

    },


    setTouch(hardLevel) {
        this.close.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.closeDialog()
            event.stopPropagation();
        })
        this.back.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.goBack()
            event.stopPropagation();
        })
        this.continue.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.continueGame()
            event.stopPropagation();
        })
        this.sound.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.toglleSound()
            event.stopPropagation();
        })
    },
    // update (dt) {},
});
