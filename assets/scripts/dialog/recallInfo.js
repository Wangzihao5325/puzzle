// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import {dateFormat} from '../utils/utils'
import Api from '../api/api_index'
import { SHARE_URL } from '../global/app_global_index'

cc.Class({
    extends: cc.Component,

    properties: {
        warp:cc.Node,
        content:cc.Node,
        position:cc.Label,
        time:cc.Label,
        des:cc.Label,
        imageContent:cc.Node,
        pic: cc.Sprite,
        new:cc.Node,
        like:cc.Node,
        comment:cc.Node,
        share:cc.Node,
        commentText1:cc.Label,
        commentText2:cc.Label,
        commentText3:cc.Label,
        picView:cc.Prefab,
        likeIconO:cc.SpriteFrame,
        likeIcon:cc.SpriteFrame,
        commentIconO:cc.SpriteFrame,
        commentIcon:cc.SpriteFrame,
        shareIcon:cc.SpriteFrame,
        isLike:{type:Boolean,default:false},
        isComment:{type:Boolean,default:false},
        commentContent:cc.Node,
        hurdleId:{type:String,default:''},
        closeBtn:cc.Node,
        recallInfo:{
            type:cc.Object,
            destroy:{}
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.content.setScale(0.2)
        cc.tween(this.content)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()
        this.setTouch()
    },

    start() {
    },

    showPic(item){
        let picView = cc.instantiate(this.picView);
        let obj = picView.getComponent('picViewer');
        obj.init(0,this.recallInfo.picUrl,this.recallInfo.hurdleName)
        picView.parent = cc.find('Canvas');
    },

    getRecallInfo(item){
        this.recallInfo=item
        Api.memory_travelInfo({hurdleId:item.hurdleId},res=>{
            if(res.code===0){
                const data=res.data;
                this.recallInfo = data
                //初始化点赞
                if (this.recallInfo.praise) {
                    this.isLike=true
                    this.touchAnimation(0,event)
                }
                // this.item = item;
                // this.time.string = dateFormat((new Date()),'yyyy-MM-dd');
                // if(index===0){
                //     this.new.active=true
                // }
                // cc.loader.load(item.picUrl, (err, texture) => {
                //     this.pic.spriteFrame = new cc.SpriteFrame(texture)
                // });
            }
        })

    },

    getComment(){
        Api.memory_comment(res=>{
            console.log('comment',res)
            if(res.code===0){
                const data=res.data
                const momentNodeList=[this.commentText1,this.commentText2,this.commentText3]
                data.map((item,index)=>{
                    momentNodeList[index].string=`[${item.name}]: ${item.comment}`
                })
            }
        })
    },

    touchAnimation(type,event){
        const nodeList=[this.like,this.comment,this.share]
        const spriteFrameList=[[this.likeIconO,this.likeIcon],[this.commentIconO,this.commentIcon],[this.shareIcon,this.shareIcon]]
        const isActive=[this.isLike,this.isComment,0]
        const active=isActive[type]?1:0
        const newSprite=spriteFrameList[type][active]
        cc.tween(nodeList[type])
        .to(.2,{scale:.9})
        .call(()=>{
            nodeList[type].getComponent(cc.Sprite).spriteFrame=newSprite
        })
        .to(.2,{scale:1.1})
        .to(.2,{scale:1})
        .start()

        // startItem.getComponent(cc.Sprite).spriteFrame=this.coreStart

    },

    toggleComment(){
        this.commentContent.active=this.isComment
    },

    handleClose(){
        console.log('关闭')
        cc.tween(this.content)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.warp.active=false;
            this.warp.destroy()
        })
        .start()
    },


    setTouch(callback) {
        this.imageContent.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.imageContent.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.imageContent.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.showPic()
            event.stopPropagation();
        })
        this.like.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            if (!this.isLike) {
                this.isLike=true
                Api.memory_praise({"hurdleId": this.recallInfo.hurdleId}, (res) => {
                    if (res.code === 0) {
                        this.touchAnimation(0,event)
                    }
                })
                event.stopPropagation();
            }
        })
        this.comment.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.isComment=!this.isComment
            this.touchAnimation(1,event)
            this.toggleComment()
            event.stopPropagation();
        })
        this.share.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.touchAnimation(2,event)
            this.shareAppMsg()
            event.stopPropagation();
        })

        this.closeBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.handleClose()
            event.stopPropagation();
        })
        //蒙版禁止冒泡
        this.warp.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.warp.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        })
    },

    init(item,index) {
        this.getRecallInfo(item)
        this.position.string=`${item.chapterName} · ${item.hurdleName}`
        this.time.string = dateFormat((new Date(item.createTime)),'yyyy-MM-dd');
        this.des.string= `    ${item.describe}`
        cc.loader.load(item.picUrl, (err, texture)=> {
            this.pic.spriteFrame=new cc.SpriteFrame(texture)
        });
        this.getComment()
        this.hurdleId=item.hurdleId

    },
    shareAppMsg () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.shareAppMessage({
                title: "说走就走的旅行，就等你了！快上车！",
                imageUrl: SHARE_URL,
            });
        }
    }


    // update (dt) {},
});
