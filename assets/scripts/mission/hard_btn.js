import { LEVEL } from '../global/piece_index';

const TYPE = [
    ['mission/6xuanzhong2', 'mission/6xuanzhong1'],
    ['mission/24xuanzhong2', 'mission/24xuanzhong1'],
    ['mission/48xuanzhuan', 'mission/48xuanzhuan1'],
    ['mission/48xuanzhong2', 'mission/48xuanzhong1'],
];

const TITLE = ['12 块', '24 块', '48块 旋转', '48 块'];

const COLORS = [cc.color(37, 57, 110), cc.color(239, 68, 77), cc.color(104, 120, 94), cc.color(154, 111, 49)];
const DEFAULT_COLOR = cc.color(255, 255, 255);

cc.Class({
    extends: cc.Component,

    properties: {
        mainBg: cc.Sprite,
        arrow: cc.Sprite,
        circle: cc.Sprite,
        label: cc.Label
    },

    setTitle(hardLevel) {
        let title = TITLE[hardLevel];
        this.label.string = title;
    },

    setUnclick() {
        this.circle.node.active = false;
        this.arrow.node.active = false;
        this.label.node.color = DEFAULT_COLOR;
        cc.loader.loadRes('mission/weixuanzhong', cc.SpriteFrame, (err, asset) => {
            if (err) cc.error(err);
            this.mainBg.spriteFrame = asset;
        })
    },

    setClicked(hardLevel, callback) {
        const assetsArr = TYPE[hardLevel];
        cc.loader.loadResArray(assetsArr, cc.SpriteFrame, (err, assets) => {
            if (err) cc.error(err);
            this.mainBg.spriteFrame = assets[0];
            this.arrow.spriteFrame = assets[1];
            this.arrow.node.scale = 0.5;
            this.arrow.node.active = true;
            this.label.node.color = COLORS[hardLevel];
            cc.tween(this.arrow.node)
                .to(0.2, { position: cc.v2(105, 0) })
                .to(0.2, { position: cc.v2(100, 0) })
                .to(0.2, { position: cc.v2(105, 0) })
                .to(0.2, { position: cc.v2(100, 0) })
                .start();
            if (hardLevel == LEVEL.HARD) {
                this.circle.node.active = true;
                this.circle.node.scale = 0.5;
                cc.tween(this.circle.node)
                    .to(0.2, { scale: 0.55 })
                    .to(0.2, { scale: 0.5 })
                    .to(0.2, { scale: 0.55 })
                    .to(0.2, { scale: 0.5 })
                    .start();
            }
            if (callback) {
                callback(hardLevel)
            }
        });
    },

    initWithHard(hardLevel, callback) {
        this.setTitle(hardLevel);
        this.setUnclick();

        this.mainBg.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.mainBg.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.mainBg.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            event.stopPropagation();
            this.setClicked(hardLevel, callback);
        });

        if (hardLevel == LEVEL.EASY) {//设置easy难度为默认难度
            this.setClicked(hardLevel, callback);
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
