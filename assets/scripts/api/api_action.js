import Api from './api_index';
import { CACHE } from '../global/usual_cache';

const BalanceUpdate = (callback, failedCallback) => {
    Api.userBalance((res) => {
        const data = res.data;
        const userData = {
            coin: data.gold,
            gem: data.diamonds,
            STAM: data.power,
            strongMagnet:data.strongMagnet,
            frame:data.frame,
        };
        CACHE.userData = { ...userData };
        if (callback) {
            callback(res);
        }
    }, failedCallback);
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
    Api.showInfo((res) => {
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