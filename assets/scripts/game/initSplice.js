import { SCALELEAVEL, SIZES, spliceArr, PUZZLE_FOOTER, PUZZLE_SCENE, GAME_CACHE,TYPES } from '../global/piece_index';

function initItem(SIZES, hardLevel, sortType = 0, pre_item, game_bg, spframe_puzzle, resort = false, isAnimate = false, showAnimation = false) {
    /*根据难度取对应切片数据*/
    // let sizeArr = [...SIZES[hardLevel]];
    const scalLeavel = SCALELEAVEL[hardLevel]
    /*拼图块排序*/
    let reSortSizeArr;
    switch (sortType) {
        case 0:
            reSortSizeArr = orderByRandom([...SIZES[hardLevel]])
            break;
        case 1:
            reSortSizeArr = orderByBorder(SIZES, hardLevel);
            break;
        case 2:
            reSortSizeArr = SIZES;
            break;
    }
    GAME_CACHE.spliceArr = reSortSizeArr
    /*遍历size根据size生成item*/
    if (resort) {
        var spliceWarpContent = cc.find(`Canvas/footerWarp/spliceWarp/spliceScrollView/view/content`)

        /*同步底部栏长度*/
        let reallyWidth = (PUZZLE_FOOTER.itemWidth * reSortSizeArr.length + PUZZLE_FOOTER.itemWidthMargin);
        if (spliceWarpContent.width + PUZZLE_FOOTER.truePosition[0] <= PUZZLE_SCENE.width) {
            let newPositionX = Math.min(PUZZLE_FOOTER.truePosition[0] + PUZZLE_FOOTER.itemWidth, PUZZLE_FOOTER.position[0]);
            spliceWarpContent.x = newPositionX;
            PUZZLE_FOOTER.truePosition[0] = newPositionX;
        }
        const spliceWarpWidth = (reSortSizeArr.length - 0.5) * 120 + 60;
        spliceWarpContent.width = spliceWarpWidth


        const spliceWarpX = spliceWarpContent.x
        var children = spliceWarpContent.children
        if (spliceWarpWidth < 510) {
            const spliceWarpX = -spliceWarpWidth / 2
        }
        children.map(item => {
            let index;
            reSortSizeArr.map((reitem, i) => {
                if (reitem[6] == item.defaultIndex) {
                    index = i
                }
            })
            const positionX = (index + .5) * 120
            let position = cc.v2(positionX, 0);
            let onViewr = positionX + spliceWarpContent.x > -400 && positionX + spliceWarpContent.x < 400
            item.opacity = onViewr ? 255 : 0
            if (isAnimate) {
                cc.tween(item)
                    .to(0.5, { position: position })
                    .start();
            } else {
                item.setPosition(position);
            }
        })

        // spliceWarpContent.setPosition(cc.v2(0,115))

    } else {
        var spliceWarpContent = cc.find(`Canvas/footerWarp/spliceWarp/spliceScrollView/view/content`)
        spliceWarpContent.width = (reSortSizeArr.length - 0.5) * 120 + 60

        // spliceWarp.width = 640;
        reSortSizeArr.forEach((item, index) => {
            let item_node = cc.instantiate(pre_item);
            item_node.width = item[2];
            item_node.height = item[3];
            item_node.name = `item_puzzle_splice-${item[6]}`
            item_node.defaultIndex = `${item[6]}`
            item_node.defaultPostion = [item[4], item[5] - 10]

            cc.find('content', item_node).width = item[2];
            cc.find('content', item_node).height = item[3];
            // cc.find('content/item_puzzle',item_node).width = item[2] * scalLeavel;
            // cc.find('content/item_puzzle',item_node).height = item[3] * scalLeavel;
            cc.find('shadow/shadowLayout', item_node).width = item[2];
            cc.find('shadow/shadowLayout', item_node).height = item[3];
            cc.find('shadow', item_node).width = item[2];
            cc.find('shadow', item_node).height = item[3];
            if (showAnimation) {

                //第一次进入执行掉落动画
                var puzzleBg = cc.find(`Canvas/root/puzzleWarp/puzzleBg`);
                const newNode = cc.instantiate(item_node)
                // newNode.parent = puzzleBg;
                newNode.parent = cc.find('Canvas');
                // newNode.setScale(1)
                newNode.zIndex = 11 + index
                const position = cc.v2(item[4], item[5] - 10)
                newNode.setPosition(position);
                newNode.defaulSpliceX = (index + 0.5) * 120
                let obj = newNode.getComponent('splice_item_index');
                if (obj) {
                    /*保存引用*/
                    obj.item_node = item_node;
                    //设置切片编号，便于测试
                    obj.init(item[6]);
                    /*底图切片*/
                    // obj.setSpItem(defaultRect(item, spframe_puzzle));
                    obj.setSpItem(spframe_puzzle, item);
                    /*添加蒙版*/
                    obj.setMarsk(item[6], hardLevel);
                    /*拖拽手势+高难度下的旋转手势*/
                    obj.setTouch(hardLevel);
                    /*设置随机旋转*/
                    obj.setRandomRotation(hardLevel);
                }
                item_node.opacity = 0
            }

            item_node.setScale(scalLeavel)

            item_node.parent = spliceWarpContent;
            item_node.zIndex = 10

            // spliceWarp.addChild(item_node, index);


            let position = cc.v2((index + 0.5) * 120, 0);
            item_node.setPosition(position);

            //设置显示隐藏提高性能



            //应该要根据规格进行优化

            let obj = item_node.getComponent('splice_item_index');
            if (obj) {
                /*保存引用*/
                obj.item_node = item_node;
                //设置切片编号，便于测试
                obj.init(item[6]);
                /*底图切片*/
                // obj.setSpItem(defaultRect(item, spframe_puzzle));
                obj.setSpItem(spframe_puzzle, item);
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


function defaultRect(item, spframe_puzzle) {
    let rect = new cc.Rect(item[0], item[1], item[2], item[3]);
    let spframe_puzzle_clone = spframe_puzzle.clone();
    spframe_puzzle_clone.setRect(rect);
    return spframe_puzzle_clone
}

//随机打乱
function orderByRandom(arr) {
    return arr.sort(function () {
        return .5 - Math.random();
    });
}

//边框排序
function orderByBorder(arr, hardLevel) {
    const hardLeavelSore = TYPES;
    const x = hardLeavelSore[hardLevel][0]
    const y = hardLeavelSore[hardLevel][1]
    const arryIndex = []
    orderByRandom(arr).map((item, index) => {
        const i = item[6] + 1
        if (i <= x || i % x == 1 || i % x == 0 || i >= x * (y - 1)) {
            item[7] = item[6]
        } else {
            item[7] = 100
        }
        arryIndex.push(item)
    })

    return arryIndex.sort(function (firstEl, secondEl) {
        return firstEl[7] - secondEl[7]

    });
}


export {
    initItem,
    orderByBorder
};
