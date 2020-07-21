import { MASK_RESOUSE } from '../global/piece_index';

cc.Class({
    extends: cc.Component,

    properties: {
        mask_item: cc.Mask,
        border:cc.Sprite
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
            self.border.spriteFrame=assets
        });
    },

    start() {

    },

});
