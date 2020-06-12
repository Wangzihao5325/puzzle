import { CACHE } from '../global/usual_cache';

cc.Class({
    extends: cc.Component,

    properties: {
        ben: cc.Node,
        deng: cc.Node,
        cao: cc.Node,
        maoxian: cc.Node,
        mao: cc.Node,
        hua: cc.Node,
        piao: cc.Node,
        text: cc.Node,

        text2: cc.Node,
        text3: cc.Node,

        gaotie: cc.Node,
        ditu: cc.Node,
        xiangzi: cc.Node,
        tuoxie: cc.Node,
        yiwu: cc.Node,
        aozi: cc.Node,
        shu: cc.Node,

    },

    animateStepTwo() {
        cc.tween(this.xiangzi)
            .to(0.5, { opacity: 255 })
            .call(() => {
                cc.tween(this.tuoxie)
                    .to(0.5, { position: cc.v2(this.tuoxie.x, this.tuoxie.y - 5), opacity: 255 })
                    .start();

                cc.tween(this.yiwu)
                    .to(0.5, { position: cc.v2(this.yiwu.x, this.yiwu.y - 5), opacity: 255 })
                    .start();

                cc.tween(this.aozi)
                    .to(0.5, { position: cc.v2(this.aozi.x, this.aozi.y - 5), opacity: 255 })
                    .start();

                cc.tween(this.shu)
                    .to(0.5, { position: cc.v2(this.shu.x, this.shu.y - 5), opacity: 255 })
                    .start();

                cc.tween(this.ditu)
                    .to(0.5, { opacity: 255 })
                    .start();
                cc.tween(this.gaotie)
                    .delay(0.5)
                    .to(0.5, { angle: 0, opacity: 255 })
                    .start();
            })
            .start()
    },


    textAnimate() {
        this.text3.active = true;
        cc.tween(this.text3)
            .to(1, { angle: 0, position: cc.v2(-199, 287) })
            .call(() => {
                this.node.active = false;
            })
            .start();
    },


    setText2() {
        this.text2.active = true;
        let str = "日记中，\n奶奶描绘着【成都】的美好，看了之后迫不及待\n收拾行囊，买好车票\n\n\n开始一场说走就走的旅行吧";
        let j = 0;
        this.text2.getComponent(cc.Label).string = "";
        this.schedule(() => {
            if (j == str.length) {
                this.textAnimate();
            } else if (j == 27) {
                this.animateStepTwo();
                this.text2.getComponent(cc.Label).string += str[j];
                j++;
            } else {
                this.text2.getComponent(cc.Label).string += str[j];
                j++;
            }
        }, 0.1, str.length, 0.2);
    },


    setText() {
        let str = "搬家时，\n发现了奶奶的笔记本，里面夹着老旧的车票和照片\n在这小小本子里，记录了他的岁月\n好想到奶奶去过的这些地方看一看\n然后留下自己的回忆";
        let j = 0;
        this.text.getComponent(cc.Label).string = "";
        this.schedule(() => {
            if (j == str.length) {
                this.clearStepOne();
                this.setText2();
            } else {
                this.text.getComponent(cc.Label).string += str[j];
                j++;
            }
        }, 0.1, str.length, 0.2);
    },

    clearStepOne() {
        this.ben.active = false;
        this.deng.active = false;
        this.cao.active = false;
        this.maoxian.active = false;
        this.mao.active = false;
        this.hua.active = false;
        this.piao.active = false;
        this.hua.active = false;
        this.text.active = false;
    },

    animateStepOne() {
        cc.tween(this.ben)
            .to(1, { scale: 0.4, angle: 10 })
            .to(1, { scale: 0.5 })
            .start();

        cc.tween(this.deng)
            .delay(1.5)
            .to(1.5, { scale: 0.5, opacity: 255 })
            .call(() => {
                cc.tween(this.mao)
                    .to(1, { opacity: 255 })
                    .start();

                cc.tween(this.cao)
                    .delay(0.2)
                    .to(1, { opacity: 255 })
                    .start();

                cc.tween(this.maoxian)
                    .delay(0.4)
                    .to(1, { opacity: 255 })
                    .call(() => {
                        cc.tween(this.hua)
                            .to(1, { angle: 0, opacity: 255 })
                            .start();
                        cc.tween(this.piao)
                            .to(1, { angle: 0, opacity: 255 })
                            .call(() => {
                                this.setText();
                            })
                            .start();
                    })
                    .start();
            })
            .start();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (CACHE.userInfo && typeof CACHE.userInfo.stage == 'number' && CACHE.userInfo.stage == 1) {
            this.animateStepOne();
        } else {
            this.node.active = false
        }
    },
    // update (dt) {},
});
