// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        item:cc.Node,
        warp:cc.Node,
        iconContent:cc.Node,
        icon:cc.Node,
        pic: cc.Sprite,
        title:cc.Label,
        num:cc.Label,
        good_bg: cc.Sprite,
        root: cc.Node,
        tutongName:cc.Node,
        normalName:cc.Node,
        rareName:cc.Node,
        rareBg:cc.SpriteFrame,
        putongBg:cc.SpriteFrame,
        propBg:cc.SpriteFrame,
        good_detail:cc.Prefab,
        info:{
            type:Object,
            default:{}
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.setTouch(0)
    },
    showDetail(){
        console.log("showDetail",this.info)
        let good_detail = cc.instantiate(this.good_detail)
        let obj = good_detail.getComponent('goodsDetail')
        obj.goodsItemClick(this.info)
        good_detail.parent = cc.find('Canvas')
    },

    setTouch(callback) {
        this.item.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.item.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.item.on(cc.Node.EventType.TOUCH_END, () => {
            cc.find("sound").getComponent("sound").tap()
            this.showDetail()
            event.stopPropagation();
        })
    },

    init(item) {
        this.info=item
        this.title.string = item.name;
        this.num.string= item.amount
        this.initType(item)
        cc.loader.load(item.iconUrl, (err, texture) => {
            this.pic.spriteFrame = new cc.SpriteFrame(texture)
        });
    },

    initType(item){
        // console.log("type",type)
        if(item.goodsQuality===0){
            //普通
            this.warp.getComponent(cc.Sprite).spriteFrame=this.putongBg
            this.iconContent.getComponent(cc.Sprite).spriteFrame=this.putongBg
            this.tutongName.active=true
            this.tutongName.getComponent(cc.Label).string=item.name

        }else if(item.goodsQuality===1){
            console.log("稀有物品")
            //稀有样式
            // this.icon.color=cc.color(247,248,201,255)

            this.warp.getComponent(cc.Sprite).spriteFrame=this.propBg
            this.iconContent.getComponent(cc.Sprite).spriteFrame=this.rareBg
            this.icon.width=60
            this.icon.height=60
            this.rareName.active=true
            this.rareName.getComponent(cc.Label).string=item.name
        }else {
            //物品
            this.warp.getComponent(cc.Sprite).spriteFrame=this.propBg 
            this.iconContent.getComponent(cc.Sprite).spriteFrame=this.propBg
            this.normalName.active=true
            this.normalName.getComponent(cc.Label).string=item.name

        }
    },

    // update (dt) {},
});
