// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// import { CHACH  } from '../global/usual_cache';


cc.Class({
    extends: cc.Component,

    properties: {
        content:cc.Node,
        title:cc.Label,
        icon:cc.Sprite,
        iconNode:cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {
    },


    init(data) {
        console.log("data",data)
        const {name,amount,indexY,icon,timer=2000}=data
        this.title.string=`${name}x${amount}`
        if(icon){
            cc.loader.load(icon, (err, texture) => {
              this.icon.spriteFrame = new cc.SpriteFrame(texture)
              const h=texture.height
              const w=texture.width
              const wh=w>h
              this.iconNode.height=parseInt( wh?40*h/w:40)
              this.iconNode.width=parseInt(wh?40:40*w/h)
            });
          }

          const positionY=80*indexY
          this.content.setScale(2)
          cc.tween(this.content)
            .to(0.3,{position: cc.v2(0, positionY),opacity:255,scale:1})
            .delay(timer/1000)
            .to(0.4,{position: cc.v2(0, positionY+200),opacity:0})
            .call(()=>{
                this.content.destroy()
            })
            .start()


    },







    // update (dt) {},
});
