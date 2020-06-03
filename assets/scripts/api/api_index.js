import CusHttp from './custom_http';
const API_DOMAIN = 'http://192.168.3.144:8090';

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
 * 获取旅行文案
 * @param {Function} callback
 * @param {Function} failedCallback
 */
const travelComment = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/travel/comment`, callback, failedCallback);

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
const travel = (callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/user/assets/travel`, undefined, callback, failedCallback);

/**
 * 使用道具
 * @param {Object} payload {null:null}
 * @param {Function} callback
 * @param {Function} failedCallback
 */
const use_prop = (payload = {}, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/user/assets/use_prop`, payload, callback, failedCallback);

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


/**
 * 外出
 * @param {Function} callback
 * @param {Function} failedCallback
 */
const petGoout = (callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/pet/go_outward`, undefined, callback, failedCallback);



/**
 * 外出回家通知
 * @param {Function} callback
 * @param {Function} failedCallback
 */
const petBackNotice = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/pet/back_notice`, callback, failedCallback);

/**
 * 设置回家通知已查阅&喂食
 * @param {Object} payload {null:null}
 * @param {Function} callback
 * @param {Function} failedCallback
 */
const backNoticeView = (payload = {}, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/pet/back_notice/viewed`, payload, callback, failedCallback);



/**
 * 获取回忆景点列表
 * @param {Function} callback
 * @param {Function} failedCallback
 */
const memory_list = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/travel/memory/travel`, callback, failedCallback);


/**
 * 获取回忆景点详情
 * @param {Function} callback
 * @param {Function} failedCallback
 */
const memory_travelInfo = (data,callback, failedCallback) => new CusHttp().Get_UrlEnCoded(`${API_DOMAIN}/travel/memory/travelInfo`,data, callback, failedCallback);


/**
 * 获取商城物品
 * @param {Function} callback
 * @param {Function} failedCallback
 */
const storeGoods = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/store/commodity/commodities`, callback, failedCallback);

/**
 * 购买货品
 * @param {Object} payload {null:null}
 * @param {Function} callback
 * @param {Function} failedCallback
 */
const storeGoodsBuy = (payload = {}, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/store/commodity/buy`, payload, callback, failedCallback);




const showInfo = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/exhibition/info`, callback, failedCallback);

//放置物品
const placeGoods = (payload = { goodId: 0, standId: 0 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/exhibition/stand/good/place`, payload, callback, failedCallback);

//收取奖励
const getShowReceive = (payload = { placeId: 0 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/exhibition/stand/good/receive`, payload, callback, failedCallback);

//签到
const signInfo = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/sign/info`, callback, failedCallback);

const doSign = (payload = { placeId: 0 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/sign/do_sign`, payload, callback, failedCallback);

//show背包
const showGoods = (type, callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/exhibition/backpack/goods?type=${type}`, callback, failedCallback);

//微信小程序登录
const login = (payload = {}, callback, failedCallback) => new CusHttp().Login(`${API_DOMAIN}/auth_wx`, payload, callback, failedCallback);

// 获取微信用户信息
const userInfo = (payload = {}, callback, failedCallback) => new CusHttp().Get_UrlEnCoded(`${API_DOMAIN}/user/info/decrypt_info`, payload, callback, failedCallback);

const loadJson = (jsonUrl, callback, failedCallback) => new CusHttp().Get(jsonUrl, callback, failedCallback);

const travelRoute = (callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/travel/complete/route`, callback, failedCallback);

const goodsInfo = (goodsId, callback, failedCallback) => new CusHttp().Get(`${API_DOMAIN}/travel/goodsInfo?goodsId=${goodsId}`, callback, failedCallback);

const festivalReceive = (payload = { festivalId: 0 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/exhibition/festival/good/receive`, payload, callback, failedCallback);

const powerTime = (payload = { key: 0 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/user/assets/get_power_time`, payload, callback, failedCallback);

const addHeartEnergy = (payload = { key: 0 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/exhibition/heart_energy/add`, payload, callback, failedCallback);

const showSpeedUp = (payload = { placeId: 0 }, callback, failedCallback) => new CusHttp().Post(`${API_DOMAIN}/exhibition/heart_energy/speed_up`, payload, callback, failedCallback);


export default {
    cityDetails,
    missionList,
    missionDetails,
    missionComplete,

    userBalance,
    travel,
    travelComment,
    use_prop,

    petHome,
    petHungry,
    petRemainFood,
    petDecorations,
    petFeed,
    petBuyEquip,
    petEquip,
    petGoout,
    petBackNotice,
    backNoticeView,
    storeGoods,
    storeGoodsBuy,
    memory_list,
    memory_travelInfo,

    showInfo,
    placeGoods,
    getShowReceive,

    signInfo,
    doSign,
    showGoods,

    login,
    userInfo,

    loadJson,

    travelRoute,
    goodsInfo,
    festivalReceive,
    powerTime,
    addHeartEnergy,
    showSpeedUp
}
