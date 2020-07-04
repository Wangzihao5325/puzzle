// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CAR_FOOD, SHIPING } from "../global/home_global"
import Api from '../api/api_index'
import { HOME_CACHE } from '../global/home_global';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        modal:cc.Node,
        close: cc.Node,
        dress_content:cc.Node,
        pageContent: cc.Node,
        fragment:cc.Label,
        diamond:cc.Label,
        pageItem1: cc.Node,
        pageItem2: cc.Node,
        pageItem3: cc.Node,
        pageItem4: cc.Node,
        dress_item: cc.Prefab,
        dress_warp: cc.Node,
        save: cc.Node,
        discountDia:cc.Prefab


    },
    show_dress() {
        this.modal.opacity=0

        const screenHeight=cc.view.getVisibleSize().height
        this.dress_warp.height=CACHE.platform.isIphoneX?this.dress_warp.height+50:this.dress_warp.height;
        this.dress_content.height=CACHE.platform.isIphoneX?this.dress_content.height+50:this.dress_content.height;
        const headerY=-screenHeight/2+this.dress_warp.height/2

        cc.tween(this.modal)
            .to(.2,{opacity:255})
            .start()
        this.dress_warp.setPosition=cc.v2(0,-1000)

        cc.tween(this.dress_warp)
            .to(.2, { position: cc.v2(0,headerY+40) })
            .to(.1, { position: cc.v2(0,headerY) }, { easing: 'sineOutIn' })
            .start()
    },



    init() {
        // let list =HOME_CACHE.cat_decoration;


        const pages = Math.ceil((HOME_CACHE.cat_decorations.length) / 8)
        const contentList = [this.pageItem1, this.pageItem2, this.pageItem3, this.pageItem4]
        for (let m = 0; m < pages; m++) {
            const currentpages = HOME_CACHE.cat_decorations.slice(m * 8, (m + 1) * 8)
            const currentPageContent = contentList[m]
            currentPageContent.children && currentPageContent.children.map(item => {
                item.destroy()
            })

            // currentPageContent.parent=this.pageContent
            for (let i = 0; i < currentpages.length; i++) {
                let newNode = cc.instantiate(this.dress_item)

                const obj = newNode.getComponent('dress_item')

                const current=currentpages[i]
                current.pagesIndex=m
                current.itemIndex=i
                obj.init(current)
                obj.name = current.name


                newNode.parent = currentPageContent
                const indexX = i >= 4 ? i - 4 : i
                const indexY = Math.ceil((i + 1) / 4)
                let position = cc.v2((160 * (indexX + 1)) - 80 - 320, (210 - (180 * (-0.5 + indexY))) + 10);
                newNode.setPosition(position)
            }

        }




    },
    onLoad() {
        this.setTouch()
    },

    start() {
        // this.getDecorations()
        this.init()
        this.resetUI()
    },
    getDecorations() {
        Api.petDecorations((res) => {
            const data = res.data;
            if (res.code === 0) {
                HOME_CACHE.cat_decorations = data;
                this.init()
                this.resetUI()
            }
        });
    },

    resetUI() {
        this.fragment.string=`${CACHE.userData.fragment}`
        this.diamond.string=`${CACHE.userData.gem}`
    },




    handleClose() {
        cc.tween(this.modal)
            .to(.2,{opacity:0})
            .call(()=>{
                this.modal.destroy()
            })
            .start()
        cc.tween(this.dress_warp)
            .to(.2, { position: cc.v2(0, -1000) }, { easing: 'sineOutIn' })
            .start()
        this.resetDress()
        // this.modal.destroy()
        //显示猫盆
        let homeIndeObj = cc.find('Canvas').getComponent('home_index')
        homeIndeObj.showBowl(true)
    },


    handleSave() {
        const status = HOME_CACHE.selectDecorations.status
        if(status!==0){
            this.saveDrees(false)
            return false
        }
        let discountDia = cc.instantiate(this.discountDia)
        const obj = discountDia.getComponent('adDreesDiscount')
        discountDia.parent=cc.find("Canvas")
        obj.init(HOME_CACHE.selectDecorations,this.saveDrees)
    },

    saveDrees(isDiscount){
        const that=this;
        const data = {
            goodsId: HOME_CACHE.selectDecorations.goodsId,
            isDiscount:isDiscount
        }
        const status = HOME_CACHE.selectDecorations.status
        const api = status === 0 ? Api.petBuyEquip : Api.petEquip
        api(data, (res) => {
            if (res.code === 0) {
                Toast.show(status === 0 ? "购买成功" : '装扮成功')
                cc.find('Canvas/dressModal').getComponent('dress').getDecorations()
                cc.find("sound").getComponent("sound").updateAssets()

            } else {
                Toast.show(res.message || (status === 0 ? "购买失败'" : '装扮失败'))
            }
        });
    },

    resetDress(){
        let defaultDeress = [
            {
                position:1,
                iconName:'toushi00'
            },
            {
                position:2,
                iconName:'boshi00'
            },
            {
                position:3,
                iconName:'weishi00'
            },
        ]
        HOME_CACHE.cat_decorations.map(item=>{
            if(item.status===2){
                defaultDeress[item.position-1]=item
            }
        })
        defaultDeress.map(item=>{
            this.handleDressItem(item)
        })

    },

    handleDressItem(item){
        const cat_post_dress=['C','','Z']
        const currentPost=HOME_CACHE.cat_post
        const dress_per=cat_post_dress[currentPost]

        const name=item.iconName
        
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


    setTouch() {
        this.modal.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.modal.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        })
        this.modal.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })

        this.close.on(cc.Node.EventType.TOUCH_START, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleClose(2)
            event.stopPropagation();
        })
        this.save.on(cc.Node.EventType.TOUCH_START, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleSave(2)
            event.stopPropagation();
        })
    }
    // update (dt) {},
});
