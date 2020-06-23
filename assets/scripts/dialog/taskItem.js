// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Api from '../api/api_index'
import {CITIES} from '../global/travel_global_index'
import {CACHE} from '../global/usual_cache'

cc.Class({
    extends: cc.Component,

    properties: {
        item:cc.Node,
        warp:cc.Node,
        iconContent:cc.Node,
        icon:cc.Node,
        pic: cc.Sprite,
        iconNum:cc.Label,
        title:cc.Label,
        activeName:cc.Label,
        activeNum:cc.Label,
        getBtn:cc.Node,
        goBtn:cc.Node,
        done:cc.Node,
        processBar:cc.Node,
        processText:cc.Label,
        info:{
            type:Object,
            default:{}
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.setTouch(0)
    },


    setTouch(callback) {
        this.getBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.receiveReword()
            cc.find("sound").getComponent("sound").tap()
            event.stopPropagation();
        })
        this.goBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.handleGo()
            cc.find("sound").getComponent("sound").tap()
            event.stopPropagation();
        })
    },

    init(item) {
        this.info=item
        this.times=item.times
        this.title.string = item.target;
        this.iconNum.string= item.rewordAmount
        this.activeNum.string=item.activity
        if(item.complete&&item.receive){
            this.done.active=true
        }else if(item.complete&&!item.receive){
            this.getBtn.active=true
        }else if(!item.mainTask){
            this.goBtn.active=true
        }
        this.processText.string=`${item.process} / ${item.times}`
        const procent=Math.ceil(item.process/item.times*100)/100
        this.processBar.width=200*procent
        cc.loader.load(item.iconUrl, (err, texture) => {
            this.pic.spriteFrame = new cc.SpriteFrame(texture)
        });
    },
    receiveReword(){
        Api.task_receive({taskId:this.info.taskId},res=>{
            if(res.code===0){
                const data=res.data
                Toast.show(`${data.name} +${data.rewordAmount}`,{icon:data.iconUrl})
                //执行动画
                this.getBtn.active=false
                this.done.active=true
                this.done.setPosition(180,0)
                this.done.setScale(2)
                this.done.opacity=0
                cc.find("sound").getComponent("sound").missionSuccess()
                cc.tween(this.done)
                .to(.3,{scale:1,opacity:255,position:cc.v2(180,0)})
                .delay(.5)
                .call(()=>{
                    //刷新列表
                    const taskDialog=cc.find('Canvas/task')
                    const obj=taskDialog.getComponent('taskDialog')
                    obj.refresh()
                })
                .start()
            }

        })
    },

    getCurrentCity(){
        for(let i=0;i<CITIES.length;i++){
            const data=CITIES[i]
            if(data.missionDone<data.missionNum){
                CACHE.travel_city_press=data
                cc.director.loadScene("mission");
                break;
            }
        }
    },

    handleGo(){

        const type=this.info.jump;
        switch (type){
            case 0:
                //完成游戏,跳转到关卡选择（完成两次三星关卡，包含使用道具）
                this.getCurrentCity()
                break;
            case 1:
                //展览
                cc.director.loadScene("show");
                break;
            case 2:
                //完成宠物外出
                cc.director.loadScene("my_home");
                // setTimeout(()=>{
                //     const obj=cc.find('Canvas').getComponent('home_index')
                //     obj.showCatAction(true)
                // },3000)
                break;
            case 3:
                //宠物喂养
                cc.director.loadScene("my_home");
                // setTimeout(()=>{
                //     const obj=cc.find('Canvas').getComponent('home_index')
                //     obj.show_feed()
                // },3000)
                break;
            case 4:
                //签到
                const taskDialog=cc.find('Canvas/task')
                const taskDialogobj=taskDialog.getComponent('taskDialog')
                taskDialogobj.handleClose()
                const obj=cc.find('Canvas').getComponent('travel_index')
                obj.showSignDialog()
                break;
        }


        // const taskDialog=cc.find('Canvas/task')
        // const obj=taskDialog.getComponent('taskDialog')
        // obj.handleClose()
    },

   

    // update (dt) {},
});
