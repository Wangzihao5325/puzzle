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

const BG_ASSET_URL = [
    'https://puzzle.oss-cn-beijing.aliyuncs.com/travel.png',
    'https://puzzle.oss-cn-beijing.aliyuncs.com/my_home.png',
    'https://puzzle.oss-cn-beijing.aliyuncs.com/show.png',
    'https://puzzle.oss-cn-beijing.aliyuncs.com/mission.png',
];

const CITY_ICON_URL = [
    'https://puzzle.oss-cn-beijing.aliyuncs.com/chengdu.png',
    'https://puzzle.oss-cn-beijing.aliyuncs.com/xian.png',
    'https://puzzle.oss-cn-beijing.aliyuncs.com/beijing.png',
    'https://puzzle.oss-cn-beijing.aliyuncs.com/shanghai.png',
    'https://puzzle.oss-cn-beijing.aliyuncs.com/xiamen.png',
    'https://puzzle.oss-cn-beijing.aliyuncs.com/sanya.png',
    'https://puzzle.oss-cn-beijing.aliyuncs.com/guangzhou.png',
    'https://puzzle.oss-cn-beijing.aliyuncs.com/xizang.png',
];

export default {
    SCENE,
    SCENE_KEY,
    BG_ASSET_URL,
    CITY_ICON_URL
}