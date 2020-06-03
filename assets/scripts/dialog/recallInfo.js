// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import {dateFormat} from '../utils/utils'
import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        content:cc.Node,
        position:cc.Label,
        time:cc.Label,
        des:cc.Label,
        pic: cc.Sprite,
        new:cc.Node,
        like:cc.Node,
        comment:cc.Node,
        share:cc.Node,
        commentText1:cc.Label,
        commentText2:cc.Label,
        commentText3:cc.Label,
        commentText4:cc.Label,
        picView:cc.Prefab,
        // coreStart:cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setTouch()
    },

    start() {
    },

    showPic(){
        console.log("showPic")
    },

    getRecallInfo(item){
        Api.memory_travelInfo({hurdleId:item.hurdleId},res=>{
            if(res.code===0){
                const data=res.data;

                // this.item = item;
                // this.time.string = dateFormat((new Date()),'yyyy-MM-dd');
                // if(index===0){
                //     this.new.active=true
                // }
                // cc.loader.load(item.picUrl, (err, texture) => {
                //     this.pic.spriteFrame = new cc.SpriteFrame(texture)
                // });
            }
        })

    },

    setTouch(callback) {
        this.pic.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.pic.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.pic.on(cc.Node.EventType.TOUCH_END, () => {
            this.showPic()
            event.stopPropagation();
        })
    },

    init(item,index) {

        this.getRecallInfo(item)
    },



    // update (dt) {},
});
