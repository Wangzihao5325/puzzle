// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


window.Hunger = {
    _alert: null,           // prefab
    _close:null,
    _confirmButton:   null,   // 取消按钮
    _confirmCallBack:null,//确认回调
    _animSpeed:300

};


/**
 * detailString :   内容 string 类型.
 * confirmCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * neeCancel:       取消点击事件回调  function 类型.
 * duration:        动画速度 default = 0.3.
*/
window.Hunger.show = function (_confirmCallBack=()=>{},animSpeed ) {

    // 引用
    var self = this;

    // 判断
    if (Hunger._alert != undefined) return;

    // 
    Hunger._animSpeed = animSpeed ? animSpeed : Hunger._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("Hunger", cc.Prefab, function (error, prefab) {



        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        Hunger._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(Hunger._animSpeed, 255), cc.scaleTo(Hunger._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(Hunger._animSpeed, 0), cc.scaleTo(Hunger._animSpeed, 2.0)), cbFadeOut);


        Hunger._confirmButton = cc.find("dialogContainer/confirm", alert);
        Hunger._close = cc.find("dialogContainer/close", alert);

        // 添加点击事件
        Hunger._confirmButton.on('click', self.onButtonClicked, self);
        Hunger._close.on('click', self.close, self);
        Hunger._confirmCallBack = _confirmCallBack;

        // 父视图
        Hunger._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert();
        
    });

    // 参数
    self.configAlert = function () {

        // 回调
        // Alert._confirmCallBack = confirmCallBack;


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
        // Hunger._alert.position = cc.Vec2([0, 0]);
        // Hunger._alert.setScale(2);
        // Hunger._alert.opacity = 0;
        // Hunger._alert.runAction(self.actionFadeIn);

        cc.tween(Hunger._alert)
        .to(1, { position: cc.v2(0,0)},{opacity:0})
        .start()
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        // cc.eventManager.pauseTarget(Alert._alert, true);
        // Hunger._alert.runAction(self.actionFadeOut);
        cc.tween(Hunger._alert)
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
        Hunger._alert.destroy();
        Hunger._confirmCallBack = null;
        Hunger._alert = null;
 
        Hunger._animSpeed = 0.3;
    };
};