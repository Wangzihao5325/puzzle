cc.Class({
    extends: cc.Component,

    properties: {
        HIGH: 80,   //每一项的高度
        PAGE_NUM: 8,  //每一页8个项
        item_prefab: {  //项的资源预制体
            type: cc.Prefab,
            default: null,
        },
        scroll_view: { //获取scrollview组件
            type: cc.ScrollView,
            default: null,
        },
        scroll_content: {
            type: cc.Node,
            default: null
        }
    },

    initWithArr(arr, missionItemClickCallback) {
        let totalHeight = (Math.floor((arr.length - 1) / 2) + 1) * 380;
        this.scroll_content.height = totalHeight;
        arr.forEach((item, index) => {
            console.log(item);
            let cloumn = Math.floor(index / 2);
            let row = index % 2;
            let positionX = row * 320 - 160;
            let positionY = -380 / 2 - 10 - (380 * cloumn - 1);
            let missionItemNode = cc.instantiate(this.item_prefab);
            let obj = missionItemNode.getComponent('mission_item_index');
            if (obj) {
                obj.initWithItem(item, missionItemClickCallback);
            }
            missionItemNode.name = `mission_item-${item.hurdleName}`;
            missionItemNode.parent = this.scroll_content;
            missionItemNode.setPosition(cc.v2(positionX, positionY));
        });
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
