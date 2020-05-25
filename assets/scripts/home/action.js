// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Api from '../api/api_index'

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
        const goodsList=[{name:'花木他',url:'http://att3.citysbs.com/200x200/hangzhou/2020/04/15/11/dd6719bd4287d9efd49434c43563a032_v2_.jpg'},
        {name:'花木他',url:'http://att3.citysbs.com/200x200/hangzhou/2020/04/15/11/dd6719bd4287d9efd49434c43563a032_v2_.jpg'},
        {name:'花木他',url:'http://att3.citysbs.com/200x200/hangzhou/2020/04/15/11/dd6719bd4287d9efd49434c43563a032_v2_.jpg'},
        {name:'花木他',url:'http://att3.citysbs.com/200x200/hangzhou/2020/04/15/11/dd6719bd4287d9efd49434c43563a032_v2_.jpg'},
        {name:'花木他',url:'http://att3.citysbs.com/200x200/hangzhou/2020/04/15/11/dd6719bd4287d9efd49434c43563a032_v2_.jpg'},
        {name:'花木他',url:'http://att3.citysbs.com/200x200/hangzhou/2020/04/15/11/dd6719bd4287d9efd49434c43563a032_v2_.jpg'},
    ]
    
        // ComeBack.show(goodsList)
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
        // ConfirmOut.show()
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

    setOUtUi(){
        this.Action_warp.active=false
        let OutSide=cc.instantiate(this.OutSide)
        var cat = cc.find(`Canvas/rootWarp/my_home/cat`)
        var my_home = cc.find(`Canvas/rootWarp/my_home`)
        cat.active=false
        OutSide.parent=my_home
        OutSide.active=true
    },

    handleGoout(){

        ConfirmOut.show(()=>{
            Api.petGoout((res) => {
                console.log("外出res",res)
                if(res.code===0){
                    Toast.show("宠物已外出")
                    this.setOUtUi()
                }else if(res.code===20008){
                    //体力不够
                    Hunger.show("")
                }
                else if(res.code===20011){
                    //太累了
                    const str=res.message
                    const time = str.slice(str.indexOf('=')+1)
                    Tire.show(time)
                }
                else{
                    Toast.show(res.message||'外出失败')
                }
            })
        },
        ((res)=>{
            console.log("外出失败res",res)
            Toast.show(res.message||'外出失败')
                
        })
        )

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
