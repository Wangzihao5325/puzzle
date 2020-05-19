import { CACHE } from '../global/usual_cache';
cc.Class({
    extends: cc.Component,

    properties: {
        coinLabel: cc.Label,
        gemLabel: cc.Label,
        STAMLabel: cc.Label,
        coinAdd: cc.Node,
        gemAdd: cc.Node,
        STAMAdd: cc.Node,
    },

    render() {
        let { userData } = CACHE;
        this.coinLabel.string = `${userData.coin}`;
        this.gemLabel.string = `${userData.gem}`;
        this.STAMLabel.string = `${userData.STAM}`;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
