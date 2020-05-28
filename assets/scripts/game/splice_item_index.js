import {
    MASK_RESOUSE,
    LEVEL,
    SCALELEAVEL,
    underwayIndex,
    spliceArr,
    GAME_CACH,
    PUZZLE_FOOTER,
    PUZZLE_SCENE,
} from '../global/piece_index';
import { initItem } from './initSplice';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        label_num: cc.Label,
        sp_item: cc.Sprite,
        mask_item: cc.Mask,
        splice_item: cc.Node,
        isMove: cc.boolean,

        pre_item: cc.Prefab,

    },

    init(num) {
        this.num = num;
        this.label_num.string = this.num;
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    },

    setSpItem(spt) {
        this.sp_item.spriteFrame = spt;
    },

    setMarsk(index, hardLevel) {
        const self = this;
        var urls = MASK_RESOUSE[hardLevel];
        cc.loader.loadRes(urls[index], cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            self.mask_item.spriteFrame = assets;
        });
    },

    setTouch(hardLevel) {
        /* 初始化node Y轴偏移量（因为现在node在底部栏不可滑动,使用偏移量记录是否达到拖出底部栏的标准）*/
        this.item_node._offsetY = 0;

        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            /*拿起增加z-index*/
            const current_node = this.item_node || this.splice_item;
            current_node.zIndex = 100;
            /*
            不禁止事件传递,让底部栏可以滑动，提升体验
            current_node.setPropagateTouchEvents = false;
            event.stopPropagation();
            */
        })

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.isMove = true;
            let delta = event.touch.getDelta();
            const outList = this.item_node.parent.name === 'puzzleBg';
            let newPositin = cc.v2(this.item_node.x + delta.x, this.item_node.y + delta.y);
            //在拼图盒子内移动
            if (!outList && this.item_node._offsetY + delta.y < 90) {
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
                this.item_node.parent = puzzleBg;
                /*依据计算拼底部栏坐标计算其在拼图区域的坐标*/
                let bgX = Math.ceil(this.item_node.x - (PUZZLE_FOOTER.position[0] - PUZZLE_FOOTER.truePosition[0])) - PUZZLE_SCENE.width / 2;
                const resetPostion = cc.v2(bgX, this.item_node.y + delta.y - 540 + 180);
                this.item_node.setPosition(resetPostion);
                underwayIndex.push(this.item_node.defaultIndex);
                this.removeSpliceNode(this.item_node.defaultIndex);
                cc.tween(this.item_node)
                    .to(0.2, { scale: 1 / SCALELEAVEL[hardLevel] })
                    .start();
                //重新排列底部块的位置
                let game_bg = cc.find('Canvas/root/puzzleWarp/puzzleBg');
                if (game_bg) {
                    initItem(spliceArr, CACHE.hard_level, 2, this.pre_item, game_bg, new cc.SpriteFrame(), true, true);
                }
            }
            /*移回盒子*/
            else if (outList && this.item_node.y + delta.y < -428.5) {
                var spliceWarp = cc.find(`Canvas/root/spliceWarp`)
                this.item_node.parent = spliceWarp
                this.item_node.setScale(1)
                const resetPostion = cc.v2(this.item_node.x + delta.x, 0)
                this.item_node.setPosition(resetPostion);
                underwayIndex.remove(this.item_node.defaultIndex)
            }
            else {
                this.item_node.setPosition(newPositin);
            }
            /*
            不禁止事件传递,让底部栏可以滑动，提升体验
            event.stopPropagation();
            */
        })

        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (this.isMove) {
                this.item_node._offsetY = 0;
            }
            if (hardLevel == LEVEL.HARD && !this.isMove) {
                this.item_node.angle = (this.item_node.angle - 90) % 360;
            }
            let delta = event.touch.getDelta();
            this.calPostion(this.item_node.x + delta.x, this.item_node.y + delta.y, this.item_node.angle);
            this.item_node.zIndex = 100;//恢复z-index
            this.isMove = false;
            /*
            不禁止事件传递,让底部栏可以滑动，提升体验
            event.stopPropagation();
            */
        })
    },

    removeSpliceNode(removeIndex) {
        var currentArr = [...spliceArr[0]]
        currentArr.map((item, index) => {
            if (item[6] == removeIndex) {
                currentArr.splice(index, 1)
            }
        })
        spliceArr[0] = currentArr

    },

    /*计算中心点距离*/
    calPostion(x, y, rotation) {
        const adsorbPosition = 80;
        const defaultPostion = this.item_node.defaultPostion;
        const defaultx = defaultPostion[0];
        const defaulty = defaultPostion[1];
        const distance = (defaultx - x) * (defaultx - x) + (defaulty - y) * (defaulty - y);
        if (distance <= adsorbPosition * adsorbPosition && rotation == 0) {
            let newPositin = cc.v2(defaultx, defaulty);
            this.item_node.setPosition(newPositin);
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${this.item_node.defaultIndex}`);
            item_puzzle_warp.active = false;
            var item_puzzle_splice = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_splice-${this.item_node.defaultIndex}`);
            item_puzzle_splice.active = false;
            GAME_CACH.complateIndex.push(this.item_node.defaultIndex)
            underwayIndex.remove(this.item_node.defaultIndex)
            this.checkSuccess()
            setTimeout(() => { item_puzzle_warp.destroy(); item_puzzle_splice.destroy() }, 100)
        }
    },

    checkSuccess() {
        const contralObj = cc.find(`Canvas/root/menuWarp`).getComponent('conraol')
        contralObj.checkComplate()
    },

    setRandomRotation(hardLevel) {
        if (hardLevel == LEVEL.HARD) {
            let randomNum = Math.floor(4 * Math.random()) * 90;
            this.item_node.angle = randomNum;
        }
    }

});
