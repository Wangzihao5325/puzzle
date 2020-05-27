// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { SCALELEAVEL,spliceArr } from '../global/piece_index';


 function loadingPic() {
    cc.loader.loadRes("background/haixianbg", cc.SpriteFrame, (err, spriteFrame) => {
        this.spframe_puzzle = spriteFrame;
        initItem(0);
        //self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
}

function init(hardLevel, imagePath) {
    /* 设置底部栏的水平滑动*/
    this.game_bg.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
        if (this.game_bg) {
            let delta = event.touch.getDelta();
            if ((this.game_bg.x + delta.x < this.game_bg.width - 322) && (this.game_bg.x + delta.x > 322 - this.game_bg.width)) {
                let newPositin = cc.v2(this.game_bg.x + delta.x, this.game_bg.y)
                this.game_bg.setPosition(newPositin);
            }
        }
    });

    /*动态加载资源*/
    cc.loader.loadRes(imagePath, cc.SpriteFrame, (err, spriteFrame) => {
        if (spriteFrame) {
            this.spframe_puzzle = spriteFrame;
            /*初始化所有的块*/
            this.initItem(hardLevel);
        } else {
            cc.error(err);
        }
    });

}

function initItem(SIZES,hardLevel,sortType=0,pre_item, game_bg,spframe_puzzle,resort=false) {
    /*根据难度取对应切片数据*/
    let sizeArr = SIZES[hardLevel];
    const scalLeavel= SCALELEAVEL[hardLevel]
    /*拼图块排序*/
    // const orderByRandom = orderByRandom(sizeArr)

    const reSortSizeArr = sortType? orderByBorder(SIZES[0],hardLevel):orderByRandom(sizeArr)
    spliceArr.splice(0,1,reSortSizeArr)
    //遍历size根据size生成item
    if(resort){
        var spliceWarp = cc.find(`Canvas/root/spliceWarp`)
        var children=spliceWarp.children

        children.map(item=>{
            let index;
            reSortSizeArr.map((reitem,i)=>{
                if(reitem[6]==item.defaultIndex){
                    index=i
                }
            })
            let position = cc.v2( (120 * (index+0.5)) + 10, 0)
            item.setPosition(position);
        })
    }else{
        var spliceWarp = cc.find(`Canvas/root/spliceWarp`)

        spliceWarp.width=(120*(reSortSizeArr.length+0.5)+10)

        reSortSizeArr.forEach((item, index) => {
            let item_node = cc.instantiate(pre_item);
            item_node.width = item[2] * scalLeavel;
            item_node.height = item[3] * scalLeavel;
            item_node.name = `item_puzzle_splice-${item[6]}`
            item_node.defaultIndex = `${item[6]}`
            item_node.defaultPostion = [item[4], item[5]]
            item_node.getChildByName('item_puzzle').width = item[2] * scalLeavel;
            item_node.getChildByName('item_puzzle').height = item[3] * scalLeavel;
            item_node.parent = game_bg;
            //应该要根据规格进行优化
            let position = cc.v2( (120 * (index+0.5)) + 10, 0);
            item_node.setPosition(position);
            let obj = item_node.getComponent('splice_item_index');
            if (obj) {
                /*保存引用*/
                obj.item_node = item_node;
                //设置切片编号，便于测试
                obj.init(item[6]);
                /*底图切片*/
                obj.setSpItem(defaultRect(item,spframe_puzzle));
                /*添加蒙版*/
                obj.setMarsk(item[6], hardLevel);
                /*拖拽手势+高难度下的旋转手势*/
                obj.setTouch(hardLevel);
                /*设置随机旋转*/
                obj.setRandomRotation(hardLevel);
            }
        });
    }
 


    return reSortSizeArr
}


function defaultRect(item,spframe_puzzle) {
    let rect = new cc.Rect(item[0], item[1], item[2], item[3]);
    let spframe_puzzle_clone = spframe_puzzle.clone();
    spframe_puzzle_clone.setRect(rect);
    return spframe_puzzle_clone
}

//随机打乱
function orderByRandom(arr){
    return  arr.sort(function() {
         return .5 - Math.random();
     });
 }

 //边框排序
 function orderByBorder(arr,hardLevel){
    const hardLeavelSore=[[2,3],[4,6],[6,8]]
    const x=hardLeavelSore[hardLevel][0]
    const y=hardLeavelSore[hardLevel][1]
    const arryIndex=[]
    orderByRandom(arr).map((item,index)=>{
        const i =item[6]+1
        if(i<=x||i%x==1||i%x==0||i>=x*(y-1)){
            item[7]=item[6]
        }else{
            item[7]=100
        }
        arryIndex.push(item)
    })
    
    return  arryIndex.sort(function(firstEl,secondEl) {
        return firstEl[7]-secondEl[7]

    });
 }


 export  {
    initItem,
    orderByBorder
  };
  