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
        canNext:{
            type:cc.Boolean,
            default:true
        }
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
            this.redirectPuzzle()
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
    },
    redirectPuzzle() {
        if (this.canNext) {
            const data={
                chapterId: 801,
                chapterName: "西藏",
                hurdleId: 801001,
                hurdleName: "布达拉宫",
                lock: false,
                logoUrl: "https://img.becabaking.xyz/city071.png",
                picId: "city071",
                showLock: true,
                star: 4,
            }
            CACHE.mission_press = data;
            CACHE.chapterData = data;
            CACHE.hard_level=4
            cc.director.loadScene("puzzle");

        } else {
            this.canNext = true
        }
    },

    // update (dt) {},
});
