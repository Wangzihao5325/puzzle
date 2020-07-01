// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        catAvatar: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.initCat()
    },
    initCat() {


        var spineNode = new cc.Node();
        spineNode.name = 'catItem';
        spineNode.setPosition(25, -210);
        spineNode.setScale(0.6)
        var skeleton = spineNode.addComponent(sp.Skeleton);
        this.catAvatar.addChild(spineNode);
        //TODO : 此处为你的远程资源路径
        var imageUrl = "https://puzzle.oss-cn-beijing.aliyuncs.com/maopa.png";
        var skeUrl = "https://puzzle.oss-cn-beijing.aliyuncs.com/maopa.json";
        var atlasUrl = "https://puzzle.oss-cn-beijing.aliyuncs.com/maopa.atlas";
        cc.loader.load(imageUrl, (error, texture) => {
            cc.loader.load({ url: atlasUrl, type: 'txt' }, (error, atlasJson) => {
                cc.loader.load({ url: skeUrl, type: 'txt' }, (error, spineJson) => {

                    const catPostList = ['Zou00', 'PA00', 'Zhan00']
                    // this.ske_com.clearTrack(0);
                    //随机姿势

                    // HOME_CACHE.cat_post = Math.round(Math.random() * 2)
                    // if (CACHE.userInfo && CACHE.userInfo.stage == 5) {
                    //     //新手引导强制猫咪为站姿
                    //     HOME_CACHE.cat_post = 2;
                    // }

                    const currentPost = catPostList[0]

                    var asset = new sp.SkeletonData();
                    asset._uuid = skeUrl;
                    asset.skeletonJson = spineJson;
                    asset.atlasText = atlasJson;
                    asset.textures = [texture];
                    asset.textureNames = ['maopa.png'];
                    skeleton.skeletonData = asset;
                    skeleton.animation = currentPost;
                    skeleton._updateSkeletonData();

                });
            });
        });
    },
    // update (dt) {},
});
