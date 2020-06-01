// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// import { CHACH  } from '../global/usual_cache';


cc.Class({
    extends: cc.Component,

    properties: {
        awardContent:cc.Node,
        start1:cc.Node,
        start2:cc.Node,
        start3:cc.Node,
        coreStart:cc.SpriteFrame,
        defaultStart:cc.SpriteFrame,
        goods_item:cc.Prefab,
        twinkleWarp:cc.Node,
        goodsCoinWarp:cc.Node,
        goodsItemWarp:cc.Node,
        goodsWarp:cc.Node,
        goodsContent:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {


    },

    start () {

    },

    setAnimation(leavel){

        //弹窗动画
        this.awardContent.setPosition(cc.v2(0,-800))
        cc.tween(this.awardContent)
        .to(.4,{position:cc.v2(0,40)},{ easing: 'sineIn'})
        .to(.2,{position:cc.v2(0,0)},{ easing: 'sineIn'})
        .start()

        //得分动画
        const startLeavel=leavel
        const startList=[this.start1,this.start2,this.start3]
        const postionList=[-130,0,130]
        for(let i=0;i<startLeavel;i++){
            let startItem=startList[i]
            startItem.getComponent(cc.Sprite).spriteFrame=this.coreStart
            startItem.setPosition(cc.v2(postionList[i],-500))
            cc.tween(startItem)
            .to(.5,{position:cc.v2(postionList[i],0),rotation: 360})
            .to(.5, { scale: 1.3 })
            .to(.5, { scale: 1 })
            .start()
        }

        const defaultStartArr=startList.splice(startLeavel)
        defaultStartArr.map(item=>{
            item.getComponent(cc.Sprite).spriteFrame=this.defaultStart
        })

        //星星动画
        const twinkleArr=this.twinkleWarp.children

        twinkleArr.map((item)=>{
            const delay=Math.ceil( Math.random()*10)/10
            cc.tween(item)
            .delay(delay)
            .to(1, { scale: 1 })
            .to(1, { scale: 0 })
            .union()
            .repeatForever()
            .start()
        })
    },

    init(list,leavel){
        let arr=[]
        let arr2=[]
        list.map(item=>{
            if(item.goodsType===11||item.goodsType===12){
                arr.push(item)
            }else{
                arr2.push(item)
            }
        })
        arr.map((item,index)=>{
            var node = cc.instantiate(this.goodsItemWarp);
            node.parent = this.goodsCoinWarp;
            // const name=node.getComponent(cc)
            let icon=cc.find("goodsItem/item/icon", node).getComponent(cc.Sprite)
            const name=cc.find("goodsItem/item/name", node).getComponent(cc.Label)
            const num=cc.find("goodsItem/item/num", node).getComponent(cc.Label)
            cc.loader.load(item.iconUrl, (err, texture)=> {
                icon.spriteFrame=new cc.SpriteFrame(texture)
            });
            num.string=item.amount
            name.string=item.name
            node.parent=this.goodsCoinWarp
            node.setPosition(cc.v2(0,0));
        })
        if(arr2.length===0){
            this.goodsWarp.active=false

        }else{
            arr2.map(item=>{
                var node = cc.instantiate(this.goods_item);
                node.parent = this.goodsContent;
                let obj=node.getComponent('gameAwardItem')
                obj.init(item)
            })
        }
        this.setAnimation(leavel)


    },

    // update (dt) {},
});
