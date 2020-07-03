import { SIZES, PUZZLE_SCENE, PUZZLE_FOOTER,GAME_CACHE } from '../global/piece_index';
import { initItem } from './initSplice';


cc.Class({
    extends: cc.Component,

    properties: {
        game_bg: cc.Node,
        pre_item: cc.Prefab,
        // splice_layout:cc.Node,
        spframe_puzzle: cc.SpriteFrame,
    },

    loadingPic() {
        cc.loader.loadRes("background/haixianbg", cc.SpriteFrame, (err, spriteFrame) => {
            this.spframe_puzzle = spriteFrame;
        });
    },

    // setLayoutType(auto){
    //     const current_layout=this.splice_layout.getComponent(cc.Layout)
    
    //     if(auto){
    //         // current_layout.type=cc.Layout.HORIZONTAL
    //         // current_layout.resizeMode=cc.Layout.CONTAINER
    //         // current_layout.horizontalDirection =cc.Layout.RIGHT_TO_LEFT
    //         // current_layout.type=GAME_CACHE.layout.type
    //         // current_layout.resizeMode=GAME_CACHE.layout.resizeMode
    //         // current_layout.horizontalDirection=GAME_CACHE.layout.type
    //         // current_layout.type=GAME_CACHE.layout.type
    //         // current_layout.updateLayout();
    //     }else{
    //         GAME_CACHE.layout=current_layout;
    //         setTimeout(()=>{
    //             current_layout.type=cc.Layout.NONE
    //         },500)
    //     }
    // },

    init(hardLevel, imagePath) {

        /*初始化底部栏位置记录*/
        PUZZLE_FOOTER.truePosition = [...PUZZLE_FOOTER.position];
        /* 设置底部栏的水平滑动*/
        this.game_bg.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            if (this.game_bg) {
                let delta = event.touch.getDelta();
                if ((this.game_bg.x + delta.x <= PUZZLE_FOOTER.position[0]) && (this.game_bg.x + delta.x >= PUZZLE_SCENE.width / 2 - this.game_bg.width)) {
                    let newPositin = cc.v2(this.game_bg.x + delta.x, this.game_bg.y)
                    PUZZLE_FOOTER.truePosition = [this.game_bg.x + delta.x+100, this.game_bg.y]
                    // this.game_bg.setPosition(newPositin);

                    // //根据当前视图判断显示和隐藏子节点
                    const spliceWarpX=this.game_bg.x
                    if(this.game_bg&&this.game_bg.children){
                        this.game_bg.children.map(item=>{
                            const positionX=item.x
                            // console.log("positionX,spliceWarpX",positionX,spliceWarpX,positionX-spliceWarpX)
                            let onViewr=positionX+spliceWarpX>-400&&positionX+spliceWarpX<400
                            if(onViewr){
                                item.opacity=255
                            }else{
                                item.opacity=0
                            }
                        })
                    }

                }
            }
        });

        /*动态加载资源*/
        cc.loader.load({ url: imagePath, type: 'png' }, (err, texture) => {
            if (texture) {
                this.spframe_puzzle = new cc.SpriteFrame(texture);
                /*初始化所有的块*/
                initItem(SIZES, hardLevel, 0, this.pre_item, this.game_bg, this.spframe_puzzle,false,false,true)

            } else {
                cc.error(err);
            }
        });

    },
})

