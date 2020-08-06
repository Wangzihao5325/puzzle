// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { CACHE } from '../global/usual_cache';
import Api from '../api/api_index'

cc.Class({
    extends: cc.Component,

    properties: {
        warp:cc.Node,
        modal:cc.Node,
        goOut:cc.Node,
        dress:cc.Node,
        feed:cc.Node,
        close:cc.Node,
        mainContent:cc.Node,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:
 
    // onLoad () {},

    start () {
        this.setTouch()
        if(CACHE.userInfo.firstMyHome===false){

            let goOutIcon = cc.find('Canvas/rootWarp/my_home/actionOut')
            let dreesIcon = cc.find('Canvas/rootWarp/my_home/actionDress')
            let bowlIcon = cc.find('Canvas/rootWarp/my_home/bowlWarp')
            goOutIcon.opacity=0
            dreesIcon.opacity=0
            bowlIcon.opacity=0
            setTimeout(()=>{
                this.handleClose()
            },2000)
        }
    },
    init(type){

        this.warp.setScale(0.2)
        cc.tween(this.warp)
        .to(.3,{scale:1.2})
        .to(0.15,{scale:1})
        .start()
    },


    handleClose(){
        if(CACHE.userInfo.firstMyHome===false){

            const positionOut=cc.v2(-250,-160)
            let goOutIcon = cc.find('Canvas/rootWarp/my_home/actionOut')
            let dreesIcon = cc.find('Canvas/rootWarp/my_home/actionDress')
            let bowlIcon = cc.find('Canvas/rootWarp/my_home/bowlWarp')
            goOutIcon.opacity=0
            dreesIcon.opacity=0
            bowlIcon.opacity=0

            let goOutIconWord = goOutIcon.parent.convertToWorldSpaceAR(goOutIcon.position);
            let goOutIconRoot = this.mainContent.convertToNodeSpaceAR(goOutIconWord);

            let dreesIconWord = dreesIcon.parent.convertToWorldSpaceAR(dreesIcon.position);
            let dreesIcontRoot = this.mainContent.convertToNodeSpaceAR(dreesIconWord);

            let bowlIconWord = bowlIcon.parent.convertToWorldSpaceAR(bowlIcon.position);
            let bowlIconRoot = this.mainContent.convertToNodeSpaceAR(bowlIconWord);

            // let Icon = this.dress
            // let goOutIconWord = goOutIcon.parent.convertToWorldSpaceAR(goOutIcon.position);
            // const root=cc.find("Canvas")
            // let targetRoot = root.convertToNodeSpaceAR(diamondIconWord);
    
            // this.crossholo.opacity=100
            cc.tween(this.goOut)
                .to(1, { position: cc.v2(goOutIconRoot.x, goOutIconRoot.y) })
                .to(.1, { opacity: 0,scale:0.2 })
                .call(()=>{
                    cc.tween(goOutIcon)
                    .to(.2, { opacity: 255 })
                    .start()
                })
                .start()
            cc.tween(this.dress)
                .delay(.2)
                .to(1, { position: cc.v2(dreesIcontRoot.x, dreesIcontRoot.y) })
                .to(.1, { opacity: 0,scale:0.2 })
                .call(()=>{
                    cc.tween(dreesIcon)
                    .to(.2, { opacity: 255 })
                    .start()
                })
                .start()
            cc.tween(this.feed)
                .delay(.4)
                .to(1, { position: cc.v2(bowlIconRoot.x, bowlIconRoot.y) })
                .to(.1, { opacity: 0,scale:0.2 })
                .call(()=>{
                    cc.tween(bowlIcon)
                    .to(.2, { opacity: 255 })
                    .start()
                })
                .start()
           Api.myhome_first(res=>{})
           CACHE.userInfo.firstMyHome=true
            setTimeout(()=>{
                this.closeDia()
            },2000)
        }else{
            this.closeDia()
        }

    },

    closeDia(){
        cc.tween(this.warp)
        .to(.1,{scale:1.2})
        .to(0.3,{scale:.2,opacity:0})
        .call(()=>{
            this.modal.destroy()
        })
        .start()
    },

    setTouch() {


        this.close.on(cc.Node.EventType.TOUCH_END, (event) => {
            cc.find("sound").getComponent("sound").tap()

            this.handleClose()
            event.stopPropagation();
        })
    }
    // update (dt) {},
});
