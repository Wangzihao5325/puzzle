// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Api from '../api/api_index'
import {CACHE} from '../global/usual_cache'

cc.Class({
    extends: cc.Component,

    properties: {
        modal:cc.Node,
        header:cc.Node,
        close:cc.Node,
        pet:cc.Node,
        pet_pop:cc.Node,
        coin:cc.Label,
        gem:cc.Label,
        content:cc.Node,
        list:cc.Node,
        goods:cc.Prefab,
        isShowPop:{
            type:Boolean,
            default:false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //主题弹出动画
        this.content.setPosition(cc.v2(0,-800))
        cc.tween(this.content)
        .to(.4,{position:cc.v2(0,0)},{ easing: 'fade'})
        .to(.2,{position:cc.v2(0,-118)},{ easing: 'fade'})
        .call(()=>{
            //动画执行结束后再渲染列表避免卡顿
        })
        .start()

        this.init()


        //头部滑出动画
        this.header.setPosition(cc.v2(0,800))
        cc.tween(this.header)
        .delay(.4)
        .to(.4,{position:cc.v2(0,508)},{ easing: 'sineIn'})
        .start()

        //宠物从下往上动画
        this.pet.setPosition(cc.v2(0,300))
        this.pet.opacity=0
        cc.tween(this.pet)
        .delay(.8)
        .to(.4,{position:cc.v2(0,380),opacity:255},{ easing: 'fade'})
        .start()


        this.pet_pop.setPosition(cc.v2(-400,10))

        this.popTimer()

    },

    //初始化界面，请求数据
    init(){
        this.coin.string=CACHE.userData.coin
        this.gem.string=CACHE.userData.gem
        this.getGoods()
        this.setTouch()
    },

    resetUI(){
        this.coin.string=CACHE.userData.coin
        this.gem.string=CACHE.userData.gem
    },

    //宠物气泡动画
    showPop(){
        if(this.showPop){
            this.pet_pop.setPosition(cc.v2(0,10))
            this.pet_pop.opacity=0
            cc.tween(this.pet_pop)
            .to(.4,{position:cc.v2(-140,10),opacity:255},{ easing: 'fade'})
            .start()
        }else{
            cc.tween(this.pet_pop)
            .to(.4,{position:cc.v2(-140,30),opacity:0},{ easing: 'fade'})
            .start()
        }
        this.isShowPop=!this.isShowPop
    },

    popTimer(time){
        this.popCountDownTimer=setTimeout(()=>{
            const newTime=Math.ceil(Math.random()*2000+8000)//8-10s
            this.showPop()
            this.popTimer(newTime)
        },time)

    },

    getGoods(refresh){
        Api.storeGoods(res=>{
            if(res.code===0){
                const data=res.data.records
                data.map((item,index)=>{
                    //更新前销毁旧的元素
                    if(refresh){
                        this.list.children.map(item=>{
                            item.destroy()
                        })
                    }
                    this.initGoods(item,index)
                })
            }
        })
    },

    initGoods(item,index){
        let goods = cc.instantiate(this.goods);
        goods.opacity=0
        let obj = goods.getComponent('storeGood');
        goods.info=item
        obj.init(item)
        goods.parent = this.list;
        this.list.height=210*(index+1)
        const positionY = -(.5+index)*210
        goods.setPosition(cc.v2(0,positionY-100))

        cc.tween(goods)
            .delay(.2+.2*(index+1))
            .to(.4,{position:cc.v2(0,positionY),opacity:255},)
        .start()
    },

    start () {

    },

    handleClose(){
        cc.tween(this.modal)
        .to(.4,{position:cc.v2(0,-1000),opacity:0},{ easing: 'fade'})
        .start()
        setTimeout(()=>{
            this.modal.destroy()
        },500)
    },

    setTouch() {
        this.close.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.handleClose(event)
            event.stopPropagation();
        })
    },

    onDestory(){
        console.log("onDestory")

        clearTimeout(this.popCountDownTimer)
    }

    // update (dt) {},
});
