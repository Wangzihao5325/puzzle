import { SIZES, LEVEL, PUZZLE_FOOTER, PUZZLE_SCENE, spliceArr, GAME_CACHE, SCALELEAVEL } from '../global/piece_index';
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';
import { IMAGE_SERVER } from '../global/app_global_index'
import { initItem } from './initSplice';

cc.Class({
    extends: cc.Component,

    properties: {
        game_bg: cc.Node,
        pre_item: cc.Prefab,
        game_root: cc.Node,
        puzzle_name: cc.Label,
        puzzleColor: cc.Node,
        dragonBone: {
            default: null,
            type: dragonBones.ArmatureDisplay
        },
        audio: {
            default: null,
            type: cc.AudioClip
        },
        viewPuaaleImg: cc.Sprite,
        spliceList: {
            type: cc.Array,
            default: []
        },
        footerWarp: cc.Node,
        crossBorder:cc.Node,
        

    },

    onLoad() {
        console.log("gameTest",CACHE.hard_level)

        this.init();
        cc.find("sound").getComponent("sound").stop()
        cc.find("sound").getComponent("sound").playGameBg()

    },


    onDestroy() {

    },



    init() {

        //重置参数
        GAME_CACHE.complateIndex = []
        GAME_CACHE.isComplate = true
        GAME_CACHE.puzzleAnimation = false

        const hardLevel = CACHE.hard_level;
        const missionObj = CACHE.mission_press;
        if(hardLevel===4){
            this.crossBorder.active=true
        }

        if (CACHE.platform.isIphoneX) {
            //改变底部高度
            const iphoneXAddHeight = 40;
            this.footerWarp.height = this.footerWarp.height + iphoneXAddHeight
            const spliceWarp = cc.find('spliceWarp', this.footerWarp)
            spliceWarp.height = spliceWarp.height + iphoneXAddHeight
            const boxbg = cc.find('boxbg', this.footerWarp)
            boxbg.height = boxbg.height + iphoneXAddHeight
            // const spliceScrollView=cc.find('spliceWarp/spliceScrollView',this.footerWarp)
            // spliceScrollView.height=spliceScrollView.height+iphoneXAddHeight
            // const spliceScrollViewView=cc.find('spliceWarp/spliceScrollView/view',this.footerWarp)
            // spliceScrollViewView.height=spliceScrollViewView.height+iphoneXAddHeight
            // const spliceScrollViewContent=cc.find('spliceWarp/spliceScrollView/view/content',this.footerWarp)
            // spliceScrollViewContent.height=spliceScrollViewContent.height+iphoneXAddHeight
        }

        this.puzzle_name.string = `${CACHE.chapterData.hurdleName} `
        Api.missionDetails(missionObj.hurdleId, (res) => {
            const imagePath = missionObj.logoUrl;
            const animatePayload = {
                animatePath: res.data.texJson,
                animatePath2: res.data.skeJson,
                picPath: res.data.texPng,
            };
            this.game_bg.zIndex = 1;
            // this.initPuzzleImg(res.data.picId)
            // this.initItem(hardLevel);
            this.initSpliceWarp(hardLevel, imagePath);
            // this.initBgAnimate(animatePayload);
            GAME_CACHE.animatePayload = animatePayload
            GAME_CACHE.currentCityId = res.data.picId
        })
    },

    initPuzzleImg(picId) {
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
            // item_node.width =174;
            // item_node.height = 174;
            item_node.width = item[2];
            item_node.height = item[3];
            item_node.parent = this.game_bg;
            item_node.setPosition(item[4], item[5]);
            cc.find('border',item_node).width=item[2];
            cc.find('border',item_node).height=item[3];
            item_node.zIndex = 10;
            /*获取itembg_index对象*/
            let obj = item_node.getComponent('itembg_index');
            if (obj) {
                /*在对象中保存节点引用，便于后续调用*/
                obj.item_node = item_node;
                obj.setMarsk(item[6], hardLevel)
            }

            if (index === sizeArr.length - 1) {
                this.puzzleColor.active = false
                this.initBgAnimate(GAME_CACHE.animatePayload);
            }
        });

    },

    initSpliceWarp(hardLevel = LEVEL.EASY, imagePath) {
        /*初始化底部栏*/
        let obj = this.footerWarp.getComponent('game_splice');
        if (obj) {
            obj.init(hardLevel, imagePath);
            setTimeout(() => {
                this.puzzlePliceAnimation()
            }, 500)
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

                this.initPuzzleImg(GAME_CACHE.currentCityId)

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

    puzzlePliceAnimation() {
        // var puzzleItem = cc.find(`Canvas/root/puzzleWarp/puzzleBg`);
        let list = [...GAME_CACHE.spliceArr];
        // list.reverse();
        const time = [155, 84, 31,31,55][CACHE.hard_level]
        this.pliceAnimation(list, time)
    },

    //拼图块凋落动画
    pliceAnimation(data, time, index = 0) {
        const hardLevel = CACHE.hard_level;
        if (this.fallTimer) {
            clearTimeout(this.fallTimer)
        }
        const footerWarpPositionY = this.footerWarp.y
        const scalLeavel = SCALELEAVEL[CACHE.hard_level]
        if (data.length) {
            let name = `item_puzzle_splice-${data[0][6]}`
            // let node = cc.find(`Canvas/root/puzzleWarp/puzzleBg/${name}`)
            let node = cc.find(`Canvas/${name}`)
            // let newNode = cc.find(`Canvas/footerWarp/spliceWarp/spliceScrollView/view/content/${name}`)
            var newNode = cc.find(`Canvas/footerWarp/spliceWarp/spliceScrollView/view/content/${name}`)

            let layout_warp = cc.find(`Canvas/root/spliceScrollView/view/content`)
            const olodPosition = [newNode.x, newNode.y]
            let contentNode = cc.find('content', node)
            let shadowNode = cc.find('shadow', node)
            node.zIndex = 100
            //根据平涂块的需要掉落的距离设置动画时间
            const fallTime = Math.ceil(( node.y-footerWarpPositionY) / 800*10) / 10
            this.fallTimer = setTimeout(() => {
                this.pliceAnimation(data.splice(1), time, index + 1)
            }, time)
            let angle = node.angle % 360;
            let angleAbs = angle >= 0 ? angle : 360 + angle
            let shadowPostion;
            switch (angleAbs) {
                case 0:
                    shadowPostion = cc.v2(-5, 3)
                    break;
                case 90:
                    shadowPostion = cc.v2(3, 5)
                    break;
                case 180:
                    shadowPostion = cc.v2(5, -3)
                    break;
                case 270:
                    shadowPostion = cc.v2(-3, -5)
                    break;
            }
            shadowNode.active = true
            const angleNum = CACHE.hard_level !== 2 ? 0 : Math.floor(4 * Math.random());
            let randomNum = angleNum * 90;
            cc.tween(contentNode)
                .to(.2, { position: shadowPostion })
                .start()
            cc.tween(node)
                .to(0.1, { position: cc.v2(node.x, node.y + 45) })
                
                .to(fallTime, { position: cc.v2(node.x, footerWarpPositionY), opacity: 100, angle: randomNum },{ easing: 'quadIn'})
                .to(.2, { scale: 1, opacity: 0 })
                // .to(.2, { opacity:255 })
                .call(() => {
                    node.destroy()
                })
                .start();

            newNode.setScale(1)
            // newNode.setPosition(cc.v2(node.x+320, 0))
            newNode.opacity = 0

            cc.tween(newNode)
                .delay(.4)
                .to(.3, { scale: scalLeavel, opacity: 255 })
                .call(() => {
                    if (newNode.x > (640 + 100)) {
                        newNode.opacity = 0
                    }
                })
                .start()
        } else {
            clearTimeout(this.fallTimer)

            //加载切块蒙版
            this.initItem(hardLevel);

            if (this.pliceAnimationCallback) {
                this.pliceAnimationCallback();
            }
        }


    },

    _setPliceAnimationCallback(callback) {
        //给新手引导使用的回调
        this.pliceAnimationCallback = callback
    },

    start() {


    },

});
