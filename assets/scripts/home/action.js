// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Action_warp: cc.Node,
        Goout:cc.Node,
        Dress:cc.Node,
        Feed:cc.Node,
        Feed_warp:cc.Prefab,
        Dress_warp:cc.Prefab,
        OutSide:cc.Prefab,
        Home_Warp:cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },
    init(){
        this.init_feed()
        this.setTouch()

    },

    start () {
        this.init()

    },

    init_feed(){
        let feedWarpInstan = cc.instantiate(this.Feed_warp)
        var warp_parent = cc.find(`Canvas`)
        feedWarpInstan.parent=warp_parent
        feedWarpInstan.setPosition(0, -768);
    },
    
    //喂养
    show_feed(){
        this.Action_warp.active=false
        const feedWarpInstan=  cc.find(`Canvas/feedWarp`)
        cc.tween(feedWarpInstan)
        .to(.2, { position: cc.v2(0, -408) },{ easing: 'sineOutIn'})
        // .to(.1, { position: cc.v2(0, -408) })
        .start()
        // feedWarpInstan.setPosition(0, -408);
    },
    handleClose(){
        this.Action_warp.active=false

    },

    show_dress(){
        this.Action_warp.active=false
        const deedWarpInstan=  cc.find(`Canvas/dressWarp`)
        deedWarpInstan.active=true
        // let obj=deedWarpInstan.getComponent('dress')
        cc.tween(deedWarpInstan)
        .to(.2, { position: cc.v2(0, -300) },{ easing: 'sineOutIn'})
        // .to(.1, { position: cc.v2(0, -408) })
        .start()
        // obj.show_dress()
    },

    handleGoout(){
        this.Action_warp.active=false
        // const feedWarpInstan=  cc.find(`Canvas/feedWarp`)
        let OutSide=cc.instantiate(this.OutSide)
        var cat = cc.find(`Canvas/rootWarp/my_home/cat`)
        var my_home = cc.find(`Canvas/rootWarp/my_home`)
        cat.active=false
        OutSide.parent=my_home
        OutSide.active=true
        // const obj = newNode.getComponent('dress_item')

        // obj.init(currentpages[i])

    },

    setTouch() {
        this.Feed.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.show_feed()
            event.stopPropagation();

        })
        this.Dress.on(cc.Node.EventType.TOUCH_START,(event)=>{
            this.show_dress()
            event.stopPropagation();

        })
        this.Goout.on(cc.Node.EventType.TOUCH_START,(event)=>{
            this.handleGoout()
            event.stopPropagation();

        })
        
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.handleClose()
            event.stopPropagation();
        })

        // this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
        //     console.log("underwayIndex",underwayIndex,complateIndex)


        //     event.stopPropagation();
        // })
    },

    // update (dt) {},
});
