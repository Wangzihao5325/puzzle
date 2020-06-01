// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import {dateFormat} from '../utils/utils'
import {GAME_CACH} from '../global/piece_index'
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        shareWarp:cc.Node,
        content:cc.Node,
        bg: cc.Sprite,
        type: {
            type:Number,
            default:1
        },
        back:cc.Node,
        download:cc.Node,
        changeText:cc.Node,
        shareBtn:cc.Node,
        travelBtn:cc.Node,
        text1:cc.Label,
        text2:cc.Label,
        text3:cc.Label,
        text4:cc.Label,
        text5:cc.Label,
        text6:cc.Label,
        random:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()
        this.setTouch()
    },

    start () {

    },
    init(type){
        this.content.setPosition(cc.v2(0,-700))
        cc.tween(this.content)
        .to(.4,{position:cc.v2(0,100)})
        .to(.2,{position:cc.v2(0,0)},{easing:'expoInOut'})
        .start()
        this.handleChangeText()

        const imgUrl= CACHE.mission_press.logoUrl
        cc.loader.load(imgUrl, (err, texture)=> {
            this.bg.spriteFrame=new cc.SpriteFrame(texture)
        });
    },

    initSentence(type,text){
        const datastr=dateFormat((new Date()),'yyyy-MM-dd')
        this.text6.string=datastr

        const list =[0,6,7,8,9,9,9]
        const listL=[0,6,13,21,30,38]
        let newText=text.length>listL[listL.length-1]?text.slice(0,listL[listL.length-1]-2)+'...':text
        const lableList=[this.text1,this.text2,this.text3,this.text4,this.text5,this.text6,]
        let lableNum=5;
        const listLRevrse=listL.slice().reverse()
        listLRevrse.map((item,index)=>{

            if(newText.length<=item){
                lableNum=index*-1+listL.length-1
            }
        })
        console.log("lableNum",lableNum)
        for(let i=0;i<lableNum;i++){
            lableList[i].string=newText.slice(listL[i],listL[i+1])
        }
    },

    handleBack(){
        console.log("handleClose")
        this.shareWarp.active=false;
        cc.director.loadScene("mission");

    },

    setTouch() {
        this.back.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleBack()
            event.stopPropagation();
        })
        this.shareBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleShare()
            event.stopPropagation();
        })
        this.travelBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleContinue()
            event.stopPropagation();
        })
        this.changeText.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.handleChangeText()
            event.stopPropagation();
        })
        
    },
    handleShare(){
        console.log("点击分享")
    },

    handleContinue(){
        console.log("点击继续")

        cc.director.loadScene("mission");
    },
    handleChangeText(){
        console.log("点击随机")
        Api.travelComment(res=>{
            const text=res.data
            // const text=`加拿大警方应美国要求在温哥华国际机场逮捕孟晚舟，美方随后提出引渡要求，指控其“隐瞒华为和伊`
            if(GAME_CACH.textRandomTimes>0){
                GAME_CACH.textRandomTimes--;
                this.initSentence(0,text)
                this.random.string=GAME_CACH.textRandomTimes
    
            }else{
                Toast.show('随机已经使用完')
            }
        })



    },
    async updateCommon(){
        await Api.travelComment(res=>{
            return res.data
        })

    }
    // update (dt) {},
});
