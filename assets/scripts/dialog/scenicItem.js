// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Api from '../api/api_index'
import {dateFormat} from '../utils/utils'



cc.Class({
    extends: cc.Component,

    properties: {
        warp:cc.Node,
        content:cc.Node,
        imageWarp:cc.Node,
        new:cc.Node,
        secic_name:cc.Label,
        time:cc.Label,
        pic:cc.Sprite,
        info:{
            type:Object,
            default:{}
        },
        picView:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setTouch()
    },

    start () {

    },

    showPic(){
        console.log("showPic")
        Api.missionDetails(this.info.hurdleId,res=>{
            if(res.code===0){
                let picView = cc.instantiate(this.picView);
                let obj = picView.getComponent('picViewer');
                obj.init(res.data)
                picView.parent = cc.find('Canvas');

            }
        })
    },

    init(data){
        this.info=data;
        this.secic_name.string=`${data.chapterName} ${data.hurdleName}`
        this.time.string = dateFormat((new Date(data.createTime)),'yyyy-MM-dd');

        cc.loader.load(data.picUrl, (err, texture)=> {
            this.pic.spriteFrame=new cc.SpriteFrame(texture)
        });

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
        this.imageWarp.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.showPic()
            event.stopPropagation();
        })
    },
    // update (dt) {},
});
