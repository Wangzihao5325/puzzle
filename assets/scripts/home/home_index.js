import { CACHE } from '../global/usual_cache';
import { SCENE, SCENE_KEY } from '../global/app_global_index';
import { HOME_CACHE, catPopList } from '../global/home_global';
import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        ske_anim: {
            type: sp.Skeleton, //
            default: null,
        },
        cat: cc.Node,
        footer: cc.Prefab,
        header: cc.Prefab,
        cat_action: cc.Prefab,
        layout_root: cc.Node,
        home_root: cc.Node,
        home_bg: cc.Sprite,
        hungry_bar: cc.Node,
        lucky_bar: cc.Node,
        feed_warp: cc.Prefab,
        dress_modal: cc.Prefab,
        currency_warp: cc.Prefab,
        OutSide: cc.Prefab,
        store_icon: cc.Node,
        recall_icon: cc.Node,
        backpack_icon: cc.Node,
        store: cc.Prefab,
        recall: cc.Prefab,
        food_lack: cc.Prefab,
        audio: {
            default: null,
            type: cc.AudioClip
        },
        backpack: cc.Prefab,
        bowlWarp: cc.Node,
        bowl0: cc.Node,
        bowl1: cc.Node,
        bowl2: cc.Node,
        bowl3: cc.Node,
        bowl4: cc.Node,

        collectIcon: cc.Node,
        collect: cc.Prefab,
        catPop: cc.Node,
        catPopText: cc.Label,
        recallNew: cc.Node,
        backpackNew: cc.Node,
        collectNew: cc.Node,

    },

    stateUpdate() {
        CACHE.scene = SCENE.HOME;
    },

    setBg() {
        const bg_assets = CACHE.assets.bg;
        let homeBgTex = bg_assets[SCENE_KEY.HOME];
        this.home_bg.spriteFrame = new cc.SpriteFrame(homeBgTex);
    },

    //喂养
    show_feed() {
        // ComeBack.show(goodsList)

        let feedWarpInstan = cc.instantiate(this.feed_warp);
        feedWarpInstan.name = 'feedWarp';
        var warp_parent = cc.find(`Canvas`)
        feedWarpInstan.parent = warp_parent
        feedWarpInstan.setPosition(0, -1000);

        cc.tween(feedWarpInstan)
            .to(.2, { position: cc.v2(0, -268) })
            .to(.1, { position: cc.v2(0, -388) })
            .start()
        const feed = feedWarpInstan.getComponent('feed')
        feed.resetUI()
    },

    showBowl(show = true) {
        this.bowlWarp.active = show
    },

    setCatPop() {
        this.catPopTimer = setTimeout(() => {
            this.showCatPop()
            this.setCatPop()
        }, 30 * 1000)
    },

    //限制猫咪提示气泡
    showCatPop() {
        if(HOME_CACHE.pet_info.outward){
            return false
        }
        const poptext = catPopList[Math.round(Math.random() * (catPopList.length - 1))]
        this.catPopText.string = poptext

        const postType = HOME_CACHE.cat_post;
        popPostion = [[65, 340], [-40, 300], [65, 360]]
        this.catPop.setPosition(cc.v2(popPostion[postType][0], popPostion[postType][1] - 40))
        cc.tween(this.catPop)
            .to(.4, { position: cc.v2(popPostion[postType][0], popPostion[postType][1]), opacity: 255 })
            .delay(3)
            .to(.2, { position: cc.v2(popPostion[postType][0], popPostion[postType][1] - 40), opacity: 0 })
            .start()
    },


    setOUtUi(showHanger=true) {
        var outside_item = cc.find(`Canvas/rootWarp/my_home/outside`)
        var catItem = cc.find(`Canvas/rootWarp/my_home/cat/catItem`)
        let { outward } = HOME_CACHE.pet_info
        this.showBowl(!outward)

        if (outside_item) {
            outside_item.active = outward
            catItem ? catItem.active = !outward : ''
            if (outward === false) {
                outside_item.destroy()
            }
        } else {
            // const feedWarpInstan=  cc.find(`Canvas/feedWarp`)
            let OutSide = cc.instantiate(this.OutSide)
            // var cat = cc.find(`Canvas/rootWarp/my_home/cat`)
            var my_home = cc.find(`Canvas/rootWarp/my_home`)
            catItem.active = !outward
            OutSide.parent = my_home
            OutSide.active = outward
        }

        //食物吃完了弹窗
        if (showHanger&&HOME_CACHE.pet_info.currentHungry === 0 && CACHE.userInfo && typeof CACHE.userInfo.stage == 'number' && CACHE.userInfo.stage === 99) {
            const canvas = cc.find('Canvas')
            const FoodLackInstant = cc.find('Canvas/FoodLack')
            if (FoodLackInstant) {
                return false
            }
            let food_lack = cc.instantiate(this.food_lack);
            food_lack.parent = canvas;
        }

    },

    // LIFE-CYCLE CALLBACKS:

    footerInit() {
        let footer = cc.instantiate(this.footer);
        footer.name = 'navi_footer';
        let obj = footer.getComponent('navi_footer');
        obj.initWithScene(CACHE.scene);
        footer.parent = cc.find('Canvas');
        footer.setPosition(0, -500);
    },

    headerInit() {
        let header = cc.instantiate(this.header);
        let obj = header.getComponent('header_warp_index');
        obj.render();
        header.parent = this.layout_root;
        header.setPosition(0, 528);

        HOME_CACHE.dialog = undefined
    },




    getDecorations() {
        Api.petDecorations((res) => {
            const data = res.data;
            if (res.code === 0) {
                HOME_CACHE.cat_decorations = data;
                data.map(item => {
                    if (item.status === 2) {
                        this.handleDressItem(item)
                    }
                })
            }
        });
    },

    getPetInfo() {
        Api.petHome((res) => {
            const data = res.data;
            if (res.code === 0) {
                HOME_CACHE.pet_info = res.data;
                this.resetUI()
            }
        });
    },

    getPetHunger(callBack) {
        Api.petHungry((res) => {
            const data = res.data;
            if (res.code === 0) {
                HOME_CACHE.pet_info = {
                    ...HOME_CACHE.pet_info,
                    ...data,
                }
                this.setHungerTimer(data.refreshTime)

                this.resetUI()
                if (callBack) {
                    callBack()
                }
            }
        });
    },
    getBackNotice() {
        Api.petBackNotice(res => {
            if (res.code === 0 && res.data) {
                if (res.data.noticeId && res.data.awardJson) {
                    const goods = res.data.awardJson && JSON.parse(res.data.awardJson) || []
                    this.NoticeClear(res.data.noticeId)

                    ComeBack.show(goods)

                } else if (res.data.noticeId) {
                    this.NoticeClear(res.data.noticeId)

                    ComeBackNull.show(() => { })
                }

            }

        })
    },

    NoticeClear(id) {
        //消息已读
        Api.backNoticeView({ noticeId: id }, res => {
            console.log('kkkkkkk');
            console.log(res);
        })
    },


    setHungerTimer(refreshTime) {
        const time = refreshTime - (new Date()).getTime()
        if (hunberTimer) {
            clearTimeout(hunberTimer)
        }
        let hunberTimer = setTimeout(() => {
            this.getPetHunger()
        }, time)
    },

    getFoodRemain(callBack) {
        Api.petRemainFood((res) => {
            const data = res.data;
            if (res.code === 0) {
                HOME_CACHE.cat_food = res.data;
                this.resetUI(false)
                if (callBack) {
                    callBack()
                }
            }
        });
    },

    resetUI(showHanger) {
        var hungry_warp = cc.find(`processText`, this.hungry_bar)
        hungry_warp.getComponent(cc.Label).string = `${HOME_CACHE.pet_info.currentHungry} \\ ${HOME_CACHE.pet_info.hungryUpperLimit}`
        this.hungry_bar.width = 200 * HOME_CACHE.pet_info.currentHungry / HOME_CACHE.pet_info.hungryUpperLimit

        var lucky_warp = cc.find(`processText`, this.lucky_bar)
        lucky_warp.getComponent(cc.Label).string = `${HOME_CACHE.pet_info.currentLucky} \\ ${HOME_CACHE.pet_info.luckyUpperLimit}`
        this.lucky_bar.width = 200 * HOME_CACHE.pet_info.currentLucky / HOME_CACHE.pet_info.luckyUpperLimit

        //更新猫盆状态
        const hungryPercent = Math.ceil(HOME_CACHE.pet_info.currentHungry / HOME_CACHE.pet_info.hungryUpperLimit * 100)
        this.bowlWarp.children.map(item => {
            item.active = false
        })
        if (hungryPercent >= 90) {
            this.bowl4.active = true
        } else if (hungryPercent >= 70) {
            this.bowl3.active = true
        } else if (hungryPercent >= 30) {
            this.bowl2.active = true
        } else if (hungryPercent >= 1) {
            this.bowl1.active = true
        } else {
            this.bowl0.active = true
        }

        this.setOUtUi(showHanger)


    },

    onLoad() {
        this.stateUpdate();
        this.setBg();
        this.footerInit();
        this.setTouch();
        if (CACHE.isBGM && !this.currentBGM) {
            this.currentBGM = cc.audioEngine.play(this.audio, true, 1);
        }
        this.loadBtnTips();
    },

    start() {
        this.init();
        //测试用
        // this.showCollect()
    },

    showBackpack() {
        let backpackIns = cc.instantiate(this.backpack)
        backpackIns.parent = cc.find('Canvas')
        backpackIns.setPosition(0, 0);
    },

    init() {
        this.getPetInfo()
        this.getFoodRemain()
        this.getPetHunger()
        // this.initDress()
        this.getBackNotice()
        this.initCat()
    },

    showCatAction(goOut=false) {
        let { outward } = HOME_CACHE.pet_info
        if (outward) {
            Toast.show('宠物已经外出')
            return false
        }
        let catActionInstan = cc.instantiate(this.cat_action);
        catActionInstan.name = 'cat_action';
        catActionInstan.parent = this.home_root
        catActionInstan.setPosition(0, 80);
        if(goOut){
            catActionInstan.getComponent('action').handleGoout()
            catActionInstan.destroy()
        }
    },
    showStore() {
        let store = cc.instantiate(this.store);
        const canvas = cc.find('Canvas')
        store.parent = canvas
    },
    showRecall() {
        let recall = cc.instantiate(this.recall);
        const canvas = cc.find('Canvas')
        recall.parent = canvas
    },
    showCollect() {
        let collect = cc.instantiate(this.collect);
        collect.name = 'collect_root';
        const canvas = cc.find('Canvas')
        collect.parent = canvas
    },

    setTouch(hardLevel) {
        this.cat.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.showCatAction()
            event.stopPropagation();
        })
        this.store_icon.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.showStore()
            event.stopPropagation();
        })
        this.recall_icon.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.showRecall()
            event.stopPropagation();
        })
        this.backpack_icon.on(cc.Node.EventType.TOUCH_END, (event) => {
            console.log("点击背包")

            this.showBackpack()
            event.stopPropagation();
        })
        this.collectIcon.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.showCollect()
            event.stopPropagation();
        })
        this.bowlWarp.on(cc.Node.EventType.TOUCH_END, (event) => {
            console.log("点击猫盆")
            this.show_feed()
            event.stopPropagation();
        })

    },
    initCat() {
        const cartInstant = cc.find('Canvas/rootWarp/my_home/cat/catItem');
        if (cartInstant) {
            return false
        }

        var spineNode = new cc.Node();
        spineNode.name = 'catItem';
        spineNode.setPosition(0, 0);
        spineNode.setScale(0.6)
        var skeleton = spineNode.addComponent(sp.Skeleton);
        this.cat.addChild(spineNode);
        //TODO : 此处为你的远程资源路径
        var imageUrl = "https://puzzle.oss-cn-beijing.aliyuncs.com/maopa.png";
        var skeUrl = "https://puzzle.oss-cn-beijing.aliyuncs.com/maopa.json";
        var atlasUrl = "https://puzzle.oss-cn-beijing.aliyuncs.com/maopa.atlas";
        cc.loader.load(imageUrl, (error, texture) => {
            cc.loader.load({ url: atlasUrl, type: 'txt' }, (error, atlasJson) => {
                cc.loader.load({ url: skeUrl, type: 'txt' }, (error, spineJson) => {

                    const catPostList = ['Zou00', 'PA00', 'Zhan00']
                    // this.ske_com.clearTrack(0);
                    //随机姿势

                    HOME_CACHE.cat_post = Math.round(Math.random() * 2)
                    if (CACHE.userInfo && CACHE.userInfo.stage == 5) {
                        //新手引导强制猫咪为站姿
                        HOME_CACHE.cat_post = 2;
                    }

                    const currentPost = catPostList[HOME_CACHE.cat_post]

                    var asset = new sp.SkeletonData();
                    asset._uuid = skeUrl;
                    asset.skeletonJson = spineJson;
                    asset.atlasText = atlasJson;
                    asset.textures = [texture];
                    asset.textureNames = ['maopa.png'];
                    skeleton.skeletonData = asset;
                    skeleton.animation = currentPost;
                    skeleton._updateSkeletonData();
                    //气泡
                    this.setCatPop()
                    setTimeout(() => {
                        this.getDecorations()
                    }, 0)
                });
            });
        });
    },

    handleDressItem(item) {
        const cat_post_dress = ['C', '', 'Z']
        const currentPost = HOME_CACHE.cat_post
        const dress_per = cat_post_dress[currentPost]
        const name = item.iconName

        var spine = cc.find(`Canvas/rootWarp/my_home/cat/catItem`);
        var ske_com = spine.getComponent(sp.Skeleton);
        this.ske_com = ske_com;
        const skeletonData = this.ske_com.skeletonData.getRuntimeData();
        const skin = skeletonData.findSkin('default');
        const type = item.position
        let parts = ['', `${dress_per}toushi00`, `${dress_per}boshi00`, `${dress_per}weishi00`]//["toushi00", "boshi00", "weishi00"];
        let regSlot = this.ske_com.findSlot(parts[type]);
        let slotIndex = skeletonData.findSlotIndex(name);
        let atta = skin.getAttachment(slotIndex, name);

        let typeparts = ['', 'toushi00', 'boshi00', 'weishi00']//["toushi00", "boshi00", "weishi00"];
        let slotDefaultIndex = skeletonData.findSlotIndex(`${parts[type]}`);
        let Defaultatta = skin.getAttachment(slotDefaultIndex, typeparts[type]);
        atta.x = Defaultatta.x;
        atta.y = Defaultatta.y;
        atta.rotation = Defaultatta.rotation;
        atta.offset = Defaultatta.offset;

        regSlot.attachment = atta;
    },

    onDestroy() {
        if (this.currentBGM) {
            cc.audioEngine.stop(this.currentBGM);
        }
        if (this.catPopTimer) {
            clearTimeout(this.catPopTimer)
        }
    },
    loadBtnTips() {
        Api.myHomeTips((res) => {
            if (res.code === 0) {
                CACHE.btnTips = {
                    ...CACHE.btnTips,
                    collect: res.data.colletTip,
                    souvenir: res.data.normalGoodsTip || res.data.unusualGoodsTip,
                    scenic: res.data.hurdleTip,
                    normal: res.data.normalGoodsTip,
                    lack: res.data.unusualGoodsTip,
                    reCall: res.data.memoryTip, //回忆
                }
                this.updateBtnTips()
            } else {
                //请求异常处理
            }
        })
    },
    updateBtnTips() {
        this.collectNew.active = CACHE.btnTips.collect
        this.recallNew.active = CACHE.btnTips.reCall
    }

    // update (dt) {},
});
