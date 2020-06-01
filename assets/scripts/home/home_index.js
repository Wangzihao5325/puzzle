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
        dress_warp: cc.Prefab,
        currency_warp: cc.Prefab,
        OutSide:cc.Prefab,
        store_icon:cc.Node,
        store:cc.Prefab,
        food_lack:cc.Prefab,


    },

    stateUpdate() {
        CACHE.scene = SCENE.HOME;
    },

    setBg() {
        const bg_assets = CACHE.assets.bg;
        let homeBgTex = bg_assets[SCENE_KEY.HOME];
        this.home_bg.spriteFrame = new cc.SpriteFrame(homeBgTex);
    },



    setOUtUi(){
        var outside_item = cc.find(`Canvas/rootWarp/my_home/outside`)
        var catItem = cc.find(`Canvas/rootWarp/my_home/cat/catItem`)
        let {outward}=HOME_CACHE.pet_info
        if(outside_item){
            outside_item.active=outward
            catItem?catItem.active=!outward:''
            if(outward===false){
                outside_item.destroy()
            }
        }else{
            // const feedWarpInstan=  cc.find(`Canvas/feedWarp`)
            let OutSide=cc.instantiate(this.OutSide)
            // var cat = cc.find(`Canvas/rootWarp/my_home/cat`)
            var my_home = cc.find(`Canvas/rootWarp/my_home`)
            catItem.active=!outward
            OutSide.parent=my_home
            OutSide.active=outward
        }

        //食物吃完了弹窗
        if(HOME_CACHE.pet_info.currentHungry===0){
            const canvas=cc.find('Canvas')
            const FoodLackInstant=cc.find('Canvas/FoodLack')
            if(FoodLackInstant){
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
        footer.parent = this.layout_root;
        footer.setPosition(0, -500);
    },

    headerInit() {
        let header = cc.instantiate(this.header);
        let obj = header.getComponent('header_warp_index');
        obj.render();
        header.parent = this.layout_root;
        header.setPosition(0, 528);
    },


    initDress() {
        let dressWarpInstan = cc.instantiate(this.dress_warp)
        var warp_parent = cc.find(`Canvas`)
        dressWarpInstan.parent = warp_parent
        dressWarpInstan.setPosition(0, -868);
        dressWarpInstan.active = false
        let obj = dressWarpInstan.getComponent('dress')
        // obj.init()

    },

    getDecorations() {
        Api.petDecorations((res) => {
            const data = res.data;
            if (res.code === 0) {
                HOME_CACHE.cat_decorations = data;
                data.map(item=>{
                    if(item.status===2){
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
    getBackNotice(){
        Api.petBackNotice(res=>{
            if(res.code===0&&res.data){
                if(res.data.noticeId&&res.data.awardJson){
                    const goods=res.data.awardJson&&JSON.parse(res.data.awardJson)||[]
                    this.NoticeClear(res.data.noticeId)

                    ComeBack.show(goods)
                    
                }else if(res.data.noticeId){
                    this.NoticeClear(res.data.noticeId)

                    ComeBackNull.show(()=>{})
                }

            }

        })
    },

    NoticeClear(id){
        //消息已读
        Api.backNoticeView({noticeId:id},res=>{

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
        hungry_warp.getComponent(cc.Label).string = `${HOME_CACHE.pet_info.currentHungry} \ ${HOME_CACHE.pet_info.hungryUpperLimit}`
        this.hungry_bar.width = 200 * HOME_CACHE.pet_info.currentHungry / HOME_CACHE.pet_info.hungryUpperLimit

        var lucky_warp = cc.find(`processText`, this.lucky_bar)
        lucky_warp.getComponent(cc.Label).string = `${HOME_CACHE.pet_info.currentLucky} \ ${HOME_CACHE.pet_info.luckyUpperLimit}`
        this.lucky_bar.width = 200 * HOME_CACHE.pet_info.currentLucky / HOME_CACHE.pet_info.luckyUpperLimit

        this.setOUtUi()
        

    },

    onLoad() {
        // this.initCatPost()

        this.stateUpdate();
        this.setBg();
        this.footerInit();
        this.headerInit();
        this.setTouch()
    },

    start() {
        this.init();
    },

    init() {
        this.getPetInfo()
        this.getFoodRemain()
        this.getPetHunger()
        this.initDress()
        this.getBackNotice()
        this.initCat()
    },

    showCatAction() {
        let catActionInstan = cc.instantiate(this.cat_action)
        catActionInstan.parent = this.home_root
        catActionInstan.setPosition(0, 80);
    },
    showStore(){
        let store = cc.instantiate(this.store);
        const canvas=cc.find('Canvas')
        store.parent=canvas
    },
    setTouch(hardLevel) {
        this.cat.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.showCatAction()
            event.stopPropagation();
        })
        this.store_icon.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.showStore()
            event.stopPropagation();
        })
        
    },
    initCat(){
        const cartInstant= cc.find('Canvas/rootWarp/my_home/cat/catItem');
        if(cartInstant){
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
                    if (HOME_CACHE.cat_post === undefined) {
                        HOME_CACHE.cat_post = Math.round(Math.random() * 2)
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
                    setTimeout(()=>{
                        this.getDecorations() 
                    },0)
                });
            });
        });
    },

    handleDressItem(item){
        const cat_post_dress=['C','','Z']
        const currentPost=HOME_CACHE.cat_post
        const dress_per=cat_post_dress[currentPost]
        // HOME_CACHE.cat_post
        const name=item.iconName
        
        // "boshi00": { "x": -29.51, "y": -21.46, "rotation": -113.23, "width": 231, "height": 167 }
        // spine

        // var spine = this.ske_anim;
        var spine = cc.find(`Canvas/rootWarp/my_home/cat/catItem`);
        var ske_com = spine.getComponent(sp.Skeleton);
        this.ske_com = ske_com;
        const skeletonData = this.ske_com.skeletonData.getRuntimeData();
        const skin = skeletonData.findSkin('default');
        const type = item.position
        let parts = ['',`${dress_per}toushi00`, `${dress_per}boshi00`, `${dress_per}weishi00`]//["toushi00", "boshi00", "weishi00"];
        let regSlot = this.ske_com.findSlot(parts[type]);
        let slotIndex = skeletonData.findSlotIndex(name);
        let atta = skin.getAttachment(slotIndex, name);

        let typeparts = ['','toushi00','boshi00','weishi00']//["toushi00", "boshi00", "weishi00"];
        let slotDefaultIndex = skeletonData.findSlotIndex(`${parts[type]}`);
        let Defaultatta = skin.getAttachment(slotDefaultIndex, typeparts[type]);
        atta.x=Defaultatta.x;
        atta.y=Defaultatta.y;
        atta.rotation=Defaultatta.rotation;
        atta.offset=Defaultatta.offset;

        regSlot.attachment = atta;
    },

    // update (dt) {},
});
