import { CACHE } from '../global/usual_cache';
import { IMAGE_SERVER } from '../global/app_global_index';

cc.Class({
    extends: cc.Component,

    properties: {
        text_times: cc.RichText,
        text_award: cc.RichText,
        text_condition: cc.RichText,

        titleIcon: cc.Sprite,
        titleText: cc.Label,

        mask: cc.Node,
        closeBtn: cc.Node

    },

    setTouch() {
        //mask遮罩
        this.mask.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.mask.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.mask.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        })
        //closeBtn
        this.closeBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.closeBtn.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.node.active = false;
            event.stopPropagation();
        })
    },
    /**
     * awardGoodNum: 200
    awardType: 12
    awardUnit: "钻石"
    buffId: 70001
    currentNum: 0
    endTime: 1592820244000
    festivalId: 975
    name: "美食节"
    reachCount: 4
    received: false
     */
    show() {
        const showData = CACHE.showData;
        let typeName = '';
        let titleImagePath = '';
        let titleText = '';
        switch (showData.festivalInfo.buffId) {
            case 70001://美食节
                typeName = '美食';
                titleImagePath = 'show/meishi';
                titleText = '美食节';
                break;
            case 70002://手工达人
                typeName = '手工';
                titleImagePath = 'show/shougognpin';
                titleText = '手工达人';
                break;
            case 70004://艺术品
                typeName = '艺术品';
                titleImagePath = 'show/jininapin';
                titleText = '艺术品';
                break;
            case 70005://博物展
                typeName = '文物';
                titleImagePath = 'show/wenwu';
                titleText = '博物展';
                break;
        }
        let currentNum = showData.festivalInfo.currentNum;
        let reachCount = showData.festivalInfo.reachCount;
        let awardGoodNum = showData.festivalInfo.awardGoodNum;
        let awardGoodName = showData.festivalInfo.awardUnit;
        this.text_times.string = `<color=#000000>参与次数：<color=#88736c>${currentNum}</color>/${reachCount}次</c>`;
        this.text_award.string = `<color=#000000>奖励：     ${awardGoodName}x<color=#88736c>${awardGoodNum}</color></c>`;
        this.text_condition.string = `<color=#000000>参加条件：展览<color=#88736c>【${typeName}】</color>相关物品</c>`;

        this.titleText.sting = titleText;
        cc.loader.loadRes(titleImagePath, cc.SpriteFrame, (err, asset) => {
            this.titleIcon.spriteFrame = asset;
        });

        this.node.active = true;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setTouch();
    },

    start() {

    },

    // update (dt) {},
});
