import { BG_ASSET_URL } from '../global/app_global_index';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.loader.load(BG_ASSET_URL, (errs, results) => {
            if (errs) cc.error(errs);

            let resArr = BG_ASSET_URL.map((item) => {
                return results.getContent(item);
            });

            CACHE.assets.bg = resArr;
            cc.director.loadScene("travel");
        });
    },

    // update (dt) {},
});
