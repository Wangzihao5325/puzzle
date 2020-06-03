// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import {dateFormat} from '../utils/utils'
import {GAME_CACH} from '../global/piece_index'
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        warp:cc.Node,
        content:cc.Node,
        // bg: cc.Sprite,
        dragonBone: {
            default: null,
            type: dragonBones.ArmatureDisplay
        },
        type: {
            type:Number,
            default:1
        },
        back:cc.Node,
        download:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.initBgAnimate()
        this.setTouch()
    },

    start () {

    },



    handleBack(){
        this.shareWarp.active=false;
        this.shareWarp.destroy()
        cc.director.loadScene("mission");

    },

    initBgAnimate(animatePayload) {
        if (this.dragonBone.dragonAtlasAsset) {
            return;
        }

        cc.loader.load(animatePayload.picPath, (error, texture) => {
            cc.loader.load([animatePayload.animatePath, animatePayload.animatePath2], (errors, results) => {

                let atlasJson = results.getContent(animatePayload.animatePath);
                let dragonBonesJson = results.getContent(animatePayload.animatePath2);

                let atlas = new dragonBones.DragonBonesAtlasAsset();
                atlas._uuid = animatePayload.animatePath;
                atlas.atlasJson = JSON.stringify(atlasJson);
                atlas.texture = texture;
                let asset = new dragonBones.DragonBonesAsset();
                asset._uuid = animatePayload.animatePath2;
                asset.dragonBonesJson = JSON.stringify(dragonBonesJson);

                this.dragonBone.dragonAtlasAsset = atlas;
                this.dragonBone.dragonAsset = asset;

                this.dragonBone.armatureName = dragonBonesJson.armature[0].name;
                // CACHE.dragonBoneAnimateName = dragonBonesJson.armature[0].defaultActions[0].gotoAndPlay;
                //this.dragonBone.playAnimation(dragonBonesJson.armature[0].defaultActions[0].gotoAndPlay, 0);
                this.dragonBone.playAnimation(CACHE.dragonBoneAnimateName, 0);

            });
        });
    },

    setTouch() {
        this.back.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.handleBack()
            event.stopPropagation();
        })
        this.download.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.handleDownload()
            event.stopPropagation();
        })

        
    },
    handleDownload(){
        console.log("点击分享")
    },


    // update (dt) {},
});
