import { SIZES, SCALELEAVEL, spliceArr } from '../global/piece_index';
import { initItem } from './initSplice';


cc.Class({
    extends: cc.Component,

    properties: {
        game_bg: cc.Node,
        pre_item: cc.Prefab,
        spframe_puzzle: cc.SpriteFrame,
    },

    loadingPic() {
        cc.loader.loadRes("background/haixianbg", cc.SpriteFrame, (err, spriteFrame) => {
            this.spframe_puzzle = spriteFrame;
        });
    },

    init(hardLevel, imagePath) {
        /* 设置底部栏的水平滑动*/
        this.game_bg.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            if (this.game_bg) {
                let delta = event.touch.getDelta();
                if ((this.game_bg.x + delta.x < this.game_bg.width - 322) && (this.game_bg.x + delta.x > 322 - this.game_bg.width)) {
                    let newPositin = cc.v2(this.game_bg.x + delta.x, this.game_bg.y)
                    this.game_bg.setPosition(newPositin);
                }
            }
        });

        /*动态加载资源*/
        cc.loader.load({ url: imagePath, type: 'png' }, (err, texture) => {
            if (texture) {
                this.spframe_puzzle = new cc.SpriteFrame(texture);
                /*初始化所有的块*/
                initItem(SIZES, hardLevel, 0, this.pre_item, this.game_bg, this.spframe_puzzle)

            } else {
                cc.error(err);
            }
        });

    },

    initItem(hardLevel) {
        /*根据难度取对应切片数据*/
        let sizeArr = SIZES[hardLevel];
        const scalLeavel = SCALELEAVEL[hardLevel];
        /*拼图块排序*/
        const reSortSizeArr = this.orderByBorder(sizeArr, hardLevel);
        /*遍历size根据size生成item*/
        reSortSizeArr.forEach((item, index) => {
            let item_node = cc.instantiate(this.pre_item);
            item_node.width = item[2] * scalLeavel;
            item_node.height = item[3] * scalLeavel;
            item_node.name = `item_puzzle_splice-${item[6]}`;
            item_node.defaultIndex = `${item[6]}`;
            item_node.defaultPostion = [item[4], item[5]];
            item_node.getChildByName('item_puzzle').width = item[2] * scalLeavel;
            item_node.getChildByName('item_puzzle').height = item[3] * scalLeavel;
            item_node.parent = this.game_bg;
            let position = cc.v2((140 * index) + 20, 0);
            item_node.setPosition(position);

            let obj = item_node.getComponent('splice_item_index');
            if (obj) {
                /*保存引用*/
                obj.item_node = item_node;
                //设置切片编号，便于测试
                obj.init(item[6]);
                /*底图切片*/
                obj.setSpItem(this.defaultRect(item));
                /*添加蒙版*/
                obj.setMarsk(item[6], hardLevel);
                /*拖拽手势+高难度下的旋转手势*/
                obj.setTouch(hardLevel);
                /*设置随机旋转*/
                obj.setRandomRotation(hardLevel);
            }
        });
    },


    defaultRect(item) {
        let rect = new cc.Rect(item[0], item[1], item[2], item[3]);
        let spframe_puzzle_clone = this.spframe_puzzle.clone();
        spframe_puzzle_clone.setRect(rect);
        return spframe_puzzle_clone
    },

    /*随机打乱*/
    orderByRandom(arr) {
        return arr.sort(function () {
            return .5 - Math.random();
        });
    },

    /*边框排序*/
    orderByBorder(arr, hardLevel) {
        const hardLeavelSore = [[2, 3], [4, 6], [6, 8]];
        const x = hardLeavelSore[hardLevel][0];
        const y = hardLeavelSore[hardLevel][1];
        const arryIndex = [];
        this.orderByRandom(arr).map((item, index) => {
            const i = item[6] + 1
            if (i <= x || i % x == 1 || i % x == 0 || i >= x * (y - 1)) {
                item[7] = item[6]
            } else {
                item[7] = 100
            }
            arryIndex.push(item)
        });

        return arryIndex.sort(function (firstEl, secondEl) {
            return firstEl[7] - secondEl[7]

        });
    },



});
