import { SIZES } from '../global/piece_index';

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
            this.initItem(0);
            //self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
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
        cc.loader.loadRes(imagePath, cc.SpriteFrame, (err, spriteFrame) => {
            if (spriteFrame) {
                this.spframe_puzzle = spriteFrame;
                /*初始化所有的块*/
                this.initItem(hardLevel);
            } else {
                cc.error(err);
            }
        });

    },

    initItem(hardLevel) {
        /*根据难度取对应切片数据*/
        let sizeArr = SIZES[hardLevel];
        //遍历size根据size生成item
        sizeArr.forEach((item, index) => {
            let item_node = cc.instantiate(this.pre_item);

            item_node.width = item[2] * 0.25;
            item_node.height = item[3] * 0.25;
            item_node.name = `item_puzzle_splice-${index + 1}`
            item_node.defaultIndex = `${index + 1}`
            item_node.defaultPostion = [item[4], item[5]]
            item_node.defaultIndex = index
            item_node.getChildByName('item_puzzle').width = item[2] * .25;
            item_node.getChildByName('item_puzzle').height = item[3] * .25;
            item_node.parent = this.game_bg;
            //应该要根据规格进行优化
            let position = cc.v2(-344 + (140 * index) + 20, 0);
            item_node.setPosition(position);

            let obj = item_node.getComponent('splice_item_index');
            if (obj) {
                /*保存引用*/
                obj.item_node = item_node;
                //设置切片编号，便于测试
                obj.init(index);
                /*底图切片*/
                obj.setSpItem(this.defaultRect(item));
                /*添加蒙版*/
                obj.setMarsk(index, hardLevel);
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
});
