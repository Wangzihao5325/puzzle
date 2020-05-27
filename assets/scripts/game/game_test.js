import { SIZES, LEVEL,GAME_CACHE } from '../global/piece_index';
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';

cc.Class({
    extends: cc.Component,

    properties: {
        game_bg: cc.Node,
        pre_item: cc.Prefab,
        splice_warp: cc.Prefab,
        game_root: cc.Node,
        puzzle_name:cc.Label,
        dragonBone: {
            default: null,
            type: dragonBones.ArmatureDisplay
        },
    },

    onLoad() {
        this.init();
    },

    init() {
        const hardLevel = CACHE.hard_level;
        const missionObj = CACHE.mission_press;
        this.puzzle_name.string=CACHE.chapterData.chapterName
        Api.missionDetails(missionObj.hurdleId, (res) => {
            const imagePath = missionObj.logoUrl;
            const animatePayload = {
                animatePath: res.data.texJson,
                animatePath2: res.data.skeJson,
                picPath: res.data.texPng,
                armature: "chunyuanhaixianguangchang",
                animate: "newAnimation",
            };
            this.game_bg.zIndex = 1;
            this.initItem(hardLevel);
            this.initSpliceWarp(hardLevel, imagePath);
            this.initBgAnimate(animatePayload);
        })
    },

    initItem(hardLevel = LEVEL.EASY) {// hardLevel: 0->2*3; 1->4*6; 2->6*8
        /*根据难度获取切片数据数组*/
        let sizeArr = SIZES[hardLevel];
        /*遍历sizeArr生成item*/
        sizeArr.forEach((item, index) => {
            /*根据预制资源实例化节点*/
            let item_node = cc.instantiate(this.pre_item);
            /*设置节点属性*/
            item_node.name = `item_puzzle_warp-${item[6]}`
            item_node.width = item[2];
            item_node.height = item[3];
            item_node.getChildByName('item_puzzle').width = item[2];
            item_node.getChildByName('item_puzzle').height = item[3];
            item_node.parent = this.game_bg;
            item_node.setPosition(item[4], item[5]);
            item_node.zIndex = 10;
            /*获取itembg_index对象*/
            let obj = item_node.getComponent('itembg_index');
            if (obj) {
                obj.setMarsk(item[6], hardLevel)
                /*在对象中保存节点引用，便于后续调用*/
                obj.item_node = item_node;
            }
        });
    },

    initSpliceWarp(hardLevel = LEVEL.EASY, imagePath) {
        let spliceWarp_node = cc.instantiate(this.splice_warp);
        let sizeArr = SIZES[hardLevel];
        spliceWarp_node.width = sizeArr.length * 140 + 20;
        spliceWarp_node.height = 120;
        spliceWarp_node.parent = this.game_root;
        spliceWarp_node.setPosition(-344, -500);
        let obj = spliceWarp_node.getComponent('game_splice');
        if (obj) {
            obj.init(hardLevel, imagePath);
        }
    },

    initBgAnimate(animatePayload) {
        if (this.dragonBone.dragonAtlasAsset) {
            return;
        }

        cc.loader.load(animatePayload.picPath, (error, texture) => {
            cc.loader.load({ url: animatePayload.animatePath, type: 'txt' }, (error1, atlasJson) => {
                cc.loader.load({ url: animatePayload.animatePath2, type: 'txt' }, (error2, dragonBonesJson) => {
                    var atlas = new dragonBones.DragonBonesAtlasAsset();
                    atlas._uuid = animatePayload.animatePath;
                    atlas.atlasJson = atlasJson;
                    atlas.texture = texture;
                    var asset = new dragonBones.DragonBonesAsset();
                    asset._uuid = animatePayload.animatePath2;
                    asset.dragonBonesJson = dragonBonesJson;
                    let dbJson = JSON.parse(dragonBonesJson);

                    this.dragonBone.dragonAtlasAsset = atlas;
                    this.dragonBone.dragonAsset = asset;

                    this.dragonBone.armatureName = dbJson.armature[0].name;
                    this.dragonBone.playAnimation(dbJson.armature[0].defaultActions[0].gotoAndPlay, 0);
                });
            });
        });
        /* dragonbone图片加载demo
                cc.loader.loadRes(animatePayload.animatePath, dragonBones.DragonBonesAtlasAsset, (err, res) => {
                    if (err) cc.error(err);
                    this.dragonBone.dragonAtlasAsset = res;
                    cc.loader.loadRes(animatePayload.animatePath2, dragonBones.DragonBonesAsset, (err, res) => {
                        if (err) cc.error(err);
                        this.dragonBone.dragonAsset = res;
                        this.dragonBone.armatureName = animatePayload.armature;
                        this.dragonBone.playAnimation(animatePayload.animate, 0);
                    });
                });
        */
    },

    start() {

    },

});
