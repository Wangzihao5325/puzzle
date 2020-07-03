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
            const isWachat = cc.sys.platform === cc.sys.WECHAT_GAME
            let http = cc.loader.getXMLHttpRequest();
            http.open("GET", Url, true);
            http.setRequestHeader("Content-Type", "application/json");
            isWachat ? http.setRequestHeader("X-Auth-Token", CACHE.token) : undefined;
            this._callback = cb;
            this._failedCallback = fcb;
            this._reqCache = {
                url: Url,
                method: 'GET'
            };
            http.onreadystatechange = this._result.bind(this);
            http.timeout = 10000;
            http.send();
            this._http = http;
        })
    }
    Post(Url, data, cb, fcb) {
        this.getToken(() => {
            data = JSON.stringify(data);
            const isWachat = cc.sys.platform === cc.sys.WECHAT_GAME
            let http = cc.loader.getXMLHttpRequest();
            http.open("POST", Url, true);
            http.setRequestHeader("Content-Type", "application/json");
            isWachat ? http.setRequestHeader("X-Auth-Token", CACHE.token) : undefined;
            this._callback = cb;
            this._failedCallback = fcb;
            this._reqCache = {
                url: Url,
                data: data,
                method: 'POST'
            };
            http.onreadystatechange = this._result.bind(this);
            http.timeout = 10000;
            http.send(data);
            this._http = http;
        })
    }
    Get_UrlEnCoded(Url, data, cb, fcb) {
        this.getToken(() => {
            let http = cc.loader.getXMLHttpRequest();
            const isWachat = cc.sys.platform === cc.sys.WECHAT_GAME
            http.open("GET", Url, true);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            isWachat ? http.setRequestHeader("X-Auth-Token", CACHE.token) : undefined;
            this._callback = cb;
            this._failedCallback = fcb;
            this._reqCache = {
                url: Url,
                data: data,
                method: 'GET1'
            };
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
                if (cb) {
                    if (http.status === 200) {
                        CACHE.token = http.getResponseHeader('X-Auth-Token');
                        CACHE.userInfo = response.data.principal;
                        CACHE.logining = false;
                        cb(response);
                    }
                } else {
                    CACHE.logining = false;
                }
            }
        };
        http.timeout = 10000;
        http.send(data);
    }
    _result() {
        if (this._http.readyState == 4 && this._http.status != 500) {
            const response = JSON.parse(this._http.responseText);
            if ([1001, 1002, 1003].indexOf(response.code) >= 0) {
                if (!CACHE.logining) {
                    CACHE.token = undefined;
                    this.getToken();
                }
                if (this._reqCache.method === 'GET') {
                    this.Get(this._reqCache.url, this._callback, this._failedCallback);
                } else if (this._reqCache.method === 'POST') {
                    this.Post(this._reqCache.url, this._reqCache.data, this._callback, this._failedCallback);
                } else if (this._reqCache.method === "GET1") {
                    this.Get_UrlEnCoded(this._reqCache.url, this._reqCache.data, this._callback, this._failedCallback);
                }
            } else if (this._callback) {
                this._callback(response);
            }
        } else {
            // to do 异常处理
            // this._failedCallback();
            // cc.error('请求失败')
        }
    }
    getToken(callback) {
        CACHE.platform.visibleSize = cc.view.getVisibleSize();
        const isWachat = cc.sys.platform === cc.sys.WECHAT_GAME;
        const isIphoneX = CACHE.platform.visibleSize.height > 1385;
        CACHE.platform.isIphoneX = isIphoneX;
        CACHE.platform.isWachat = isWachat;
        if (!CACHE.token && isWachat) {
            if (!CACHE.logining) {
                CACHE.logining = true;
                WxApi.login(() => {
                    CACHE.loginCallback.map(i => { i() });
                    CACHE.loginCallback = [];
                });
            }
            if (callback) {
                CACHE.loginCallback.push(callback);
            }
        } else {
            callback();
        }
    }
}
export default CusHttp;
