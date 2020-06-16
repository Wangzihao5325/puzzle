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
        scrollContent:cc.Node,
        travelItem:cc.Prefab,
        // racallInfo:cc.Prefab,
        close:cc.Node,
        current:cc.Node,
        type1:cc.Node,
        type2:cc.Node,
        type3:cc.Node,
        currentType:{
            type:Number,
            default:0
        },
        type1New: cc.Node,
        type2New: cc.Node,
        type3New: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()

        this.setTouch()
        //设置红点显示或隐藏
        this.setRedDot()
    },

    start () {

    },
    init(type){

        this.warp.setScale(0.2)
        cc.tween(this.warp)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()
        this.getBackpack(0)

    },


    handleClose(){
        cc.tween(this.warp)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.modal.destroy()
        })
        .start()
    },

    getBackpack(type){
        Api.backpack(type||this.currentType,res=>{
            if(res.code===0){
                const data=res.data;
                this.initBackpack(data)

            }
        })

    },



    initBackpack(data){
        // currentPageContent.parent=this.pageContent
        this.scrollContent.children&&this.scrollContent.children.map(item=>{
            item.destroy()
        })
        for (let i = 0; i < data.length; i++) {
            let newNode = cc.instantiate(this.travelItem)

            let obj = newNode.getComponent('travelItem')
            const item=data[i]
            obj.init(item)
            newNode.parent = this.scrollContent
            const indexX = (i)%4
            const indexY = Math.ceil((i + 1) / 4)
            this.scrollContent.height=180*indexY
            let position = cc.v2(( 125* (indexX + .5)), (-(160 * (-0.5 + indexY))) - 10);
            newNode.setPosition(position)
            cc.tween(newNode)
                .to(.3,)
        }
    },

    changeType(type){
        this.scrollContent.children.map(item=>{
            item.destroy()
        })
        this.current.setPosition(cc.v2(180*(type-1),5))
        this.currentType=type
        cc.find('tabTitle',this.current).getComponent(cc.Label).string=['全    部','物    品','旅    行'][type]
        this.getBackpack(type)
    },



    setTouch() {
        this.warp.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_END, (event) => {
            console.log("backpack阻止冒泡")
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
        this.type3.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.changeType(2)
            event.stopPropagation();
        })


    },


    // update (dt) {},
});
