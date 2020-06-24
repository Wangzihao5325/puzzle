//[坐标x,坐标y,宽，告，中心店坐标x,中心店坐标y,第几块拼图]
const SIZE2_3 = [
  [0, 0, 406, 351, -119, 253, 0],
  [303, 0, 341, 353, 151.5, 252, 1],
  [0, 269, 333, 310, -155.5, 4.5, 2],
  [235, 266, 409, 317, 117.5, 4, 3],
  [0, 495, 399, 362 + 1, -122.5, -247.5 + 1, 4],
  [302, 488, 342, 369, 151, -244, 5]
];
const SIZE3_3 =
[ [ 0, 0, 113, 180, -265.5, 338.5, 0 ],
  [ 85, 0, 156, 176, -159, 340.5, 1 ],
  [ 212, 0, 121, 152, -49.5, 352.5, 2 ],
  [ 0, 138, 132, 159, -256, 211, 3 ],
  [ 101, 146, 128, 150, -157, 207.5, 4 ],
  [ 192, 113, 140, 211, -60, 210, 5 ],
  [ 0, 260, 119, 179, -262.5, 79, 6 ],
  [ 90, 256, 165, 184, -149.5, 80.5, 7 ],
  [ 219, 287, 115, 152, -45.5, 65.5, 8 ] ]


;


const SIZE3_4 =
[ [ 0, 0, 228, 223, -208, 317, 0 ],
  [ 156, 0, 330, 270, -1, 293.5, 1 ],
  [ 419, 0, 235, 276, 214.5, 290.5, 2 ],
  [ 0, 152, 277, 331, -183.5, 111, 3 ],
  [ 210, 207, 237, 286, 6.5, 78.5, 4 ],
  [ 376, 199, 278, 290, 193, 84.5, 5 ],
  [ 0, 418, 266, 280, -189, -129.5, 6 ],
  [ 195, 422, 301, 290, 23.5, -138.5, 7 ],
  [ 431, 423, 223, 282, 220.5, -135.5, 8 ],
  [ 0, 636, 227, 234, -208.5, -324.5, 9 ],
  [ 154, 640, 328, 230, -4, -326.5, 10 ],
  [ 418, 645, 236, 227, 214, -330, 11 ] ]
;


const SIZE4_6 = [
  [0, 0, 198, 180, -223, 338.5, 0],
  [150, 0, 177, 148, -83.5, 354.5, 1],
  [279, 0, 238, 178, 76, 339.5, 2],
  [469, 0, 174 + 1, 148, 234 + 1, 354.5, 3],

  [0, 134, 191, 164, -226.5, 212.5, 4],
  [145, 104, 184, 185, -85, 232, 5],
  [275, 134, 245, 187, 75.5, 201, 6],
  [470, 100, 174, 222 - 3, 235, 217.5 - 3, 7],

  [0, 251, 172, 215, -236, 70, 8],
  [117, 241, 248, 219, -81, 78, 9],
  [315, 279, 175, 190, 80.5, 54.5, 10],
  [437, 270, 206 + 1, 192 - 2, 218 + 1, 62.5 - 2, 11],

  [0, 420, 170, 183, -237, -83, 12],
  [119, 417, 238, 185, -84, -81, 13],
  [304, 421, 223, 192, 93.5, -88.5, 14],
  [478, 417, 165 + 1, 187 - 2, 238.5 + 1, -82 - 2, 15],

  [0, 561, 170, 183, -237, -224, 16],
  [119, 560, 238, 183, -84, -223, 17],
  [304, 565, 223, 189, 93.5, -231, 18],
  [478, 564, 165 + 1, 181 - 2, 238.5 + 1, -226 - 2, 19],

  [0, 703, 167, 154, -238.5, -351.5, 20],
  [114, 701, 214, 154 - 1, -101, -349.5 - 1, 21],
  [274, 706, 243, 152, 73.5, -353.5, 22],
  [469, 705, 174 + 1, 149 - 2, 234 + 1, -351 - 2, 23]
];

const SIZE6_8 = [
  [0, 0, 111, 116, -266.5, 370.5, 0],
  [77, 0, 141, 135, -174.5, 361, 1],
  [188, 0, 139, 110, -64.5, 373.5, 2],
  [294, 0, 144, 137, 44, 360, 3],
  [399, 0, 166, 116, 160, 370.5, 4],
  [531, 0, 111 + 2, 116, 264.5 + 2, 370.5, 5],

  [0, 84, 134, 159, -255, 265, 6],
  [101, 101, 120, 146, -161, 254.5, 7],
  [185, 77, 143, 149, -65.5, 277, 8],
  [292, 101, 141, 117, 40.5, 269, 9],
  [401, 83, 141, 163, 149.5, 264, 10],
  [509, 84, 133 + 2, 159, 253.5 + 2, 265, 11],

  [0, 210, 111, 118, -266.5, 159.5, 12],
  [78, 210, 144, 142, -172, 147.5, 13],
  [191, 191, 139, 159, -61.5, 158, 14],
  [298, 185, 164, 166, 58, 160.5, 15],
  [426, 210, 139, 122, 173.5, 157.5, 16],
  [532, 210, 111 + 1, 118, 265.5 + 1, 159.5, 17],

  [0, 296, 135, 160, -254.5, 52.5, 18],
  [101, 317, 121, 142, -160.5, 40.5, 19],
  [191, 316, 137, 117, -62.5, 54, 20],
  [294, 314, 161, 118, 52.5, 55.5, 21],
  [420, 301, 124, 158, 160, 48.5, 22],
  [510, 296, 135, 160, 255.5, 52.5, 23],

  [0, 424, 111, 120, -266.5, -55.5, 24],
  [77, 424, 141, 140, -174.5, -65.5, 25],
  [188, 400, 139, 139, -64.5, -41, 26],
  [294, 399, 144, 167, 44, -54, 27],
  [399, 424, 167, 120, 160.5, -55.5, 28],
  [532, 424, 111, 120, 265.5, -55.5, 29],

  [0, 512, 133, 159, -255.5, -163, 30],
  [100, 530, 120, 146, -162, -174.5, 31],
  [184, 506, 144, 150, -66, -152.5, 32],
  [292, 530, 142, 117, 41, -160, 33],
  [403, 511, 140, 163, 151, -164, 34],
  [510, 512, 133, 159, 254.5, -163, 35],

  [0, 638, 111, 118, -266.5, -268.5, 36],
  [78, 639, 144, 142, -172, -281.5, 37],
  [191, 621, 139, 159, -61.5, -272, 38],
  [298, 614, 164, 165, 58, -268, 39],
  [426, 638, 139, 122, 173.5, -270.5, 40],
  [532, 638, 111, 118, 265.5, -268.5, 41],

  [0, 724, 135, 132, -254.5, -361.5, 42],
  [101, 746, 121, 111, -160.5, -373, 43],
  [191, 746, 137, 113, -62.5, -374, 44],
  [294, 743, 161, 114, 52.5, -371.5, 45],
  [420, 730, 123, 127, 159.5, -365, 46],
  [509, 724, 135, 132, 254.5, -361.5, 47]
];

const MASK_PIECE2_3 = [
  "2x3-1/1",
  "2x3-1/2",
  "2x3-1/3",
  "2x3-1/4",
  "2x3-1/5",
  "2x3-1/6"
];

const MASK_PIECE3_3 = [
  "3x3/01",
  "3x3/02",
  "3x3/03",
  "3x3/04",
  "3x3/05",
  "3x3/06",
  "3x3/07",
  "3x3/08",
  "3x3/09",
];

const MASK_PIECE3_4 = [
  "3x4/01",
  "3x4/02",
  "3x4/03",
  "3x4/04",
  "3x4/05",
  "3x4/06",
  "3x4/07",
  "3x4/08",
  "3x4/09",
  "3x4/10",
  "3x4/11",
  "3x4/12",
];

const MASK_PIECE4_6 = [
  "4x6/01",
  "4x6/02",
  "4x6/03",
  "4x6/04",
  "4x6/05",
  "4x6/06",
  "4x6/07",
  "4x6/08",
  "4x6/09",
  "4x6/10",
  "4x6/11",
  "4x6/12",
  "4x6/13",
  "4x6/14",
  "4x6/15",
  "4x6/16",
  "4x6/17",
  "4x6/18",
  "4x6/19",
  "4x6/20",
  "4x6/21",
  "4x6/22",
  "4x6/23",
  "4x6/24"
];

const MASK_PIECE6_8 = [
  "6x8/01",
  "6x8/02",
  "6x8/03",
  "6x8/04",
  "6x8/05",
  "6x8/06",
  "6x8/07",
  "6x8/08",
  "6x8/09",
  "6x8/10",
  "6x8/11",
  "6x8/12",
  "6x8/13",
  "6x8/14",
  "6x8/15",
  "6x8/16",
  "6x8/17",
  "6x8/18",
  "6x8/19",
  "6x8/20",
  "6x8/21",
  "6x8/22",
  "6x8/23",
  "6x8/24",
  "6x8/25",
  "6x8/26",
  "6x8/27",
  "6x8/28",
  "6x8/29",
  "6x8/30",
  "6x8/31",
  "6x8/32",
  "6x8/33",
  "6x8/34",
  "6x8/35",
  "6x8/36",
  "6x8/37",
  "6x8/38",
  "6x8/39",
  "6x8/40",
  "6x8/41",
  "6x8/42",
  "6x8/43",
  "6x8/44",
  "6x8/45",
  "6x8/46",
  "6x8/47",
  "6x8/48"
];

const SIZES = [SIZE3_4, SIZE4_6, SIZE6_8, SIZE6_8];

const MASK_RESOUSE = [MASK_PIECE3_4, MASK_PIECE4_6, MASK_PIECE6_8, MASK_PIECE6_8];

const TYPES = [
  [3, 4],
  [4, 6],
  [6, 8],
  [6, 8]
];

const PIC_WIDTH = 644;

const PIC_HEIGHT = 857;

const LEVEL = {
  EASY: 0,
  NORMAL: 1,
  HARD: 2,
  //VERY_HARD: 3
};

/*每张拼图最多的星星个数，与难度级别的数目对应*/
const LEVEL_STAR = 3;

const SCALELEAVEL = {
  0: 0.25,
  1: 0.5,
  2: 0.6,
  3: 0.6
}

var currentLeavel = 2

var underwayIndex = []

var spliceArr = []

var coutnDown = 0

var GAME_CACHE = {
  gameTime: 300,
  coutnDown: 6,
  isComplate: false,
  pause: false,
  textRandomTimes: 4,
  complateIndex: [],
  animatePayload: undefined,
  currentCityId:undefined,
  currentLeavel : 2,
  underwayIndex:[],
  spliceArr:[],
  layout:{}
}

const PUZZLE_FOOTER = {
  position: [-322, -500],//起始位置坐标 页面width:644
  truePosition: [-322, -500],//真实位置坐标
  height: 128,
  itemWidth: 140,
  itemWidthMargin: 20,
}

const PUZZLE_SCENE = {
  width: 500
}

export default {
  SIZES,
  MASK_RESOUSE,
  TYPES,
  PIC_WIDTH,
  PIC_HEIGHT,
  LEVEL,
  SCALELEAVEL,
  underwayIndex,
  spliceArr,
  currentLeavel,
  coutnDown,
  GAME_CACHE,
  PUZZLE_FOOTER,
  PUZZLE_SCENE,
  LEVEL_STAR
};
