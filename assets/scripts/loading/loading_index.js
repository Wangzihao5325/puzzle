import {
    BG_ASSET_URL,
    CITY_ICON_URL,
    MAN_VISTER,
    WOMAN_VISTER,
    OLD_MAN_VISTER,
    YOUNG_WOMAN_VISTER,
    VISTER_ATTITUDE,
    NAVI_ASSETS,
} from '../global/app_global_index';
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';
import WxApi from '../global/wx_index';
// import WxApi from '../global/wx_index';

cc.Class({
    extends: cc.Component,

    properties: {
        soundNode: cc.Node,
        loadingBg: cc.Sprite,
        loadingMask: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    loadingProgressAdd(nowStep, totalStep, totalWidth) {
        let nowWidth = Math.floor(nowStep / totalStep * totalWidth);
        this.loadingMask.node.width = nowWidth
    },

    start() {

        //设置常驻节点
        cc.game.addPersistRootNode(this.soundNode);
        let totalWidth = this.loadingBg.node.width;
        let totalStep = 12;
        //播放引导页背景音
        // this.soundNode.getComponent("sound").playGuide()


        /*加载背景图片*/
        cc.loader.load(BG_ASSET_URL, (errs, results) => {
            if (errs) cc.error(errs);
            let resArr = BG_ASSET_URL.map((item) => {
                return results.getContent(item);
            });
            CACHE.assets.bg = resArr;
            this.loadingProgressAdd(1, totalStep, totalWidth);
            /*加载城市icon*/
            cc.loader.load(CITY_ICON_URL, (errs, results) => {
                if (errs) cc.error(errs);
                let resArr = CITY_ICON_URL.map((item) => {
                    return results.getContent(item);
                });
                CACHE.assets.cityIcon = resArr;
                this.loadingProgressAdd(2, totalStep, totalWidth);
                /*vister资源*/
                cc.loader.load(MAN_VISTER, (errs, results) => {
                    if (errs) cc.error(errs);
                    let resArr = MAN_VISTER.map((item) => {
                        return results.getContent(item);
                    });
                    CACHE.assets.manVistor = resArr;
                    this.loadingProgressAdd(3, totalStep, totalWidth);
                    cc.loader.load(WOMAN_VISTER, (errs, results) => {
                        if (errs) cc.error(errs);
                        let resArr = WOMAN_VISTER.map((item) => {
                            return results.getContent(item);
                        });
                        CACHE.assets.womenVistor = resArr;
                        this.loadingProgressAdd(4, totalStep, totalWidth);
                        cc.loader.load(OLD_MAN_VISTER, (errs, results) => {
                            if (errs) cc.error(errs);
                            let resArr = OLD_MAN_VISTER.map((item) => {
                                return results.getContent(item);
                            });
                            CACHE.assets.oldManVistor = resArr;
                            this.loadingProgressAdd(5, totalStep, totalWidth);
                            cc.loader.load(YOUNG_WOMAN_VISTER, (errs, results) => {
                                if (errs) cc.error(errs);
                                let resArr = YOUNG_WOMAN_VISTER.map((item) => {
                                    return results.getContent(item);
                                });
                                CACHE.assets.youngWomenVistor = resArr;
                                this.loadingProgressAdd(6, totalStep, totalWidth);
                                cc.loader.load(VISTER_ATTITUDE, (errs, results) => {
                                    if (errs) cc.error(errs);
                                    let resArr = VISTER_ATTITUDE.map((item) => {
                                        return results.getContent(item);
                                    });
                                    CACHE.assets.vistorAttitude = resArr;
                                    this.loadingProgressAdd(7, totalStep, totalWidth);
                                    /*加载导航资源 */
                                    cc.loader.load(NAVI_ASSETS, (errs, results) => {
                                        if (errs) cc.error(errs);
                                        let resArr = NAVI_ASSETS.map((item) => {
                                            return results.getContent(item);
                                        });
                                        CACHE.assets.naviAssets = resArr;
                                        this.loadingProgressAdd(8, totalStep, totalWidth);
                                        /**获取新手引导进度 */
                                        // cc.director.loadScene("travel");

                                        cc.loader.loadResDir('3x4/', cc.SpriteFrame, (err, spriteFrames) => {
                                            this.loadingProgressAdd(9, totalStep, totalWidth);
                                            // handle spriteFrames
                                            cc.loader.loadResDir('4x6/', cc.SpriteFrame, (err, spriteFrames) => {
                                                this.loadingProgressAdd(10, totalStep, totalWidth);
                                                // handle spriteFrames
                                                cc.loader.loadResDir('6x8/', cc.SpriteFrame, (err, spriteFrames) => {
                                                    this.loadingProgressAdd(11, totalStep, totalWidth);
                                                    // handle spriteFrames
                                                    Api.guideState((res) => {
                                                        if (res.data) {
                                                            CACHE.userInfo.stage = res.data.stage;
                                                            CACHE.userInfo.firstPetBackHomeEnded = res.data.firstPetBackHomeEnded;
                                                            CACHE.userInfo.firstRecallEnded = res.data.firstRecallEnded;
                                                            CACHE.userInfo.firstRewardTaskEnded = res.data.firstRewardTaskEnded;
                                                            this.loadingProgressAdd(12, totalStep, totalWidth);
                                                            cc.director.loadScene("travel");
                                                        }
                                                        if (CACHE.platform.isWachat) {
                                                            WxApi.loadUserInfo();
                                                        }
                                                    });
                                                });
                                            });
                                        });

                                    })
                                })
                            });
                        });

                    })
                })
            })
        });
    },

    // update (dt) {},
});
