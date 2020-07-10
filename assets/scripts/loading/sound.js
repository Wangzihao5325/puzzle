// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CACHE } from '../global/usual_cache';
import {User} from '../api/api_action'

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        audio: {
            default: null,
            type: cc.AudioClip
        },
        gameBg: {
            default: null,
            type: cc.AudioClip
        },
        tapAudio:{
            default: null,
            type: cc.AudioClip
        },
        gameSuccessAudio:{
            default: null,
            type: cc.AudioClip
        },
        gameFailAudio:{
            default: null,
            type: cc.AudioClip
        },
        missionSuccessAudio:{
            default: null,
            type: cc.AudioClip
        },
        settlementAudio:{
            default: null,
            type: cc.AudioClip
        },
        guideAudio:{
            default: null,
            type: cc.AudioClip
        },
        awardGameOpen:cc.Prefab

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },
    playGuide(){
        this.guideBGM = cc.audioEngine.play(this.guideAudio, true, 0.3);
    },
    playBg(foce){
        if(this.playGuide!==undefined){
            cc.audioEngine.stop(this.guideBGM);
        }
        if (CACHE.isBGM && CACHE.currentBGM===undefined) {
            CACHE.currentBGM = cc.audioEngine.play(this.audio, true, 0.1);

        }else if(foce){
            cc.audioEngine.stop(CACHE.currentBGM);
            CACHE.currentBGM = cc.audioEngine.play(this.audio, true, 0.1);
        }
    },
    playGameBg(){
        if (CACHE.isBGM&&CACHE.currentBGM===undefined) {
            CACHE.currentBGM = cc.audioEngine.play(this.gameBg, true, 0.1);
        }else if(CACHE.currentBGM){
            cc.audioEngine.stop(CACHE.currentBGM);
            CACHE.currentBGM = cc.audioEngine.play(this.gameBg, true, 0.1);
        }
    },
    tap(){
        if(CACHE.isBGM){
            cc.audioEngine.play(this.tapAudio, false, 1);
        }
    },
    gameSuccess(){
        if(CACHE.isBGM){
            cc.audioEngine.play(this.gameSuccessAudio, false, 1);
        }
    },
    gameFail(){
        if(CACHE.isBGM){
            cc.audioEngine.play(this.gameFailAudio, false, 1);
        }
    },
    missionSuccess(){
        if(CACHE.isBGM){
            cc.audioEngine.play(this.missionSuccessAudio, false, 1)
        }
    },
    gameSettlement(){
        if(CACHE.isBGM){
            cc.audioEngine.play(this.settlementAudio, false, 1);
        }
    },
    stop(){
        if (CACHE.currentBGM!==undefined) {
            cc.audioEngine.stop(CACHE.currentBGM);
            CACHE.currentBGM=undefined
        }
    },

    updateAssets(data){
        const oldData=CACHE.userData
        if(data){
            const userData = {
                coin: data.gold,
                gem: data.diamonds,
                STAM: data.power,
                fragment: data.patDressFragment,
                strongMagnet: data.strongMagnet,
                showProp:data.showProp,
                frame: data.frame,
                catFood: catfood.count
            };
            const newData={
                ...oldData,
                ...userData
            }
            CACHE.userData=newData
            this.resetAssets(oldData,newData)
        }else{
            User.BalanceUpdate(()=>{
                this.resetAssets(oldData,CACHE.userData)
            })
        }
    },
    resetAssets(old,current){
        if(current.coin!==old.coin){
            this.resetCoin(current.coin)
        }
        if(current.gem!==old.gem){
            this.resetGem(current.gem)
        }
        if(current.fragment!==old.fragment){
            this.resetFragment(current.fragment)
        }
        if(current.star>=10&&old.star<10){
            this.showAwardOpen()
        }
        // this.showAwardOpen()

    },
    resetCoin(num){
        if(cc.find('Canvas/store')){
            const coinLabel=cc.find('Canvas/store/container/header/coin/content/num').getComponent(cc.Label)
            coinLabel.string=num
        }
        if(CACHE.scene==='travel_scene'||CACHE.scene==='show_scene'){
            const coinLabel=cc.find('Canvas/headerWarp/coin/content/num').getComponent(cc.Label)
            coinLabel.string=num
        }
    },
    resetGem(num){
        if(cc.find('Canvas/store')){
            const gemLabel=cc.find('Canvas/store/container/header/gem/content/num').getComponent(cc.Label)
            gemLabel.string=num
        }
        if(cc.find('Canvas/dressModal')){
            const gemLabel=cc.find('Canvas/dressModal/dressWarp/feedContent/diamond/content/num').getComponent(cc.Label)
            gemLabel.string=num
        }
        if(CACHE.scene==='travel_scene'||CACHE.scene==='show_scene'){
            const gemLabel=cc.find('Canvas/headerWarp/gem/content/num').getComponent(cc.Label)
            gemLabel.string=num
        }
    },
    resetFragment(num){
        if(cc.find('Canvas/dressModal')){
            const fragmentLabel=cc.find('Canvas/dressModal/dressWarp/feedContent/fragment/content/num').getComponent(cc.Label)
            fragmentLabel.string=num
        }
    },
    showAwardOpen(){
        let awardOpen = cc.instantiate(this.awardGameOpen);
        awardOpen.parent = cc.find("Canvas");
    }
    // update (dt) {},
});
