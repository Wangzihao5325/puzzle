// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import {dateFormat} from '../utils/utils'
import {GAME_CACH} from '../global/piece_index'
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        modal:cc.Node,
        warp:cc.Node,
        content:cc.Node,
        num:cc.Label,
        scrollContent:cc.Node,
        collectItem:cc.Prefab,
        scenicItem:cc.Prefab,
        // racallInfo:cc.Prefab,
        close:cc.Node,
        current:cc.Node,
        type1:cc.Node,
        type2:cc.Node,
        currentType:{
            type:Number,
            default:0
        },
        goodsQuality:{
            type:Number,
            default:0
        },
        normalBtn:cc.Node,
        lackBtn:cc.Node,
        currentRareBtn:cc.Node,
        footerWarp:cc.Node,
        type1New: cc.Node,
        type2New: cc.Node,
        normalNew: cc.Node,
        lackNew: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()
        this.updateTypeTips()
        this.setTouch()
    },

    start () {

    },
    init(type){

        this.warp.setScale(0.2)
        cc.tween(this.warp)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()
        this.getCollect(0,0)

    },


    handleClose(){
        cc.tween(this.warp)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.modal.destroy()
        })
        .start()
        cc.find('Canvas').getComponent('home_index').updateBtnTips()
    },

    getCollect(type,goodsQuality){
        const list=['NORMAL','UNUSUAL']
        const apiList=[Api.goodsCollect,Api.hurdleCollect]
        apiList[this.currentType](list[this.goodsQuality]||this.currentType,res=>{
            if(res.code===0){
                this.num.string=`${res.data.own} /\ ${res.data.amount}`
                if(this.currentType===0){
                    const data=res.data.goodsList;
                    this.initBackpack(data)

                }else{
                    const data=res.data.hurdleList
                    this.initScenic(data)
                }

            }
        })

    },

    //item清除“新”标记时调用此方法，传入参数1，随后重新刷新各tips节点状态
    updateTipsFromItem() {
        if (this.count > 0) {
            this.count -= 1
        }
        if (this.currentType === 1) {
            CACHE.btnTips.scenic = !!this.count
            CACHE.btnTips.collect = CACHE.btnTips.souvenir || CACHE.btnTips.scenic
        } else {
            CACHE.btnTips[!this.goodsQuality ? 'normal' : 'lack'] = !!this.count
            CACHE.btnTips.souvenir = CACHE.btnTips.normal || CACHE.btnTips.lack
            CACHE.btnTips.collect = CACHE.btnTips.souvenir || CACHE.btnTips.scenic
        }
        this.updateTypeTips();
    },
    updateTypeTips() {
        this.type1New.active = CACHE.btnTips.souvenir
        this.type2New.active = CACHE.btnTips.scenic
        this.currentType === 0 && this.updateRareTips();
    },
    updateRareTips() {
        this.normalNew.active = this.currentType === 0 && this.goodsQuality === 1 && CACHE.btnTips.normal
        this.lackNew.active = this.currentType === 0 && this.goodsQuality === 0 && CACHE.btnTips.lack
    },

    initBackpack(data){
        // currentPageContent.parent=this.pageContent
        //清除原来的
        this.scrollContent.children.map(item=>{
            item.destroy()
        })
        this.count = 0;
        for (let i = 0; i < data.length; i++) {
            let newNode = cc.instantiate(this.collectItem)

            let obj = newNode.getComponent('collectItem')
            const item=data[i]
            this.count += item.novel ? 1 : 0;
            obj.init(item)
            newNode.parent = this.scrollContent
            const indexX = (i)%3
            const indexY = Math.ceil((i + 1) / 3)
            this.scrollContent.height=180*indexY+20
            let position = cc.v2(( 167* (indexX + .5)), (-(180 * (-0.5 + indexY))) - 10);
            newNode.setPosition(position)
            cc.tween(newNode)
                .to(.3,)
        }
        CACHE.btnTips[!this.goodsQuality ? 'normal' : 'lack'] = !!this.count
        CACHE.btnTips.souvenir = CACHE.btnTips.normal || CACHE.btnTips.lack
        CACHE.btnTips.collect = CACHE.btnTips.souvenir || CACHE.btnTips.scenic
    },

    initScenic(data){
        this.scrollContent.children.map(item=>{
            item.destroy()
        })
        this.count = 0
        for (let i = 0; i < data.length; i++) {
            let newNode = cc.instantiate(this.scenicItem)

            let obj = newNode.getComponent('scenicItem')
            const item=data[i]
            this.count += item.collect ? 1 : 0;
            obj.init(item)
            newNode.parent = this.scrollContent
            const indexX = (i)%2
            const indexY = Math.ceil((i + 1) / 2)
            this.scrollContent.height=400*indexY+20
            let position = cc.v2(( 250* (indexX + .5)), (-(370 * (-0.5 + indexY))) - 10);
            newNode.setPosition(position)
        }
        CACHE.btnTips.scenic = !!this.count
        CACHE.btnTips.collect = CACHE.btnTips.souvenir || CACHE.btnTips.scenic
    },

    changeType(type){
        this.currentType=type
        this.updateTypeTips()

        this.scrollContent.children.map(item=>{
            item.destroy()
        })

        this.footerWarp.active=!type

        this.current.setPosition(cc.v2(type?135:-135,5))
        cc.find('tabTitle',this.current).getComponent(cc.Label).string=['纪念品','景 · 点'][type]
        this.getCollect()
    },

    changeRare(type){
        this.currentRareBtn.setPosition(cc.v2(type?140:-140,0))
        cc.find('text',this.currentRareBtn).getComponent(cc.Label).string=type?'稀有物品':'普通物品'
        this.goodsQuality=type
        this.updateRareTips()
        this.getCollect()
    },

    setTouch() {
        this.warp.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        })

        this.close.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.handleClose()
            event.stopPropagation();
        })

        this.type1.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.changeType(0)
            event.stopPropagation();
        })
        this.type2.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.changeType(1)
            event.stopPropagation();
        })
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.changeRare(0)
            event.stopPropagation();
        })
        this.lackBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.changeRare(1)
            event.stopPropagation();
        })



    },


    // update (dt) {},
});
