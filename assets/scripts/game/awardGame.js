// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import {CACHE} from '../global/usual_cache'
import {random_reward_hurdle,use_prop} from '../api/api_index'
import {IMAGE_SERVER} from '../global/app_global_index'

cc.Class({
    extends: cc.Component,

    properties: {
        root:cc.Node,
        headerWarp:cc.Node,
        startNum:cc.Label,
        awardGameBtn:cc.Node,
        startLack:cc.Prefab,
        backBtn:cc.Node,
        canNext:{
            type:cc.Boolean,
            default:true
        },
        pic:cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.signSetTouch()
        console.log("CACHE.platform",cc.view.getVisibleSize())

        //获取随机关卡
        random_reward_hurdle(res=>{
            if(res.code===0){
                //load puzzle sence
                const data=res.data
                CACHE.mission_press = data;
                CACHE.chapterData = data;
                data.logoUrl=`${IMAGE_SERVER}/${data.picId}.png`
                cc.loader.load(data.logoUrl, (err, texture) => {
                    this.pic.spriteFrame = new cc.SpriteFrame(texture)

                });
            }
        })
        // this.root.height=CACHE.platform.height;
    },

    start () {
        this.startNum.string=CACHE.userData.star
        if (CACHE.platform.isIphoneX) {
            this.headerWarp.height = 140
        }
    },
    goAwardGame(){},

    goTarvel(){},

    handleAwardGame(){
        if(CACHE.userData.star<10){
            let startLack=cc.instantiate(this.startLack)
            startLack.parent=cc.find('Canvas')
        }else{
            //消耗星星
            this.starExpendAnimation()
            use_prop({star:10},res=>{
                if(res.code!==0){
                    Toast.show(res.message||'星星消耗失败')
                }else{
                    this.redirectPuzzle()
                }
            })

        }
    },
    redirectPuzzle() {

        CACHE.hard_level=4
        cc.director.loadScene("puzzle");
    },

    starExpendAnimation(){
        //todo:
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

    // update (dt) {},
});
