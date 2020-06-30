// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        root: cc.Node,
        richText: cc.RichText,
        txtBg: cc.Node,
        tail: cc.Node,
    },

    setContentStr(string, isHeightFit) {
        let biggerSize = 120;//margin*2
        let biggerHeight = 30;
        this.richText.node.opacity = 1;
        this.richText.string = string;
        setTimeout(() => {
            /*将读取富文本宽度操作排到执行队列尾部
              确保富文本的渲染执行完毕*/
            let bgWidth = this.richText.node.width + biggerSize;
            this.txtBg.width = bgWidth;
            if (isHeightFit) {
                this.txtBg.height = this.richText.node.height + biggerHeight * 2;
            } else {
                this.txtBg.height = 120;
            }
            this.tail.x = -bgWidth / 2;
            this.richText.node.opacity = 255;
        }, 0);
    },

    textAnimate1(callback) {
        this.txtBg.height = 120;
        this.txtBg.width = 400;

        let str0 = '';
        let _str0 = '[高级猫粮]';
        let str1 = '';
        let _str1 = '可以大量增加';
        let str2 = '';
        let _str2 = '饱食度';
        let str3 = '';
        let _str3 = '\n同时还可以增加';
        let str4 = '';
        let _str4 = '幸运值';
        let str5 = '';
        let _str5 = '哦';
        let str = `<color=#887160><color=#e37974>${str0}</color>${str1}<color=#e37974>${str2}</color>${str3}<color=#e37974>${str4}</color>${str5}</color>`;
        let j = 0;
        this.richText.string = str;
        this.schedule(() => {
            if (j <= 5) {
                str0 += _str0[j];
                this.richText.string = `<color=#e37974>${str0}</color>`;
                if (j == 5) {
                    let homeNode = cc.find('Canvas');
                    let homeObj = homeNode.getComponent('home_index');
                    // if (homeObj) {
                    //     homeObj.maocaoAnimation();
                    // }
                    this.schedule(() => {
                        if (j >= 6 && j <= 11) {
                            str1 += _str1[j - 6];
                            this.richText.string = `<color=#887160><color=#e37974>${str0}</color>${str1}</color>`;
                        } else if (j >= 12 && j <= 14) {
                            str2 += _str2[j - 12];
                            this.richText.string = `<color=#887160><color=#e37974>${str0}</color>${str1}<color=#e37974>${str2}</color></color>`;
                            if (j == 14) {
                                if (homeObj) {
                                    homeObj.engerAnimation();
                                }
                            }
                        } else if (j >= 15 && j <= 22) {
                            str3 += _str3[j - 15];
                            this.richText.string = `<color=#887160><color=#e37974>${str0}</color>${str1}<color=#e37974>${str2}</color>${str3}</color>`;
                        } else if (j >= 23 && j <= 25) {
                            str4 += _str4[j - 23];
                            this.richText.string = `<color=#887160><color=#e37974>${str0}</color>${str1}<color=#e37974>${str2}</color>${str3}<color=#e37974>${str4}</color></color>`;
                            if (j == 25) {
                                if (homeObj) {
                                    homeObj.luckyAnimation();
                                }
                            }
                        } else if (j == 26) {
                            this.richText.string = `<color=#887160><color=#e37974>${str0}</color>${str1}<color=#e37974>${str2}</color>${str3}<color=#e37974>${str4}</color>${_str5}</color>`;
                            if (callback) {
                                callback();
                            }
                        }
                        j++;
                    }, 0.1, 22, 2);
                }
            }
            j++;
        }, 0.1, 5, 0.2);//27
    },

    textAnimate2(callback) {
        this.txtBg.height = 120;
        this.txtBg.width = 400;

        let str0 = '';
        let _str0 = '幸运值';
        let str1 = '';
        let _str1 = '越高,猫咪外出获得\n物品的几率越大';
        let str = `<color=#887160><color=#e37974>${str0}</color>${str1}</color>`;
        let j = 0;
        this.richText.string = str;
        this.schedule(() => {
            if (j <= 2) {
                str0 += _str0[j];
                this.richText.string = `<color=#e37974>${str0}</color>`;
                if (j == 2) {
                    let homeNode = cc.find('Canvas');
                    let homeObj = homeNode.getComponent('home_index');
                    if (homeObj) {
                        homeObj.maocaoAnimation();
                    }
                }
            } else if (j >= 3 && j <= 19) {
                str1 += _str1[j - 3];
                this.richText.string = `<color=#887160><color=#e37974>${str0}</color>${str1}</color>`;
                if (j == 19) {
                    if (callback) {
                        callback();
                    }
                }
            }
            j++;
        }, 0.1, 20, 0.2);//27
    },

    start() {

    },
});
