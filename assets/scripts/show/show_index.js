import { CACHE } from '../global/usual_cache';
import { SCENE, SCENE_KEY } from '../global/app_global_index';
import Action from '../api/api_action';

cc.Class({
    extends: cc.Component,

    properties: {
        root: cc.Node,
        root_bg: cc.Sprite,
        table: cc.Node,
        footer: cc.Prefab,
        header: cc.Prefab,
        vistor: cc.Prefab,

        festivalName: cc.Label,
        festivalIcon: cc.Sprite,
        festivalProgress: cc.Label,

        showcase: cc.Prefab,
    },

    stateUpdate() {
        CACHE.scene = SCENE.SHOW;
    },

    setBg() {
        const bg_assets = CACHE.assets.bg;
        let showBgTex = bg_assets[SCENE_KEY.SHOW];
        this.root_bg.spriteFrame = new cc.SpriteFrame(showBgTex);
    },

    footerInit() {
        let footer = cc.instantiate(this.footer);
        let obj = footer.getComponent('navi_footer');
        obj.initWithScene(CACHE.scene);
        footer.parent = this.root;
        footer.setPosition(0, -500);
        footer.zIndex = 10;
    },

    headerInit() {
        let header = cc.instantiate(this.header);
        let obj = header.getComponent('header_warp_index');
        obj.render();
        header.parent = this.root;
        header.setPosition(0, 528);
        header.zIndex = 10;
    },

    showcaseInit(standInfoList) {
        standInfoList.forEach((item, index) => {
            let showcaseNode = cc.instantiate(this.showcase);
            showcaseNode.parent = this.table;
            showcaseNode.setPosition(-210 + (index * 210), 58);
            let obj = showcaseNode.getComponent('showcase_index');
            if (obj) {
                obj.initWithItem(item);
            }
        });
    },

    /*
    payload={
        startPosition:[x,y],
        pausePosition:[x,y],
        endPosition:[x,y],
        //  period必须为2的整数倍,推荐速度 200pt/s
        firstPeriod:number,
        secondPeriod:number,
        pausePeriod:number,
    }
    */
    vistorInit(payload) {
        let vistor = cc.instantiate(this.vistor);
        let obj = vistor.getComponent('vistor_index');
        vistor.parent = this.root;
        vistor.setPosition(payload.startPosition[0], payload.startPosition[1]);
        let firstDriection = payload.pausePosition[0] - payload.startPosition[0];
        let secondDriection = payload.endPosition[0] - payload.pausePosition[0];
        /*动画*/
        cc.tween(vistor)
            .call(() => {
                obj.init(firstDriection);
                obj.animateStart(payload);
            })
            .to(payload.firstPeriod, { position: cc.v2(payload.pausePosition[0], payload.pausePosition[1]) })
            .call(() => {
                obj.manWait();
            })
            .delay(payload.pausePeriod)
            .call(() => {
                obj.initMan(secondDriection);
            })
            .to(payload.secondPeriod, { position: cc.v2(payload.endPosition[0], payload.endPosition[1]) })
            .start()
    },

    randomCreateVistor() {
    },

    init() {
        let payload = {
            startPosition: [0, -400],
            pausePosition: [-200, -400],
            endPosition: [400, -400],
            firstPeriod: 2,
            secondPeriod: 6,
            pausePeriod: 2
        }
        this.stateUpdate();
        this.setBg();
        this.footerInit();
        this.headerInit();
        this.vistorInit(payload);
        Action.Show.ShowInfoUpdate((res) => {
            const showData = CACHE.showData;
            this.festivalName.string = showData.festivalInfo.name;
            this.festivalProgress.string = `${showData.festivalInfo.currentNum}/${showData.festivalInfo.reachCount}`;
            console.log(showData);
            this.showcaseInit(showData.standInfoList);
        })
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.init();
    },

    // update (dt) {},
});
