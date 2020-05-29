window.Toast = {
  _toast: null,           // prefab
  _detailLabel:   null,   // 内容
  _animSpeed:     0.3,    // 动画速度
  _sprite:        null,   //人物
  _timer:         1000,   //倒计时
};


/**
* detailString :   内容 string 类型.
* enterCallBack:   确定点击事件回调  function 类型.
* neeCancel:       是否展示取消按钮 bool 类型 default YES.
* duration:        动画速度 default = 0.3.
*/
window.Toast.show = function (detailString, timer=2000, enterCallBack, needCancel, animSpeed) {

  // 引用
  var self = this;

  // 判断
  if (Toast._toast != undefined) {
      console.log("已有")
    cc.tween(Toast._toast)
        .to(0.4,{position: cc.v2(0, 200),opacity:0})
        .start()
  };

  // 
  Toast._animSpeed = animSpeed ? animSpeed : Toast._animSpeed;

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
      Toast._detailLabel = cc.find("toastContent/toastText", toast).getComponent(cc.Label);

      // 父视图
      Toast._toast.parent = cc.find("Canvas");

      // 展现 Toast
      self.startFadeIn();

      // 参数
      self.configToast(detailString, timer, enterCallBack, needCancel, animSpeed);
      
  });

  // 参数
  self.configToast = function (detailString, timer, enterCallBack, needCancel, animSpeed) {

      // 回调
      // Toast._enterCallBack = enterCallBack;

      // 内容
      Toast._detailLabel.string = detailString;
      if(timer){
          Toast._timer = timer
      }
  };

  // 执行弹进动画
  self.startFadeIn = function () {
      // cc.eventManager.pauseTarget(Toast._toast, true);
      Toast._toast.position = cc.v2(0,-300);
    //   Toast._toast.setScale(2);
      Toast._toast.opacity = 0;
      cc.tween(Toast._toast)
      .to(0.3,{position: cc.v2(0, 0),opacity:255},{ easing: 'sineIn'})
      .delay(Toast._timer/1000)
      .to(0.4,{position: cc.v2(0, 200),opacity:0})
      .start()
      setTimeout(()=>{

      })
    //   self.onFadeInFinish()
  };


  // 销毁 Toast (内存管理还没搞懂，暂且这样写吧~v~)
  self.onDestory = function () {
      Toast._toast.destroy();
      Toast._toast = null;
      Toast._detailLabel = null;
      Toast._animSpeed = 0.3;
  };
};