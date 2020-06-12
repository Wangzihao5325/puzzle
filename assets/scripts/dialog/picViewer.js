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
        title:cc.Label,
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
        picId: {
            type: String,
            default: null
        },
        animationBg:cc.Node,
        imgNode:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.initBgAnimate()
        this.content.setScale(0.2)
        cc.tween(this.content)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()
        this.setTouch()
    },

    start () {

    },



    handleBack(){
        // this.content.setScale(0.2)
        cc.tween(this.content)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.warp.active=false;
            this.warp.destroy()
        })
        .start()

    },

    init(type,data,title){
        this.title.string=title
        if(type===1){
            const animatePayload = {
                animatePath: data.texJson,
                animatePath2: data.skeJson,
                picPath: data.texPng,
            };
            this.picId = data.picId
            this.title.string=data.hurdleName
            this.initBgAnimate(animatePayload)
        }else{
            this.initImage(data)
        }
    },

    initBgAnimate(animatePayload) {

        this.imgNode.active=false
        this.animationBg.active=true
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

    initImage(picUrl){
        this.imgNode.active=true
        this.animationBg.active=false
        cc.loader.load(picUrl, (err, texture) => {
            this.imgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
        });
    },

    setTouch() {
        // this.download.on(cc.Node.EventType.TOUCH_END, (event) => {
        //     this.handleDownload()
        //     event.stopPropagation();
        // })
        this.download.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.handleDownload()
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.handleBack()
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })



    },
    handleDownload(){
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
            return;
        }
        if (!this.picId) {
            Toast.show('未获取的图片');
            return;
        }
        let cv = wx.createCanvas();
        let ctx = cv.getContext("2d");
        let image = wx.createImage();
        image.onload = () => {
            cv.width = image.width;
            cv.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            let path = cv.toTempFilePathSync();
            wx.saveImageToPhotosAlbum({
                filePath: path,
                success: function () {
                    Toast.show('保存成功');
                },
                fail: function () {
                    Toast.show('保存失败');
                }
            })
        }
        image.src = "https://puzzle.oss-cn-beijing.aliyuncs.com/" + this.picId + ".png";
    },


    // update (dt) {},
});
