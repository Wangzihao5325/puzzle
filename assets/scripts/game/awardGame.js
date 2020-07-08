// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import {CACHE} from '../global/usual_cache'

cc.Class({
    extends: cc.Component,

    properties: {
        root:cc.Node,
        startNum:cc.Label,
        awardGameBtn:cc.Node,
        startLack:cc.Prefab,
        backBtn:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.signSetTouch()
        console.log("CACHE.platform",cc.view.getVisibleSize())
        // this.root.height=CACHE.platform.height;
    },

    start () {
        this.startNum.string=CACHE.userData.star
    },
    goAwardGame(){},

    goTarvel(){},

    handleAwardGame(){
        if(CACHE.userData.star<11){
            console.log("hh")
            let startLack=cc.instantiate(this.startLack)
            startLack.parent=cc.find('Canvas')
        }else{

        }
    },

    signSetTouch() {//signBg
        this.awardGameBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleAwardGame()
            event.stopPropagation();
        });
        this.backBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.back()
            event.stopPropagation();
        });
    },
    back(){
        cc.director.loadScene("travel");
    }
    // update (dt) {},
});
