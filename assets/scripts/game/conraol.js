// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { SIZES,MASK_RESOUSE, LEVEL,SCALELEAVEL, complateIndex, underwayIndex,spliceArr,currentLeavel } from '../global/piece_index';

import { initItem,  }  from './initSplice';


cc.Class({
    extends: cc.Component,

    properties: {
        magnet: cc.Node,
        sort: cc.Node,
        game_bg: cc.Node,
        pre_item: cc.Prefab,
        spframe_puzzle: cc.SpriteFrame,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setTouch()
    },

    start () {

    },

    doMagnet(){
        console.log("磁铁",underwayIndex,SIZES[currentLeavel].length,complateIndex.length)
        // var puzzleBg = cc.find(`Canvas/root/puzzleWarp/puzzleBg`);
        this.checkComplate()
        if(underwayIndex&&underwayIndex.length){
            const index=underwayIndex[0]
            var currentNode = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_splice-${index}`)
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${index}`);
            console.log("有正在拼图的块",index,currentNode)

            cc.tween(currentNode).to(0,{position:cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1])},{ easing: 'sineOutIn'})
            currentNode.destroy()
            item_puzzle_warp.destroy()
            complateIndex.push(index)
            underwayIndex.remove(index)
            this.checkComplate()
        }else{

        
        var spliceWarp = cc.find(`Canvas/root/spliceWarp`)
        const spliceWarpChildren=spliceWarp.children[0]
        // console.log("spliceWarpChildren",spliceWarpChildren)
        const currentNode= spliceWarpChildren

        currentNode.setScale(1/SCALELEAVEL[currentLeavel]);
        currentNode.zIndex=100;


        let newPositin = cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1]);
        // currentNode.runAction( cc.sequence(cc.moveTo(newPositin),400) );
        cc.tween(currentNode).to(0,{position:cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1])},{ easing: 'sineOutIn'})
        var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${currentNode.defaultIndex}`);
 
        item_puzzle_warp.active = false;

        const index=currentNode.defaultIndex
        complateIndex.push(index)
        underwayIndex.remove(index)

        currentNode.destroy()
        this.checkComplate()
       
        currentNode.active=false
        }        

    },

    doSort(){
        console.log("spliceArr",spliceArr)
        initItem(spliceArr,currentLeavel,1,this.pre_item,this.game_bg,this.spframe_puzzle,true)

    },

    setTouch(hardLevel) {
        this.magnet.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.doMagnet()
            event.stopPropagation();
        })
        this.sort.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.doSort()
            event.stopPropagation();
        })
    },

    checkComplate(){
        if(SIZES[currentLeavel].length==complateIndex.length){
            Toast.show("拼图完成",1000);
            return false
        }
    },
    // update (dt) {},
});
