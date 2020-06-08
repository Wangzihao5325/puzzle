// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { dateFormat } from '../utils/utils'
import { GAME_CACH } from '../global/piece_index'
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        shareWarp: cc.Node,
        content: cc.Node,
        // bg: cc.Sprite,
        dragonBone: {
            default: null,
            type: dragonBones.ArmatureDisplay
        },
        type: {
            type: Number,
            default: 0
        },
        back: cc.Node,
        download: cc.Node,
        changeText: cc.Node,
        shareBtn: cc.Node,
        travelBtn: cc.Node,
        text1Node: cc.Node,
        text2Node: cc.Node,
        text3Node: cc.Node,
        text4Node: cc.Node,
        text5Node: cc.Node,
        text1: cc.Label,
        text2: cc.Label,
        text3: cc.Label,
        text4: cc.Label,
        text5: cc.Label,
        text6: cc.Label,
        random: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.init()
        this.initBgAnimate(GAME_CACH.animatePayload)
        this.setTouch()
    },

    start() {

    },
    init(type) {
        this.content.setPosition(cc.v2(0, -700))
        cc.tween(this.content)
            .to(.4, { position: cc.v2(0, 100) })
            .to(.2, { position: cc.v2(0, 0) }, { easing: 'expoInOut' })
            .start()

        GAME_CACH.textRandomTimes = 4
        this.handleChangeText()

        // const imgUrl= CACHE.mission_press.logoUrl
        // cc.loader.load(imgUrl, (err, texture)=> {
        //     this.bg.spriteFrame=new cc.SpriteFrame(texture)
        // });
    },

    initSentence(types, text) {

        console.log("types", types)

        let list, listL;
        if (types === 0) {
            list = [0, 20, 20, 20, 20]
            listL = [0, 20, 40, 60, 80]
        } else if (types === 1) {
            list = [0, 20, 20, 20, 20]
            listL = [0, 20, 40, 60, 80]
        } else {
            list = [0, 7, 12, 14, 15, 15, 15]
            listL = [0, 7, 19, 33, 48, 63]
        }


        let newText = text.length > listL[listL.length - 1] ? text.slice(0, listL[listL.length - 1] - 2) + '...' : text
        const lableList = [this.text1, this.text2, this.text3, this.text4, this.text5]
        const textNodeList = [this.text1Node, this.text2Node, this.text3Node, this.text4Node, this.text5Node,]
        let lableNum = 5;
        // const listLRevrse=listL.slice().reverse()
        // listLRevrse.map((item,index)=>{

        //     if(newText.length<=item){
        //         lableNum=index*-1+listL.length-1
        //         console.log("lableNum",lableNum)
        //     }
        // })
        lableList.map((item, index) => {
            cc.tween(textNodeList[index])
                .to(.4, { opacity: 0 })
                .call(() => {
                    item.string = ''
                    const datastr = dateFormat((new Date()), 'yyyy-MM-dd')
                    this.text6.string = datastr
                    for (let i = 0; i < lableNum; i++) {
                        lableList[i].string = newText.slice(listL[i], listL[i + 1])

                    }
                })
                .to(.4, { opacity: 255 })
                .start()

        })

    },

    handleBack() {
        if (CACHE.userInfo && typeof CACHE.userInfo.stage == 'number' && CACHE.userInfo.stage == 1) {
            Api.guideStageComplete({ stage: 1 }, (res) => {
                if (res.code == 0) {
                    CACHE.userInfo.stage++;
                }
                this.shareWarp.active = false;
                this.shareWarp.destroy()
                cc.director.loadScene("travel");
            })
        } else {
            this.shareWarp.active = false;
            this.shareWarp.destroy()
            cc.director.loadScene("travel");
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
                // CACHE.dragonBoneAnimateName = dragonBonesJson.armature[0].defaultActions[0].gotoAndPlay;
                //this.dragonBone.playAnimation(dragonBonesJson.armature[0].defaultActions[0].gotoAndPlay, 0);
                this.dragonBone.playAnimation(CACHE.dragonBoneAnimateName, 0);

            });
        });
    },

    setTouch() {
        this.back.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleBack()
            event.stopPropagation();
        })
        this.shareBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleShare()
            event.stopPropagation();
        })
        this.travelBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleContinue()
            event.stopPropagation();
        })
        this.changeText.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleChangeText()
            event.stopPropagation();
        })

    },
    handleShare() {
        console.log("点击分享")
    },

    handleContinue() {
        cc.director.loadScene("mission");
    },
    handleChangeText() {
        Api.travelComment(res => {
            const text = res.data
            // const text=`加拿大警方应美国要求在温哥华国际机场逮捕孟晚舟，美方随后提出引渡要求，指控其“隐瞒华为和伊`
            if (GAME_CACH.textRandomTimes > 0) {
                GAME_CACH.textRandomTimes--;
                this.initSentence(CACHE.hard_level, text)
                this.random.string = GAME_CACH.textRandomTimes

            } else {
                Toast.show('随机已经使用完')
            }
        })



    },
    async updateCommon() {
        await Api.travelComment(res => {
            return res.data
        })

    }
    // update (dt) {},
});
