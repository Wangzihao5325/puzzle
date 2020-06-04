import { SCENE } from './app_global_index';

const CACHE = {
    scene: SCENE.TRAVEL,
    travel_city_press: null,//用来记录在travel场景选择的城市
    show_table_press: null,//展览页面选择的展台
    mission_press: null,//用来记录在城市中选择的景点
    hard_level: NaN,
    userData: {//用户资产
        coin: 0,
        gem: 0,
        STAM: 0,
        catFood: 0
    },
    cityData: {//当前选择的城市
        chapterId: 0,
        goodsList: [],
        introduceInfo: '',
        introduceShort: '',
        name: ''
    },
    chapterData: {//当前关卡信息
        chapterId: 101,
        chapterName: "成都",
        hurdleId: 101001,
        hurdleName: "IFS",
        logoUrl: "https://puzzle.oss-cn-beijing.aliyuncs.com/city001.png",
        picId: "city001",
        star: 0,
    },
    list: [],
    assets: {//用来存放已经加载过的图片资源
        bg: null,//场景背景图片资源
        cityIcon: null,
        manVistor: null,
        womenVistor: null,
        oldManVistor: null,
        youngWomenVistor: null,
        vistorAttitude: null,
        naviAssets: null,
    },
    showData: null,//展览数据
    signData: null,//签到数据
    token: null,
    logining: false,
    loginCallback: [],
    userInfo: {

    },
    dragonBoneAnimateName: '',
    lastBagTypeLength: 0,
    isBGM: true,
    power: {
        num: 0,
        time: 0
    },
    isShowOn: [false, false, false],//是否有物品在展览 判断是否有vistor
    isShouwSpeedUp: false,
}

export default {
    CACHE
};
