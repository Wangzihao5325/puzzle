// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Api from '../api/api_index'
import {CACHE} from '../global/usual_cache'
import {HOME_CACHE} from '../global/home_global'

cc.Class({
    extends: cc.Component,

    properties: {

        warp: cc.Node,
        content:cc.Node,
        close:cc.Node,
        actionBtn:cc.Node,
        typeWarp:cc.Node,
        goodDetailName: cc.Label,
        goodDetailIcon: cc.Sprite,
        goodSellTypeIcon: cc.Sprite,
        goodSellNum: cc.Label,
        goodDetailType: cc.Sprite,
        goodDetailTypeName: cc.Label,
        goodDetails: cc.Label,
        goodDetailsContent: cc.Node,
        goodDetailMask: cc.Sprite,
        goodDetailBg: cc.Sprite,
        goodLessReg: cc.Sprite,
        actionText:cc.Label,
        actionWarp:cc.Node,
        info:{
            type:Object,
            default:{}
        },
        canSell:{
            type:Boolean,
            default:true
        }
    },  

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setTouch()


        this.content.setScale(0.2)
        cc.tween(this.content)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()

    },
    handleClose(){
        cc.tween(this.content)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.warp.active=false;
            this.warp.destroy()
        })
        .start()
    },

    start () {

    },

    handleAction(){
        if(this.info.type===3){
            //宠物

            let { outward } = HOME_CACHE.pet_info
            if(outward){
                Toast.show('宠物已经外出，无法喂食~')
                return false
            }
            //关闭商品详情弹窗
            this.handleClose()
            //关闭背包弹窗
            const backpackObj=cc.find('Canvas/backpack').getComponent('backpack')
            backpackObj.handleClose()
            
            setTimeout(()=>{
                //弹出宠物喂养弹窗
                const pethomeObj=cc.find('Canvas').getComponent('home_index')
                pethomeObj.show_feed()
            },500)

        }
        else if(this.info.type===2){
            //道具
        }
        else {
            //物品
            if(CACHE.didAlert.sell){
                //是否提示
                window.Alert.show( `确认出售${this.info.name}`,
                {
                  title: '温馨提示',
                  confirmCallBack:(check)=>{
                    CACHE.didAlert.sell=!check
                    this.sellGoods()
                  },
                  cancelCallBack: function () { },
                  radioValue:CACHE.didAlert.sell,
                  confirmText: '确认',
                }
              );
            }else{
                this.sellGoods()
            }
        }

    },

    resetbackPackUi(){
        const backpackObj=cc.find('Canvas/backpack').getComponent('backpack')
        backpackObj.getBackpack()
    },

    sellGoods(){
        Api.sellGOods({goodsId:this.info.goodsId},res=>{
            if(res.code===0){
                Toast.show(`${res.data.name} +${this.info.sellAmount}`)
                this.handleClose()
                this.resetbackPackUi()
            }else{
                Toast.show(res.message||'出售失败')
            }
        })
    },

    setTouch() {
        this.close.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.handleClose()
            event.stopPropagation();
        })
        this.actionBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.handleAction()
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        })



        
    },

    renderGoodsDetail(item,comsumption=false) {
        this.info=item
        const type=item.goodsQuality
        this.info.type=type
        this.goodDetailName.string = `${item.name}`;

        if(type===0){
            this.goodDetails.node.color = cc.color(141, 141, 141);
            this.goodDetailsContent.color = cc.color(255,255,255);
            this.goodDetailBg.node.color = cc.color(234,234,234);
            this.goodLessReg.node.active = false;
            this.actionWarp.active=true&&this.canSell
        }
        else if (type == 1) {//稀有物品
            this.goodDetails.node.color = cc.color(141, 141, 141);
            this.goodDetailsContent.color = cc.color(212, 181, 156);
            this.goodDetailBg.node.color = cc.color(255, 247, 206);
            this.goodLessReg.node.active = true;
            this.actionWarp.active=true&&this.canSell
        } else if(type===3){
            //普通 宠物
            this.goodDetails.node.color = cc.color(141, 141, 141);
            this.goodDetailsContent.color = cc.color(255, 255, 255);
            this.goodDetailBg.node.color = cc.color(244,235,218);
            this.goodLessReg.node.active = false;
            this.actionWarp.active=true&&this.canSell

            // this.goodDetailsContent.getComponent(cc.Node).setPosition(cc.v2(this.goodDetailsContent.node.x,this.goodDetailsContent.node.y+30))
            this.actionText.string='使 用'
        } else {//道具
            this.goodDetails.node.color = cc.color(141, 141, 141);
            this.goodDetailsContent.color = cc.color(255, 255, 255);
            this.goodDetailBg.node.color = cc.color(234, 234, 234);
            this.goodLessReg.node.active = false;
            this.actionWarp.active=false&&this.canSell

        }
        if(!comsumption){
            this.typeWarp.active=true
            this.goodSellNum.string = item.sellAmount;
            cc.loader.load(item.sellIconUrl, (err, texture) => {
                this.goodSellTypeIcon.spriteFrame = new cc.SpriteFrame(texture);
            });
            let typeName = '美食';
            let typeUrl = 'show/meishi';
            switch (item.goodsType) {
                case 1:
                    typeName = '美食';
                    typeUrl = 'show/meishi';
                    break;
                case 3:
                    typeName = '手工品';
                    typeUrl = 'show/shougognpin';
                    break;
                case 4:
                    typeName = '纪念品';
                    typeUrl = 'show/jininapin';
                    break;
                case 5:
                    typeName = '文物';
                    typeUrl = 'show/wenwu';
                    break;
            }
            this.goodDetailTypeName.string = typeName;
            cc.loader.loadRes(typeUrl, cc.SpriteFrame, (err, assets) => {
                this.goodDetailType.spriteFrame = assets
            });
            this.goodDetailIcon.node.scaleX = 0.4;
            this.goodDetailIcon.node.scaleY = 0.4;
        }else{
            this.goodDetailIcon.node.scaleX = 0.8;
            this.goodDetailIcon.node.scaleY = 0.8;
        }


        cc.loader.load(item.iconUrl, (err, texture) => {
            this.goodDetailIcon.spriteFrame = new cc.SpriteFrame(texture);
        });


        // this.goodDetails.node.width = 220;
        this.goodDetails.string = `    ${item.introduce}`;
        // this.goodDetailRoot.active = true;
    },

    goodsItemClick(item,canSell=true) {
        this.canSell=canSell
        if(item.goodsQuality>1){
            this.renderGoodsDetail(item,true);
        }else{
            Api.goodsInfo(item.goodsId, (res) => {
                this.renderGoodsDetail(res.data);
            });
        }

    },
    // update (dt) {},
});
