import { MASK_RESOUSE } from '../global/piece_index';
import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        mask_item: cc.Mask,
        border: cc.Sprite,
        borderNode:cc.Node,
    },

    setMarsk(index, hardLevel) {
        const self = this;
        let urls = MASK_RESOUSE[hardLevel];
        cc.loader.loadRes(urls[index], cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            self.mask_item.spriteFrame = assets;
            self.border.spriteFrame = assets
        });
    },

    borderAnimate() {
        // let material= this.borderNode.getMaterial(0);
        // material.setProperty("spriteWidth", 30);
        // material.setProperty("spriteHeight", 30);
        // this.borderNode.setMaterial(0, material);
        let width=400
        let borderScale=1
        if(CACHE.hard_level===0){
            width=400
            borderScale=1
        }
        if(CACHE.hard_level===1){
            width=400
            borderScale=3
        }else if(CACHE.hard_level===2){
            width=400
            borderScale=3

        }
        else if(CACHE.hard_level===3){
            width=400
            borderScale=3

        }
        else if(CACHE.hard_level===4){
            width=500
            borderScale=1

        }
        console.log("CACHE.hard_level",CACHE.hard_level,width,borderScale)

        // let material= this.border.getMaterial(0);
        // material.setProperty("spriteWidth", width);
        // material.setProperty("spriteHeight", width);
        // this.border.setMaterial(0, material);

        // for(let i=2;i<=6;i++){
        //     setTimeout(()=>{
        //         this.borderWidth(i*borderScale,width)
        //     },i*70)
        // }
        setTimeout(()=>{
            this.borderWidth(2*borderScale,width)
        },2*70)
        setTimeout(()=>{
            this.borderWidth(4*borderScale,width)
        },3*70)
        setTimeout(()=>{
            this.borderWidth(5*borderScale,width)
        },4*70)
        setTimeout(()=>{
            this.borderWidth(5.8*borderScale,width)
        },5*70)
        setTimeout(()=>{
            this.borderWidth(6*borderScale,width)
        },6*70)

        setTimeout(()=>{
            this.borderWidth(6*borderScale,width)
        },7*70)
        setTimeout(()=>{
            this.borderWidth(5.8*borderScale,width)
        },8*70)
        setTimeout(()=>{
            this.borderWidth(5*borderScale,width)
        },9*70)
        setTimeout(()=>{
            this.borderWidth(4*borderScale,width)
        },10*70)
        setTimeout(()=>{
            this.borderWidth(2*borderScale,width)
        },11*70)
        setTimeout(()=>{
            this.borderWidth(0,width)
        },12*70)


        // for(let i=6;i>=0;i--){
        //     if(i===1){
        //         continue;
        //     }
        //     setTimeout(()=>{
        //         this.borderWidth(i*borderScale,width)
        //     },(6-i)*70+320)
        // }
        

        // cc.tween(this.border.node)+++++++++++++++++++++++
        //     .to(0.5, { opacity: 10 })
        //     .to(0.5, { opacity: 30 })
        //     .to(0.5, { opacity: 80 })
        //     .to(0.3, { opacity: 255 })
        //     .delay(0.2)
        //     .to(0.3, { opacity: 80 })
        //     .to(0.5, { opacity: 30 })
        //     .to(0.5, { opacity: 10 })
        //     .to(0.5, { opacity: 0 })
        //     .start();
    },


    borderWidth(glowRange,width){
        let material= this.border.getMaterial(0);
        material.setProperty("glowRange", glowRange);
        material.setProperty("spriteWidth", width);
        material.setProperty("spriteHeight", width);
        this.border.setMaterial(0, material);
        // if(with===)
    },


    start() {

    },

});
