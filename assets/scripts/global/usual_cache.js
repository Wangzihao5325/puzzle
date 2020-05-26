import { SCENE } from './app_global_index';

const CACHE = {
    scene: SCENE.TRAVEL,
    travel_city_press: null,//用来记录在travel场景选择的城市
    mission_press: null,//用来记录在城市中选择的景点
    hard_level: NaN,
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
    },
    list: [],
    assets: {//用来存放已经加载过的图片资源
        bg: null,//场景背景图片资源
        cityIcon: null
    },
    showData: null,//展览数据
    signData: null,//签到数据
}

export default {
    CACHE
};