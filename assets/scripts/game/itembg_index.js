import { MASK_RESOUSE } from '../global/piece_index';

cc.Class({
    extends: cc.Component,

    properties: {
        mask_item: cc.Mask,
        border: cc.Sprite
    },

    setMarsk(index, hardLevel) {
        const self = this;
        let urls = MASK_RESOUSE[hardLevel];
        cc.loader.loadRes(urls[index], cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            self.mask_item.spriteFrame = assets;
            self.border.spriteFrame = assets
        });
    },

    borderAnimate() {
        cc.tween(this.border.node)
            .to(0.1, { opacity: 10 })
            .to(0.1, { opacity: 30 })
            .to(0.1, { opacity: 80 })
            .to(0.1, { opacity: 160 })
            .delay(0.2)
            .to(0.1, { opacity: 80 })
            .to(0.1, { opacity: 30 })
            .to(0.1, { opacity: 10 })
            .to(0.1, { opacity: 0 })
            .start();
    },

    start() {

    },

});
