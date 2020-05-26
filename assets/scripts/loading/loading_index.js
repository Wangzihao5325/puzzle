import { BG_ASSET_URL, CITY_ICON_URL } from '../global/app_global_index';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        /*加载背景图片*/
        cc.loader.load(BG_ASSET_URL, (errs, results) => {
            if (errs) cc.error(errs);
            let resArr = BG_ASSET_URL.map((item) => {
                return results.getContent(item);
            });
            CACHE.assets.bg = resArr;
            /*加载城市icon*/
            cc.loader.load(CITY_ICON_URL, (errs, results) => {
                if (errs) cc.error(errs);
                let resArr = CITY_ICON_URL.map((item) => {
                    return results.getContent(item);
                });
                CACHE.assets.cityIcon = resArr;
            })
            cc.director.loadScene("travel");
        });
    },

    // update (dt) {},
});
