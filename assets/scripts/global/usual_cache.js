import { SCENE } from './app_global_index';

const CACHE = {
    scene: SCENE.TRAVEL,
    travel_city_press: null,//用来记录在travel场景选择的城市
    userData: {//用户资产
        coin: 0,
        gem: 0,
        STAM: 0
    },
    cityData: {//当前选择的城市
        chapterId: 0,
        goodsList: [],
        introduceInfo: '',
        introduceShort: '',
        name: ''
    }
}

export default {
    CACHE
};