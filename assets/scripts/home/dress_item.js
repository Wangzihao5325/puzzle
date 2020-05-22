// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { HOME_CACHE  } from '../global/home_global';

cc.Class({
    extends: cc.Component,

    properties: {
        dress_item: cc.Node,
        bg: cc.Sprite,
        type: cc.Sprite,
        close:cc.Node,
        toushi:cc.SpriteFrame,
        boshi: cc.SpriteFrame,
        weishi: cc.SpriteFrame,
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
        const imgUrl='http://att3.citysbs.com/200x200/hangzhou/2020/04/15/11/dd6719bd4287d9efd49434c43563a032_v2_.jpg'
        // cc.loader.loadRes(imgUrl, cc.SpriteFrame, (err, spriteFrame) => {
        //     this.bg.spriteFrame=spriteFrame
        // });

        cc.loader.load(imgUrl, (err, texture)=> {
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
        const derreType=['',this.toushi,this.boshi,this.weishi,]
        this.type.spriteFrame=derreType[item.position]
        // if(this.status===0){
        //     this.priceWarp=active;
        //     this.currency=this.costGoodsType
        //     this.price.string=this.costNum
        // }else if(this.status===1){
        //     this.own=active
        // }else if(this.status===2){
        //     this.current=active
        // }
    },
    

    start () {

    },
    handleDressItem(){
        console.log("handleDressItem",this.iconName)
        const cat_post_dress=['C','','Z']
        const currentPost=HOME_CACHE.cat_post
        const dress_per=cat_post_dress[currentPost]
        // HOME_CACHE.cat_post
        const name=this.iconName
        
        // "boshi00": { "x": -29.51, "y": -21.46, "rotation": -113.23, "width": 231, "height": 167 }
        // spine

        // var spine = this.ske_anim;
        var spine = cc.find(`Canvas/rootWarp/my_home/cat`);
        var ske_com = spine.getComponent(sp.Skeleton);
        this.ske_com = ske_com;
        const skeletonData = this.ske_com.skeletonData.getRuntimeData();
        const skin = skeletonData.findSkin('default');
        const type = this.position
        console.log("type",name,type)
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
        // console.log("ske_com",skeletonData)
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
        // this.ske_com.debugSlots = true;
        // this.ske_com.debugBones = true;
        // let bone27Obj = this.ske_com.findBone('Cbone21');
        // bone27Obj.rotateWorld(180);
        // bone27Obj.updateWorldTransform();
        // this.ske_com.updateWorldTransform();
        // console.log('--270')
        // console.log(bone27Obj);

    },
    setTouch() {
        this.dress_item.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleDressItem()
            event.stopPropagation();

        })
    }
    // update (dt) {},
});
