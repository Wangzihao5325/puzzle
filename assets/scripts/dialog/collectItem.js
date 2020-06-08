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
        normalName:cc.Node,
        rareName:cc.Node,
        rareBg:cc.SpriteFrame,
        putongBg:cc.SpriteFrame,
        good_detail:cc.Prefab,
        info:{
            type:Object,
            default:{}
        },
        sketch_mask:cc.Node,
        new:cc.Node,
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
        obj.goodsItemClick(this.info,false)
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
            this.showDetail()
            event.stopPropagation();
        })
    },

    init(item) {
        this.info=item
        this.title.string = item.name;
        this.initType(item)
        cc.loader.load(item.iconUrl, (err, texture) => {
            if(item.owned){
                this.pic.spriteFrame = new cc.SpriteFrame(texture)
                
            }else{
                this.sketch_mask.active=true
                this.sketch_mask.getComponent(cc.Mask).spriteFrame=new cc.SpriteFrame(texture)
            }
        });
        
    },

    initType(item){
        if(item.goodsQuality===0){
            //普通
            // this.warp.getComponent(cc.Sprite).spriteFrame=this.propBg 
            // this.iconContent.getComponent(cc.Sprite).spriteFrame=this.propBg
            this.normalName.active=true
            this.normalName.getComponent(cc.Label).string=item.name

        }else if(item.goodsQuality===1){
            console.log("稀有物品")
            this.warp.getComponent(cc.Sprite).spriteFrame=this.propBg
            this.iconContent.getComponent(cc.Sprite).spriteFrame=this.rareBg
            // this.icon.width=60
            // this.icon.height=60
            this.rareName.active=true
            this.rareName.getComponent(cc.Label).string=item.name
        }
    },

    // update (dt) {},
});
