import CusHttp from './custom_http';
const API_DOMAIN = 'http://192.168.3.231:8090';

/**
 * 根据城市id获取城市详情
 * @param {*} chapterId 
 * @param {*} callback 
 * @param {*} failedCallback 
 */
const cityDetails = (chapterId = 101, callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/travel/chapter?chapterId=${chapterId}`, callback, failedCallback);

/**
 * 根据城市id获取当前关卡列表&关卡状态
 * @param {*} chapterId 
 * @param {*} callback 
 * @param {*} failedCallback 
 */
const missionList = (chapterId = 101, callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/travel/complete/list?chapterId=${chapterId}`, callback, failedCallback);

/**
 * 根据关卡id获取当前关卡详情
 * @param {*} hurdleId 
 * @param {*} callback 
 * @param {*} failedCallback 
 */
const missionDetails = (hurdleId = 101001, callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/travel/hurdle?hurdleId=${hurdleId}`, callback, failedCallback);

/**
 * 通知后台关卡完成&获取掉落
 * @param {*} payload
 * @param {*} callback 
 * @param {*} failedCallback 
 */
const missionComplete = (payload = { hurdleId: 101001, star: 1 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/travel/complete`, payload, callback, failedCallback);

/**
 * 获取用户资产
 * @param {*} callback 
 * @param {*} failedCallback 
 */
const userBalance = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/user/assets/balance`, callback, failedCallback);

/**
 * 开始旅行&消耗体力
 * @param {*} payload {null:null}
 * @param {*} callback 
 * @param {*} failedCallback 
 */
const travel = (payload = { key: 1 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/user/assets/travel`, payload, callback, failedCallback);

export default {
    cityDetails,
    missionList,
    missionDetails,
    missionComplete,

    userBalance,
    travel,
}