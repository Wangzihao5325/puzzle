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
        pageContent: cc.Node,
        fragment:cc.Label,
        pageItem1: cc.Node,
        pageItem2: cc.Node,
        pageItem3: cc.Node,
        pageItem4: cc.Node,
        dress_item: cc.Prefab,
        dress_warp: cc.Node,
        save: cc.Node,


    },
    show_dress() {
        this.modal.active=true
        this.modal.opacity=0
        cc.tween(this.modal)
            .to(.2,{opacity:255})
            .start()
        this.dress_warp.setPosition=cc.v2(0,-1000)
        cc.tween(this.dress_warp)
            .to(.2, { position: cc.v2(0,-318) }, { easing: 'sineOutIn' })
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

                obj.init(currentpages[i])
                obj.name = currentpages[i].name


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
    },




    handleClose() {
        cc.tween(this.modal)
            .to(.2,{opacity:0})
            .start()
        cc.tween(this.dress_warp)
            .to(.2, { position: cc.v2(0, -1000) }, { easing: 'sineOutIn' })
            .start()
        setTimeout(()=>{
            this.modal.active=false
        },200)
        // this.modal.destroy()

    },
    handleSave() {
        const data = {
            goodsId: HOME_CACHE.selectDecorations.goodsId
        }
        const status = HOME_CACHE.selectDecorations.info.status
        const api = status === 0 ? Api.petBuyEquip : Api.petEquip
        api(data, (res) => {
            if (res.code === 0) {
                Toast.show(status === 0 ? "购买成功" : '装扮成功')
                this.getDecorations()
            } else {
                Toast.show(res.message || (status === 0 ? "购买失败'" : '装扮失败'))
            }
        });
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
            this.handleClose(2)
            event.stopPropagation();
        })
        this.save.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleSave(2)
            event.stopPropagation();
        })
    }
    // update (dt) {},
});
