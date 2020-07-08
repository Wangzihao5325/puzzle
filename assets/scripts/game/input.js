// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        root: cc.Node,
        editBox: cc.EditBox
    },

    // LIFE-CYCLE CALLBACKS:
    setCallback(callback) {
        if (callback) {
            this.inputEndCallback = callback;
        }
    },

    onLoad() {
        this.editBox.maxLength = 50;
        this.root.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.root.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.root.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (this.editBox.string && this.inputEndCallback) {
                let string = this.editBox.string;
                this.inputEndCallback(string);
            }
            this.root.active = false;
            event.stopPropagation();
        });
    },

    start() {

    },

    // update (dt) {},
});
