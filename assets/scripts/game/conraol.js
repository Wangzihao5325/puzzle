// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { MASK_RESOUSE, LEVEL,SCALELEAVEL } from '../global/piece_index';


cc.Class({
    extends: cc.Component,

    properties: {
        magnet: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setTouch()
    },

    start () {

    },

    doMagnet(){
        const hardLevel = 'HARD'
        console.log("磁铁")
        // var puzzleBg = cc.find(`Canvas/root/puzzleWarp/puzzleBg`);
        var spliceWarp = cc.find(`Canvas/root/spliceWarp`)
        const spliceWarpChildren=spliceWarp.children[0]
        // console.log("spliceWarpChildren",spliceWarpChildren)
        const currentNode= spliceWarpChildren

        currentNode.setScale(1/SCALELEAVEL[hardLevel]);
        currentNode.zIndex=100;


        let newPositin = cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1]);
        // currentNode.runAction( cc.sequence(cc.moveTo(newPositin),400) );
        cc.tween(currentNode).to(0,{position:cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1])},{ easing: 'sineOutIn'})
        var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${currentNode.defaultIndex + 1}`);
 
        item_puzzle_warp.active = false;

        currentNode.destroy()

       
        currentNode.active=false
        

    },

    setTouch(hardLevel) {
        this.magnet.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.doMagnet()
            event.stopPropagation();
        })
    }
    // update (dt) {},
});
