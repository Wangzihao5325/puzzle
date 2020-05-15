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

    setTouch() {
        this.Feed.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.show_feed()
            event.stopPropagation();

        })

        // this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
    
        //     event.stopPropagation();
        // })

        // this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
        //     console.log("underwayIndex",underwayIndex,complateIndex)


        //     event.stopPropagation();
        // })
    },

    // update (dt) {},
});
