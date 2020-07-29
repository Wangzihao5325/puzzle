import {
    MAN_VISTER,
    WOMAN_VISTER,
    OLD_MAN_VISTER,
    YOUNG_WOMAN_VISTER,
    VISTER_ATTITUDE,
} from '../global/app_global_index';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        switch (CACHE.targetScene) {
            case 'show':
                if (!CACHE.assets.manVistor) {
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
                            cc.loader.load(OLD_MAN_VISTER, (errs, results) => {
                                if (errs) cc.error(errs);
                                let resArr = OLD_MAN_VISTER.map((item) => {
                                    return results.getContent(item);
                                });
                                CACHE.assets.oldManVistor = resArr;
                                cc.loader.load(YOUNG_WOMAN_VISTER, (errs, results) => {
                                    if (errs) cc.error(errs);
                                    let resArr = YOUNG_WOMAN_VISTER.map((item) => {
                                        return results.getContent(item);
                                    });
                                    CACHE.assets.youngWomenVistor = resArr;
                                    cc.loader.load(VISTER_ATTITUDE, (errs, results) => {
                                        if (errs) cc.error(errs);
                                        let resArr = VISTER_ATTITUDE.map((item) => {
                                            return results.getContent(item);
                                        });
                                        CACHE.assets.vistorAttitude = resArr;
                                        cc.director.loadScene('show');
                                    });
                                });
                            });
                        });
                    });
                } else {
                    cc.director.loadScene('show');
                }
                break;
            case 'puzzle':
                let picUrl = '3x4/';
                if (CACHE.hard_level == 0) {
                    picUrl = '3x4/';
                } else if (CACHE.hard_level == 1) {
                    picUrl = '4x6/';
                } else if (CACHE.hard_level == 2) {
                    picUrl = '6x8/';
                } else if (CACHE.hard_level == 3) {
                    picUrl = '6x8/';
                } else if (CACHE.hard_level == 4) {
                    picUrl = '6x6/';
                }
                cc.loader.loadResDir(picUrl, cc.SpriteFrame, (err, spriteFrames) => {
                    cc.director.loadScene('puzzle');
                })
                break;
            default :
                setTimeout(()=>{
                    cc.director.loadScene(CACHE.targetScene);
                },1500)
            break;
        }

    },

    // update (dt) {},
});
