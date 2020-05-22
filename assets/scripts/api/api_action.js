import Api from './api_index';
import { CACHE } from '../global/usual_cache';

const BalanceUpdate = (callback, failedCallback) => {
    Api.userBalance((res) => {
        const data = res.data;
        const userData = {
            coin: data.gold,
            gem: data.diamonds,
            STAM: data.power
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



const User = {
    BalanceUpdate
}

const Mission = {
    CityDetails
}

export default {
    User,
    Mission
};