// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { dateFormat } from '../utils/utils'
import { GAME_CACH } from '../global/piece_index'
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        warp: cc.Node,
        content: cc.Node,
        scrollContent: cc.Node,
        racallItem: cc.Prefab,
        racallInfo: cc.Prefab,
        close: cc.Node,
        scroll:cc.Node,
        recallList:{
            type:cc.Array,
            default:[]
        },
        animationFinsh:{
            type:cc.Boolean,
            default:false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.init()

        this.setTouch()
    },

    start() {

    },
    init(type) {
        // this.content.setPosition(cc.v2(0,-1000))
        // cc.tween(this.content)
        // .to(.4,{position:cc.v2(0,100)})
        // .to(.2,{position:cc.v2(0,0)},{easing:'expoInOut'})
        // .start()

        this.content.setScale(0.2)
        cc.tween(this.content)
            .to(.3, { scale: 1.2 })
            .to(0.15, { scale: 1 })
            .call(()=>{
                this.animationFinsh=true
            })
            .start()
        this.getRecallList()

    },


    handleBack() {
        this.scrollContent.destroy()
        cc.tween(this.content)
            .to(.1, { scale: 1.2 })
            .to(0.3, { scale: .2, opacity: 0 })
            .call(() => {
                this.warp.destroy()
            })
            .start()
        CACHE.btnTips.reCall = this.count > 0
        cc.find('Canvas').getComponent('home_index').updateBtnTips()
    },

    getRecallList() {
        Api.memory_list(res => {
            if (res.code === 0) {
                const data = res.data;
                this.recallList=data
                this.initRecall()
            }
        })
    },

    initRecall(){
        if(!this.animationFinsh){
            setTimeout(()=>{
                this.initRecall()
            },500)
            return false
        }

        this.count = 0
        const data=this.recallList
        for (let i = 0; i < data.length; i++) {
            i<5?this.initRecallTravelItem(data[i], i):undefined
        }
    },

    showInfo(item) {

        // this.handleBack()

        let recallInfoIns = cc.instantiate(this.racallInfo);
        let obj = recallInfoIns.getComponent('recallInfo');

        obj.init(item)
        recallInfoIns.parent = cc.find('Canvas')
        if (item.novel) {
            this.count -= 1
        }
    },

    initRecallTravelItem(item, index) {
        let recall = cc.instantiate(this.racallItem);
        recall.name = `recall_item_${index}`;
        let obj = recall.getComponent('recallItem');
        recall.info = item
        this.count += item.novel ? 1 : 0
        obj.init(item, index)
        recall.parent = this.scrollContent;
        this.scrollContent.height = 210 * (index + 1)
        recall.setPosition(cc.v2(0, -(.5 + index) * 210 - 20))
    },


    onScrollingEvent(){
        var offsetY = this.scroll.getComponent(cc.ScrollView).getScrollOffset().y;
        const scrollHeight = this.scroll.height
        const children= this.scrollContent.children;

        const data=this.recallList;
            data.map((item,i)=>{
                const positionY=-(.5 + i) * 210 - 20;
                if(-positionY>offsetY-100&&-positionY<offsetY+scrollHeight+100){
                    if(children&&children[i]){
                        children[i].opacity!==255?children[i].opacity=255:undefined
                    }else{
                        this.initRecallTravelItem(item,i)
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
            this.onScrollingEvent(event)
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

        this.close.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.handleBack()
            event.stopPropagation();
        })


    },


    // update (dt) {},
});
