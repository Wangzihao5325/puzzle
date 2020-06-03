import { CACHE } from '../global/usual_cache';
cc.Class({
    extends: cc.Component,

    properties: {
        coinLabel: cc.Label,
        gemLabel: cc.Label,
        STAMLabel: cc.Label,
        STAMNode: cc.Node,
        catFoodLabel: cc.Label,
        catFoodNode: cc.Node,

    },

    initShowScene() {
        this.catFoodNode.active = true;
        this.STAMNode.active = false;
    },

    renderShowScene() {
        let { userData } = CACHE;
        this.coinLabel.string = `${userData.coin}`;
        this.gemLabel.string = `${userData.gem}`;
        this.catFoodLabel.string = `${userData.catFood}`;
    },

    render() {
        let { userData } = CACHE;
        this.coinLabel.string = `${userData.coin}`;
        this.gemLabel.string = `${userData.gem}`;
        this.STAMLabel.string = `${userData.STAM}/10`;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
