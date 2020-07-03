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
        Api.missionDetails(this.info.hurdleId,res=>{
            if(res.code===0){
                let picView = cc.instantiate(this.picView);
                let obj = picView.getComponent('picViewer');
                obj.init(1,res.data,res.data.hurdleName)
                picView.parent = cc.find('Canvas');

            }
        })
        if (this.new.active) {
            this.removeNewFlag();
        }
    },

    init(data){
        this.info=data;
        this.secic_name.string=`${data.chapterName} ${data.hurdleName}`
        this.time.string = dateFormat((new Date(data.createTime)),'yyyy-MM-dd');

        cc.loader.load(data.picUrl+'?x-oss-process=style/25', (err, texture)=> {
            this.pic.spriteFrame=new cc.SpriteFrame(texture)
        });
        this.new.active = this.info.collect
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
            cc.find("sound").getComponent("sound").tap()

            this.showPic()
            event.stopPropagation();
        })
    },
    removeNewFlag() {
        Api.showCollectHurdle({hurdleId: this.info.hurdleId}, (res) => {
            if (res.code === 0) {
                this.info.collect = this.new.active = false
                cc.find('Canvas').getChildByName('collect_root').getComponent('collect').updateTipsFromItem()
            }
        })
    }
    // update (dt) {},
});
