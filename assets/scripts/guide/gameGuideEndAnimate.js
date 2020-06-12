import Api from '../api/api_index';
import { CACHE } from '../global/usual_cache';
cc.Class({
    extends: cc.Component,

    properties: {
        mask: cc.Node,
        ben: cc.Node,
        text: cc.Node,
        text2: cc.Node,
        hua: cc.Node,
        piao: cc.Node
    },

    setTouch() {
        this.mask.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.mask.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.mask.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        })
    },

    setText() {
        let str = "  虽然跟奶奶过去的样子，已经发生\n了翻天覆地的变化。\n  然而，每一段足迹都印证着\n我们来过的回忆。\n\n  世界那么大，我想去看看更多的\n城市，体验更多的风景。";
        let j = 0;
        this.text.getComponent(cc.Label).string = "";
        this.schedule(() => {
            if (j == str.length) {
                this.setText2();
            } else {
                this.text.getComponent(cc.Label).string += str[j];
                j++;
            }
        }, 0.1, str.length, 0.2);
    },

    setText2() {
        let str = "  继续出发吧！";
        let j = 0;
        this.text2.getComponent(cc.Label).string = "";
        this.schedule(() => {
            if (j == str.length) {
                this.animateTwo();
            } else {
                this.text2.getComponent(cc.Label).string += str[j];
                j++;
            }
        }, 0.1, str.length, 0.2);
    },

    animateTwo() {
        cc.tween(this.hua)
            .to(1, { opacity: 255 })
            .start()
        cc.tween(this.piao)
            .delay(0.75)
            .to(1, { opacity: 255 })
            .call(() => {
                Api.guideStageComplete({ stage: 8 }, (res) => {
                    if (res.code == 0) {
                        CACHE.userInfo.stage = 99;
                    }
                    this.node.active = false;
                })
            })
            .start()
    },

    endAnimate() {
        cc.tween(this.ben)
            .to(1, { opacity: 255 })
            .call(() => {
                this.setText();
            })
            .start();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setTouch();
        this.endAnimate();
    },

    start() {

    },

    // update (dt) {},
});
