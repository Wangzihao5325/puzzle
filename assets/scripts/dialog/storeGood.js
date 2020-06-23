// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import {parseFormat} from '../utils/utils'
import Api from '../api/api_index'
import {User} from '../api/api_action'
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        icon:cc.Sprite,
        num:cc.Label,
        Name:cc.Label,
        des:cc.Label,
        time:cc.Node,
        price_warp:cc.Node,
        price:cc.Label,
        priceIcon:cc.Sprite,
        old_price_Warp:cc.Node,
        old_price:cc.Label,
        oldPriceIcon:cc.Sprite,
        tag:cc.Node,
        tagText:cc.Label,
        buy:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setTouch()
    },

    start () {

    },
    countDown(time){
         this.timer= setTimeout(()=>{
            if(time>0){
                const newTime=time-1000
                this.countDown(newTime)
                const countDownStr=parseFormat(newTime,'HH:mm:ss')
                if(this.time){
                    this.time.active=true
                }else{
                    clearTimeout(this.timer)
                    return false
                }
                this.time.getComponent(cc.Label).string=countDownStr
            }else{
                const store= cc.find('Canvas/store').getComponent('store')
                store.getGoods(true)
            }
        },1000)
    },
    init(item){
        this.buy.info=item
        this.num.string=`x ${item.number}`
        this.Name.string=`x ${item.name}`
        this.des.string=`x ${item.introduce}`
        this.price.string=`x ${item.realPrice}`
        cc.loader.load(item.icon, (err, texture)=> {
            this.icon.spriteFrame=new cc.SpriteFrame(texture)
        });
        cc.loader.load(item.currencyIcon, (err, texture)=> {
            this.priceIcon.spriteFrame=new cc.SpriteFrame(texture)
            this.oldPriceIcon.spriteFrame=new cc.SpriteFrame(texture)
        });
        const tagStrList=['','','折 扣','限·时','限时折扣']
        if(item.type>1){
            this.tag.active=true;
            this.tagText.string=tagStrList[item.type]
        }
        if(item.endTimestamp){
            const time =item.endTimestamp- (new Date().getTime())
            this.countDown(time)
        }
        if(item.discount<10&&item.discount>0){
            this.old_price_Warp.active=true;
            this.old_price.string=`x ${item.price}`
            this.tagText.string=item.endTimestamp?`限时 ${item.discount}折`:`${item.discount} 折`
        }
    },
    handleBuy(event){
        //物品
        console.log("CACHE.didAlert.buy",CACHE.didAlert.buy)
        if(CACHE.didAlert.buy){
            //是否提示
            window.Alert.show( `确认购买${this.buy.info.name}`,
            {
                title: '温馨提示',
                confirmCallBack:(check)=>{
                    CACHE.didAlert.buy=!check
                    this.doBuy()
                },
                cancelCallBack: function () { },
                radioValue:CACHE.didAlert.buy,
                confirmText: '确认',
            }
            );
        }else{
            this.doBuy()
        }

    },

    doBuy(){
        const info =this.buy.info
        const data={
            tyep:info.commodityId,
            uuid:info.uuid
        }
        Api.storeGoodsBuy(data,res=>{
            if(res.code===0){
                Toast.show(`${info.name}购买成功`)
                User.BalanceUpdate(()=>{
                    const store= cc.find('Canvas/store').getComponent('store')
                    store.resetUI()
                })
            }else{
                Toast.show(res.message)
            }
        })
    },

    setTouch() {
        this.buy.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.handleBuy(event)
            event.stopPropagation();
        })
    },

    onDestroy(){
        clearTimeout(this.timer)
    }

    // update (dt) {},
});
