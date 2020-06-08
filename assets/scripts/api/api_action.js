import Api from './api_index';
import { CACHE } from '../global/usual_cache';

const BalanceUpdate = (callback, failedCallback) => {
    Api.petRemainFood((petRes) => {//展览界面需要展示剩余的宠物粮
        if (petRes.success) {
            let catfood = petRes.data[1];
            Api.powerTime({ key: 0 }, (powerRes) => {
                if (powerRes.data) {
                    Api.userBalance((res) => {
                        const data = res.data;
                        if (data) {
                            const userData = {
                                coin: data.gold,
                                gem: data.diamonds,
                                STAM: data.power,
                                fragment: data.patDressFragment,
                                strongMagnet: data.strongMagnet,
                                frame: data.frame,
                                catFood: catfood.count
                            };
                            const powerData = {
                                num: powerRes.data.power,
                                time: powerRes.data.time
                            }
                            CACHE.userData = { ...userData };
                            CACHE.power = { ...powerData }
                            if (callback) {
                                callback(res);
                            }
                        }
                    }, failedCallback);
                }
            })
        }
    })
}

const CityDetails = (callback, failedCallback) => {
    let cityItem = CACHE.travel_city_press;
    if (cityItem && cityItem.key) {
        Api.cityDetails(cityItem.key, (res) => {
            const data = res.data;
            const cityData = {
                chapterId: data.chapterId,
                goodsList: data.goodsList,
                introduceInfo: data.introduceInfo,
                introduceShort: data.introduceShort,
                name: data.name
            };
            CACHE.cityData = { ...cityData };
            if (callback) {
                callback(res);
            }
        }, failedCallback);
    }
}

const MissionList = (callback, failedCallback) => {
    let cityItem = CACHE.travel_city_press;
    if (cityItem && cityItem.key) {
        Api.missionList(cityItem.key, (res) => {
            CACHE.list = [...res.data];
            if (callback) {
                callback(res);
            }
        }, failedCallback)
    }
}

const ShowInfoUpdate = (callback, failedCallback) => {
    let stage = (CACHE.userInfo && typeof CACHE.userInfo.stage == 'number' && CACHE.userInfo.stage !== 99) ? CACHE.userInfo.stage : null;
    Api.showInfo(stage, (res) => {
        CACHE.showData = { ...res.data };
        if (callback) {
            callback(res)
        }
    }, failedCallback);
}

const SignInfoUpdate = (callback, failedCallback) => {
    Api.signInfo((res) => {
        CACHE.signData = { ...res.data };
        if (callback) {
            callback(res)
        }
    }, failedCallback)
}

const User = {
    BalanceUpdate
}

const Mission = {
    CityDetails,
    MissionList
}

const Show = {
    ShowInfoUpdate
}

const Sign = {
    SignInfoUpdate
}

export default {
    User,
    Mission,
    Show,
    Sign
};