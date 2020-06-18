import { CITIES } from '../global/travel_global_index';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        radio: cc.Sprite,
        bg: cc.Sprite,
        map: cc.ScrollView,
    },

    animateStart() {
        cc.tween(this.radio.node)
            .to(0, { angle: 0 })
            .to(4, { angle: 360 })
            .union()
            .repeatForever()
            .start();
    },

    setTouch() {
        this.bg.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
            let cityStateArr = CITIES;
            cityStateArr.every((item) => {
                if (item.isRecommend) {
                    let x = item.positionX + 960 - (CACHE.platform.visibleSize.width / 2);
                    let y = 852 - item.positionY - (CACHE.platform.visibleSize.height / 2);
                    this.map.scrollToOffset(cc.v2(x, y), 2);
                    return false;
                } else {
                    return true;
                }
            });
        });

        this.bg.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });

        this.bg.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        });
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.animateStart();
        this.setTouch();
    },

    // update (dt) {},
});
