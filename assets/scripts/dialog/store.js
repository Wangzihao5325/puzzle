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
        scroll:cc.Node,
        scrollContent:cc.Node,
        list:cc.Node,
        goods:cc.Prefab,
        isShowPop:{
            type:Boolean,
            default:false
        },
        goodsList:{
            type:cc.Array,
            default:[]
        },
        animationFinsh:{
            type:cc.Boolean,
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
            this.animationFinsh=true
        })
        .start()

        this.init()


        //头部滑出动画
        const screenHeight=cc.view.getVisibleSize().height
        const headerY=screenHeight/2-this.header.height/2
        this.header.setPosition(cc.v2(0,headerY+400))
        cc.tween(this.header)
        .delay(.4)
        .to(.4,{position:cc.v2(0,headerY)},{ easing: 'sineIn'})
        .call(()=>{
        })
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

    getGoods(){
        Api.storeGoods(res=>{
            if(res.code===0){
                const data=res.data.records
                this.goodsList=data
                this.initGoods()
            }
        })
    },


    initGoods(){
        //等待动画执行完成后渲染
        if(!this.animationFinsh){
            setTimeout(()=>{
                this.initGoods()
            },500)
            return false
        }
        const data=this.goodsList
        this.list.children&&this.list.children.map(item=>{
            item.destroy()
        })
        for (let i = 0; i < data.length; i++) {
            if(i<5){
                this.initGoodsItem(data[i],i)
            }
        }
    },

    initGoodsItem(item,index){
        let goods = cc.instantiate(this.goods);
        let obj = goods.getComponent('storeGood');
        goods.info=item
        obj.init(item)
        goods.parent = this.list;
        this.list.height=210*(index+1)
        const positionY = -(.5+index)*210
        goods.setPosition(cc.v2(0,positionY))
        // cc.tween(goods)
        //     .delay(.2)
        //     .to(.4,{position:cc.v2(0,positionY),opacity:255},)
        // .start()
    },


    start () {
        if(CACHE.platform.isIphoneX){
            this.header.height=this.header.height*1.8
            const headerBg=cc.find('headerBg',this.header)
            headerBg.height=headerBg.height*1.8
            // cc.find('headerBg',this.header).scaleY=1.5
        }
    },

    handleClose(){
        this.scrollContent.destroy()
        cc.tween(this.modal)
        .to(.4,{position:cc.v2(0,-1000),opacity:0},{ easing: 'fade'})
        .start()
        setTimeout(()=>{
            this.modal.destroy()
        },500)
    },


    onScrollingEvent(){
        var offsetY = this.scroll.getComponent(cc.ScrollView).getScrollOffset().y;
        const scrollHeight = this.scroll.height
        const children= this.scrollContent.children;

        const data=this.goodsList;
            data.map((item,i)=>{
                const positionY=-(.5+i)*210
                if(-positionY>offsetY-120&&-positionY<offsetY+scrollHeight+120){
                    if(children&&children[i]){
                        children[i].opacity!==255?children[i].opacity=255:undefined
                    }else{
                        this.initGoodsItem(item,i)
                    }
                }else{
                    if(children&&children[i]){
                        children[i].opacity=0
                    }
                }
            })
    },

    setTouch() {
        this.scroll.on("scrolling", (event) => {
            this.onScrollingEvent()
        })
        this.close.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.handleClose(event)
            event.stopPropagation();
        })
    },

    onDestroy(){
        clearTimeout(this.popCountDownTimer)
    }

    // update (dt) {},
});
