import { MASK_RESOUSE } from '../global/piece_index';

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

        for(let i=1;i<=6;i++){
            setTimeout(()=>{
                this.borderWidth(i)
            },i*30)
        }

        for(let i=6;i>=0;i--){
            setTimeout(()=>{
                this.borderWidth(i)
            },(6-i)*30+200)
        }
        

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


    borderWidth(width){
        let material= this.border.getMaterial(0);
        material.setProperty("glowRange", width);
        this.border.setMaterial(0, material);
        // if(with===)
    },


    start() {

    },

});
