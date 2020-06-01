// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


cc.Class({
  extends: cc.Component,

  properties: {
    coco: cc.Sprite  //是个精灵。
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.coco.node.on(cc.Node.EventType.TOUCH_START, function (event) {

      window.Alert.show("这是问询框内容",
        {
          title: '这是标题',
          showCancel: true,//默认true
          confirmCallBack: function () { Toast.show("点击了确认??？", 2000); },
          cancelCallBack: function () { Toast.show("点击了取消??？", 2000) },
          confirmText: '马上确认',
          cancelText: '不要了'
        }
      );

    });

    this.coco.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

    });



    this.coco.node.on(cc.Node.EventType.TOUCH_END, function (event) {

    });
  },
  // console.log('--this.coco--', this.coco)



  start() {

  },

  // update (dt) {},
});
