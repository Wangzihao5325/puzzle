import { SIZES, SCALELEAVEL, underwayIndex, spliceArr } from '../global/piece_index';
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

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
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

    },



    start() {
        // this.showAward([], CACHE.hard_level + 1)

    },

    handleClidkMagnet() {
        console.log("handleClidkMagnet")
        if (this.checkComplate()) {
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
        if (this.checkComplate()) {
            return false
        }

        if (GAME_CACHE.underwayIndex && GAME_CACHE.underwayIndex.length) {
            //磁铁吸引在拼图中的块
            const index = GAME_CACHE.underwayIndex[0]
            var currentNode = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_splice-${index}`)
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${index}`);
            /*动画*/
            currentNode.zIndex=100;
            cc.tween(currentNode)
                .to(.4, { position: cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1]) })
                .call(() => {
                    currentNode.destroy()
                    item_puzzle_warp.destroy()
                    initItem(GAME_CACHE.spliceArr, CACHE.hard_level, 2, this.pre_item, this.game_bg, new cc.SpriteFrame(), true, true);
                    this.checkComplate()
                })
                .start()
            GAME_CACHE.complateIndex.push(index)
            GAME_CACHE.underwayIndex.remove(index)
        } else {
            //磁铁吸引在底部框内的切块
            var spliceWarp = cc.find(`Canvas/footerWarp/spliceWarp/spliceScrollView/view/content`);
            const spliceWarpChildren = spliceWarp.children[0];
            const currentNode = spliceWarpChildren;
            // var puzzleBg = cc.find(`Canvas`);
            currentNode.parent = cc.find(`Canvas`);;
            currentNode.zIndex = 100;
            let newPositin = cc.v2(0, -540);
            currentNode.setPosition(newPositin);
            currentNode.zIndex = 1000;
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${currentNode.defaultIndex}`);

            cc.tween(currentNode)
                .to(.4, { position: cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1]), scale: 1, angle: 0 })
                .start()

            const index = currentNode.defaultIndex;
            GAME_CACHE.complateIndex.push(index);
            this.removeSpliceNode(index)
            // underwayIndex.remove(index);
            initItem(GAME_CACHE.spliceArr, CACHE.hard_level, 2, this.pre_item, this.game_bg, new cc.SpriteFrame(), true, true);
            setTimeout(() => {
                currentNode.destroy();
                item_puzzle_warp.destroy();
                this.checkComplate();
            }, 400)
        }
        if (GAME_CACHE.complateIndex.length >= SIZES[CACHE.hard_level].length * 0.3 && GAME_CACHE.puzzleAnimation === false) {
            GAME_CACHE.puzzleAnimation = true
            let dragonBonesNode = cc.find('Canvas/root/puzzleWarp/puzzleBg');
            let animate = dragonBonesNode.getComponent(dragonBones.ArmatureDisplay)
            animate.playAnimation(CACHE.dragonBoneAnimateName, 0);
        }

    },

    handleClickSort() {
        if (this.checkComplate()) {
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
            if (this.checkComplate()) {
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

    closeView(){
        if(this.isViewing){
            this.isViewing=false
            this.viewPuaaleImg.active = false
        }
    },

    setTouch() {
        let clidkMagnet = throttle(() => this.handleClidkMagnet(), 600)

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
        this.viewPuaaleImg.on(cc.Node.EventType.TOUCH_END, (event)=>{
            cc.find("sound").getComponent("sound").tap()
            this.closeView()
        })
    },

    //判断完成，并调用完成动画
    checkComplate() {
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
            this.name.color = cc.color(255, 255, 255)
            cc.tween(this.flash)
                .to(.8, { position: cc.v2(485, -550) })
                .start()


            /*动画*/

            return true
        } else {
            return false
        }
    },

    //调用完成接口
    doComplate() {
        const data = {
            hurdleId: CACHE.chapterData.hurdleId,
            star: CACHE.hard_level + 1
        }
        Api.missionComplete(data, (res => {
            if (res.code === 0) {
                setTimeout(() => {

                    cc.find("sound").getComponent("sound").gameSuccess()
                    setTimeout(() => {
                        cc.find("sound").getComponent("sound").gameSettlement()
                    }, 3000)
                    this.showAward(res.data.list, CACHE.hard_level + 1);
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
        setTimeout(() => {
            game_award.destroy();
            header.destroy();
            this.showShare(item, leavel - 1);
        }, 3000)

    },

    //显示分享弹窗
    showShare(item, leavel) {
        const shareList = [this.game_share1, this.game_share2, this.game_share3]
        let game_share = cc.instantiate(shareList[leavel]);
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

});
