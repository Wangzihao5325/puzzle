// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import {dateFormat} from '../utils/utils'

cc.Class({
    extends: cc.Component,

    properties: {
        content:cc.Node,
        pic: cc.Sprite,
        new:cc.Node,
        time:cc.Label,
        weatherIcon:cc.Sprite,
        item:{
            type:Object,
            default:{}
        }
        // coreStart:cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setTouch()
    },

    start() {
    },
    showRecallInfo(){
        const recallDialog=cc.find('Canvas/recallDialog').getComponent('recall')
        recallDialog.showInfo(this.item)
        if (this.item.novel) {
            this.item.nocel = this.new.active = false
        }

        // let recallInfoIns = cc.instantiate(this.racallInfo);
        // let obj = recallInfo.getComponent('recallInfo');

        // obj.init(item)
        // recallInfoIns.parent = this.cc.find('Canvas');
    },

    setTouch(callback) {
        this.content.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.content.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.content.on(cc.Node.EventType.TOUCH_END, () => {
            cc.find("sound").getComponent("sound").tap()

            this.showRecallInfo()
            event.stopPropagation();
        })
    },

    init(item,index) {
        this.item = item;
        this.time.string = dateFormat((new Date(item.createTime)),'yyyy-MM-dd');


        cc.loader.load(item.picUrl, (err, texture) => {
            this.pic.spriteFrame = new cc.SpriteFrame(texture)
        });

        const weatherIcon=this.weatherIcon
        cc.loader.load(item.weatherUrl, (err, texture)=> {
            weatherIcon.spriteFrame=new cc.SpriteFrame(texture)
        });

        this.new.active = this.item.novel
    },



    // update (dt) {},
});
