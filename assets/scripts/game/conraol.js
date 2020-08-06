import {
    SIZES, SCALELEAVEL, underwayIndex, spliceArr, corssPuzzleIndex,
    RoadMap34,
    RoadMap46,
    RoadMap68,
    RoadMap66
} from '../global/piece_index';
import { LEVEL, TYPES } from '../global/piece_index';
import { CACHE } from '../global/usual_cache';
import { GAME_CACHE } from '../global/piece_index';

import { initItem } from './initSplice';
import GLOBAL_VAR from '../global/index'
import Api from '../api/api_index'
import Action from '../api/api_action'
import { throttle } from "../utils/utils"


cc.Class({
    extends: cc.Component,

    properties: {
        root_warp: cc.Node,
        magnet: cc.Node,
        sort: cc.Node,
        menuWarp: cc.Node,
        magnet_time: cc.Node,
        sort_tiem: cc.Node,
        magnet_label: cc.Label,
        sort_label: cc.Label,
        puzzle_name: cc.Node,
        ad_free: cc.Node,
        flash: cc.Node,
        pauseBtn: cc.Node,
        game_bg: cc.Node,
        pre_item: cc.Prefab,
        spframe_puzzle: cc.SpriteFrame,
        countDown_label: cc.Label,
        pause: cc.Prefab,
        game_root: cc.Node,
        game_award: cc.Prefab,
        cross_game_award: cc.Prefab,
        game_share3: cc.Prefab,
        game_share1: cc.Prefab,
        game_share2: cc.Prefab,
        game_fail: cc.Prefab,
        viewIcon: cc.Node,
        viewPuaaleImg: cc.Node,
        isViewing: {
            type: cc.Boolean,
            default: false
        },
        header: cc.Prefab,
        diamondWarp: cc.Node,
        currentCount: cc.Label,
        count: {
            type: cc.Number,
            default: 0
        },
        crossComplate: {
            type: Array,
            default: []
        },
        crossPartComp: cc.Node,
        crossWrap: cc.Node,
        crossholo: cc.Node,
        crossDiamond: cc.Node,
        crossBorder: cc.Node,
        help: cc.Node,
        helPdig: cc.Prefab,
    },

    /**
     * 为了完成新手引导插入的回调，用来判断掉落框，分享框出现的时机
     */

    _guideCallbackSetting(showAwardCallback, showShareCallback, gameFailedCallback, gameRebornCallback) {
        if (showAwardCallback) {
            this._guideShowAwardCallback = showAwardCallback;
        }
        if (showShareCallback) {
            this._guideShowShareCallback = showShareCallback;
        }
        if (gameFailedCallback) {
            this._guideGameFailedCallback = gameFailedCallback;
        }
        if (gameRebornCallback) {
            this._guideGameRebornCallback = gameRebornCallback;
        }
    },

    _checkCompleteCallbackSetting(completeCallback) {
        if (completeCallback) {
            this._completeCallback = completeCallback;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.crossComplate = [0, 0, 0, 0]
        this.setTouch();
        this.resetUI()
        GAME_CACHE.isComplate = false
        GAME_CACHE.coutnDown = GAME_CACHE.gameTime
        // this.timer(GAME_CACHE.coutnDown);
        CACHE.mission_press.picId

        if (CACHE.platform.isIphoneX) {
            //改变底部高度
            const menuContent = cc.find('menuContent', this.menuWarp)
            menuContent.height = menuContent.height + 50
            const height = Math.ceil(CACHE.platform.visibleSize.height / 2 - 857 / 2 - 10)
            this.menuWarp.height = height > 240 ? 240 : height
        }
        if (CACHE.hard_level === 4) {
            this.diamondWarp.active = true
        }

        setTimeout(() => {
            this.highlightGuidePices()
        }, 4000)

    },



    start() {
        // this.showAward([], CACHE.hard_level + 1)

    },

    handleClidkMagnet() {
        if (this.checkComplate(true)) {
            return false
        } else if (CACHE.userData.strongMagnet > 0) {
            this.userProp({ strongMagnet: 1 },
                () => {
                    this.doMagnet()
                    this.updateUserInfo()
                }
            )
        } else {
            //测试用
            // this.doComplate()
            Toast.show('余额不足，观看广告')
        }
    },

    doMagnet() {
        if (this.checkComplate(true)) {
            return false
        }

        if (GAME_CACHE.underwayIndex && GAME_CACHE.underwayIndex.length) {
            //磁铁吸引在拼图中的块
            const index = GAME_CACHE.underwayIndex[0]
            var currentNode = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_splice-${index}`)
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${index}`);
            /*动画*/
            currentNode.zIndex = 100;
            cc.tween(currentNode)
                .to(.4, { position: cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1]) })
                .call(() => {
                    currentNode.destroy()
                    cc.find('item_puzzle', item_puzzle_warp).destroy()
                    initItem(GAME_CACHE.spliceArr, CACHE.hard_level, 2, this.pre_item, this.game_bg, new cc.SpriteFrame(), true, true);
                    this.checkComplate()
                    GAME_CACHE.rightNowCompleteIndex = index;
                    GAME_CACHE.complateIndex.push(index)
                    GAME_CACHE.underwayIndex.remove(index)
                    if (GAME_CACHE.complateIndex.length < SIZES[CACHE.hard_level].length && GAME_CACHE.complateIndex.length !== 0) {
                        //显露白边
                        this.findBigestContent();
                        if (GAME_CACHE.whiteLightIndex.length > 1) {
                            GAME_CACHE.whiteLightIndex.forEach((item) => {
                                let borderNode = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${item}`);
                                let borderObj = borderNode.getComponent('itembg_index');
                                if (borderObj) {
                                    borderObj.borderAnimate();
                                }
                            })
                        } else {
                            let item_puzzle_warp_obj = item_puzzle_warp.getComponent('itembg_index');
                            if (item_puzzle_warp_obj) {
                                item_puzzle_warp_obj.borderWidth(0, 400);
                            }
                        }
                    } else {
                        cc.find('border', item_puzzle_warp).destroy()
                    }
                })
                .start()
            // GAME_CACHE.complateIndex.push(index)
            // GAME_CACHE.underwayIndex.remove(index)

        } else {
            //磁铁吸引在底部框内的切块
            var spliceWarp = cc.find(`Canvas/footerWarp/spliceWarp/spliceScrollView/view/content`);
            const spliceWarpChildren = spliceWarp.children[0];
            const currentNode = spliceWarpChildren;
            // var puzzleBg = cc.find(`Canvas`);
            currentNode.parent = cc.find(`Canvas`);
            currentNode.zIndex = 10000;
            currentNode.opacity = 255;
            let newPositin = cc.v2(0, -540);
            currentNode.setPosition(newPositin);
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${currentNode.defaultIndex}`);

            cc.tween(currentNode)
                .to(.4, { position: cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1]), scale: 1, angle: 0 })
                .start()

            const index = currentNode.defaultIndex;
            GAME_CACHE.rightNowCompleteIndex = index;
            GAME_CACHE.complateIndex.push(index);
            this.removeSpliceNode(index)
            // underwayIndex.remove(index);
            initItem(GAME_CACHE.spliceArr, CACHE.hard_level, 2, this.pre_item, this.game_bg, new cc.SpriteFrame(), true, true);
            setTimeout(() => {
                currentNode.destroy();
                cc.find('item_puzzle', item_puzzle_warp).destroy()
                this.checkComplate();
                if (GAME_CACHE.complateIndex.length < SIZES[CACHE.hard_level].length && GAME_CACHE.complateIndex.length !== 0) {
                    //显露白边
                    this.findBigestContent();
                    if (GAME_CACHE.whiteLightIndex.length > 1) {
                        GAME_CACHE.whiteLightIndex.forEach((item) => {
                            let borderNode = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${item}`);
                            let borderObj = borderNode.getComponent('itembg_index');
                            if (borderObj) {
                                borderObj.borderAnimate();
                            }
                        })
                    } else {
                        let item_puzzle_warp_obj = item_puzzle_warp.getComponent('itembg_index');
                        if (item_puzzle_warp_obj) {
                            item_puzzle_warp_obj.borderWidth(0, 400);
                        }
                    }
                } else {
                    cc.find('border', item_puzzle_warp).destroy()
                }
            }, 400)
        }
        if (GAME_CACHE.complateIndex.length >= SIZES[CACHE.hard_level].length * 0.3 && GAME_CACHE.puzzleAnimation === false) {
            GAME_CACHE.puzzleAnimation = true
            let dragonBonesNode = cc.find('Canvas/root/puzzleWarp/puzzleBg');
            let animate = dragonBonesNode.getComponent(dragonBones.ArmatureDisplay)
            animate.playAnimation(CACHE.dragonBoneAnimateName, 0);
        }

    },

    findBigestContent() {
        let roadMap = null;
        switch (CACHE.hard_level) {
            // RoadMap46,
            // RoadMap68
            case 0:
                roadMap = RoadMap34;
                break;
            case 1:
                roadMap = RoadMap46;
                break;
            case 2:
                roadMap = RoadMap68;
                break;
            case 3:
                roadMap = RoadMap68;
                break;
            case 4:
                roadMap = RoadMap66;
                break;
        }
        let regArr = GAME_CACHE.complateIndex.map((item) => parseInt(item));
        regArr.pop();
        regArr.sort((a, b) => a - b);
        let regIndex = parseInt(GAME_CACHE.rightNowCompleteIndex);
        GAME_CACHE.whiteLightIndex = [regIndex]
        this.calBigContent(roadMap, regIndex, regArr);
        GAME_CACHE.whiteLightIndex = [...new Set(GAME_CACHE.whiteLightIndex)];
    },

    calBigContent(roadMap, regIndex, regArr) {
        if (regArr.length == 0) {
            return;
        }
        let sub = roadMap[`${regIndex}`];
        let leftRegArr = [];
        let res = regArr.filter((item) => {
            let isHave = sub.some((innerItem) => {
                return item === innerItem;
            });
            if (!isHave) {
                leftRegArr.push(item);
            }
            return isHave
        })
        if (res.length !== 0) {
            GAME_CACHE.whiteLightIndex = GAME_CACHE.whiteLightIndex.concat(res);
            res.forEach((item) => {
                this.calBigContent(roadMap, item, leftRegArr);
            });
        }
    },

    handleClickSort() {
        if (this.checkComplate(true, true)) {
            return false
        } else if (CACHE.userData.frame > 0) {
            this.userProp({ frame: 1 },
                () => {
                    this.doSort()
                    this.updateUserInfo()
                }
            )
        } else {
            Toast.show('余额不足，观看广告')
        }
    },
    doSort() {
        initItem(GAME_CACHE.spliceArr, CACHE.hard_level, 1, this.pre_item, this.game_bg, this.spframe_puzzle, true);
    },

    gamePause() {
        let pauseWarp = cc.instantiate(this.pause);
        GAME_CACHE.pause = true;
        pauseWarp.parent = cc.find('Canvas');
        pauseWarp.setPosition(0, 0);
    },

    gameContinue() {
        this.timer(GAME_CACHE.coutnDown);
    },
    gameOver() {
        GAME_CACHE.complateIndex = []
        GAME_CACHE.underwayIndex = []
        GAME_CACHE.isComplate = false;
    },
    updateUserInfo() {
        Action.User.BalanceUpdate(this.resetUI.bind(this))
    },

    userProp(data, callBack) {
        const that = this;
        Api.use_prop(data, (res) => {
            if (res.code === 0) {
                // that.resetUI()
                callBack && callBack()
            }
        });
    },
    handleView() {
        if (!this.isViewing) {
            if (this.checkComplate(true)) {
                return false
            } else if (CACHE.userData.showProp > 0) {
                this.userProp({ show: 1 },
                    () => {
                        this.doView()
                        this.updateUserInfo()
                    }
                )
            } else {
                Toast.show('余额不足，观看广告')
            }
        } else {
            this.doView()
        }

    },

    doView() {
        this.isViewing = !this.isViewing
        this.viewPuaaleImg.active = this.isViewing
    },

    closeView() {
        if (this.isViewing) {
            this.isViewing = false
            this.viewPuaaleImg.active = false
        }
    },

    setTouch() {
        let clidkMagnet = throttle(() => this.handleClidkMagnet(), 1200)


        this.crossPartComp.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        })
        this.magnet.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            clidkMagnet();
            event.stopPropagation();
        })
        this.sort.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleClickSort()
            event.stopPropagation();
        })
        this.viewIcon.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleView()
            event.stopPropagation();
        })
        this.pauseBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.gamePause()
            event.stopPropagation();
        })
        this.viewPuaaleImg.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.closeView()
        })
        this.help.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.show_help()
            event.stopPropagation();
        })
    },

    //判断完成，并调用完成动画
    checkComplate(onlyCheck = false, isSort) {//isSort引导专用参数
        //给引导使用的回调
        if (this._completeCallback && !isSort) {
            this._completeCallback();
        }
        if (onlyCheck) {
            if (SIZES[CACHE.hard_level].length == GAME_CACHE.complateIndex.length) {
                return true
            } else {
                return false
            }
        } else {
            if (CACHE.hard_level === 4) {
                this.checkCrosscomplate()
            }
            if (SIZES[CACHE.hard_level].length == GAME_CACHE.complateIndex.length) {
                // Toast.show("拼图完成", {timer:1000});
                cc.find("sound").getComponent("sound").stop()
                cc.find("sound").getComponent("sound").missionSuccess()
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    wx.vibrateLong()
                }

                this.doComplate()
                GAME_CACHE.complateIndex = []
                GAME_CACHE.isComplate = true

                let headerBg = cc.find(`Canvas/root/headerBg`);
                let footerBg = cc.find(`Canvas/root/footerBg`);

                headerBg.active = true
                footerBg.active = true

                let footerWarp = cc.find(`Canvas/footerWarp`);
                footerWarp.active = false;
                this.menuWarp.active = false;
                this.puzzle_name.color = new cc.color(255, 255, 255, 255)
                cc.tween(this.flash)
                    .to(.8, { position: cc.v2(485, -550) })
                    .start()


                /*动画*/

                return true
            } else {
                return false
            }
        }

    },

    checkCrosscomplate() {
        const data = GAME_CACHE.complateIndex
        const currentIndex = data[data.length - 1]
        let currentZone;
        const indexX = (parseInt(currentIndex) + 1) % 6
        if (currentIndex <= 17) {
            if (indexX >= 1 && indexX <= 3) {
                currentZone = 0
            } else {
                currentZone = 1
            }
        } else {
            if (indexX >= 1 && indexX <= 3) {
                currentZone = 2
            } else {
                currentZone = 3
            }
        }
        if (GAME_CACHE.complateIndex.length < 9) {

            return false
        } else {
            let crossComplateArr = this.crossComplate
            let isComplate = true
            corssPuzzleIndex[currentZone].map(item => {
                if (data.indexOf(item.toString()) === -1) {
                    isComplate = false
                    return false
                }
            })
            if (isComplate) {
                crossComplateArr[currentZone] = 1
                this.crossComplate = crossComplateArr
                isComplate && this.doCrossPartComp(currentZone)
            }


        }
    },
    doCrossPartComp(index) {
        this.crossPartComp.active = true;


        const positionList = [[-161, 214], [161, 214], [-161, -214], [161, -214]]
        this.crossWrap.setPosition(cc.v2(positionList[index][0], positionList[index][1]))
        this.crossDiamond.setPosition(cc.v2(0, 0))
        this.crossDiamond.opacity = 255
        this.crossDiamond.setScale(1)
        this.crossholo.active = true


        let diamondIcon = cc.find('icon', this.diamondWarp);
        let diamondIconWord = diamondIcon.parent.convertToWorldSpaceAR(diamondIcon.position);
        let targetRoot = this.crossWrap.convertToNodeSpaceAR(diamondIconWord);

        // this.crossholo.opacity=100
        cc.tween(this.crossholo)
            .to(.4, { opacity: 255, angle: 120 })
            .to(.1, { opacity: 0 })
            .call(() => {
                this.crossholo.active = false
                cc.tween(this.crossDiamond)
                    .to(0.4, { scale: 1.3 })
                    .to(1, { position: cc.v2(targetRoot.x, targetRoot.y) })
                    .to(0.2, { opacity: 0, scale: 0.4 })
                    .call(() => {
                        this.crossPartComp.active = false
                        this.crossDiamond.setPosition(cc.v2(0, 0))
                        this.crossDiamond.opacity = 255
                        this.crossDiamond.setScale(1)
                        this.crossholo.active = true
                        this.count = this.count + 1
                        this.currentCount.string = this.count
                    })
                    .start()
            })
            .start()






    },
    //调用完成接口
    doComplate() {
        if (CACHE.hard_level === 4) {
            this.doCrossComplate()
            return false
        }
        let star = 1;
        switch (CACHE.hard_level) {
            case LEVEL.EASY:
                star = 1;
                break;
            case LEVEL.NORMAL:
                star = 2;
                break;
            case LEVEL.HARD_WITHOUT_ROTATION:
                star = 3;
                break;
            case LEVEL.HARD:
                star = 4;
                break;
        }
        const data = {
            hurdleId: CACHE.chapterData.hurdleId,
            star
        }
        Api.missionComplete(data, (res => {
            if (res.code === 0) {
                setTimeout(() => {
                    cc.find("sound").getComponent("sound").gameSuccess()
                    setTimeout(() => {
                        cc.find("sound").getComponent("sound").gameSettlement()
                    }, 3000)
                    setTimeout(() => {
                        this.showAward(res.data.list, star);
                    }, 1500)
                }, 0)
            } else {
                Toast.show(res.meeage)
            }
        }))
    },

    doCrossComplate() {
        Api.reward_complete((res => {
            if (res.code === 0) {
                setTimeout(() => {
                    this.crossBorder.active = false
                    cc.find("sound").getComponent("sound").gameSuccess()
                    setTimeout(() => {
                        cc.find("sound").getComponent("sound").gameSettlement()
                    }, 3000)
                    setTimeout(() => {
                        this.showCrossAward(res.data.list[0]);
                    }, 1000)
                }, 0)
            } else {
                Toast.show(res.meeage)
            }
        }))
    },

    //显示奖励弹窗
    showAward(item, leavel) {
        let header = cc.instantiate(this.header);
        let headerObj = header.getComponent('header_warp_index');
        header.parent = cc.find('Canvas');;
        header.zIndex = 10;
        headerObj.initShowScene();
        headerObj.renderShowScene();

        let game_award = cc.instantiate(this.game_award);
        game_award.parent = this.root_warp;
        let obj = game_award.getComponent('gameAward');
        obj.init(item, leavel)
        if (this._guideShowAwardCallback) {
            //新手引导使用的callback,用来判断奖励弹窗是否出现
            this._guideShowAwardCallback();
        }

    },

    showCrossAward(item) {
        let header = cc.instantiate(this.header);
        let headerObj = header.getComponent('header_warp_index');
        header.parent = cc.find('Canvas');;
        header.zIndex = 10;
        headerObj.initShowScene();
        headerObj.renderShowScene();

        let game_award = cc.instantiate(this.cross_game_award);
        game_award.parent = this.root_warp;
        let obj = game_award.getComponent('crossGameAward');
        obj.init(item)
        if (this._guideShowAwardCallback) {
            //新手引导使用的callback,用来判断奖励弹窗是否出现
            this._guideShowAwardCallback();
        }
    },
    crossShare() {

    },

    //显示分享弹窗
    showShare() {
        let header = cc.find('Canvas/headerWarp')
        header.destroy();

        const shareList = [this.game_share1, this.game_share2, this.game_share3, this.game_share3, this.game_share3]
        let game_share = cc.instantiate(shareList[CACHE.hard_level]);
        game_share.parent = this.root_warp;
        game_share.name = 'game_share'
        let obj = game_share.getComponent('share');
        // obj.init(item, leavel + 1)

        if (this._guideShowShareCallback) {
            //新手引导使用的callback,用来判断分享弹窗是否出现并展示引导手势
            this._guideShowShareCallback();
        }
    },

    gameFail() {
        if (this._guideGameRebornCallback) {
            this._guideGameRebornCallback();
        }
        cc.find("sound").getComponent("sound").gameFail()

        let game_fail = cc.instantiate(this.game_fail);
        game_fail.parent = this.root_warp;
    },

    //倒计时
    timer(time) {
        this.countDownTimer = setTimeout(() => {
            if (!GAME_CACHE.pause && GAME_CACHE.coutnDown > 0 && !GAME_CACHE.isComplate) {
                time--;
                this.countDown_label.string = this.formatTimer(time);
                GAME_CACHE.coutnDown = time
                this.timer(time);
            } else if (!GAME_CACHE.pause && time == 0 && !GAME_CACHE.isComplate) {
                // Toast.show("倒计时结束", 1000);
                this.gameFail()
            }
            else if (GAME_CACHE.isComplate) {
                GAME_CACHE.coutnDown = 60;
                GAME_CACHE.isComplate = false;
                GAME_CACHE.pause = false;
            } else {

            }
        }, 1000)
    },

    highlightGuidePices() {
        const hardLeavelSore = TYPES;
        const hardLevel = CACHE.hard_level
        const x = hardLeavelSore[hardLevel][0] - 1
        let borderNode = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${x}`);
        let borderObj = borderNode.getComponent('itembg_index');
        if (borderObj) {
            borderObj.borderAnimate();
        }
    },

    //复活
    revive() {
        if (this._guideGameRebornCallback) {
            this._guideGameRebornCallback()
        }
        GAME_CACHE.coutnDown = GAME_CACHE.gameTime
        this.timer(GAME_CACHE.coutnDown)

    },
    onDestroy() {
        if (this.countDownTimer) {
            clearTimeout(this.countDownTimer)
        }
    },
    resetUI() {
        this.resetUiMagnet()
        this.resetUiFrame()
        this.resetUiShow()
    },

    resetUiMagnet() {
        const userData = CACHE.userData

        const tiemNode = cc.find('sortTimes', this.magnet)
        const num = cc.find('time', tiemNode).getComponent(cc.Label)
        const adNode = cc.find('free', this.magnet)
        const currentNum = userData.strongMagnet > 99 ? '99' : userData.strongMagnet
        num.string = currentNum
        setTimeout(() => {
            if (userData.strongMagnet > 0) {
                tiemNode.active = true
                adNode.active = false
            } else {
                tiemNode.active = false
                num.active = false
                adNode.active = true
            }
        }, 200)

    },

    resetUiFrame() {
        const userData = CACHE.userData

        const tiemNode = cc.find('sortTimes', this.sort)
        const num = cc.find('time', tiemNode).getComponent(cc.Label)
        const adNode = cc.find('free', this.sort)
        const currentNum = userData.frame > 99 ? '99' : userData.frame
        num.string = currentNum
        setTimeout(() => {
            if (userData.frame > 0) {
                tiemNode.active = true
                adNode.active = false
            } else {
                tiemNode.active = false
                num.active = false
                adNode.active = true
            }
        }, 200)

    },

    //更新眼睛道具
    resetUiShow() {
        const userData = CACHE.userData

        let tiemNode = cc.find('sortTimes', this.viewIcon)
        let num = cc.find('time', tiemNode).getComponent(cc.Label)
        let adNode = cc.find('free', this.viewIcon)
        let currentNum = userData.showProp > 99 ? '99' : userData.showProp
        num.string = currentNum
        setTimeout(() => {
            if (userData.showProp > 0) {
                tiemNode.active = true
                num.active = true
                adNode.active = false
            } else {
                tiemNode.active = false
                num.active = false
                adNode.active = true
            }
        }, 200)
    },


    //从底部拼图框中移除拼图块
    removeSpliceNode(removeIndex) {
        var currentArr = [...GAME_CACHE.spliceArr]
        currentArr.map((item, index) => {
            if (item[6] == removeIndex) {
                currentArr.splice(index, 1)
            }
        })
        GAME_CACHE.spliceArr = currentArr;
    },

    formatTimer(time) {
        if (time >= 60 * 60 * 10) {
            return `${parseInt(time / 60 * 60)}:${parseInt((time - 60 * 60) / 60)}:${time % 60}`;
        }
        else if (time >= 60 * 60) {
            return `0${parseInt(time / 60 * 60)}:${parseInt((time - 60 * 60) / 60)}:${time % 60}`;
        }
        else if (60 * 60 > time && time > 60) {
            return `${parseInt(time / 60)}:${time % 60}`;
        } else if (time >= 10) {
            return `00:${time}`;
        } else {
            return `00:0${time}`;
        }
    },
    show_help() {
        let helpWarp = cc.instantiate(this.helPdig);
        var warp_parent = cc.find(`Canvas`)
        helpWarp.parent = warp_parent
    },

});
