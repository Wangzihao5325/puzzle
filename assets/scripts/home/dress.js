// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CAR_FOOD,SHIPING } from "../global/home_global"

cc.Class({
    extends: cc.Component,

    properties: {
 
        close:cc.Node,
        pageContent:cc.Node,
        pageItem1:cc.Node,
        pageItem2:cc.Node,
        pageItem3:cc.Node,
        pageItem4:cc.Node,
        dress_item:cc.Prefab,
        dress_warp:cc.Node


    },
    show_dress(){
        // this.Action_warp.active=false
        // const feedWarpInstan=  cc.find(`Canvas/feedWarp`)
        cc.tween(dress_warp)
        .to(.2, { position: cc.v2(0, 300) },{ easing: 'sineOutIn'})
        // .to(.1, { position: cc.v2(0, -408) })
        .start()
        // feedWarpInstan.setPosition(0, -408);
    },
    // LIFE-CYCLE CALLBACKS:
    init(){

        const pages=Math.ceil(SHIPING.length/8)
        console.log("init",pages)
        const contentList=[this.pageItem1,this.pageItem2,this.pageItem3,this.pageItem4]
        for(let m=0;m<pages;m++){
            console.log("pages",m)
            const currentpages=SHIPING.slice(m*8, (m+1)*8)
            const currentPageContent= contentList[m]
            console.log("currentpages",currentpages)
            
            // currentPageContent.parent=this.pageContent
            for(let i=0;i<currentpages.length;i++){
                let newNode=cc.instantiate(this.dress_item)
    
                const obj = newNode.getComponent('dress_item')
    
                obj.init(currentpages[i])
    
                newNode.parent = currentPageContent
                indexX=i>=4?i-4:i
                indexY=Math.ceil((i+1)/4)
                let position = cc.v2((160 * (indexX+1)) - 80-320, (210-(190*(-0.5+indexY)))+30);
                console.log("position",(160 * indexX) - 80-320, (210-(190*(-0.5+indexY)))+30)
                newNode.setPosition(position)
            }

        }
  



    },
    onLoad () {
        this.init()
        this.setTouch()

    },
    initDress(){
        let dressWarpInstan = cc.instantiate(this.dress_warp)
        var warp_parent = cc.find(`Canvas`)
        dressWarpInstan.parent=warp_parent
        dressWarpInstan.setPosition(0, -868);
        // let obj = dressWarpInstan.getComponent('dress')
        // obj.init()

    },

    start () {

    },

    handleClose(){
        var feedWarp = cc.find(`Canvas/dressWarp`)
        cc.tween(feedWarp)
        .to(.2, { position: cc.v2(0, -868) },{ easing: 'sineOutIn'})
        .start()

    },

    setTouch() {

        this.close.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleClose(2)
            event.stopPropagation();
        })
    }
    // update (dt) {},
});
