// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        root: cc.Node,
        item: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    initWithItem(item) {
        this.refs = [];
        const reg0 = { goodsId: item.goodsIds[0], amount: item.amounts[0], iconUrl: item.iconsUrl[0], day: 7 };
        const reg1 = { goodsId: item.goodsIds[1], amount: item.amounts[1], iconUrl: item.iconsUrl[1], day: 7 };
        const reg2 = { goodsId: item.goodsIds[2], amount: item.amounts[2], iconUrl: item.iconsUrl[2], day: 7 };
        const data = [reg0, reg1, reg2];
        data.forEach((item, index) => {
            let itemNode = cc.instantiate(this.item);
            itemNode.parent = this.root;
            let x = -150 + (index % 3) * 150;
            itemNode.setPosition(x, 0);
            let obj = itemNode.getComponent('sign_item_index');
            if (obj) {
                this.refs.push(obj);
                obj.initDaySeven(item, index);
                obj.setXY(x, this.root.y)
            }
        });
    },

    todaySign() {
        this.refs[0].todaySign();
        this.refs[1].todaySign();
        this.refs[2].todaySign();
    },

    start() {

    },

    // update (dt) {},
});
