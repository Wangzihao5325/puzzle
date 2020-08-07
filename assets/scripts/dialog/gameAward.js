// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CACHE } from '../global/usual_cache';


cc.Class({
    extends: cc.Component,

    properties: {
        awardContent: cc.Node,
        award: cc.Node,
        start1: cc.Node,
        start2: cc.Node,
        start3: cc.Node,
        start4: cc.Node,
        coreStart: cc.SpriteFrame,
        defaultStart: cc.SpriteFrame,
        goods_item: cc.Prefab,
        twinkleWarp: cc.Node,
        goodsCoinWarp: cc.Node,
        goodsItemWarp: cc.Node,
        goodsWarp: cc.Node,
        goodsContent: cc.Node,
        starNum: cc.Label,
        star: cc.Node,
        starWarp: cc.Node,
        starAmount: {
            type: Number,
            default: 0
        },
        doubleBtn: cc.Node,
        noAdBtn: cc.Node,
        awardList: {
            type: cc.Array,
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


    },

    start() {
        this.setTouch()
    },

    setAnimation(leavel, list) {
        this.awardList = list
        //弹窗动画
        this.awardContent.setPosition(cc.v2(0, -800))
        cc.tween(this.awardContent)
            .to(.4, { position: cc.v2(0, 40) }, { easing: 'sineIn' })
            .to(.2, { position: cc.v2(0, 0) }, { easing: 'sineIn' })
            .start()

        //得分动画
        const startLeavel = leavel
        const startList = [this.start1, this.start2, this.start3, this.start4]

        for (let i = 0; i < startLeavel; i++) {
            let startItem = startList[i]
            startItem.getComponent(cc.Sprite).spriteFrame = this.coreStart

            startItem.setScale(0.2)
            startItem.opacity = 0
            cc.tween(startItem)
                .to(.5, { scale: 1.3, angle: 72, opacity: 255 })
                .to(.2, { scale: .8 })
                .to(.2, { scale: 1.2 })
                .to(.2, { scale: 1 })
                .to(.2, { scale: .8 })
                .to(.2, { scale: 1.2 })
                .to(.2, { scale: 1 })
                .start()
        }

        const defaultStartArr = startList.splice(startLeavel)
        defaultStartArr.map(item => {
            item.getComponent(cc.Sprite).spriteFrame = this.defaultStart
        })

        //星星动画
        const twinkleArr = this.twinkleWarp.children

        twinkleArr.map((item) => {
            const delay = Math.ceil(Math.random() * 10) / 10
            cc.tween(item)
                .delay(delay)
                .to(1, { scale: 1 })
                .to(1, { scale: 0 })
                .union()
                .repeatForever()
                .start()
        })

        setTimeout(() => {
            const leavel = CACHE.hard_level
            console.log("leavel", leavel)
            const num = [0, 1, 2, 3, 4][leavel + 1]
            for (let i = 0; i < num; i++) {
                setTimeout(() => {
                    this.addStart()
                }, i * 400)
            }

        }, 1500)



    },



    addStart() {
        // this.star.active=true
        const starNode = cc.instantiate(this.star)
        starNode.active = true
        starNode.parent = this.star.parent
        starNode.runAction(this.createBezierTo(.5, cc.v2(-130, 50), cc.v2(0, 0), 100, 360));

        setTimeout(() => {
            this.starAmount = this.starAmount + 1
            this.starNum.string = `x${this.starAmount}`
            cc.tween(this.starWarp)
                .to(0.2, { scale: 1.4 })
                .to(0.1, { scale: 1.2 })
                .start()
        }, 500)
    },

    gloadAnimation() {
        if (this.coinAdd || this.diamondAdd) {
            let amount = this.coinAdd || 0;
            let gemAmount = this.diamondAdd || 0;
            let maxAmount = Math.max(amount, gemAmount);
            let time = 0;
            let header = cc.find('Canvas/headerWarp');
            let headerObj = header.getComponent('header_warp_index');
            this.coinTimer = setInterval(() => {
                if (time < maxAmount) {
                    if (time < amount) {
                        CACHE.userData.coin++;
                    }
                    if (time < gemAmount) {
                        CACHE.userData.gem++;
                    }
                    time++;
                    headerObj.renderShowScene();
                } else {
                    clearInterval(this.coinTimer);
                }
            }, 150)
            this.coinAdd = 0;
            this.diamondAdd = 0;
        }


        //金币动画

        setTimeout(() => {
            let targetIconNode = cc.find('Canvas/headerWarp/coin/icon');
            let targetWorld = targetIconNode.parent.convertToWorldSpaceAR(targetIconNode);
            let goodsItemWarp0 = cc.find('goodsItemWarp_0', this.goodsCoinWarp);
            if (goodsItemWarp0) {
                let rootNode = cc.find("goodsItem/item/ainmateNode", goodsItemWarp0);
                let targetRoot = rootNode.convertToNodeSpaceAR(targetWorld);
                for (let i = 0; i < 9; i++) {
                    let node = cc.find(`icon_${i}`, rootNode);
                    cc.tween(node)
                        .delay(0.1 * i)
                        .to(0.2, { position: cc.v2(targetRoot.x, targetRoot.y), scale: 0.5 })//550
                        .call(() => {
                            node.active = false;
                        })
                        .start()
                }
            }
            let targetIconNode1 = cc.find('Canvas/headerWarp/gem/coinIcon');
            let targetWorld1 = targetIconNode1.parent.convertToWorldSpaceAR(targetIconNode1);
            let goodsItemWarp1 = cc.find('goodsItemWarp_1', this.goodsCoinWarp);
            if (goodsItemWarp1) {
                let rootNode = cc.find("goodsItem/item/ainmateNode", goodsItemWarp1);
                let targetRoot1 = rootNode.convertToNodeSpaceAR(targetWorld1);
                for (let i = 0; i < 9; i++) {
                    let node = cc.find(`icon_${i}`, rootNode);
                    cc.tween(node)
                        .delay(0.1 * i)
                        .to(0.2, { position: cc.v2(targetRoot1.x, targetRoot1.y), scale: 0.5 })
                        .call(() => {
                            node.active = false;
                        })
                        .start()
                }
            }
        }, 500);

    },

    handleNoAd() {
        this.gloadAnimation()
        this.awardList.map((item,index)=>{
            cc.find("sound").getComponent("sound").showToast(item,index)
        })

        setTimeout(()=>{
            const contralObj = cc.find(`Canvas/menuWarp`).getComponent('conraol')
            contralObj.showShare()
            this.award.destroy();

        }, 2500)
    },
    doubleAward() {
        Toast.show('广告暂未开通')
    },



    setTouch(hardLevel) {

        this.doubleBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.doubleAward()
            event.stopPropagation();
        })
        this.noAdBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleNoAd()
            event.stopPropagation();
        })
    },

    // 抛物线创建
    createBezierTo(t, startPoint, endPoint, height, angle) {
        // 把角度转换为弧度
        let radian = angle * 3.14159 / 180;
        // 第一个控制点为抛物线左半弧的中点
        let q1x = startPoint.x + (endPoint.x - startPoint.x) / 4;
        let q1 = cc.v2(q1x, height + startPoint.y + Math.cos(radian) * q1x);
        // 第二个控制点为整个抛物线的中点
        let q2x = startPoint.x + (endPoint.x - startPoint.x) / 2;
        let q2 = cc.v2(q2x, height + startPoint.y + Math.cos(radian) * q2x);
        // 曲线配置
        return cc.bezierTo(t, [q1, q2, endPoint]).easing(cc.easeInOut(0.5));
    },


    init(list, leavel) {
        let arr = []
        let arr2 = []
        list.map(item => {
            if (item.goodsType === 11 || item.goodsType === 12) {
                arr.push(item)
            }
            else if (item.goodsType === 17) {
                this.starAmount = item.amount
                this.starNum.string = `x ${item.amount}`

            } else {
                arr2.push(item)
            }
        })
        const text = ['x1', 'x2', 'x4', 'x3']
        this.star.string = text[leavel]
        arr.map((item, index) => {
            var node = cc.instantiate(this.goodsItemWarp);
            node.name = `goodsItemWarp_${index}`
            node.parent = this.goodsCoinWarp;
            // const name=node.getComponent(cc)
            let icon = cc.find("goodsItem/item/icon", node).getComponent(cc.Sprite);
            this._origin_Icon = cc.find("goodsItem/item/icon", node);
            const name = cc.find("goodsItem/item/name", node).getComponent(cc.Label)
            const num = cc.find("goodsItem/item/num", node).getComponent(cc.Label)

            cc.loader.load(item.iconUrl, (err, texture) => {
                icon.spriteFrame = new cc.SpriteFrame(texture)
                //动态创建金币Sprite
                let rootNode = cc.find("goodsItem/item/ainmateNode", node);
                for (let i = 0; i < 9; i++) {
                    let node = new cc.Node();
                    let sprite = node.addComponent(cc.Sprite);
                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                    node.scaleX = 0.5;
                    node.scaleY = 0.5;
                    node.parent = rootNode;
                    node.name = `icon_${i}`;
                    node.setPosition(cc.v2(icon.node.x, icon.node.y));
                }
            });
            num.string = item.amount
            name.string = item.name
            node.parent = this.goodsCoinWarp
            node.setPosition(cc.v2(0, 0));
            if (item.goodsType === 11) {//确定是金币
                this.coinAdd = item.amount;
            } else if (item.goodsType === 12) {//确定是钻石
                this.diamondAdd = item.amount;
            }

        })
        if (arr2.length === 0) {
            this.goodsWarp.active = false

        } else {
            arr2.map((item, index) => {
                var node = cc.instantiate(this.goods_item);
                node.parent = this.goodsContent;
                let obj = node.getComponent('gameAwardItem')
                obj.init(item, index)
            })
        }
        this.setAnimation(leavel, list)
    },

    // update (dt) {},
});
