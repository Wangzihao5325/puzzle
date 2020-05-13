// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { SIZES,MASK_RESOUSE, LEVEL,SCALELEAVEL, complateIndex, underwayIndex,spliceArr,currentLeavel,coutnDown } from '../global/piece_index';

import { initItem,  }  from './initSplice';
import GLOBAL_VAR from '../global/index'


cc.Class({
    extends: cc.Component,

    properties: {
        magnet: cc.Node,
        sort: cc.Node,
        pauseBtn: cc.Node,
        game_bg: cc.Node,
        pre_item: cc.Prefab,
        spframe_puzzle: cc.SpriteFrame,
        countDown_label: cc.Label,
        pause: cc.Prefab,
        game_root: cc.Node,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setTouch()
        this.timer(GLOBAL_VAR.time)
        console.log("GLOBAL_VAR.time",GLOBAL_VAR.time)
    },

    start () {

    },

    doMagnet(){
        console.log("磁铁")
        // var puzzleBg = cc.find(`Canvas/root/puzzleWarp/puzzleBg`);
        if(this.checkComplate()){
            return false
        }

        if(underwayIndex&&underwayIndex.length){
            const index=underwayIndex[0]
            var currentNode = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_splice-${index}`)
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${index}`);

            // console.log("有正在拼图的块",index,currentNode)

            cc.tween(currentNode)
                .to(.4, { position: cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1])})
                .start()

            setTimeout(()=>{
                currentNode.destroy()
                item_puzzle_warp.destroy()
                complateIndex.push(index)
                underwayIndex.remove(index)
                this.checkComplate()
            },400)

        }else{
            // console.log("spliceArr",spliceArr[0])
            var spliceWarp = cc.find(`Canvas/root/spliceWarp`)
            const spliceWarpChildren=spliceWarp.children[0]
            // console.log("spliceWarpChildren",spliceWarpChildren)
            const currentNode= spliceWarpChildren
            // const Index=spliceArr[0][0][6]
            // const currentNode= cc.find(`Canvas/root/spliceWarp/item_puzzle_splice-${Index}`)
            var puzzleBg = cc.find(`Canvas/root/puzzleWarp/puzzleBg`);
            currentNode.parent = puzzleBg;
            currentNode.zIndex = 100;
            let newPositin = cc.v2(0,-540);
            currentNode.setPosition(newPositin)
            currentNode.zIndex=1000;
            var item_puzzle_warp = cc.find(`Canvas/root/puzzleWarp/puzzleBg/item_puzzle_warp-${currentNode.defaultIndex}`);

            cc.tween(currentNode)
            .to(.4, { position: cc.v2(currentNode.defaultPostion[0], currentNode.defaultPostion[1]),scale:1/SCALELEAVEL[currentLeavel],angle:0})
            .start()

            const index=currentNode.defaultIndex
            complateIndex.push(index)
            underwayIndex.remove(index)
            setTimeout(()=>{
                currentNode.destroy()

                // let newspliceArr=spliceArr
                // spliceArr.splice(0,1,newspliceArr[0].splice(0,1)) 
                // console.log('newspliceArr',newspliceArr)

                item_puzzle_warp.destroy()
                this.checkComplate()
            },400)
        }        

    },

    doSort(){
        // console.log("spliceArr",spliceArr)
        if(this.checkComplate()){
            return false
        }
        initItem(spliceArr,currentLeavel,1,this.pre_item,this.game_bg,this.spframe_puzzle,true)

    },
    gamePause(){
        let pauseWarp = cc.instantiate(this.pause);
        // let sizeArr = SIZES[hardLevel];
        // spliceWarp_node.width = sizeArr.length * 140 + 20;
        // spliceWarp_node.height = 120;
        GLOBAL_VAR.pause=true
        pauseWarp.parent = this.game_root;
        pauseWarp.setPosition(0, 0);
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
        this.pauseBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.gamePause()
            event.stopPropagation();
        })
    },

    checkComplate(){
        if(SIZES[currentLeavel].length==complateIndex.length){
            Toast.show("拼图完成",1000);
            return true
        }else{
            return false
        }
    },
    timer(time){
        setTimeout(()=>{
            if (!GLOBAL_VAR.pause&&time>0){
                time--;
                // GLOBAL_VAR.time=time
                this.countDown_label.string= this.formatTimer(time)
                // console.log("")
                this.timer(time)
            }else if(!GLOBAL_VAR.pause&&time==0){
                Toast.show("倒计时结束",1000);
            }
            else{
                Toast.show("倒计时停止",1000);

                // this.timer(time)
            }
        },1000)
    },
    formatTimer(time){
        if(time>=60*60*10){
            return `${parseInt(time/60*60)}:${parseInt((time-60*60)/60)}:${time%60}`
        }
        else if(time>=60*60){
            return `0${parseInt(time/60*60)}:${parseInt((time-60*60)/60)}:${time%60}`
        }
        else if(60*60>time&&time>60){
            return `${parseInt(time/60) }:${time%60}`
        }else if(time>=10){
            return `00:${time}`
        }else{
            return `00:0${time}`
        }
    },

    // update (dt) {},
});
