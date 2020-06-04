cc.Class({
    extends: cc.Component,

    properties: {
        hand: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.guideStep = 1;
        this.handNode = cc.instantiate(this.hand);
        this.handNode.scaleX = 0.7;
        this.handNode.scaleY = 0.7;
        this.handNode.parent = this.node;
        this.handNode.setPosition(cc.v2(0, 0));
        let obj = this.handNode.getComponent('guideHand');
        if (obj) {
            obj.handAnimate();
        }

        // 触摸监听
       // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    },

    onDestroy() {
        // 取消监听
       // this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    },

    onTouchStart(event) {
        // 获取触摸点，转为Canvas画布上的坐标
        let pos = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        console.log('pppp');
        console.log(pos);

        // 获取相应按钮的大小范围
        let btn;
        if (this.guideStep == 1)
            btn = this.node.parent.getChildByName('signFloat');
        else if (this.guideStep == 2)
            btn = this.node.parent.getChildByName('location');
        let rect = btn.getBoundingBox();

        // 判断触摸点是否在按钮上
        if (rect.contains(pos)) {
            // 允许触摸事件传递给按钮(允许冒泡)
            this.node._touchListener.setSwallowTouches(false);
            this.guideStep++;

            // 如果三个按钮都点击了，则将guideStep设置为0，并隐藏所有相关节点
            if (this.guideStep > 2) {
                this.guideStep = 0;
                this.handNode.active = false;
            }
            else
                this.guide();
        }
        else {
            // 吞噬触摸，禁止触摸事件传递给按钮(禁止冒泡)
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    guide() {
        if (this.guideStep == 1) {
            let sign = this.node.parent.getChildByName('signFloat');
            // 将frame节点移到第一个按钮
            this.handNode.setPosition(sign.position);
        }
        else if (this.guideStep == 2) {
            let location = this.node.parent.getChildByName('location');
            // 将frame节点移到第二个按钮
            this.handNode.setPosition(location.position);
        }
    },

    start() {

    },

    // update (dt) {},
});
