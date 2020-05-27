import { CACHE } from '../global/usual_cache';
import WxApi from '../global/wx_index'

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
        this.getToken(() => {
            let http = cc.loader.getXMLHttpRequest();
            http.open("GET", Url, true);
            http.setRequestHeader("Content-Type", "application/json");
            // http.setRequestHeader("X-Auth-Token", CACHE.token);
            this._callback = cb;
            this._failedCallback = fcb;
            http.onreadystatechange = this._result.bind(this);
            http.timeout = 10000;
            http.send();
            this._http = http;
        })
    }
    Post(Url, data, cb, fcb) {
        this.getToken(() => {
            data = JSON.stringify(data);
            let http = cc.loader.getXMLHttpRequest();
            http.open("POST", Url, true);
            http.setRequestHeader("Content-Type", "application/json");
            // http.setRequestHeader("X-Auth-Token", CACHE.token);
            this._callback = cb;
            this._failedCallback = fcb;
            http.onreadystatechange = this._result.bind(this);
            http.timeout = 10000;
            http.send(data);
            this._http = http;
        })
    }
    Get_UrlEnCoded(Url, data, cb, fcb) {
        this.getToken(() => {
            let http = cc.loader.getXMLHttpRequest();
            http.open("GET", Url, true);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // http.setRequestHeader("X-Auth-Token", CACHE.token);
            this._callback = cb;
            this._failedCallback = fcb;
            http.onreadystatechange = this._result.bind(this);
            http.timeout = 10000;
            http.send(data);
            this._http = http;
        })
    }
    Login(Url, data, cb, fcb) {
        let http = cc.loader.getXMLHttpRequest();
        http.open("POST", Url, true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this._callback = cb;
        this._failedCallback = fcb;
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                const response = JSON.parse(http.responseText);
                if (http.status === 200) {
                    CACHE.token = http.getResponseHeader('X-Auth-Token');
                    CACHE.userInfo = response.data.principal;
                    if (cb) {
                        cb(response);
                    }
                } else {
                    console.log("登录失败，" + response.message)
                }
            }
        };
        http.timeout = 10000;
        http.send(data);
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
    getToken(callback) {
        // if (!CACHE.token) {
        //     WxApi.login(callback);
        // } else {
            callback();
        // }
    }
}
export default CusHttp;
