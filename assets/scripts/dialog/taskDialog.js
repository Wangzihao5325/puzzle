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
        tip:cc.Node,
        scrollContent:cc.Node,
        taskItem:cc.Prefab,
        close:cc.Node,
        current:cc.Node,
        type1:cc.Node,
        type2:cc.Node,
        activeNum:cc.Label,
        currentType:{
            type:Number,
            default:0
        },
        git1:cc.Node,
        git2:cc.Node,
        git3:cc.Node,
        process_bar:cc.Node,
        footerWarp:cc.Node,
        gift1Close:cc.SpriteFrame,
        gift1Open:cc.SpriteFrame,
        gift2Close:cc.SpriteFrame,
        gift2Open:cc.SpriteFrame,
        info:{
            type:Object,
            default:{}
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
        .start()
        this.getTask(0)
        this.getActive()

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

    // task_daily,
    // task_main,
    // task_receive,
    // task_activity,
    // task_activity_receive,

    getTask(type){
        const apiList=[Api.task_daily,Api.task_main]
        apiList[this.currentType](res=>{
            if(res.code===0){
                const data=res.data;
                this.initTask(data)

            }
        })

    },

    

    initTask(data){
        // currentPageContent.parent=this.pageContent
        //清除原来的
        this.scrollContent.children.map(item=>{
            item.destroy()
        })
        this.scrollContent.height=140*(data.length+1)+20
        for (let i = 0; i < data.length; i++) {
            let newNode = cc.instantiate(this.taskItem)

            let obj = newNode.getComponent('taskItem')
            const item=data[i]
            obj.init(item)
            newNode.parent = this.scrollContent
           
            let position = cc.v2(0, (-(140 * (-0.5 + i+1))) - 10);
            newNode.setPosition(position)

        }
    },


    changeType(type){
        this.currentType=type

        this.scrollContent.children.map(item=>{
            item.destroy()
        })
        
        this.footerWarp.active=!type
        
        this.current.setPosition(cc.v2(type?135:-135,5))
        this.tip.active=!type
        cc.find('tabTitle',this.current).getComponent(cc.Label).string=['日常任务','主线任务'][type]
        this.getTask()
    },

    refresh(){
        this.getTask()
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
        this.git1.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.receiveActive(1)
            event.stopPropagation();
        })
        this.git2.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.receiveActive(2)
            event.stopPropagation();
        })
        this.git3.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.receiveActive(3)
            event.stopPropagation();
        })
        


        
        
    },
  
    receiveActive(leavel){

        //判断是否可以领取
        const data=this.info
        const type=leavel
        if(data.activity<data.levelOne){
            return false
        }
        else if(data.activity>=data.levelOne&&type===1){
            if(!data.levelOneReceive){
                console.log("可以领取")
                this.doTaskActivyRecevie(leavel)
                return true
            }else{
                return false
            }
        }
        else if(data.activity>=data.levelTwo&&type===2){
            if(!data.levelTwoReceive){
                return true
                this.doTaskActivyRecevie(leavel)
            }else{
                return false
            }
        }else if(data.activity>=data.levelThree&&type===3){
            if(!data.levelThreeReceive){
                return true
                this.doTaskActivyRecevie(leavel)
            }else{
                return false
            }
        }

     
    },

    doTaskActivyRecevie(leavel){
        //领取动画
        const nodelist=[this.git1,this.git2,this.git3]
        const newNode=cc.instantiate(nodelist[leavel-1])
        // const newNode=nodelist[leavel-1]
        newNode.parent=cc.find('Canvas')
        newNode.setPosition(cc.v2(0,-400))
        newNode.opacity=0
        cc.tween(newNode)
            .to(1,{position:cc.v2(0,0),scale:2,opacity:255})
            .delay(1)
            .to(.5,{opacity:0})
            .call(()=>{newNode.destroy()})
            .start()
        let halo= cc.find('halo',newNode )
        halo.active=true
        cc.tween(halo)
            .to(2,{angle:190})
            .start()

        //领取接口
        Api.task_activity_receive({level:leavel},res=>{
            if(res.code===0){
                const data=res.data
                data.map(item=>{
                    Toast.show(`${item.name} +${item.amount}`)
                })

                this.getActive()
            }
        })
    },

    getActive(){
        Api.task_activity(res=>{
            this.info=res.data
            if(res.code===0){
                const data=res.data;
                const processlist=[160,260,400,500]
                this.activeNum.string=data.activity
                this.process_bar.width=500*data.activity/100
                if(data.activity<data.levelOne){
                    cc.find('giftIcon',this.git1).getComponent(cc.Sprite).spriteFrame=this.gift1Close
                    cc.find('giftIcon',this.git2).getComponent(cc.Sprite).spriteFrame=this.gift1Close
                    cc.find('giftIcon',this.git3).getComponent(cc.Sprite).spriteFrame=this.gift2Close
                }
                if(data.activity>=data.levelOne){
                    let halo= cc.find('halo',this.git1)
                    if(!data.levelOneReceive){
                        cc.find('giftIcon',this.git1).getComponent(cc.Sprite).spriteFrame=this.gift1Close
                        cc.find('giftIcon',this.git2).getComponent(cc.Sprite).spriteFrame=this.gift1Close
                        cc.find('giftIcon',this.git3).getComponent(cc.Sprite).spriteFrame=this.gift2Close
                        halo.active=true
                        cc.tween(halo)
                        .to(10,{angle:190})
                        .repeatForever()
                        .start()
                    }else{
                        cc.find('giftIcon',this.git1).getComponent(cc.Sprite).spriteFrame=this.gift1Open
                        cc.find('giftIcon',this.git2).getComponent(cc.Sprite).spriteFrame=this.gift1Close
                        cc.find('giftIcon',this.git3).getComponent(cc.Sprite).spriteFrame=this.gift2Close
                        halo.active=false
                    }
                }
                if(data.activity>=data.levelTwo){
                    let halo= cc.find('halo',this.git2)
                    if(!data.levelTwoReceive){
                        cc.find('giftIcon',this.git2).getComponent(cc.Sprite).spriteFrame=this.gift1Close
                        cc.find('giftIcon',this.git3).getComponent(cc.Sprite).spriteFrame=this.gift2Close
                        halo.active=true
                        cc.tween(halo)
                        .to(10,{angle:190})
                        .repeatForever()
                        .start()
                    }else{
                        halo.active=false
                        cc.find('giftIcon',this.git1).getComponent(cc.Sprite).spriteFrame=this.gift1Open
                        cc.find('giftIcon',this.git2).getComponent(cc.Sprite).spriteFrame=this.gift1Open
                        cc.find('giftIcon',this.git3).getComponent(cc.Sprite).spriteFrame=this.gift2Close
                    }
                }if(data.activity>=data.levelThree){
                    let halo= cc.find('halo',this.git3)
                    if(!data.levelThreeReceive){
                        cc.find('giftIcon',this.git3).getComponent(cc.Sprite).spriteFrame=this.gift2Close
                        halo.active=true
                        cc.tween(halo)
                        .to(10,{angle:190})
                        .repeatForever()
                        .start()
                    }else{
                        halo.active=false
                        cc.find('giftIcon',this.git1).getComponent(cc.Sprite).spriteFrame=this.gift1Open
                        cc.find('giftIcon',this.git2).getComponent(cc.Sprite).spriteFrame=this.gift1Open
                        cc.find('giftIcon',this.git3).getComponent(cc.Sprite).spriteFrame=this.gift2Open
                    }
                }
                
            }
        })
    },

    // update (dt) {},
});
