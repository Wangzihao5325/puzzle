// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function parseTimeData(time) {
    const days = Math.floor(time / DAY);
    const hours = Math.floor((time % DAY) / HOUR);
    const minutes = Math.floor((time % HOUR) / MINUTE);
    const seconds = Math.floor((time % MINUTE) / SECOND);
    const milliseconds = Math.floor(time % SECOND);
  
    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  }

 function parseFormat(format, timeData) {

    let  {days,hours, minutes, seconds, milliseconds}=timeData 
  
    if (format.indexOf('DD') === -1) {
      hours += days * 24;
    } else {
      format = format.replace('DD', padZero(days));
    }
  
    if (format.indexOf('HH') === -1) {
      minutes += hours * 60;
    } else {
      format = format.replace('HH', padZero(hours));
    }
  
    if (format.indexOf('mm') === -1) {
      seconds += minutes * 60;
    } else {
      format = format.replace('mm', padZero(minutes));
    }
  
    if (format.indexOf('ss') === -1) {
      milliseconds += seconds * 1000;
    } else {
      format = format.replace('ss', padZero(seconds));
    }
  
    if (format.indexOf('S') !== -1) {
      const ms = padZero(milliseconds, 3);
  
      if (format.indexOf('SSS') !== -1) {
        format = format.replace('SSS', ms);
      } else if (format.indexOf('SS') !== -1) {
        format = format.replace('SS', ms.slice(0, 2));
      } else {
        format = format.replace('S', ms.charAt(0));
      }
    }
  
    return format;
  }

var Tire = {
    _alert: null,           // prefab
    _close:null,
    _time:null,
    _timer:null,
    _confirmButton:   null,   // 取消按钮
    _confirmCallBack:null,//确认回调
    _animSpeed:300

};


function padZero(num, targetLength = 2) {
    let str = num + '';
  
    while (str.length < targetLength) {
      str = '0' + str;
    }
  
    return str;
  }

/**
 * detailString :   内容 string 类型.
 * confirmCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * neeCancel:       取消点击事件回调  function 类型.
 * duration:        动画速度 default = 0.3.
*/
Tire.show = function (time,_confirmCallBack,animSpeed ) {
    // 引用
    var self = this;

    // 判断
    if (Tire._alert != undefined) return;

    // 
    Tire._animSpeed = animSpeed ? animSpeed : Tire._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("Tire", cc.Prefab, function (error, prefab) {



        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        Tire._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(Tire._animSpeed, 255), cc.scaleTo(Tire._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(Tire._animSpeed, 0), cc.scaleTo(Tire._animSpeed, 2.0)), cbFadeOut);


        Tire._confirmButton = cc.find("dialogContainer/confirm", alert);
        Tire._close = cc.find("dialogContainer/close", alert);
        Tire._timer = cc.find("dialogContainer/content/timerWarp/timer", alert).getComponent(cc.Label);
        // 添加点击事件
        Tire._confirmButton.on('click', self.onButtonClicked, self);
        Tire._close.on('click', self.close, self);
        Tire._confirmCallBack = _confirmCallBack;

        // 父视图
        Tire._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();
        Tire._time=time


        // 参数
        self.configAlert(time);
        
    });

    // 参数
    self.configAlert = function (time) {
        self.counDown(time)
        // 回调
        // Alert._confirmCallBack = confirmCallBack;

 
    };
    self.counDown=function(time){
        setTimeout(()=>{
            Tire._time = time--;
            if(Tire._time>0){
                self.counDown(time)
                
            }else{
                Toast.show('外出倒计时结束')
            }
            const str=parseFormat('mm:ss',parseTimeData(time))
            Tire._timer.string=str
        },1000)
    };

    self.close = function (){
        self.startFadeOut();

    }

    // 按钮点击事件
    self.onButtonClicked = function(event){
        if(event.target.name == "confirm"){
            if(self._confirmButton){
                self._confirmButton();
            }
        }else{
            self.startFadeOut();

        }
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        // cc.eventManager.pauseTarget(Alert._alert, true);
        // Tire._alert.position = cc.Vec2([0, 0]);
        // Tire._alert.setScale(2);
        // Tire._alert.opacity = 0;
        // Tire._alert.runAction(self.actionFadeIn);

        cc.tween(Tire._alert)
        .to(1, { position: cc.v2(0,0)},{opacity:0})
        .start()
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        // cc.eventManager.pauseTarget(Alert._alert, true);
        // Tire._alert.runAction(self.actionFadeOut);
        cc.tween(Tire._alert)
        .to(1, { position: cc.v2(0,0)},{opacity:1})
        .start()
        self.onDestory();

    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {

        // cc.eventManager.resumeTarget(Alert._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };


    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        Tire._alert.destroy();
        Tire._confirmCallBack = null;
        Tire._alert = null;
 
        Tire._animSpeed = 0.3;
    };
};