import { LEVEL } from '../global/piece_index';
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index'

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
        startBtn: cc.Sprite,
        mask: cc.Sprite,
        energy: cc.Node,
        canNext: {
            type: Boolean,
            default: false
        }
    },

    setStartWithHard(hardLevel) {
        cc.loader.loadResArray(['mission/xingxing', 'mission/xingxingdi'], cc.SpriteFrame, (err, assets) => {
            if (err) cc.error(err);
            this.starOne.spriteFrame = assets[1];
            this.starTwo.spriteFrame = assets[1];
            this.starThree.spriteFrame = assets[1];
            switch (hardLevel) {
                case LEVEL.EASY:
                    this.starOne.spriteFrame = assets[0];
                    break;
                case LEVEL.NORMAL:
                    this.starOne.spriteFrame = assets[0];
                    this.starTwo.spriteFrame = assets[0];
                    break;
                case LEVEL.HARD:
                    this.starOne.spriteFrame = assets[0];
                    this.starTwo.spriteFrame = assets[0];
                    this.starThree.spriteFrame = assets[0];
                    break;
                default:
                    break;
            }

        });
    },

    setback() {
        this.backBtn.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });

        this.backBtn.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });

        this.backBtn.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            if (this.item_node) {
                this.item_node.active = false;
            }
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
            obj.initWithHard(hard, (hardLevel) => {
                this.setStartWithHard(hardLevel)
                this.hardBtnClickCallback(hardLevel);
            });
            this.btnObj.push(obj)
            index++;
        }
    },

    setStartBtn() {
        /*返回按钮事件绑定 */
        this.startBtn.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.startBtn.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.startBtn.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            event.stopPropagation();
            if (!isNaN(CACHE.hard_level)) {
                this.handleTravel()//调用拼图
            }
        });
    },

    setMask() {
        /*屏蔽点击事件 */
        this.mask.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.mask.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.mask.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        });
    },

    handleTravel() {
        this.canNext = false
        cc.tween(this.energy)
            .to(0.5, { position: cc.v2(-81.357, 11.623), opacity: 255, scale: 1 }, { easing: 'cubicOut' })
            .call(() => {
                this.redirectPuzzle()
            })
            .start()
        Api.travel((res) => {
            if (res.code === 0) {
                this.redirectPuzzle()
            } else {
                Toast.show(res.message)
            }
        })
    },

    //导航到拼图，接口请求和动画完成后执行
    redirectPuzzle() {
        if (this.canNext) {
            cc.director.loadScene("puzzle");
        } else {
            this.canNext = true
        }
    },

    initWithItem(item) {
        this.title.string = item.hurdleName;
        cc.loader.load({ url: item.logoUrl, type: 'png' }, (err, texture) => {
            if (err) cc.error(err);
            this.pic.spriteFrame = new cc.SpriteFrame(texture);
            this.pic.node.scaleX = 0.35;
            this.pic.node.scaleY = 0.35;

        });
        this.setStartWithHard(isNaN(CACHE.hard_level) ? -1 : CACHE.hard_level);
        this.setback();
        this.setMask();
        if (!this.btnObj) {
            this.setBtn();
            this.setStartBtn();
        }
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
    },

    // update (dt) {},
});
