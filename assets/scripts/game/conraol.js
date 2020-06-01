import { SIZES, SCALELEAVEL, underwayIndex, spliceArr } from '../global/piece_index';
import { CACHE } from '../global/usual_cache';
import { GAME_CACH } from '../global/piece_index';

import { initItem } from './initSplice';
import GLOBAL_VAR from '../global/index'
import Api from '../api/api_index'
import Action from '../api/api_action'

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
        game_share: cc.Prefab,
        game_fail: cc.Prefab,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setTouch();
        this.resetUI()
        GAME_CACH.isComplate = false
        GAME_CACH.coutnDown=GAME_CACH.gameTime
        this.timer(GAME_CACH.coutnDown);
    },

    start() {

    },

    handleClidkMagnet() {
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
            Toast.show('余额不足，观看广告')
        }
    },

    doMagnet() {
        if (this.checkComplate()) {
            return false
        }

        if (underwayIndex && underwayIndex.length) {
            //磁铁吸引在拼图中的块
            const index = underwayIndex[0]
            var currentNode = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_splice-${index}`)
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${index}`);
            /*动画*/
            cc.tween(currentNode)
                .to(.4, { position: cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1]) })
                .start()
            GAME_CACH.complateIndex.push(index)
            underwayIndex.remove(index)
            setTimeout(() => {
                currentNode.destroy()
                item_puzzle_warp.destroy()
                console.log('dddddd');
               // initItem(spliceArr, CACHE.hard_level, 2, this.pre_item, this.game_bg, new cc.SpriteFrame(), true, true);
                this.checkComplate()
            }, 400)

        } else {
            //磁铁吸引在底部框内的切块
            var spliceWarp = cc.find(`Canvas/root/spliceWarp`);
            const spliceWarpChildren = spliceWarp.children[0];
            const currentNode = spliceWarpChildren;
            var puzzleBg = cc.find(`Canvas/root/puzzleWarp/puzzleBg`);
            currentNode.parent = puzzleBg;
            currentNode.zIndex = 100;
            let newPositin = cc.v2(0, -540);
            currentNode.setPosition(newPositin);
            currentNode.zIndex = 1000;
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${currentNode.defaultIndex}`);

            cc.tween(currentNode)
                .to(.4, { position: cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1]), scale: 1 / SCALELEAVEL[CACHE.hard_level], angle: 0 })
                .start()

            const index = currentNode.defaultIndex;
            GAME_CACH.complateIndex.push(index);
            this.removeSpliceNode(index)
            // underwayIndex.remove(index);
            console.log('xxxx');
           initItem(spliceArr, CACHE.hard_level, 2, this.pre_item, this.game_bg, new cc.SpriteFrame(), true, true);
            setTimeout(() => {
                currentNode.destroy();
                item_puzzle_warp.destroy();
                this.checkComplate();
            }, 400)
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
        initItem(spliceArr, CACHE.hard_level, 1, this.pre_item, this.game_bg, this.spframe_puzzle, true);
    },

    gamePause() {
        let pauseWarp = cc.instantiate(this.pause);
        GLOBAL_VAR.pause = true;
        pauseWarp.parent = this.game_root;
        pauseWarp.setPosition(0, 0);
    },

    updateUserInfo() {
        Action.User.BalanceUpdate(this.resetUI())
    },

    userProp(data, callBack) {
        const that = this;
        Api.use_prop(data, (res) => {
            if (res.code === 0) {
                that.resetUI()
                callBack && callBack()
            }
        });
    },

    setTouch() {
        this.magnet.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleClidkMagnet()
            event.stopPropagation();
        })
        this.sort.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleClickSort()
            event.stopPropagation();
        })
        this.pauseBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.gamePause()
            event.stopPropagation();
        })
    },

    //判断完成，并调用完成动画
    checkComplate() {
        if (SIZES[CACHE.hard_level].length == GAME_CACH.complateIndex.length) {
            Toast.show("拼图完成", 1000);
            this.doComplate()
            GAME_CACH.complateIndex = []
            GAME_CACH.isComplate = true
            const spliceWarp_node = cc.find(`Canvas/root/spliceWarp`);
            spliceWarp_node.active = false;
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
                    this.showAward(res.data.list, CACHE.hard_level + 1)
                }, 1000)
            } else {
                Toast.show(res.meeage)
            }
        }))
    },

    //显示奖励弹窗
    showAward(item, leavel) {
        let game_award = cc.instantiate(this.game_award);
        game_award.parent = this.root_warp;
        let obj = game_award.getComponent('gameAward');
        obj.init(item, leavel)

        setTimeout(() => {
            game_award.destroy()
            this.showShare()
        }, 1500)

    },

    //显示分享弹窗
    showShare(item, leavel) {
        let game_share = cc.instantiate(this.game_share);
        game_share.parent = this.root_warp;
        let obj = game_share.getComponent('share');
        obj.init(item, leavel)

    },

    gameFail() {
        let game_fail = cc.instantiate(this.game_fail);
        game_fail.parent = this.root_warp;
    },

    //倒计时
    timer(time) {
        this.countDownTimer = setTimeout(() => {
            if (!GAME_CACH.pause && GAME_CACH.coutnDown > 0 && !GAME_CACH.isComplate) {
                time--;
                this.countDown_label.string = this.formatTimer(time);
                GAME_CACH.coutnDown = time
                this.timer(time);
            } else if (!GAME_CACH.pause && time == 0 && !GAME_CACH.isComplate) {
                // Toast.show("倒计时结束", 1000);
                this.gameFail()
            }
            else if (GAME_CACH.isComplate) {
                GAME_CACH.coutnDown = 60;
                GAME_CACH.isComplate = false;
                GAME_CACH.pause = false;
            } else {

            }
        }, 1000)
    },

    //复活
    revive() {
        GAME_CACH.coutnDown=GAME_CACH.gameTime
        this.timer(GAME_CACH.coutnDown)

    },
    onDestroy() {
        if (this.countDownTimer) {
            clearTimeout(this.countDownTimer)
        }
    },
    resetUI() {
        const userData = CACHE.userData
        this.magnet_label.string = userData.strongMagnet>99?'99+':userData.strongMagnet
        if (userData.frame > 0) {
            this.sort_tiem.active = true
            this.ad_free.active = false
            this.sort_label.string = userData.frame>99?'99+':userData.frame
        } else if (userData.frame === 0) {
            this.sort_tiem.active = false
            this.ad_free.active = true
            this.sort_label.string = userData.frame>99?'99+':userData.frame
        }
    },

    //从底部拼图框中移除拼图块
    removeSpliceNode(removeIndex) {
        var currentArr = [...spliceArr[0]]
        currentArr.map((item, index) => {
            if (item[6] == removeIndex) {
                currentArr.splice(index, 1)
            }
        })
        spliceArr[0] = currentArr;
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
