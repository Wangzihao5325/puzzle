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
        scroll:cc.Node,
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
        type3New: cc.Node,
        backpackList:{
            type:cc.Array,
            default:[]
        },
        animationFinsh:{
            type:cc.Boolean,
            default:false
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()

        this.setTouch()
    },

    start () {

    },
    init(type){

        this.warp.setScale(0.2)
        cc.tween(this.warp)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .call(()=>{
            this.animationFinsh=true
        })
        .start()
        this.getBackpack(0)

    },


    handleClose(){
        this.scrollContent.destroy()
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
                this.backpackList=data
                this.initBackpack(data)

            }
        })

    },



    initBackpack(){
        //等待动画执行完成后渲染
        if(!this.animationFinsh){
            setTimeout(()=>{
                this.initBackpack()
            },500)
            return false
        }
        this.scrollContent.children&&this.scrollContent.children.map(item=>{
            item.destroy()
        })
        const data=this.backpackList
        for (let i = 0; i < data.length; i++) {
            i<20?this.initBackPackItem(data[i],i):undefined
        }
    },

    initBackPackItem(item,i){
        let newNode = cc.instantiate(this.travelItem)
        let obj = newNode.getComponent('travelItem')
        obj.init(item)
        newNode.parent = this.scrollContent
        const indexX = (i)%4
        const indexY = Math.ceil((i + 1) / 4)
        this.scrollContent.height=180*indexY
        let position = cc.v2(( 125* (indexX + .5)), (-(160 * (-0.5 + indexY))) - 10);
        newNode.setPosition(position)
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


    onScrollingEvent(){
        var offsetY = this.scroll.getComponent(cc.ScrollView).getScrollOffset().y;
        const scrollHeight = this.scroll.height
        const children= this.scrollContent.children;

        const data=this.backpackList;
            data.map((item,i)=>{
                const indexY = Math.ceil((i + 1) / 4)
                const positionY=(-(160 * (-0.5 + indexY))) - 10;
                if(-positionY>offsetY-100&&-positionY<offsetY+scrollHeight+100){
                    if(children&&children[i]){
                        children[i].opacity!==255?children[i].opacity=255:undefined
                    }else{
                        this.initBackPackItem(item,i)
                    }
                }else{
                    if(children&&children[i]){
                        children[i].opacity=0
                    }
                }
            })
    },



    setTouch() {
        this.scroll.on("scrolling", (event) => {
            this.onScrollingEvent()
        })
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
            cc.find("sound").getComponent("sound").tap()

            this.handleClose()
            event.stopPropagation();
        })

        this.type1.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.changeType(0)
            event.stopPropagation();
        })
        this.type2.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.changeType(1)
            event.stopPropagation();
        })
        this.type3.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.changeType(2)
            event.stopPropagation();
        })


    },


    // update (dt) {},
});
