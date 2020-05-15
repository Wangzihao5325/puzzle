import { CACHE } from '../global/usual_cache';
import { SCENE } from '../global/app_global_index';

cc.Class({
    extends: cc.Component,

    properties: {
        root: cc.Node,
        footer: cc.Prefab,
        vistor: cc.Prefab,
    },

    stateUpdate() {
        CACHE.scene = SCENE.SHOW;
    },

    footerInit() {
        let footer = cc.instantiate(this.footer);
        let obj = footer.getComponent('navi_footer');
        obj.initWithScene(CACHE.scene);
        footer.parent = this.root;
        footer.setPosition(0, -500);
        footer.zIndex = 10;
    },

    /*
    payload={
        startPosition:[x,y],
        pausePosition:[x,y],
        endPosition:[x,y],
        //  period必须为2的整数倍
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

    randomCreateVistor(){

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
        this.footerInit();
        this.vistorInit(payload);
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.init();
    },

    // update (dt) {},
});
