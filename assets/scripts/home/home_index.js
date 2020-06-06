import { CACHE } from '../global/usual_cache';
import { SCENE, SCENE_KEY } from '../global/app_global_index';
import { HOME_CACHE } from '../global/home_global';
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
        recall_icon:cc.Node,
        backpack_icon:cc.Node,
        store: cc.Prefab,
        recall: cc.Prefab,
        food_lack: cc.Prefab,
        audio: {
            default: null,
            type: cc.AudioClip
        },
        backpack: cc.Prefab,
        bowlWarp:cc.Node,
        bowl0:cc.Node,
        bowl1:cc.Node,
        bowl2:cc.Node,
        bowl3:cc.Node,
        bowl4:cc.Node,
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

        let feedWarpInstan = cc.instantiate(this.feed_warp)
        var warp_parent = cc.find(`Canvas`)
        feedWarpInstan.parent = warp_parent
        feedWarpInstan.setPosition(0, -1000);

        cc.tween(feedWarpInstan)
        .to(.2, { position: cc.v2(0, -268) } )
        .to(.1, { position: cc.v2(0, -388) })
            .start()
        const feed=feedWarpInstan.getComponent('feed')
        feed.resetUI()
    },


    setOUtUi() {
        var outside_item = cc.find(`Canvas/rootWarp/my_home/outside`)
        var catItem = cc.find(`Canvas/rootWarp/my_home/cat/catItem`)
        let { outward } = HOME_CACHE.pet_info
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
        if (HOME_CACHE.pet_info.currentHungry === 0) {
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
                this.resetUI()
                if (callBack) {
                    callBack()
                }
            }
        });
    },

    resetUI() {
        var hungry_warp = cc.find(`processText`, this.hungry_bar)
        hungry_warp.getComponent(cc.Label).string = `${HOME_CACHE.pet_info.currentHungry} \\ ${HOME_CACHE.pet_info.hungryUpperLimit}`
        this.hungry_bar.width = 200 * HOME_CACHE.pet_info.currentHungry / HOME_CACHE.pet_info.hungryUpperLimit

        var lucky_warp = cc.find(`processText`, this.lucky_bar)
        lucky_warp.getComponent(cc.Label).string = `${HOME_CACHE.pet_info.currentLucky} \\ ${HOME_CACHE.pet_info.luckyUpperLimit}`
        this.lucky_bar.width = 200 * HOME_CACHE.pet_info.currentLucky / HOME_CACHE.pet_info.luckyUpperLimit

        //更新猫盆状态
        const hungryPercent= Math.ceil(HOME_CACHE.pet_info.currentHungry/HOME_CACHE.pet_info.hungryUpperLimit*100)
        this.bowlWarp.children.map(item=>{
            console.log("item",item)
            item.active=false
        })
        if(hungryPercent>=90){
            this.bowl4.active=true
        }else if(hungryPercent>=70){
            this.bowl3.active=true
        }else if(hungryPercent>=30){
            this.bowl2.active=true
        }else if(hungryPercent>=1){
            this.bowl1.active=true
        }else{
            this.bowl0.active=true
        }

        this.setOUtUi()


    },

    onLoad() {
        this.stateUpdate();
        this.setBg();
        this.footerInit();
        this.setTouch();
        if (CACHE.isBGM && !this.currentBGM) {
            this.currentBGM = cc.audioEngine.play(this.audio, true, 1);
        }
    },

    start() {
        this.init();
    },

    showBackpack(){
        let backpackIns = cc.instantiate(this.backpack)
        backpackIns.parent =  cc.find('Canvas')
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

    showCatAction() {
        let { outward } = HOME_CACHE.pet_info
        if(outward){
            return false
        }
        let catActionInstan = cc.instantiate(this.cat_action)
        catActionInstan.parent = this.home_root
        catActionInstan.setPosition(0, 80);
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
            this.showBackpack()
            event.stopPropagation();
        })
        this.bowlWarp.on(cc.Node.EventType.TOUCH_END, (event) => {
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
    }

    // update (dt) {},
});
