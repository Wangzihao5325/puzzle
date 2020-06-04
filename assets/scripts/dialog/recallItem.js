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
    },

    setTouch(callback) {
        this.content.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.content.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.content.on(cc.Node.EventType.TOUCH_END, () => {
            this.showRecallInfo()
            event.stopPropagation();
        })
    },

    init(item,index) {
        this.item = item;
        this.time.string = dateFormat((new Date()),'yyyy-MM-dd');
        if(index===0){
            this.new.active=true
        }
        cc.loader.load(item.picUrl, (err, texture) => {
            this.pic.spriteFrame = new cc.SpriteFrame(texture)
        });
        this.setTouch()

    },



    // update (dt) {},
});
