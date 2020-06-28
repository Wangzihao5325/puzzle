// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GLOBAL_VAR from '../global/index'
import { GAME_CACHE } from '../global/piece_index';
import {CACHE} from '../global/usual_cache'

cc.Class({
    extends: cc.Component,

    properties: {
        dialog: cc.Node,
        warp:cc.Node,
        close: cc.Node,
        continue: cc.Node,
        back: cc.Node,
        switch:cc.Node,
        switchButton:cc.Node,
        on:cc.Node,
        off:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setTouch()
        this.dialog.zIndex=1000
        this.warp.setScale(0.2)
        cc.tween(this.warp)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()

        const current= CACHE.isBGM
        const defaultColor=new cc.color(255,255,255,255)
        const currentColor=new cc.color(139,139,139,255)
        this.on.color=current?currentColor:defaultColor
        this.off.color=current?defaultColor:currentColor
        this.switchButton.setPosition(cc.v2(current?-24:24,0))
    },

    start() {

    },
    goBack() {
        this.dialog.active = false;
        const contralObj=cc.find('Canvas/menuWarp').getComponent('conraol')
        contralObj.gameOver()
        cc.director.loadScene("travel");
    },

    closeDialog() {

        cc.tween(this.warp)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.dialog.destroy()
            GAME_CACHE.pause = false;
            const contralObj=cc.find('Canvas/menuWarp').getComponent('conraol')
            contralObj.gameContinue()
        })
        .start()



    },

    continueGame() {
        this.dialog.active = false;
        GAME_CACHE.pause = false;
        const contralObj=cc.find('Canvas/menuWarp').getComponent('conraol')
        contralObj.gameContinue()
    },

    toglleSound() {

    },
    handleSwitch(){
        const current=!CACHE.isBGM
        CACHE.isBGM= current
        const defaultColor=new cc.color(255,255,255,255)
        const currentColor=new cc.color(139,139,139,255)
        this.on.color=current?currentColor:defaultColor
        this.off.color=current?defaultColor:currentColor
        cc.tween(this.switchButton)
        .to(.2,{position:cc.v2(current?-24:24,0)})
        .start()

        if(current){
            cc.find("sound").getComponent("sound").playGameBg()
        }else{
            cc.find("sound").getComponent("sound").stop()
        }
    },


    setTouch(hardLevel) {
        this.close.on(cc.Node.EventType.TOUCH_START, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.closeDialog()
            event.stopPropagation();
        })
        this.back.on(cc.Node.EventType.TOUCH_START, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.goBack()
            event.stopPropagation();
        })
        this.continue.on(cc.Node.EventType.TOUCH_START, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.continueGame()
            event.stopPropagation();
        })
        this.switch.on(cc.Node.EventType.TOUCH_START, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleSwitch()
            event.stopPropagation();
        })
        
    },
    // update (dt) {},
});
