import { MASK_RESOUSE, LEVEL } from '../global/piece_index';

cc.Class({
    extends: cc.Component,

    properties: {
        label_num: cc.Label,
        sp_item: cc.Sprite,
        mask_item: cc.Mask,
        splice_item: cc.Node,
        isMove: cc.boolean
    },

    init(num) {
        this.num = num;
        this.label_num.string = this.num;
    },

    setSpItem(spt) {
        this.sp_item.spriteFrame = spt;
    },

    setMarsk(index, hardLevel) {
        const self = this;
        var urls = MASK_RESOUSE[hardLevel];
        /*理论上来说，加载地图块时，由于负责遮挡的背景片已经加载完毕，因此资源不需要再次进行加载，直接使用即可*/
        cc.loader.loadRes(urls[index], cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            self.mask_item.spriteFrame = assets;
        });
    },

    setTouch(hardLevel) {
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            const current_node = this.item_node || this.splice_item;
            current_node.zIndex = 100;//拿起增加z-index
            current_node.setPropagateTouchEvents = false;
            event.stopPropagation();
        })

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.isMove = true;
            let delta = event.touch.getDelta();
            const outList = this.item_node.parent.name === 'puzzleBg';
            let newPositin = cc.v2(this.item_node.x + delta.x, this.item_node.y + delta.y);
            if (!outList && this.item_node.y + delta.y > 90) {
                /*移除范围内修改父级节点*/
                var puzzleBg = cc.find(`Canvas/root/puzzleWarp/puzzleBg`);
                this.item_node.parent = puzzleBg;
                this.item_node.setScale(4);
                const resetPostion = cc.v2(this.item_node.x + delta.x, this.item_node.y + delta.y - 540);
                this.item_node.setPosition(resetPostion);
            }
            //todo:移回盒子代码
            else if (outList && this.item_node.y + delta.y < -428.5) {
                var spliceWarp = cc.find(`Canvas/root/spliceWarp`)
                this.item_node.parent = spliceWarp
                this.item_node.setScale(1)
                const resetPostion = cc.v2(this.item_node.x + delta.x, this.item_node.y + delta.y + 540)
                this.item_node.setPosition(resetPostion);
            }
            else {
                this.item_node.setPosition(newPositin);

            }
            event.stopPropagation();
        })

        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (hardLevel == LEVEL.HARD && !this.isMove) {
                this.item_node.rotation = (this.item_node.rotation + 90) % 360;
            }
            let delta = event.touch.getDelta();
            this.calPostion(this.item_node.x + delta.x, this.item_node.y + delta.y, this.item_node.rotation);
            this.item_node.zIndex = 100;//恢复z-index
            this.isMove = false;
            event.stopPropagation();
        })
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
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${this.item_node.defaultIndex + 1}`);
            item_puzzle_warp.active = false;
            var item_puzzle_splice = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_splice-${this.item_node.defaultIndex + 1}`);
            item_puzzle_splice.active = false;
        }
    },

    setRandomRotation(hardLevel) {
        if (hardLevel == LEVEL.HARD) {
            let randomNum = Math.floor(4 * Math.random()) * 90;
            this.item_node.rotation = randomNum;
        }
    }

});
