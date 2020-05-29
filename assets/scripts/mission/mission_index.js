import { CACHE } from '../global/usual_cache';
import { SCENE, SCENE_KEY } from '../global/app_global_index';
import Action from '../api/api_action';
import { LEVEL_STAR } from '../global/piece_index';

cc.Class({
    extends: cc.Component,

    properties: {
        shortIntroduceLabel: cc.Label,
        titleLabel: cc.Label,
        back: cc.Sprite,
        detail: cc.Sprite,
        scroll: cc.ScrollView,
        levelSelect: cc.Prefab,
        root: cc.Node,
        bg: cc.Sprite,
        cityBg: cc.Sprite,
        cityBgNode: cc.Node,
        starProgress: cc.Label
    },

    stateUpdate() {
        CACHE.scene = SCENE.MISSION;
    },

    setBg() {
        const bg_assets = CACHE.assets.bg;
        let missionBgTex = bg_assets[SCENE_KEY.MISSION];
        this.bg.spriteFrame = new cc.SpriteFrame(missionBgTex);
        cc.loader.loadRes(CACHE.travel_city_press.banner, cc.SpriteFrame, (err, assert) => {
            this.cityBg.spriteFrame = assert;
            this.cityBgNode.x = CACHE.travel_city_press.bannerPosition[0];
            this.cityBgNode.y = CACHE.travel_city_press.bannerPosition[1];
        })
    },

    goBack() {
        cc.director.loadScene("travel");
    },

    seeDetails() { },

    missionItemClickCallback(item) {
        CACHE.mission_press = item;
        CACHE.chapterData = item;
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
            event.stopPropagation();
        });
        this.back.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
            this.goBack();
        });

        /*详情按钮事件绑定 */
        this.detail.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        });
        this.detail.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        });
        this.detail.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
            this.seeDetails();
        });
    },

    starCal() {
        if (CACHE.list) {
            let totalStar = CACHE.list.length * LEVEL_STAR;
            let star_have = 0;
            CACHE.list.forEach(item => {
                star_have = star_have + item.star;
            });
            let starProgressStr = `${star_have}/${totalStar}`;
            this.starProgress.string = starProgressStr;
        }
    },

    render() {
        let cityItem = CACHE.travel_city_press;
        this.titleLabel.string = cityItem.name;
        Action.Mission.CityDetails((res) => {
            console.log('details here');
            console.log(res);
            /**必须设置一个宽度才能自动换行 */
            this.shortIntroduceLabel.node.width = 600;
            this.shortIntroduceLabel.string = CACHE.cityData.introduceShort;
        });
        Action.Mission.MissionList((res) => {
            console.log('list here');
            console.log(res);
            /**获取关卡列表  */
            this.starCal();
            let obj = this.scroll.getComponent('mission_scroll_index');
            if (CACHE.list.length > 0) {
                obj.initWithArr(CACHE.list, (item) => this.missionItemClickCallback(item));
            }
        });
    },

    init() {
        this.stateUpdate();
        this.setBg();
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
