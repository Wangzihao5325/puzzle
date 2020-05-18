/**
 * 新版接口
 * @example 使用 var Http = require('Http')
 * @example      new Http().Get(url, cb)//url链接 回调函数
 * @example      new Http().Post(url, param, cb)//url链接 param参数(json对象) 回调函数
 */
class CusHttp {
    constructor() {
        this._http;
        this._callback;
        this._failedCallback;
    }
    /**
     * Get 请求
     * @param {*} Url 
     * @param {*} cb 
     */
    Get(Url, cb, fcb) {
        let http = cc.loader.getXMLHttpRequest();
        http.open("GET", Url, true);
        http.setRequestHeader("Content-Type", "application/json");
        this._callback = cb;
        this._failedCallback = fcb;
        http.onreadystatechange = this._result.bind(this);
        http.timeout = 10000;
        http.send();
        this._http = http;
    }
    Post(Url, data, cb, fcb) {
        data = JSON.stringify(data);
        let http = cc.loader.getXMLHttpRequest();
        http.open("POST", Url, true);
        http.setRequestHeader("Content-Type", "application/json");
        this._callback = cb;
        this._failedCallback = fcb;
        http.onreadystatechange = this._result.bind(this);
        http.timeout = 10000;
        http.send(data);
        this._http = http;
    }
    _result() {
        if (this._http.readyState == 4 && this._http.status != 500) {
            if (this._callback) {
                this._callback(JSON.parse(this._http.responseText));
            }
        } else {
            // to do 异常处理
            // this._failedCallback();
            // cc.error('请求失败')
        }
    }
}
export default CusHttp;