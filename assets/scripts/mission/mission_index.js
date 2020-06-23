import { CACHE } from '../global/usual_cache';
import { SCENE, SCENE_KEY } from '../global/app_global_index';
import Action from '../api/api_action';
import { LEVEL_STAR } from '../global/piece_index';
import Api from '../api/api_index';

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
        starProgress: cc.Label,

        introduceRoot: cc.Node,
        introduceTitleLabel: cc.Label,
        introduceLabel: cc.Label,
        introduceMask: cc.Node,
        introduceClose: cc.Node,

        goodsItem: cc.Prefab,
        normalGoodsBg: cc.Sprite,
        rareGoodsBg: cc.Sprite,

        goodDetailRoot: cc.Node,
        goodDetailName: cc.Label,
        goodDetailIcon: cc.Sprite,
        goodSellTypeIcon: cc.Sprite,
        goodSellNum: cc.Label,
        goodDetailType: cc.Sprite,
        goodDetailTypeName: cc.Label,
        goodDetails: cc.Label,
        goodDetailsContent: cc.Sprite,
        goodDetailMask: cc.Sprite,
        goodDetailClose: cc.Sprite,
        goodDetailBg: cc.Sprite,
        goodLessReg: cc.Sprite,

        audio: {
            default: null,
            type: cc.AudioClip
        }
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
            cc.find("sound").getComponent("sound").tap()
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
            cc.find("sound").getComponent("sound").tap()
            this.introduceRoot.active = true;
            event.stopPropagation();
        });

        this.introduceClose.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.introduceClose.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.introduceClose.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.introduceRoot.active = false;
            event.stopPropagation();
        })

        this.introduceMask.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.introduceMask.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.introduceMask.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        })

        /*掉落物品详情时间绑定 */
        this.goodDetailClose.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.goodDetailClose.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.goodDetailClose.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()
            this.goodDetailRoot.active = false;
            event.stopPropagation();
        })

        this.goodDetailMask.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation();
        })
        this.goodDetailMask.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
        })
        this.goodDetailMask.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
        })
    },

    renderGoodsDetail(item) {
        if (item.goodsQuality == 0) {//普通物品
            this.goodDetails.node.color = cc.color(141, 141, 141);
            this.goodDetailsContent.node.color = cc.color(255, 255, 255);
            this.goodDetailBg.node.color = cc.color(234, 234, 234);
            this.goodLessReg.node.active = false;
        } else {//稀有物品
            this.goodDetails.node.color = cc.color(255, 255, 255);
            this.goodDetailsContent.node.color = cc.color(212, 181, 156);
            this.goodDetailBg.node.color = cc.color(255, 247, 206);
            this.goodLessReg.node.active = true;
        }
        this.goodDetailName.string = item.name;
        this.goodSellNum.string = item.sellAmount;
        this.goodDetailIcon.node.scaleX = 0.4;
        this.goodDetailIcon.node.scaleY = 0.4;
        cc.loader.load(item.iconUrl, (err, texture) => {
            this.goodDetailIcon.spriteFrame = new cc.SpriteFrame(texture);
        });
        cc.loader.load(item.sellIconUrl, (err, texture) => {
            this.goodSellTypeIcon.spriteFrame = new cc.SpriteFrame(texture);
        });
        let typeName = '美食';
        let typeUrl = 'show/meishi';
        switch (item.goodsType) {
            case 1:
                typeName = '美食';
                typeUrl = 'show/meishi';
                break;
            case 3:
                typeName = '手工品';
                typeUrl = 'show/shougognpin';
                break;
            case 4:
                typeName = '纪念品';
                typeUrl = 'show/jininapin';
                break;
            case 5:
                typeName = '文物';
                typeUrl = 'show/wenwu';
                break;
        }
        this.goodDetailTypeName.string = typeName;
        cc.loader.loadRes(typeUrl, cc.SpriteFrame, (err, assets) => {
            this.goodDetailType.spriteFrame = assets
        });
        this.goodDetails.node.width = 220;
        this.goodDetails.string = item.introduce;
        this.goodDetailRoot.active = true;
    },

    goodsItemClick(item) {
        Api.goodsInfo(item.goodsId, (res) => {
            this.renderGoodsDetail(res.data);
        });
    },

    renderIntroduce() {
        if (CACHE.cityData) {
            /* 设置详情介绍*/
            this.introduceLabel.node.width = 500;
            this.introduceLabel.string = CACHE.cityData.introduceInfo;
            /* 生成掉落物品*/
            CACHE.cityData.goodsList.forEach((item, index) => {
                let Item = cc.instantiate(this.goodsItem);
                Item.scaleX = 0.5;
                Item.scaleY = 0.5;
                let obj = Item.getComponent('goodItemPro');
                if (obj) {
                    obj.initWithItem(item);
                    obj.setTouch((item) => this.goodsItemClick(item));
                }
                if (item.goodsQuality == 1) {
                    /*稀有物品*/
                    Item.parent = this.rareGoodsBg.node;
                    let xPosition = -200 + (index % 5) * 100;
                    Item.setPosition(cc.v2(xPosition, -20));
                } else {
                    /*普通物品*/
                    let xPosition = -200 + (index % 5) * 100;
                    Item.parent = this.normalGoodsBg.node;
                    Item.setPosition(cc.v2(xPosition, -20));
                }
            });
        }
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
            this.renderIntroduce();
            /**必须设置一个宽度才能自动换行 */
            this.shortIntroduceLabel.node.width = 600;
            this.shortIntroduceLabel.string = CACHE.cityData.introduceShort;
        });
        Action.Mission.MissionList((res) => {
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

    onLoad() {
        cc.find("sound").getComponent("sound").playBg()
    },

    start() {
        this.init();
    },

    onDestroy() {
    }
    // update (dt) {},
});
