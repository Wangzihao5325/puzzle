import { SIZES, LEVEL, PUZZLE_FOOTER,PUZZLE_SCENE,spliceArr, GAME_CACHE,SCALELEAVEL } from '../global/piece_index';
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';
import { IMAGE_SERVER } from '../global/app_global_index'
import { initItem } from './initSplice';

cc.Class({
    extends: cc.Component,

    properties: {
        game_bg: cc.Node,
        pre_item: cc.Prefab,
        splice_warp: cc.Prefab,
        game_root: cc.Node,
        puzzle_name: cc.Label,
        dragonBone: {
            default: null,
            type: dragonBones.ArmatureDisplay
        },
        audio: {
            default: null,
            type: cc.AudioClip
        },
        viewPuaaleImg:cc.Sprite,
        spliceList:{
            type:cc.Array,
            default:[]
        }

    },

    onLoad() {
        this.init();
        if (CACHE.isBGM && !this.currentBGM) {
            this.currentBGM = cc.audioEngine.play(this.audio, true, 1);
        }
    },


    onDestroy() {
        if (this.currentBGM) {
            cc.audioEngine.stop(this.currentBGM);
        }
    },



    init() {

        //重置参数
        GAME_CACHE.complateIndex = []
        GAME_CACHE.isComplate = true

        const hardLevel = CACHE.hard_level;
        const missionObj = CACHE.mission_press;

        this.puzzle_name.string = `${CACHE.chapterData.hurdleName} `
        Api.missionDetails(missionObj.hurdleId, (res) => {
            const imagePath = missionObj.logoUrl;
            const animatePayload = {
                animatePath: res.data.texJson,
                animatePath2: res.data.skeJson,
                picPath: res.data.texPng,
            };
            this.game_bg.zIndex = 1;
            this.initPuzzleImg(res.data.picId)
            this.initItem(hardLevel);
            this.initSpliceWarp(hardLevel, imagePath);
            this.initBgAnimate(animatePayload);
            GAME_CACHE.animatePayload = animatePayload
        })
    },

    initPuzzleImg(picId){
        cc.loader.load(`${IMAGE_SERVER}/${picId}.png`, (err, texture) => {
            this.viewPuaaleImg.spriteFrame = new cc.SpriteFrame(texture)
        });
    },

    initItem(hardLevel = LEVEL.EASY) {// hardLevel: 0->2*3; 1->4*6; 2->6*8
        /*根据难度获取切片数据数组*/

        let sizeArr = [...SIZES[hardLevel]];
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
                /*在对象中保存节点引用，便于后续调用*/
                obj.item_node = item_node;
                obj.setMarsk(item[6], hardLevel)
            }
        });
    },

    initSpliceWarp(hardLevel = LEVEL.EASY, imagePath) {
        /*初始化底部栏*/
        let spliceWarp_node = cc.instantiate(this.splice_warp);
        let sizeArr = [...SIZES[hardLevel]];
        spliceWarp_node.width = sizeArr.length * PUZZLE_FOOTER.itemWidth + PUZZLE_FOOTER.itemWidthMargin;
        spliceWarp_node.height = PUZZLE_FOOTER.height;
        spliceWarp_node.parent = this.game_root;
        spliceWarp_node.setPosition(PUZZLE_FOOTER.position[0], PUZZLE_FOOTER.position[1]);
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
                CACHE.dragonBoneAnimateName = dragonBonesJson.armature[0].defaultActions[0].gotoAndPlay;
                //this.dragonBone.playAnimation(dragonBonesJson.armature[0].defaultActions[0].gotoAndPlay, 0);
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

    puzzlePliceAnimation(){
        // var puzzleItem = cc.find(`Canvas/root/puzzleWarp/puzzleBg`);
        let list=[...GAME_CACHE.spliceArr];
        // list.reverse();
        const time=[50,20,10][CACHE.hard_level]
        this.pliceAnimation(list,time)
    },

    //拼图块凋落动画
    pliceAnimation(data,time,index=0){
        const hardLevel = CACHE.hard_level;
        if(this.fallTimer){
            clearTimeout(this.fallTimer)
        }
        const scalLeavel = SCALELEAVEL[CACHE.hard_level]
            if(data.length){
                let name = `item_puzzle_splice-${data[0][6]}`
                let node=cc.find(`Canvas/root/puzzleWarp/puzzleBg/${name}`)
                let newNode  = cc.find(`Canvas/root/spliceWarp/${name}`)
                let layout_warp  = cc.find(`Canvas/root/spliceWarp`)
                const olodPosition=[newNode.x,newNode.y]
                let contentNode=cc.find('content',node)
                node.zIndex=100
                //根据平涂块的需要掉落的距离设置动画时间
                const fallTime=Math.ceil((440+node.y)/880*6)/10

                this.fallTimer= setTimeout(()=>{
                    this.pliceAnimation(data.splice(1),time,index+1)
                },time)
                let angle = node.angle % 360;
                let angleAbs=angle>=0?angle:360+angle
                let shadowPostion;
                switch (angleAbs){
                    case 0:
                        shadowPostion=cc.v2(-5,3)
                        break;
                    case 90:
                        shadowPostion=cc.v2(3,5)
                        break;
                    case 180:
                        shadowPostion=cc.v2(5,-3)
                        break;
                    case 270:
                        shadowPostion=cc.v2(-3,-5)
                        break;
                }
                cc.tween(contentNode)
                    .to(.2,{position:shadowPostion})
                    .start()
                cc.tween(node)
                    .to(0.2, { position: cc.v2(node.x,node.y+50) })
                    .to(fallTime, { position: cc.v2(node.x,-440),opacity:200 })
                    .to(.2, { scale:scalLeavel,opacity:0 })
                    // .to(.2, { opacity:255 })
                    .call(()=>{
                        node.destroy()
                    })
                    .start();
                
                    newNode.setScale(scalLeavel/1)
                    newNode.setPosition(cc.v2(node.x,0))
                    newNode.opacity=0
                     
                    cc.tween(newNode)
                        .delay(.4)
                        .to(.3,{scale:1,opacity:255})
                        .call(()=>{
                            if(newNode.x>(640+100)){
                                newNode.opacity=0
                            }
                        })
                        .start()
            }else{
                clearTimeout(this.fallTimer)
                let game_splice_obj  = cc.find(`Canvas/root/spliceWarp`).getComponent('game_splice')
                game_splice_obj.setLayoutType(false)
            }

       
    },

    start() {
        setTimeout(()=>{
            this.puzzlePliceAnimation()
        },500)

    },

});
