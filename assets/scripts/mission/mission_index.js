import { CACHE } from '../global/usual_cache';
import { SCENE } from '../global/app_global_index';
import Action from '../api/api_action';

cc.Class({
    extends: cc.Component,

    properties: {
        shortIntroduceLabel: cc.Label,
        titleLabel: cc.Label,
        back: cc.Sprite,
        detail: cc.Sprite,
        scroll: cc.ScrollView,
        levelSelect: cc.Prefab,
        root: cc.Node
    },

    stateUpdate() {
        CACHE.scene = SCENE.MISSION;
    },

    goBack() {
        cc.director.loadScene("travel");
    },

    seeDetails() { },

    missionItemClickCallback(item) {
        CACHE.mission_press = item;

        if (!this._mission_select_obj) {
            let missionSelect = cc.instantiate(this.levelSelect);
            let obj = missionSelect.getComponent('mission_level_index');
            this._mission_select_obj = obj;
            if (obj) {
                obj.item_node = missionSelect;
                obj.initWithItem(item);
            }
            missionSelect.name = `mission_level`;
            missionSelect.parent = this.root;
            missionSelect.setPosition(cc.v2(0, 0));
        } else {
            this._mission_select_obj.item_node.active = true;
            this._mission_select_obj.initWithItem(item);
        }
    },

    btnSetTouch() {
        /*返回按钮事件绑定 */
        this.back.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.back.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.isMove = true;
            event.stopPropagation();
        });
        this.back.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
            if (!this.isMove) {
                this.goBack();
            }
            this.isMove = false;
        });

        /*详情按钮事件绑定 */
        this.detail.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.detail.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.isMove = true;
            event.stopPropagation();
        });
        this.detail.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
            if (!this.isMove) {
                this.seeDetails();
            }
            this.isMove = false;
        });
    },

    render() {
        let cityItem = CACHE.travel_city_press;
        this.titleLabel.string = cityItem.name;
        Action.Mission.CityDetails((res) => {
            /**必须设置一个宽度才能自动换行 */
            this.shortIntroduceLabel.node.width = 600;
            this.shortIntroduceLabel.string = CACHE.cityData.introduceShort;
        });
        Action.Mission.MissionList((res) => {
            /**获取关卡列表  */
            //console.log(CACHE.list)
            let obj = this.scroll.getComponent('mission_scroll_index');
            if (CACHE.list.length > 0) {
                obj.initWithArr(CACHE.list, (item) => this.missionItemClickCallback(item));
            }
        });
    },

    init() {
        this.stateUpdate();
        this.render();
        this.btnSetTouch();
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.init();
    },

    // update (dt) {},
});
