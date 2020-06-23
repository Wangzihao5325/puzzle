// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CACHE } from '../global/usual_cache';

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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },
    playBg(foce){
        if (CACHE.isBGM && CACHE.currentBGM===undefined) {
            console.log("播放音乐")
            CACHE.currentBGM = cc.audioEngine.play(this.audio, true, 0.1);
            console.log("开始",CACHE.currentBGM)

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
        console.log("停止",CACHE.currentBGM)
        if (CACHE.currentBGM!==undefined) {
            console.log("停止音乐",CACHE.currentBGM)
            cc.audioEngine.stop(CACHE.currentBGM);
            CACHE.currentBGM=undefined
        }
    },
    // update (dt) {},
});
