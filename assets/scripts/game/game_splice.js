import { SIZES, PUZZLE_SCENE, PUZZLE_FOOTER } from '../global/piece_index';
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
        /*初始化底部栏位置记录*/
        PUZZLE_FOOTER.truePosition = [...PUZZLE_FOOTER.position];
        /* 设置底部栏的水平滑动*/
        this.game_bg.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            if (this.game_bg) {
                let delta = event.touch.getDelta();
                if ((this.game_bg.x + delta.x <= PUZZLE_FOOTER.position[0]) && (this.game_bg.x + delta.x >= PUZZLE_SCENE.width / 2 - this.game_bg.width)) {
                    let newPositin = cc.v2(this.game_bg.x + delta.x, this.game_bg.y)
                    PUZZLE_FOOTER.truePosition = [this.game_bg.x + delta.x, this.game_bg.y]
                    this.game_bg.setPosition(newPositin);
                }
            }
        });

        /*动态加载资源*/
        cc.loader.load({ url: imagePath, type: 'png' }, (err, texture) => {
            if (texture) {
                this.spframe_puzzle = new cc.SpriteFrame(texture);
                /*初始化所有的块*/
                initItem(SIZES, hardLevel, 0, this.pre_item, this.game_bg, this.spframe_puzzle,true)

            } else {
                cc.error(err);
            }
        });

    },


    fallAnimation(){

    },

  