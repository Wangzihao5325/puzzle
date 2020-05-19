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

const User = {
    BalanceUpdate
}

export default {
    User
};