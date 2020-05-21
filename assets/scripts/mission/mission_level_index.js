import { LEVEL } from '../global/piece_index';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        pic: cc.Sprite,
        starOne: cc.Sprite,
        starTwo: cc.Sprite,
        starThree: cc.Sprite,
        title: cc.Label,
        backBtn: cc.Sprite,
        hardBtnOne: cc.Prefab,
        btnObj: cc.Array,
        root: cc.Node,
        startBtn: cc.Sprite
    },

    setback() {
        this.backBtn.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });

        this.backBtn.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.isMove = true;
            event.stopPropagation();
        });

        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (!this.isMove) {
                if (this.item_node) {
                    this.item_node.active = false;
                }
            }
            this.isMove = false;
            event.stopPropagation();
        });
    },

    hardBtnClickCallback(hardLevel) {
        if (this.btnObj) {
            this.btnObj.forEach(item => {
                if (item._hardLevel !== hardLevel) {
                    item.setUnclick();
                }
            });
        }
        CACHE.hard_level = hardLevel
    },

    setBtn() {
        let index = 0;
        this.btnObj = [];
        for (let key in LEVEL) {
            let hard = LEVEL[key];
            let hardBtn = cc.instantiate(this.hardBtnOne);
            hardBtn.parent = this.root;
            hardBtn.setPosition(0, 80 - (index * 80));
            let obj = hardBtn.getComponent('hard_btn');
            obj._hardLevel = hard;
            obj.initWithHard(hard, (hardLevel) => this.hardBtnClickCallback(hardLevel));
            this.btnObj.push(obj)
            index++;
        }
    },

    initWithItem(item) {
        this.title.string = item.hurdleName;
        cc.loader.load({ url: item.logoUrl, type: 'png' }, (err, texture) => {
            if (err) cc.error(err);
            this.pic.spriteFrame = new cc.SpriteFrame(texture);
        });
        cc.loader.loadResArray(['mission/xingxing', 'mission/xingxingdi'], cc.SpriteFrame, (err, assets) => {
            if (err) cc.error(err);
            this.starOne.spriteFrame = assets[1];
            this.starTwo.spriteFrame = assets[1];
            this.starThree.spriteFrame = assets[1];
            switch (item.star) {
                case 1:
                    this.starOne.spriteFrame = assets[0];
                    break;
                case 2:
                    this.starOne.spriteFrame = assets[0];
                    this.starTwo.spriteFrame = assets[0];
                    break;
                case 3:
                    this.starOne.spriteFrame = assets[0];
                    this.starTwo.spriteFrame = assets[0];
                    this.starThree.spriteFrame = assets[0];
                    break;
                default:
                    break;
            }

        });
        this.setback();
        if (!this.btnObj) {
            this.setBtn();
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
    },

    // update (dt) {},
});
