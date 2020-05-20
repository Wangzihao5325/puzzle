import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        missionPic: cc.Sprite,
        title: cc.Label,
        starOne: cc.Sprite,
        starTwo: cc.Sprite,
        starThree: cc.Sprite,
        hurdleId: cc.Number
    },

    render(item) {
        this.title.string = item.hurdleName;
        this.hurdleId = item.hurdleId;///*item.logoUrl*/
        cc.loader.load({ url: item.logoUrl, type: 'png' }, (err, texture) => {
            if (err) cc.error(err);
            this.missionPic.spriteFrame = new cc.SpriteFrame(texture);
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
    },

    setTouch(item) {
        this.missionPic.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });

        this.missionPic.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.isMove = true;
            event.stopPropagation();
        });

        this.missionPic.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (!this.isMove) {
                CACHE.mission_press = item;
                cc.director.loadScene("puzzle");
            }
            this.isMove = false;
            event.stopPropagation();
        });
    },

    initWithItem(item) {
        this.render(item);
        this.setTouch(item);
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
