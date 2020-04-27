// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        ske_anim: {
            type: sp.Skeleton, // 
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    headSlotChange() {
        var spine = this.ske_anim;
        var ske_com = spine.getComponent(sp.Skeleton);
        this.ske_com = ske_com;
        const skeletonData = this.ske_com.skeletonData.getRuntimeData();
        const skin = skeletonData.findSkin('default');

        let parts = ["Ctoushi00", "Cboshi00", "Cweishi00"]//["toushi00", "boshi00", "weishi00"];
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

    start() {

    },

    // update (dt) {},
});
