import {
    BG_ASSET_URL,
    CITY_ICON_URL,
    MAN_VISTER,
    WOMAN_VISTER,
    VISTER_ATTITUDE,
    NAVI_ASSETS,
} from '../global/app_global_index';
import { CACHE } from '../global/usual_cache';
// import WxApi from '../global/wx_index';

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

                /*vister资源*/
                cc.loader.load(MAN_VISTER, (errs, results) => {
                    if (errs) cc.error(errs);
                    let resArr = MAN_VISTER.map((item) => {
                        return results.getContent(item);
                    });
                    CACHE.assets.manVistor = resArr;

                    cc.loader.load(WOMAN_VISTER, (errs, results) => {
                        if (errs) cc.error(errs);
                        let resArr = WOMAN_VISTER.map((item) => {
                            return results.getContent(item);
                        });
                        CACHE.assets.womenVistor = resArr;

                        cc.loader.load(VISTER_ATTITUDE, (errs, results) => {
                            if (errs) cc.error(errs);
                            let resArr = VISTER_ATTITUDE.map((item) => {
                                return results.getContent(item);
                            });
                            CACHE.assets.vistorAttitude = resArr;

                            /*加载导航资源 */
                            cc.loader.load(NAVI_ASSETS, (errs, results) => {
                                if (errs) cc.error(errs);
                                let resArr = NAVI_ASSETS.map((item) => {
                                    return results.getContent(item);
                                });
                                CACHE.assets.naviAssets = resArr;

                                cc.director.loadScene("travel");
                            })
                        })
                    })
                })
            })
        });

        // WxApi.login(() => {WxApi.loadUserInfo()});
    },

    // update (dt) {},
});
