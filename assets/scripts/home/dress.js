// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CAR_FOOD, SHIPING } from "../global/home_global"
import Api from '../api/api_index'
import { HOME_CACHE } from '../global/home_global';

cc.Class({
    extends: cc.Component,

    properties: {

        close: cc.Node,
        pageContent: cc.Node,
        pageItem1: cc.Node,
        pageItem2: cc.Node,
        pageItem3: cc.Node,
        pageItem4: cc.Node,
        dress_item: cc.Prefab,
        dress_warp: cc.Node,
        save: cc.Node,


    },
    show_dress() {
        cc.tween(dress_warp)
            .to(.2, { position: cc.v2(0, 300) }, { easing: 'sineOutIn' })
            .start()
    },
    init() {
        console.log("dressInit")
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
        this.getDecorations()
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
    resetUI() { },




    handleClose() {
        var feedWarp = cc.find(`Canvas/dressWarp`)
        cc.tween(feedWarp)
            .to(.2, { position: cc.v2(0, -868) }, { easing: 'sineOutIn' })
            .start()

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
