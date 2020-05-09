const SIZE2_3 = [
    [0, 0, 406, 351, -119, 253], [303, 0, 341, 353, 151.5, 252],
    [0, 351 - 82, 333, 310, -155.5, 4.5], [235, 353 - 87, 409, 317, 117.5, 4],
    [0, 857 - 362, 399, 362, -122.5, -247.5], [644 - 342, 857 - 369, 342, 369, 151, -244]
];
const SIZE4_6 = [
    [0, 0, 198, 180, -223, 338.5], [150, 0, 177, 148, -83.5, 354.5], [279, 0, 238, 178, 76, 339.5], [469, 0, 174, 148, 234, 354.5],
    [0, 134, 191, 164, -226.5, 212.5], [145, 104, 184, 185, -85, 232], [275, 134, 245, 187, 75.5, 201], [470, 100, 174, 222, 235, 217.5],
    [0, 251, 172, 215, -236, 70], [117, 241, 248, 219, -81, 78], [315, 279, 175, 190, 80.5, 54.5], [437, 270, 206, 192, 218, 62.5],
    [0, 420, 170, 183, -237, -83], [119, 417, 238, 185, -84, -81], [304, 421, 223, 192, 93.5, -88.5], [478, 417, 165, 187, 238.5, -82],
    [0, 561, 170, 192, -237, -228.5], [119, 560, 238, 185, -84, -224], [304, 565, 223, 191, 93.5, -232], [478, 564, 165, 183, 238.5, -227],
    [0, 712, 167, 154, -238.5, -360.5], [114, 703, 214, 154, -101, -351.5], [274, 708, 243, 152, 73.5, -355.5], [469, 707, 174, 149, 234, -353]
]
const SIZE6_8 = [
    [0, 0, 111, 116, -266.5, 370.5], [77, 0, 141, 135, -174.5, 361], [188, 0, 139, 110, -64.5, 373.5], [294, 0, 144, 137, 44, 360], [399, 0, 166, 116, 160, 370.5], [531, 0, 111, 116, 264.5, 370.5],
    [0, 84, 134, 159, -255, 265], [101, 101, 120, 146, -161, 254.5], [185, 77, 143, 149, -65.5, 277], [292, 101, 141, 117, 40.5, 269], [401, 83, 141, 163, 149.5, 264], [509, 84, 133, 159, 253.5, 265],
    [0, 210, 111, 118, -266.5, 159.5], [78, 210, 144, 142, -172, 147.5], [191, 191, 139, 159, -61.5, 158], [298, 185, 164, 166, 58, 160.5], [426, 210, 139, 122, 173.5, 157.5], [532, 210, 111, 118, 265.5, 159.5],
    [0, 296, 135, 160, -254.5, 52.5], [101, 317, 121, 142, -160.5, 40.5], [191, 316, 137, 117, -62.5, 54], [294, 314, 161, 118, 52.5, 55.5], [420, 301, 124, 158, 160, 48.5], [510, 296, 135, 160, 255.5, 52.5],
    [0, 424, 111, 120, -266.5, -55.5], [77, 424, 141, 140, -174.5, -65.5], [188, 400, 139, 139, -64.5, -41], [294, 399, 144, 167, 44, -54], [399, 424, 167, 120, 160.5, -55.5], [532, 424, 111, 120, 265.5, -55.5],
    [0, 512, 133, 159, -255.5, -163], [100, 530, 120, 146, -162, -174.5], [184, 506, 144, 150, -66, -152.5], [292, 530, 142, 117, 41, -160], [403, 511, 140, 163, 151, -164], [510, 512, 133, 159, 254.5, -163],
    [0, 638, 111, 118, -266.5, -268.5], [78, 639, 144, 142, -172, -281.5], [191, 621, 139, 159, -61.5, -272], [298, 614, 164, 165, 58, -268], [426, 638, 139, 122, 173.5, -270.5], [532, 638, 111, 118, 265.5, -268.5],
    [0, 724, 135, 132, -254.5, -361.5], [101, 746, 121, 111, -160.5, -373], [191, 746, 137, 113, -62.5, -374], [294, 743, 161, 114, 52.5, -371.5], [420, 730, 123, 127, 159.5, -365], [509, 724, 135, 132, 254.5, -361.5]
];
const MASK_PIECE2_3 = [
    '2x3-1/1', '2x3-1/2',
    '2x3-1/3', '2x3-1/4',
    '2x3-1/5', '2x3-1/6'
];
const MASK_PIECE4_6 = [
    '4x6/01', '4x6/02', '4x6/03', '4x6/04',
    '4x6/05', '4x6/06', '4x6/07', '4x6/08',
    '4x6/09', '4x6/10', '4x6/11', '4x6/12',
    '4x6/13', '4x6/14', '4x6/15', '4x6/16',
    '4x6/17', '4x6/18', '4x6/19', '4x6/20',
    '4x6/21', '4x6/22', '4x6/23', '4x6/24',
];
const MASK_PIECE6_8 = [
    '6x8/01', '6x8/02', '6x8/03', '6x8/04', '6x8/05', '6x8/06',
    '6x8/07', '6x8/08', '6x8/09', '6x8/10', '6x8/11', '6x8/12',
    '6x8/13', '6x8/14', '6x8/15', '6x8/16', '6x8/17', '6x8/18',
    '6x8/19', '6x8/20', '6x8/21', '6x8/22', '6x8/23', '6x8/24',
    '6x8/25', '6x8/26', '6x8/27', '6x8/28', '6x8/29', '6x8/30',
    '6x8/31', '6x8/32', '6x8/33', '6x8/34', '6x8/35', '6x8/36',
    '6x8/37', '6x8/38', '6x8/39', '6x8/40', '6x8/41', '6x8/42',
    '6x8/43', '6x8/44', '6x8/45', '6x8/46', '6x8/47', '6x8/48',
];

const SIZES = [SIZE2_3, SIZE4_6, SIZE6_8];
const MASK_RESOUSE = [MASK_PIECE2_3, MASK_PIECE4_6, MASK_PIECE6_8];
const TYPES = [[2, 3], [4, 6], [6, 8]];
const PIC_WIDTH = 644;
const PIC_HEIGHT = 857;
const LEVEL = {
    EASY: 0,
    NORMAL: 1,
    HARD: 2
}

export default {
    SIZES,
    MASK_RESOUSE,
    TYPES,
    PIC_WIDTH,
    PIC_HEIGHT,
    LEVEL
};