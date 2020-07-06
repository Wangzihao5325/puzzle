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
        dailyContent:cc.Node,
        mainContent:cc.Node,
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
        },
        dailyNew: cc.Node,
        mainNew: cc.Node,
        scroll:cc.Node,
        mainScroll:cc.Node,
        adAward:cc.Prefab,
        onViewIndexs:{
            type:cc.Array,
            default:[]
        },
        taskList:{
            type:cc.Array,
            default:[]
        },
        mainTaksList:{
            type:Array,
            default:[]
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
        this.dailyNew.active = CACHE.btnTips.dailyTask
        this.mainNew.active = CACHE.btnTips.mainTask

        this.setTouch()


    },

    start () {
    
    },

    tapSound(){
        cc.find("sound").getComponent("sound").tap()
    },

    init(type){
        this.warp.setScale(0.2)
        cc.tween(this.warp)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .call(()=>{
            this.loadingFinsh=true
        })
        .start()

        this.getTask(0)
        this.getActive()

    },


    handleClose(showAnimation=true){
        this.scrollContent.destroy()
        if(showAnimation){
            cc.tween(this.warp)
            .to(.1,{scale:1.2})
            .to(0.3,{scale:.2,opacity:0})
            .call(()=>{
                this.modal.destroy()
            })
            .start()
            cc.find('Canvas').getComponent('travel_index').updateTaskTips()
        }else{
            this.modal.destroy()
            cc.find('Canvas').getComponent('travel_index').updateTaskTips()
        }

    },

    // task_daily,
    // task_main,
    // task_receive,
    // task_activity,
    // task_activity_receive,

    getTask(){
        const apiList=[Api.task_daily,Api.task_main]
        apiList[this.currentType](res=>{
            if(res.code===0){
                const data=res.data;
                if(this.currentType===1){
                    this.mainTaksList=data
                }else{
                    this.taskList=data

                }
                this.initTask()
            }
        })
    },



    initTask(){
        if(!this.loadingFinsh){
            setTimeout(()=>{
                this.initTask()
            },100)
            return false
        }
        const data= this.currentType===1?this.mainTaksList: this.taskList
        // if(data.length===)

        const currentContent=this.currentType===1?this.mainContent:this.dailyContent
        const scrollContent=cc.find('ScrollView/view/content',currentContent)
        const scroll=cc.find('ScrollView',currentContent)


        // currentPageContent.parent=this.pageContent
        scrollContent.children&&scrollContent.children.map(item=>{
            item.destroy()
        })
        scrollContent.height=170*(data.length)+20+50

        const dataFirstlyRender=data.slice(0,5)
        let count = 0;
        for (let i = 0; i < dataFirstlyRender.length; i++) {
            this.renderTaskItem(data[i],i)
            count += data[i].complete && !data[i].receive ? 1 : 0
            if(i===dataFirstlyRender.length-1){
                // this.onScrollingEvent()
            }
        }
        // this.onScrollingEvent()
        setTimeout(()=>{
            this.onScrollingEvent()
        },20)
        //判断当前tab和旅行页图标是否显示
        CACHE.btnTips[!this.currentType ? 'dailyTask' : 'mainTask'] = !!count
        CACHE.btnTips.task = CACHE.btnTips.dailyTask || CACHE.btnTips.mainTask
    },


    renderTaskItem(item,index){
        const currentContent=this.currentType===1?this.mainContent:this.dailyContent
        const scrollContent=cc.find('ScrollView/view/content',currentContent)
        const scroll=cc.find('ScrollView',currentContent)

        item.mainTask=this.currentType
        let newNode = cc.instantiate(this.taskItem)
        let obj = newNode.getComponent('taskItem')
        obj.init(item,index)
        newNode.parent = scrollContent
        // newNode.opacity=i<=4?255:0
        let position = cc.v2(0, (-(170 * (-0.5 + index+1))) - 10);
        newNode.setPosition(position)
        item.opacity=255
    },


    changeType(type){
        if(this.currentType===type){
            return false;
        }
        if(type===1){
            this.mainContent.active=true
            this.dailyContent.active=false

        }else{
            this.dailyContent.active=true
            this.mainContent.active=false
        }
        if(type===0){
            this.getActive()
        }
        const currentContent=type===1?this.mainContent:this.dailyContent
        const scrollContent=cc.find('ScrollView/view/content',currentContent)
        const scroll=cc.find('ScrollView',currentContent)


        this.currentType=type
        this.dailyNew.active = CACHE.btnTips.dailyTask
        this.mainNew.active = CACHE.btnTips.mainTask

        // scrollContent.children.map(item=>{
        //     item.destroy()
        // })
        // scroll.getComponent(cc.ScrollView).setContentPosition(cc.v2(0,-340));


        this.footerWarp.active=!type

        this.current.setPosition(cc.v2(type?135:-135,5))
        this.tip.active=!type
        cc.find('tabTitle',this.current).getComponent(cc.Label).string=['日常任务','主线任务'][type]
        this.getTask()
        // this.scroll.scrollToTop(0.1)
    },

    /**
     * �����м���
     * @param {any} event
     */
    onScrollingEvent(event){

        const currentContent=this.currentType===1?this.mainContent:this.dailyContent
        const scrollContent=cc.find('ScrollView/view/content',currentContent)
        const scroll=cc.find('ScrollView',currentContent)
    

        var offsetY = scroll.getComponent(cc.ScrollView).getScrollOffset().y;
        const scrollHeight = scroll.height
        const children= scrollContent.children;

        const data= this.currentType===1?this.mainTaksList: this.taskList

        const onViewIndexs=[]
            data.map((item,i)=>{
                const positionY=(-(170 * (-0.5 + i+1))) - 10;
                if(-positionY>offsetY-100&&-positionY<offsetY+scrollHeight+100){
                    //�ڿ��ӷ�λ��
                    if(children&&children[i]){
                        //�ڵ���ڣ���ʾ�ڵ�
                        children[i].opacity!==255?children[i].opacity=255:undefined
                    }else{
                        //�ڵ㲻���ڣ������ڵ�
                        this.renderTaskItem(item,i)
                    }
                    onViewIndexs.push(i)
                }else{
                    //���ڿ��ӷ�λ������
                    if(children&&children[i]){
                        children[i].opacity=0
                    }
                }
            })
            this.onViewIndexs=onViewIndexs
    },

    refresh(){
        // this.scroll.getComponent(cc.ScrollView).setContentPosition(cc.v2(0,340));
        this.getTask()
        this.getActive()
    },

    setTouch() {
        // this.scroll.on("scrolling", (event) => {
        //     this.onScrollingEvent(event)
        // })
        this.scroll.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.onScrollingEvent(event)

            event.stopPropagation();
        })
        this.mainScroll.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.onScrollingEvent(event)
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.tapSound()
            event.stopPropagation();
        })

        this.close.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.tapSound()
            this.handleClose()
            event.stopPropagation();
        })

        this.type1.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.changeType(0)
            this.tapSound()
            event.stopPropagation();
        })
        this.type2.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.changeType(1)
            this.tapSound()
            event.stopPropagation();
        })
        this.git1.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.receiveActive(1)
            this.tapSound()
            event.stopPropagation();
        })
        this.git2.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.receiveActive(2)
            this.tapSound()
            event.stopPropagation();
        })
        this.git3.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.receiveActive(3)
            this.tapSound()
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
                this.doTaskActivyRecevie(leavel,data.listOne)
                return true
            }else{
                return false
            }
        }
        else if(data.activity>=data.levelTwo&&type===2){
            if(!data.levelTwoReceive){
                this.doTaskActivyRecevie(leavel,data.listTow)
            }else{
                return false
            }
        }else if(data.activity>=data.levelThree&&type===3){
            if(!data.levelThreeReceive){
                this.doTaskActivyRecevie(leavel,data.listThree)
            }else{
                return false
            }
        }


    },

    doTaskActivyRecevie(leavel,list){
        let adAward = cc.instantiate(this.adAward)
        let obj = adAward.getComponent('adAward')
        obj.init(list,this.awardCallBack.bind(this),leavel)
        adAward.parent = cc.find('Canvas')
    },

    awardCallBack(type,data){
        //领取接口
        Api.task_activity_receive({level:data,advertise:type},res=>{
            if(res.code===0){
                const data=res.data
                data.map(item=>{
                    Toast.show(`领取成功`)
                })
                this.getActive()
                cc.find("sound").getComponent("sound").updateAssets()
            }else{
                Toast.show(res.message||'领取失败')

            }
        })
    },

    getActive(){
        Api.task_activity(res=>{
            this.info=res.data
            if(res.code===0){
                const data=res.data;
                this.activeNum.string=data.activity
                this.process_bar.width=500*data.activity/100
                if(data.levelOneReceive===true){
                    cc.find('giftIcon',this.git1).getComponent(cc.Sprite).spriteFrame=this.gift1Open
                    this.jump1&&this.jump1.stop()
                    let halo= cc.find('halo',this.git1)
                    halo.active=false

                }else{
                    cc.find('giftIcon',this.git1).getComponent(cc.Sprite).spriteFrame=this.gift1Close
                    if(data.activity>=data.levelOne){
                        let halo= cc.find('halo',this.git1)
                        this.haloAnimation(halo)
                        let giftIcon=cc.find('giftIcon',this.git1)
                        this.jumpAnimation(cc.find('giftIcon',this.git1),this.jump1)
                    }
                }
                if(data.levelTwoReceive===true){
                    cc.find('giftIcon',this.git2).getComponent(cc.Sprite).spriteFrame=this.gift1Open
                    this.jump2&&this.jump2.stop()
                    let halo= cc.find('halo',this.git2)
                    halo.active=false
                }else{
                    cc.find('giftIcon',this.git2).getComponent(cc.Sprite).spriteFrame=this.gift1Close
                    if(data.activity>=data.levelTwo){
                        let halo= cc.find('halo',this.git2)
                        this.haloAnimation(halo)
                        this.jumpAnimation(this.git2,this.jump2)
                    }
                }
                if(data.levelThreeReceive===true){
                    cc.find('giftIcon',this.git3).getComponent(cc.Sprite).spriteFrame=this.gift2Open
                    this.jump3&&this.jump3.stop()
                    let halo= cc.find('halo',this.git3)
                    halo.active=false
                }else{
                    cc.find('giftIcon',this.git3).getComponent(cc.Sprite).spriteFrame=this.gift2Close
                    if(data.activity>=data.levelThree){
                        let halo= cc.find('halo',this.git3)
                        this.haloAnimation(halo)
                        this.jumpAnimation(this.git3,this.jump3)
                    }
                }

            
            }
        })
    },

    jumpAnimation(node,name){
        const positionX=node.x
        const positionY=node.y

        name=cc.tween(node)
            .to(.15,{position:cc.v2(positionX,positionY+15)})
            .to(.15,{position:cc.v2(positionX,positionY)})
            .delay(.1)
            .to(.1,{position:cc.v2(positionX,positionY+20)})
            .to(.1,{position:cc.v2(positionX,positionY)})
            .delay(2)
            .union()
            .repeatForever()
            .start()
    },
    haloAnimation(halo){
        halo.active=true
        cc.tween(halo)
            .to(10,{angle:190})
            .union()
            .repeatForever()
            .start()
    },

    // update (dt) {},
});
