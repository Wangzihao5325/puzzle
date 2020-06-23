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
        richText: cc.RichText,
        txtBg: cc.Node,
        tail: cc.Node,
    },

    setContentStr(string, isHeightFit) {
        let biggerSize = 120;//margin*2
        let biggerHeight = 30;
        this.richText.node.opacity = 1;
        this.richText.string = string;
        setTimeout(() => {
            /*将读取富文本宽度操作排到执行队列尾部
              确保富文本的渲染执行完毕*/
            let bgWidth = this.richText.node.width + biggerSize;
            this.txtBg.width = bgWidth;
            if (isHeightFit) {
                this.txtBg.height = this.richText.node.height + biggerHeight * 2;
            } else {
                this.txtBg.height = 120;
            }
            this.tail.x = -bgWidth / 2;
            this.richText.node.opacity = 255;
        }, 0);
    },

    start() {

    },
});
