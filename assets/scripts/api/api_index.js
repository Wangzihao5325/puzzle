import CusHttp from './custom_http';
const API_DOMAIN = 'http://192.168.3.2:8090';

/**
 * 根据城市id获取城市详情
 * @param {Number} chapterId 
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const cityDetails = (chapterId = 101, callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/travel/chapter?chapterId=${chapterId}`, callback, failedCallback);

/**
 * 根据城市id获取当前关卡列表&关卡状态
 * @param {Number} chapterId 
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const missionList = (chapterId = 101, callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/travel/complete/list?chapterId=${chapterId}`, callback, failedCallback);

/**
 * 根据关卡id获取当前关卡详情
 * @param {Number} hurdleId 
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const missionDetails = (hurdleId = 101001, callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/travel/hurdle?hurdleId=${hurdleId}`, callback, failedCallback);

/**
 * 通知后台关卡完成&获取掉落
 * @param {Object} payload
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const missionComplete = (payload = { hurdleId: 101001, star: 1 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/travel/complete`, payload, callback, failedCallback);

/**
 * 获取用户资产
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const userBalance = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/user/assets/balance`, callback, failedCallback);

/**
 * 开始旅行&消耗体力
 * @param {Object} payload {null:null}
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const travel = (payload = { key: 1 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/user/assets/travel`, payload, callback, failedCallback);

/**
 * 宠物家主页
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const petHome = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/pet/home`, callback, failedCallback);

/**
 * 宠物当前饥饿信息&喂食
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const petHungry = (callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/pet/hungry_info`, {}, callback, failedCallback);


/**
 * 剩余宠物粮
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const petRemainFood = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/pet/remain_food`, callback, failedCallback);


/**
 * 装饰品信息列表
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const petDecorations = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/pet/decorations`, callback, failedCallback);

/**
 * 开始旅行&喂食
 * @param {Object} payload {null:null}
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const petFeed = (payload = { goodsId: 1 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/pet/feed`, payload, callback, failedCallback);

/**
 * 购买装饰品并装备&喂食
 * @param {Object} payload {null:null}
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const petBuyEquip = (payload = { goodsId: 1 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/pet/decoration/buy_equip`, payload, callback, failedCallback);

/**
 * 保存当前装饰物为当前形象&喂食
 * @param {Object} payload {null:null}
 * @param {Function} callback 
 * @param {Function} failedCallback 
 */
const petEquip = (payload = { goodsId: 1 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/pet/decoration/equip`, payload, callback, failedCallback);


const showInfo = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/exhibition/info`, callback, failedCallback);

//放置物品
const placeGoods = (payload = { goodId: 0, standId: 0 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/exhibition/stand/good/place`, payload, callback, failedCallback);

//收取奖励
const getShowReceive = (payload = { placeId: 0 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/exhibition/stand/good/receive`, payload, callback, failedCallback);

//签到
const signInfo = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/sign/info`, callback, failedCallback);

export default {
    cityDetails,
    missionList,
    missionDetails,
    missionComplete,

    userBalance,
    travel,

    petHome,
    petHungry,
    petRemainFood,
    petDecorations,
    petFeed,
    petBuyEquip,
    petEquip,

    showInfo,
    placeGoods,
    getShowReceive,

    signInfo,
}