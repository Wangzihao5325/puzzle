// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { HOME_CACHE  } from '../global/home_global';
import { CurrencyIdtoName } from '../utils/utils'

cc.Class({
    extends: cc.Component,

    properties: {
        dress_item: cc.Node,
        bg: cc.Sprite,
        type: cc.Sprite,
        iconWarp:cc.Node,
        iconWarpContent:cc.Node,
        toushi:cc.SpriteFrame,
        boshi: cc.SpriteFrame,
        weishi: cc.SpriteFrame,
        selectBorder: cc.SpriteFrame,
        defaultPanle:cc.SpriteFrame,
        itemDes:cc.Label,
        current:cc.Node,
        own:cc.Node,
        priceWarp:cc.Node,
        currency:cc.Label,
        price:cc.Label,
        iconName:{
            type:String,
            default:''
        },
        position:{
            type:Number,
            default:1
        },
        select:{
            type:Boolean,
            default:false
        }

        // ske_anim: {
        //     type: sp.Skeleton, // 
        //     default: null,
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setTouch()

    },

    init(item){
        cc.loader.load(item.iconImg, (err, texture)=> {
            this.bg.spriteFrame=new cc.SpriteFrame(texture)
        });
        this.iconName=item.iconName;
        this.position=item.position
        this.goodsId=item.goodsId;
        this.iconName=item.iconName;
        this.costGoodsType=item.costGoodsType;
        this.costNum=item.costNum;
        this.name=item.name;
        this.status=item.status;

        this.dress_item.goodsId=item.goodsId
        this.dress_item.info=item

        const derreType=['',this.toushi,this.boshi,this.weishi,]
        this.type.spriteFrame=derreType[item.position]
        // CurrencyIdtoName(.costGoodsType)
        if(item.status===0){
            this.priceWarp.active=true;
            this.currency=item.costGoodsType
            this.price.string=item.costNum
            this.current.active=false
            this.own.active=false
        }else if(this.status===1){
            this.own.active=true
            this.current.active=false
            this.priceWarp.active=false;

        }else if(this.status===2){
            this.current.active=true
            this.own.active=false
            this.priceWarp.active=false
        }
    },
    
    setSelect(event){
        const node=this.iconWarp.getComponent(cc.Sprite)
        const contentNode=this.iconWarpContent.getComponent(cc.Sprite)
       
            if(HOME_CACHE.selectDecorations){
                var feedWarp = cc.find(`Canvas/dressWarp`)
            }

            HOME_CACHE.selectDecorations=event.currentTarget

            node.spriteFrame=this.selectBorder
            contentNode.spriteFrame=this.selectBorder
            contentNode.color=new cc.color(254, 248, 212)
            this.select=!this.select;
            this.handleDressItem()
            var feedWarpSave = cc.find(`Canvas/dressWarp/save/saveText`).getComponent(cc.Label)
            feedWarpSave.string=(HOME_CACHE.selectDecorations.info.status===0?'购买并装扮':'保存装扮')

        

    },

    removeSelect(){
        const node=this.iconWarp.getComponent(cc.Sprite)
        const contentNode=this.iconWarpContent.getComponent(cc.Sprite)
        node.spriteFrame=this.defaultPanle
        contentNode.spriteFrame=this.defaultPanle
        contentNode.color=new cc.color(236,236,236)
    },

    start () {

    },
    handleDressItem(){
        const cat_post_dress=['C','','Z']
        const currentPost=HOME_CACHE.cat_post
        const dress_per=cat_post_dress[currentPost]
        // HOME_CACHE.cat_post
        const name=this.iconName
        
        // "boshi00": { "x": -29.51, "y": -21.46, "rotation": -113.23, "width": 231, "height": 167 }
        // spine

        // var spine = this.ske_anim;
        var spine = cc.find(`Canvas/rootWarp/my_home/cat/catItem`);
        var ske_com = spine.getComponent(sp.Skeleton);
        this.ske_com = ske_com;
        const skeletonData = this.ske_com.skeletonData.getRuntimeData();
        const skin = skeletonData.findSkin('default');
        const type = this.position
        let parts = ['',`${dress_per}toushi00`, `${dress_per}boshi00`, `${dress_per}weishi00`]//["toushi00", "boshi00", "weishi00"];
        let regSlot = this.ske_com.findSlot(parts[type]);
        let slotIndex = skeletonData.findSlotIndex(name);
        let atta = skin.getAttachment(slotIndex, name);

        let typeparts = ['','toushi00','boshi00','weishi00']//["toushi00", "boshi00", "weishi00"];
        let slotDefaultIndex = skeletonData.findSlotIndex(`${parts[type]}`);
        let Defaultatta = skin.getAttachment(slotDefaultIndex, typeparts[type]);
        atta.x=Defaultatta.x;
        atta.y=Defaultatta.y;
        atta.rotation=Defaultatta.rotation;
        atta.offset=Defaultatta.offset;

        regSlot.attachment = atta;
    },

    headSlotChange() {
        var spine = this.ske_anim;
        var ske_com = spine.getComponent(sp.Skeleton);
        this.ske_com = ske_com;
        const skeletonData = this.ske_com.skeletonData.getRuntimeData();
        const skin = skeletonData.findSkin('default');
        let parts = ["toushi00", "boshi00", "weishi00"]//["toushi00", "boshi00", "weishi00"];
        let randomNum = Math.floor(Math.random() * 8);
        for (let i = 0; i < parts.length; i++) {
            let regSlot = this.ske_com.findSlot(parts[i]);
            switch (i) {
                case 0:
                    {
                        let slotIndex = skeletonData.findSlotIndex(`toushi0${randomNum}`);
                        let atta = skin.getAttachment(slotIndex, `toushi0${randomNum}`);
                        //regSlot.setAttachment(atta);
                        regSlot.attachment = atta;

                        break;
                    }
                case 1:
                    {
                        let slotIndex = skeletonData.findSlotIndex(`boshi0${randomNum}`);
                        let atta = skin.getAttachment(slotIndex, `boshi0${randomNum}`);
                        //regSlot.setAttachment(atta);
                        regSlot.attachment = atta;
                        break;
                    }
                case 2:
                    {
                        let slotIndex = skeletonData.findSlotIndex(`weishi0${randomNum}`);
                        let atta = skin.getAttachment(slotIndex, `weishi0${randomNum}`);
                        //regSlot.setAttachment(atta);
                        regSlot.attachment = atta;
                        break;
                    }
            }
        }
    },
    setTouch() {
        this.dress_item.on(cc.Node.EventType.TOUCH_START, (event) => {
            // this.handleDressItem()
            this.setSelect(event)
            event.stopPropagation();

        })
    }
    // update (dt) {},
});
