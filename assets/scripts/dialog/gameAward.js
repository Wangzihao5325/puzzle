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
        start1: cc.Node,
        start2: cc.Node,
        start3: cc.Node,
        coreStart: cc.SpriteFrame,
        defaultStart: cc.SpriteFrame,
        goods_item: cc.Prefab,
        twinkleWarp: cc.Node,
        goodsCoinWarp: cc.Node,
        goodsItemWarp: cc.Node,
        goodsWarp: cc.Node,
        goodsContent: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


    },

    start() {

    },

    setAnimation(leavel, list) {

        //弹窗动画
        this.awardContent.setPosition(cc.v2(0, -800))
        cc.tween(this.awardContent)
            .to(.4, { position: cc.v2(0, 40) }, { easing: 'sineIn' })
            .to(.2, { position: cc.v2(0, 0) }, { easing: 'sineIn' })
            .start()

        //得分动画
        const startLeavel = leavel
        const startList = [this.start1, this.start2, this.start3]

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

            let goodsItemWarp1 = cc.find('goodsItemWarp_1', this.goodsCoinWarp);
            if (goodsItemWarp1) {
                let rootNode = cc.find("goodsItem/item/ainmateNode", goodsItemWarp1);
                for (let i = 0; i < 9; i++) {
                    let node = cc.find(`icon_${i}`, rootNode);
                    cc.tween(node)
                        .delay(0.1 * i)
                        .to(0.1, { position: cc.v2(-200, 550) })
                        .call(() => {
                            node.active = false;
                        })
                        .start()
                }
            }
        }, 500);
    },

    init(list, leavel) {
        let arr = []
        let arr2 = []
        list.map(item => {
            if (item.goodsType === 11 || item.goodsType === 12) {
                arr.push(item)
            } else {
                arr2.push(item)
            }
        })
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

        if (this.coinAdd) {
            let amount = this.coinAdd;
            let time = 0;
            let header = cc.find('Canvas/headerWarp');
            let headerObj = header.getComponent('header_warp_index');
            this.coinTimer = setInterval(() => {
                if (time < amount) {
                    CACHE.userData.coin++;
                    time++;
                    headerObj.renderShowScene();
                } else {
                    clearInterval(this.coinTimer);
                }
            }, 150)
            this.coinAdd = 0;
        }
    },

    // update (dt) {},
});
