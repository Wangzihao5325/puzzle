// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


var Alert = {
    _alert: null,           // prefab
    _alertTitle: null,       //标题
    _detailLabel:   null,   // 内容
    _cancelButton:  null,   // 确定按钮
    _cancelText:  null,   // 取消按钮文字
    _confirmText:  null,   // 确定按钮文字
    _confirmButton:   null,   // 取消按钮
    _confirmCallBack: null,   // 回调事件
    _animSpeed:     0.3,    // 动画速度
    _sprite:        null,   //人物
    _timer:         1000,   //倒计时
};


/**
 * detailString :   内容 string 类型.
 * confirmCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * neeCancel:       取消点击事件回调  function 类型.
 * duration:        动画速度 default = 0.3.
*/
Alert.show = function (detailString,{title, confirmText, confirmCallBack, showCancel, cancelText, cancelCallBack, animSpeed}) {

    // 引用
    var self = this;

    // 判断
    if (Alert._alert != undefined) return;

    // 
    Alert._animSpeed = animSpeed ? animSpeed : Alert._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("Alert", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        Alert._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 255), cc.scaleTo(Alert._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 0), cc.scaleTo(Alert._animSpeed, 2.0)), cbFadeOut);

        // // 获取子节点
        Alert._detailLabel = cc.find("contentWarp/alertText", alert).getComponent(cc.Label);
        Alert._cancelButton = cc.find("cancelButton", alert);
        Alert._confirmButton = cc.find("confirmButton", alert);
        Alert._alertTitle = cc.find("alertTitle", alert).getComponent(cc.Label);
        
        Alert._cancelText = cc.find("cancelButton/Background/cancelText", alert).getComponent(cc.Label);
        Alert._confirmText = cc.find("confirmButton/Background/confirmText", alert).getComponent(cc.Label);
        // // 添加点击事件
        Alert._confirmButton.on('click', self.onConfirmClick, self);
        Alert._cancelButton.on('click', self.onCancelClicked, self);

        // 父视图
        Alert._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(detailString,title, confirmText, confirmCallBack, showCancel,cancelText, cancelCallBack, animSpeed);
        
    });

    // 参数
    self.configAlert = function (detailString,title, confirmText,confirmCallBack, showCancel, cancletext, cancelCallBack, animSpeed) {

        // 回调
        Alert._confirmCallBack = confirmCallBack;

        // 内容
        Alert._alertTitle.string = title;
        // 内容
        Alert._detailLabel.string = detailString;
        Alert._confirmText.string =confirmText;

        // 是否需要取消按钮
        if (showCancel || showCancel === undefined) { // 显示
            Alert._cancelText.string =cancletext;
            Alert._cancelButton.active = true;
            Alert._cancelCallBack= cancelCallBack
        } else {  // 隐藏取消
            Alert._cancelButton.active = false;
            Alert._confirmButton.x = 0;
        }
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        // cc.eventManager.pauseTarget(Alert._alert, true);
        Alert._alert.position = cc.Vec2([0, 0]);
        Alert._alert.setScale(2);
        Alert._alert.opacity = 0;
        Alert._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        // cc.eventManager.pauseTarget(Alert._alert, true);
        Alert._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {

        // cc.eventManager.resumeTarget(Alert._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击确认事件
    self.onConfirmClick = function(event){
        if(self._confirmCallBack){
            self._confirmCallBack();
        }
        self.startFadeOut();
    };
    // 按钮点击取消事件
    self.onCancelClicked = function(event){
        if(self._cancelCallBack){
            self._cancelCallBack();
        }
        self.startFadeOut();
    };

    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        Alert._alert.destroy();
        Alert._confirmCallBack = null;
        Alert._cancelCallBack = null;
        Alert._alert = null;
        Alert._detailLabel = null;
        Alert._cancelButton = null;
        Alert._confirmButton = null;
        Alert._animSpeed = 0.3;
    };
};