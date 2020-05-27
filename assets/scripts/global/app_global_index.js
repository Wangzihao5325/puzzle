const SCENE = {
    LOADING: 'loading_scene',
    TRAVEL: 'travel_scene',
    HOME: 'home_scene',
    SHOW: 'show_scene',
    MISSION: 'mission_scene',
    GAME: 'game_scene',
};

const SCENE_KEY = {
    TRAVEL: 0,
    HOME: 1,
    SHOW: 2,
    MISSION: 3,
    GAME: 4,
    LOADING: 5,
};

const IMAGE_SERVER = 'https://puzzle.oss-cn-beijing.aliyuncs.com';

const BG_ASSET_URL = [
    `${IMAGE_SERVER}/travel.png`,
    `${IMAGE_SERVER}/my_home.png`,
    `${IMAGE_SERVER}/show.png`,
    `${IMAGE_SERVER}/mission.png`,
];

const CITY_ICON_URL = [
    `${IMAGE_SERVER}/chengdu.png`,
    `${IMAGE_SERVER}/xian.png`,
    `${IMAGE_SERVER}/beijing.png`,
    `${IMAGE_SERVER}/shanghai.png`,
    `${IMAGE_SERVER}/xiamen.png`,
    `${IMAGE_SERVER}/sanya.png`,
    `${IMAGE_SERVER}/guangzhou.png`,
    `${IMAGE_SERVER}/xizang.png`,
];

const MAN_VISTER = [
    `${IMAGE_SERVER}/nance.png`,
    `${IMAGE_SERVER}/nanzheng.png`,
];

const WOMAN_VISTER = [
    `${IMAGE_SERVER}/nvce.png`,
    `${IMAGE_SERVER}/nvzheng.png`,
];

const VISTER_ATTITUDE = [
    `${IMAGE_SERVER}/biaoqing01.png`,
    `${IMAGE_SERVER}/biaoqing02.png`,
    `${IMAGE_SERVER}/biaoqing03.png`,
    `${IMAGE_SERVER}/biaoqing04.png`,
    `${IMAGE_SERVER}/biaoqing05.png`,
    `${IMAGE_SERVER}/biaoqing06.png`,
    `${IMAGE_SERVER}/biaoqing07.png`,
    `${IMAGE_SERVER}/biaoqing08.png`,
    `${IMAGE_SERVER}/biaoqing09.png`,
    `${IMAGE_SERVER}/biaoqing10.png`,
];

const NAVI_ASSETS = [
    `${IMAGE_SERVER}/jiaweixuanzhong.png`,
    `${IMAGE_SERVER}/jiayuan.png`,
    `${IMAGE_SERVER}/lvxingweixuanzhong.png`,
    `${IMAGE_SERVER}/lvxing3.png`,
    `${IMAGE_SERVER}/zhanlanweixianzhong.png`,
    `${IMAGE_SERVER}/zhanlan.png`,
];

export default {
    SCENE,
    SCENE_KEY,
    BG_ASSET_URL,
    CITY_ICON_URL,
    MAN_VISTER,
    WOMAN_VISTER,
    VISTER_ATTITUDE,
    NAVI_ASSETS,
    IMAGE_SERVER
}