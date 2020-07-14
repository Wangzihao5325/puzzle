import {
    MASK_RESOUSE,
    LEVEL,
    TYPES,
    SCALELEAVEL,
    underwayIndex,
    spliceArr,
    GAME_CACHE,
    PUZZLE_FOOTER,
    PUZZLE_SCENE,
    SIZES,
} from '../global/piece_index';
import { initItem } from './initSplice';
import { CACHE } from '../global/usual_cache';
import { throttle } from '../utils/utils'

cc.Class({
    extends: cc.Component,

    properties: {
        sp_item: cc.Sprite,
        sp_item_Node: cc.Node,
        content: cc.Mask,
        contentNode: cc.Node,
        mask_item: cc.Mask,
        splice_item: cc.Node,
        item_node: cc.Node,
        isMove: cc.boolean,
        shadow: cc.Node,
        pre_item: cc.Prefab,
        removeOutDistance: {
            type: cc.Boolean,
            defaulty: 90
        },

    },

    init(num) {
        this.num = num;
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        if (CACHE.platform.isIphoneX) {
            this.removeOutDistance = 120
        }
    },

    setSpItem(spt, item) {
        this.sp_item.spriteFrame = spt;
        const index = item[6]
        const indexXNum = TYPES[CACHE.hard_level][0]
        const indexYNUM = TYPES[CACHE.hard_level][1]
        const col = (index + 1) % indexXNum === 0 ? indexXNum : (index + 1) % indexXNum - 1
        const row = Math.ceil((index + 1) / indexXNum) - 1
        // this.contentNode.width=item[2]
        // this.contentNode.width=item[2]
        const x = -item[4]
        const y = -item[5]
        this.sp_item_Node.setPosition(cc.v2(x, y))

    },

    setMarsk(index, hardLevel) {
        const self = this;
        var urls = MASK_RESOUSE[hardLevel];
        cc.loader.loadRes(urls[index], cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            self._item_index = index;
            self.content.spriteFrame = assets;
            self.shadow.getComponent(cc.Mask).spriteFrame = assets
        });
    },

    setTouch(hardLevel) {
        /* 初始化node Y轴偏移量（因为现在node在底部栏不可滑动,使用偏移量记录是否达到拖出底部栏的标准）*/
        this.item_node._offsetY = 0;
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.startTouchTime=new Date().getTime()
            /*拿起增加z-index*/
            const current_node = this.item_node || this.splice_item;
            current_node.zIndex = 11;

            // const puzzleItem= cc.find('content',this.item_node)

            /*
            不禁止事件传递,让底部栏可以滑动，提升体验
            current_node.setPropagateTouchEvents = false;
            event.stopPropagation();
            */
        })
        this.isMove=false

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            let delta = event.touch.getDelta();

            //关闭查看图片
            const contralObj = cc.find(`Canvas/menuWarp`).getComponent('conraol')
            contralObj.closeView()

            //根据旋转角度计算阴影显示的坐标
            let angle = this.item_node.angle % 360;
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
            this.shadow.active = true
            cc.tween(this.contentNode)
                .to(.2, { position: shadowPostion })
                .start()
            const outList = this.item_node.parent.name !== 'content';
            let newPositin = cc.v2(this.item_node.x + delta.x, this.item_node.y + delta.y > 430 ? 430 : this.item_node.y + delta.y);

            //在拼图盒子内移动
            if (!outList && this.item_node._offsetY + delta.y < 90) {
                // this.item_node.parent = cc.find('Canvas');

                /*积累偏移量*/
                this.item_node._offsetY = this.item_node._offsetY + delta.y;
                /*
                暂时屏蔽，不让拼图块在底部栏移动,提升体验
                const resetPostion = cc.v2(this.item_node.x, this.item_node.y + delta.y);
                this.item_node.setPosition(resetPostion);
                */
            }
            /*偏移量积累足够,进行拼图块拖出底部栏操作*/
            else if (!outList && this.item_node._offsetY + delta.y > 90) {
                /*移除范围内修改父级节点*/
                var puzzleBg = cc.find(`Canvas/root/puzzleWarp/puzzleBg`);
                this.item_node.removeFromParent(false);
                // this.item_node.parent = puzzleBg;
                this.item_node.parent = cc.find('Canvas');
                // const newNode=cc.instantiate(this.item_node);
                // newNode.parent = puzzleBg;


                /*依据计算拼底部栏坐标计算其在拼图区域的坐标*/
                let bgX = Math.ceil(this.item_node.x - (PUZZLE_FOOTER.position[0] - PUZZLE_FOOTER.truePosition[0])) - PUZZLE_SCENE.width / 2;
                const resetPostion = cc.v2(bgX, this.item_node.y + delta.y - 540 + this.item_node.height);

                let windowSize = cc.view.getVisibleSize();
                // cc.log("width="+windowSize.width+",height="+windowSize.height);
                const rightPositiot = cc.v2(event.touch.getLocation().x - windowSize.width / 2, event.touch.getLocation().y - windowSize.height / 2)
                this.item_node.setPosition(rightPositiot);
                GAME_CACHE.underwayIndex.push(this.item_node.defaultIndex);
                this.removeSpliceNode(this.item_node.defaultIndex);
                cc.tween(this.item_node)
                    .to(0.2, { scale: 1 })
                    .start();
                //重新排列底部块的位置
                let game_bg = cc.find('Canvas/root/puzzleWarp/puzzleBg');
                if (game_bg) {
                    initItem(GAME_CACHE.spliceArr, CACHE.hard_level, 2, this.pre_item, game_bg, new cc.SpriteFrame(), true, true);
                }
            }

            else {
                this.item_node.parent = cc.find('Canvas');
                this.item_node.setPosition(newPositin);
            }
            /*
            不禁止事件传递,让底部栏可以滑动，提升体验
            event.stopPropagation();
            */
        })

        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            const touchEndTime=new Date().getTime()
           this.isMove= touchEndTime-this.startTouchTime>=300
           console.log('touchEndTime-this.startTouchTime',touchEndTime,this.startTouchTime,touchEndTime-this.startTouchTime)
            if (this.isMove) {
                this.item_node._offsetY = 0;
            } else {
                throttle(cc.find("sound").getComponent("sound").tap(), 500)
            }

            let outList = this.item_node.parent.name !== 'content';

            if (outList) {
                this.item_node.parent = cc.find('Canvas/root/puzzleWarp/puzzleBg');
            }

            /*移回盒子*/
            if (outList && this.item_node.y < -428.5) {
                var spliceWarpContent = cc.find(`Canvas/footerWarp/spliceWarp/spliceScrollView/view/content`)

                this.item_node.parent = spliceWarpContent
                this.item_node.setScale(SCALELEAVEL[hardLevel])
                const resetPostion = cc.v2(this.item_node.x, 0)
                this.item_node.setPosition(resetPostion);
                GAME_CACHE.underwayIndex.remove(this.item_node.defaultIndex);
                this.pushSpliceNode(this.item_node.defaultIndex, hardLevel);
                //重新排列底部块的位置
                let game_bg = cc.find('Canvas/root/puzzleWarp/puzzleBg');
                if (game_bg) {
                    initItem(GAME_CACHE.spliceArr, CACHE.hard_level, 2, this.pre_item, game_bg, new cc.SpriteFrame(), true, true);
                }

                //去除拿起阴影
                this.shadow.active = false
                cc.tween(this.contentNode)
                    .to(.1, { position: cc.v2(0, 0) })
                    .start()

            }

            outList = this.item_node.parent.name !== 'content';
            if (hardLevel == LEVEL.HARD && !this.isMove && outList) {
                //第三级难度点击旋转
                // this.item_node.angle = (this.item_node.angle - 90) % 360;
                //添加节流
                const angleNum = this.item_node.angleNum + 1 === 4 ? 0 : this.item_node.angleNum + 1 % 4

                throttle(
                    cc.tween(this.item_node)
                        .to(.1, { angle: 0 - (this.item_node.angleNum + 1) * 90 })
                        .call(() => {
                            //解决旋转连续性
                            this.item_node.angleNum = angleNum;
                            if (angleNum === 0) {
                                this.item_node.angle = 0;
                            }
                            this.calPostion(this.item_node.x, this.item_node.y, 0 - angleNum * 90, hardLevel)
                        })
                        .start()
                    // }
                    , 1000).bind(this)

            }
            if (outList) {
                //在盒子外计算
                let delta = event.touch.getDelta();
                this.calPostion(this.item_node.x + delta.x, this.item_node.y + delta.y, this.item_node.angle, hardLevel);
            }
            this.item_node.zIndex = 10;//恢复z-index
            // this.isMove = false;
            // cc.find('shadow',this.item_node).active=false
            // const puzzleItem= cc.find('content',this.item_node)
            //去除拿起阴影
            this.shadow.active = false
            cc.tween(this.contentNode)
                .to(.1, { position: cc.v2(0, 0) })
                .start()

            /*
            不禁止事件传递,让底部栏可以滑动，提升体验
            event.stopPropagation();
            */

        })

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, (event) => {
            const touchEndTime=new Date().getTime()
            this.isMove= touchEndTime-this.startTouchTime>=300
            if (this.isMove) {
                this.item_node._offsetY = 0;
            }
            // if (hardLevel == LEVEL.HARD && !this.isMove) {
            //     //第三级难度点击旋转
            //     // this.item_node.angle = (this.item_node.angle - 90) % 360;
            //     //添加节流
            //     const angleNum=this.item_node.angleNum+1===4?0:this.item_node.angleNum+1%4

            //     throttle(
            //             cc.tween(this.item_node)
            //             .to(.1, { angle: 0-(this.item_node.angleNum+1)*90 })
            //             .call(()=>{
            //                 //解决旋转连续性
            //                 this.item_node.angleNum=angleNum;
            //                 if(angleNum===0){
            //                     this.item_node.angle=0;
            //                 }
            //                 this.calPostion(this.item_node.x, this.item_node.y, this.item_node.angle, hardLevel)
            //             })
            //             .start()
            //         // }
            //    ,1000).bind(this)

            // }
            const outList = this.item_node.parent.name !== 'content';
            if (outList) {
                //在盒子外计算
                let delta = event.touch.getDelta();
                this.calPostion(this.item_node.x + delta.x, this.item_node.y + delta.y, this.item_node.angle, hardLevel);
            } else {
                this.item_node.setScale(SCALELEAVEL[hardLevel])
            }
            this.item_node.zIndex = 10;//恢复z-index
            this.isMove = false;
            // cc.find('shadow',this.item_node).active=false
            // const puzzleItem= cc.find('content',this.item_node)
            //去除拿起阴影
            this.shadow.active = false
            cc.tween(this.contentNode)
                .to(.1, { position: cc.v2(0, 0) })
                .start()


            /*
            不禁止事件传递,让底部栏可以滑动，提升体验
            event.stopPropagation();
            */

        })
    },

    removeSpliceNode(removeIndex) {
        var currentArr = [...GAME_CACHE.spliceArr]
        currentArr.map((item, index) => {
            if (item[6] == removeIndex) {
                currentArr.splice(index, 1)
            }
        })
        GAME_CACHE.spliceArr = currentArr;
    },

    pushSpliceNode(index, hardLevel) {
        let reg = SIZES[hardLevel];
        reg.every((item) => {
            if (item[6] == index) {
                let spliceNode = [...item];
                let currentArr = [...GAME_CACHE.spliceArr];
                currentArr.unshift(spliceNode);
                GAME_CACHE.spliceArr = currentArr;
                return false;
            }
            return true;
        })
    },

    /*计算中心点距离*/
    calPostion(x, y, rotation, hardLevel) {
        const defaultPostion = this.item_node.defaultPostion;
        const defaultx = defaultPostion[0];
        const defaulty = defaultPostion[1];
        let reg = SIZES[hardLevel];
        let minDistance = Number.MAX_VALUE;
        let minItem = null;
        reg.forEach((item, index) => {
            let distance = Math.pow((item[4] - x), 2) + Math.pow((item[5] - 10 - y), 2)
            if (distance <= minDistance) {
                minDistance = distance;
                minItem = item;
            }
        });
        if (minItem) {
            if (minItem[4] == defaultx && minItem[5] - 10 == defaulty && rotation == 0) {
                let newPositin = cc.v2(defaultx, defaulty);
                // this.item_node.setPosition(newPositin);
                cc.tween(this.item_node)
                    .to(.2, { position: newPositin })
                    .start()
                var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${this.item_node.defaultIndex}`);
                item_puzzle_warp.active = false;
                // var item_puzzle_splice = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_splice-${this.item_node.defaultIndex}`);
                this.item_node.active = false;
                this.item_node.destroy()
                GAME_CACHE.complateIndex.push(this.item_node.defaultIndex);
                GAME_CACHE.underwayIndex.remove(this.item_node.defaultIndex)
                this.checkSuccess();
                if (GAME_CACHE.complateIndex.length >= reg.length * 0.3 && GAME_CACHE.puzzleAnimation === false) {
                    GAME_CACHE.puzzleAnimation = true
                    let dragonBonesNode = cc.find('Canvas/root/puzzleWarp/puzzleBg');
                    let animate = dragonBonesNode.getComponent(dragonBones.ArmatureDisplay)
                    animate.playAnimation(CACHE.dragonBoneAnimateName, 0);
                }
                setTimeout(() => { item_puzzle_warp.destroy(); }, 100)
            } else {
                cc.tween(this.item_node)
                    .to(.2, { position: cc.v2(minItem[4], minItem[5] - 4) })
                    .start()
            }
        }
    },

    checkSuccess() {
        const contralObj = cc.find(`Canvas/menuWarp`).getComponent('conraol')
        contralObj.checkComplate()
    },

    setRandomRotation(hardLevel) {
        if (hardLevel == LEVEL.HARD) {
            const angleNum = Math.floor(4 * Math.random());
            let randomNum = angleNum * 90;
            this.item_node.angle = randomNum;
            this.item_node.angleNum = angleNum
        }
    }

});
