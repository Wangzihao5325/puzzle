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
        warp:cc.Node,
        content:cc.Node,
        scrollContent:cc.Node,
        racallItem:cc.Prefab,
        racallInfo:cc.Prefab,
        close:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()

        this.setTouch()
    },

    start () {

    },
    init(type){
        // this.content.setPosition(cc.v2(0,-1000))
        // cc.tween(this.content)
        // .to(.4,{position:cc.v2(0,100)})
        // .to(.2,{position:cc.v2(0,0)},{easing:'expoInOut'})
        // .start()

        this.content.setScale(0.2)
        cc.tween(this.content)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()
        this.getRecallList()

    },


    handleBack(){
        cc.tween(this.content)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.warp.active=false;
            this.warp.destroy()
        })
        .start()
    },

    getRecallList(){
        Api.memory_list(res=>{
            if(res.code===0){
                const data=res.data;
                data.map((item,index)=>{
                    this.initRecallTravelItem(item,index)
                })
            }
        })

    },

    showInfo(item){

        // this.handleBack()

        let recallInfoIns = cc.instantiate(this.racallInfo);
        let obj = recallInfoIns.getComponent('recallInfo');

        obj.init(item)
        recallInfoIns.parent = cc.find('Canvas')



        
    },

    initRecallTravelItem(item,index){
        let recall = cc.instantiate(this.racallItem);
        let obj = recall.getComponent('recallItem');
        recall.info=item
        obj.init(item,index)
        recall.parent = this.scrollContent;
        this.scrollContent.height=210*(index+1)
        recall.setPosition(cc.v2(0,-(.5+index)*210-20))
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
            this.handleBack()
            event.stopPropagation();
        })

        
    },
  

    // update (dt) {},
});
