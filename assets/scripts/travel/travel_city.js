// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        city_name: cc.Label,
        city_name_bg: cc.Sprite,
        mission_progress: cc.Label,
        city_image: cc.Sprite,
        isMove: cc.boolean,
        itemObj: cc.object,
        recommend: cc.Prefab,
    },

    init(itemObj) {
        this.itemObj = itemObj;
        let height = itemObj.imageSizeH / 2 * 0.8;
        let width = itemObj.imageSizeW / 2 * 0.8;
        this.city_name.string = itemObj.name;
        let missionProgress = `${itemObj.missionDone}/${itemObj.missionNum}`;
        this.mission_progress.string = missionProgress;
        this.item_node.setPosition(itemObj.positionX, itemObj.positionY);
        cc.loader.loadRes(itemObj.imageUrl, cc.SpriteFrame, (err, assets) => {
            if (err) cc.error(err);
            this.city_image.spriteFrame = assets;
            this.city_image.node.width = width;
            this.city_image.node.height = height;
            this.city_name_bg.node.x = 0;
            this.city_name_bg.node.y = -(height / 2 + 25);
            this.mission_progress.node.x = 0;
            this.mission_progress.node.y = -(height / 2 + 25 + 30);
            if (itemObj.isRecommend) {
                let recommend_node = cc.instantiate(this.recommend);
                recommend_node.parent = this.node;
                /*动画*/
                cc.tween(recommend_node)
                    .to(0.3, { position: cc.v2(0, 10) })
                    .to(0.3, { position: cc.v2(0, 0) })
                    .delay(2)
                    .union()
                    .repeatForever()
                    .start()
            }
        });
    },

    setTouch(callback) {
        this.city_image.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            //cc.director.loadScene("puzzle");
            event.stopPropagation();
        })

        this.city_image.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            event.stopPropagation();
            this.isMove = true;
        })

        this.city_image.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
            if (!this.isMove && callback) {
                callback(this.itemObj);
            }
            this.isMove = false;
        })
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
