import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index';

const Animate_pix = 2;//解锁摇摆幅度
const Animate_pride = 0.1;//解锁动画时间

cc.Class({
    extends: cc.Component,

    properties: {
        root: cc.Node,
        missionPic: cc.Sprite,
        title: cc.Label,
        starOne: cc.Sprite,
        starTwo: cc.Sprite,
        starThree: cc.Sprite,
        hurdleId: cc.Number,

        mask: cc.Node,
        lockTop: cc.Node,
        lockBottom: cc.Node
    },

    unlockedAnimate() {
        cc.tween(this.lockTop)
            .to(Animate_pride, { position: cc.v2(this.lockTop.x + Animate_pix, this.lockTop.y + Animate_pix) })
            .to(Animate_pride, { position: cc.v2(this.lockTop.x - Animate_pix, this.lockTop.y - Animate_pix) })
            .to(Animate_pride, { position: cc.v2(this.lockTop.x + Animate_pix, this.lockTop.y + Animate_pix) })
            .to(Animate_pride, { position: cc.v2(this.lockTop.x - Animate_pix, this.lockTop.y - Animate_pix) })
            .call(() => {
                this.mask.active = false;
                this.lockTop.active = false;
                this.lockBottom.active = false;
            })
            .start()

        cc.tween(this.lockBottom)
            .to(Animate_pride, { position: cc.v2(this.lockBottom.x + Animate_pix, this.lockBottom.y + Animate_pix) })
            .to(Animate_pride, { position: cc.v2(this.lockBottom.x - Animate_pix, this.lockBottom.y - Animate_pix) })
            .to(Animate_pride, { position: cc.v2(this.lockBottom.x + Animate_pix, this.lockBottom.y + Animate_pix) })
            .to(Animate_pride, { position: cc.v2(this.lockBottom.x - Animate_pix, this.lockBottom.y - Animate_pix) })
            .start()

    },

    render(item) {
        this.item_data = item;
        if (item.lock) {
            this.mask.active = true;
            this.lockTop.active = true;
            this.lockBottom.active = true;
        } else {
            if (item.showLock) {
                this.mask.active = false;
                this.lockTop.active = false;
                this.lockBottom.active = false;
            } else {
                this.unlockedAnimate();
                /*将已经触发解锁动画的信息传递给后台*/
                Api.missionLockShow({ hurdleId: item.hurdleId })
            }
        }
        this.title.string = item.hurdleName;
        this.hurdleId = item.hurdleId;
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

    setTouch(item, missionItemClickCallback) {
        this.missionPic.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            cc.tween(this.root)
                .to(0.1, { scale: 0.9 })
                .start();
            event.stopPropagation();
        });

        this.missionPic.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });

        this.missionPic.node.on(cc.Node.EventType.TOUCH_CANCEL, (event) => {
            cc.tween(this.root)
                .to(0.1, { scale: 1 })
                .start();
            event.stopPropagation();
        });

        this.missionPic.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.tween(this.root)
                .to(0.1, { scale: 1 })
                .start();
            if (missionItemClickCallback) {
                if (this.item_data.lock) {

                } else {
                    missionItemClickCallback(item)
                }
            }
            event.stopPropagation();
        });
    },

    initWithItem(item, missionItemClickCallback) {
        this.render(item);
        this.setTouch(item, missionItemClickCallback);
    },

    start() {

    },

});
