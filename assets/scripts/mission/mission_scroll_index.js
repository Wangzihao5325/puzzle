import { CACHE } from '../global/usual_cache';
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
        },
        scrollMask: cc.Node,
        guideNode: cc.Node,
    },

    initWithArr(arr, missionItemClickCallback) {
        if (CACHE.platform.isIphoneX) {
            this.scroll_view.height = 1000;
            this.scrollMask.height = 1000;
        }
        let totalHeight = (Math.floor((arr.length - 1) / 2) + 1) * 380;
        this.scroll_content.height = totalHeight;
        this.guideNode.height = totalHeight;
        let locationPosition = null;
        let locationIndex = 0;
        arr.forEach((item, index) => {
            let cloumn = Math.floor(index / 2);
            let row = index % 2;
            let positionX = row * 320 - 160;
            let positionY = -380 / 2 - 10 - (380 * cloumn - 1);
            let missionItemNode = cc.instantiate(this.item_prefab);
            let obj = missionItemNode.getComponent('mission_item_index');
            if (obj) {
                obj.initWithItem(item, missionItemClickCallback);
            }
            missionItemNode.name = `mission_item-${item.hurdleId}`;
            missionItemNode.parent = this.scroll_content;
            missionItemNode.setPosition(cc.v2(positionX, positionY));

            if (item.lock == false && item.star == 0) {
                locationPosition = cc.v2(positionX, positionY);
                locationIndex = index;
            }
        });
        if ((locationPosition && CACHE.userInfo.stage == 99) || !CACHE.isShowGuide) {
            let srcollPercent = (Math.floor(locationIndex / 2)) / Math.ceil(arr.length / 2);
            this.scroll_view.scrollToPercentVertical(1 - srcollPercent, 2)
            //this.scroll_view.scrollTo(locationPosition, 2);
        }
        this.guideNode._private_location = locationPosition;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
