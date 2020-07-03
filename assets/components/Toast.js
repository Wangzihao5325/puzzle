window.Toast = {
  _toast: null,           // prefab
  _detailLabel:   null,   // 内容
  _sprite:        null,   //人物
  _timer:         1000,   //倒计时
};


/**
* detailString :   内容 string 类型.
* enterCallBack:   确定点击事件回调  function 类型.
* neeCancel:       是否展示取消按钮 bool 类型 default YES.
* duration:        动画速度 default = 0.3.
*/
window.Toast.show = function (detailString,info={timer:2000,icon:undefined,iconScale:1,color:undefined})  {
  const {timer,icon,color,iconScale=.6}=info
  // 引用
  var self = this;

  // 判断
  if (Toast._toast != undefined) {
    cc.tween(Toast._toast)
        .to(0.4,{position: cc.v2(0, 200),opacity:0})
        .start()
  };


  // 加载 prefab 创建
  cc.loader.loadRes("Toast", cc.Prefab, function (error, prefab) {

      if (error) {
          cc.error(error);
          return;
      }

      // 实例 
      var toast = cc.instantiate(prefab);

      // Toast 持有
      Toast._toast = toast;

      // // 获取子节点
      Toast._detailLabel = cc.find("toastContent/toastContainer/toastText", toast).getComponent(cc.Label);
      if(icon){
        cc.find("toastContent/toastContainer/iconContent", toast).active=true

        cc.loader.load(icon, (err, texture) => {
          cc.find("toastContent/toastContainer/iconContent/icon", toast).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)
          cc.find("toastContent/toastContainer/iconContent/icon", toast).scale=iconScale
        });
      }
      if(color){
        Toast._detailLabel = cc.find("toastContent/toastText", toast).getComponent(cc.Label).color = color;
      }
      // 父视图
      Toast._toast.parent = cc.find("Canvas");
      Toast._toast.zIndex = cc.macro.MAX_ZINDEX;

      // 展现 Toast
      self.startFadeIn();

      // 参数
      self.configToast(detailString, timer);
      
  });

  // 参数
  self.configToast = function (detailString, timer) {

      // 内容
      Toast._detailLabel.string = detailString;
      if(timer){
          Toast._timer = timer||2000
      }
  };

  // 执行弹进动画
  self.startFadeIn = function () {
      Toast._toast.position = cc.v2(0,0);
      Toast._toast.setScale(2);
      cc.tween(Toast._toast)
      .to(0.3,{position: cc.v2(0, 0),opacity:255,scale:1},{ easing: 'quadOut'})
      .delay(Toast._timer/1000)
      .to(0.4,{position: cc.v2(0, 200),opacity:0})
      .start()
  };


  // 销毁 Toast (内存管理还没搞懂，暂且这样写吧~v~)
  self.onDestroy = function () {
    window.Toast._toast.destroy();
    window.Toast._toast = null;
    window.Toast._detailLabel = null;
  };
};