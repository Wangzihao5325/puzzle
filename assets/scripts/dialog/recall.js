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
        racallInfo:cc.Prefab

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()

        this.setTouch()
    },

    start () {

    },
    init(type){
        this.content.setPosition(cc.v2(0,-1000))
        cc.tween(this.content)
        .to(.4,{position:cc.v2(0,100)})
        .to(.2,{position:cc.v2(0,0)},{easing:'expoInOut'})
        .start()

        this.getRecallList()

    },


    handleBack(){
        this.shareWarp.active=false;
        this.shareWarp.destroy()
        cc.director.loadScene("mission");

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
        console.log("info",item)
        const list= this.scrollContent.children
        list.map(item=>{
            item.destroy()
        })

        let recallInfo = cc.instantiate(this.racallInfo);
        let obj = recallInfo.getComponent('recallInfo');

        obj.init(item)
        recallInfo.parent = this.scrollContent;
        this.scrollContent.height=870

        recallInfo.setPosition(cc.v2(0,0))

        
    },

    initRecallTravelItem(item,index){
        let recall = cc.instantiate(this.racallItem);
        let obj = recall.getComponent('recallItem');
        recall.info=item
        obj.init(item,index)
        recall.parent = this.scrollContent;
        this.scrollContent.height=210*(index+1)
        recall.setPosition(cc.v2(0,-(.5+index)*210))
    },


    setTouch() {
        this.back.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleBack()
            event.stopPropagation();
        })

        
    },
  

    // update (dt) {},
});
