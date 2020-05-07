// const MASKSIZE = [[0, 0, 406, 351], [0,0,341,353], [0,0,462,431],[0,0,355,276],[0,0,399,362],[0,0,342,369]];//01图片尺寸 23图片起始点坐标


cc.Class({
    extends: cc.Component,

    properties: {
        label_num: cc.Label,
        sp_item: cc.Sprite,
        mask_item: cc.Mask,
        splice_item:cc.Node,

    },

    init(num) {
        this.num = num;
        this.label_num.string = this.num
    },

    setSpItem(spt) {
        this.sp_item.spriteFrame = spt
    },

    setMarsk(index){
        var urls=['2x3-1/1','2x3-1/2','2x3-1/3','2x3-1/4','2x3-1/5','2x3-1/6']
        // var urls = ['4x6/01', '4x6/02','4x6/03', '4x6/04','4x6/05', '4x6/06','4x6/07', '4x6/08','4x6/09', '4x6/10','4x6/11', '4x6/12','4x6/13', '4x6/14','4x6/15', '4x6/16','4x6/17', '4x6/18','4x6/19', '4x6/20','4x6/21', '4x6/22','4x6/23', '4x6/24',];
        const self = this;
        cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            console.log("assets",assets)
            self.mask_item.spriteFrame = assets[index]
        });
    },

    setTouch() {
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.item_node.zIndex= 10//拿起增加z-index
        })
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            // console.log("evnt",event)
            if (this.item_node) {
                let delta = event.touch.getDelta();
                let newPositin = cc.v2(this.item_node.x + delta.x, this.item_node.y + delta.y)
                this.item_node.setPosition(newPositin);
            }
        })
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.item_node.zIndex= 1//恢复z-index
        })
    },

    setTouch() {
           
            this.node.on(cc.Node.EventType.TOUCH_START, () => {
                const current_node=this.item_node||this.splice_item;
                current_node.zIndex= 100//拿起增加z-index
      
                current_node.setScale(4)
                // current_node.setScale(4)
                // this.scrollView.node.off(cc.Node.EventType.TOUCH_START, this.scrollView._onTouchBegan, this.scrollView, true);
                current_node.setPropagateTouchEvents=false
            })

            this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
                // console.log("evnt",event)
                if (this.item_node) {
                    let delta = event.touch.getDelta();
                    let newPositin = cc.v2(this.item_node.x + delta.x, this.item_node.y + delta.y)
                    this.item_node.setPosition(newPositin);
    
                }
            })

            this.node.on(cc.Node.EventType.TOUCH_CANCEL, ()=>{
                console.log("TOUCH_CANCEL")
    
                //移动结束
                // current_node.setScale(0.25)
    
            })
            this.node.on(cc.Node.EventType.TOUCH_END, () => {
                const current_node=this.item_node||this.splice_item;
                console.log("touchEnd")
                this.calPostion(this.item_node.x , this.item_node.y -450)

                current_node.zIndex= 1//恢复z-index
                // current_node.setScale(0.25)
    
            })
        
    
   
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.node.zIndex=10000;
        this.num = 0;
        this.setTouch();
    },

    start() {

    },
    //计算中心点距离
    calPostion(x,y){
        const adsorbPosition=150
        console.log("item_node",this.item_node.defaultPostion,[x,y])
        const defaultPostion=this.item_node.defaultPostion
        const defaultx=defaultPostion[0]
        const defaulty=defaultPostion[1]
        const distance = (defaultx-x)*(defaultx-x)+(defaulty-y)*(defaulty-y);
        if(distance<=adsorbPosition*adsorbPosition){
            let newPositin = cc.v2(defaultx, defaulty)
            this.item_node.setPosition(newPositin)
            var item_puzzle_warp = cc.find(`Canvas/puzzleWarp/puzzleBg/item_puzzle_warp-${this.item_node.defaultIndex+1}`)
            item_puzzle_warp.active=false

            var item_puzzle_splice = cc.find(`Canvas/spliceWarp/item_puzzle_splice-${this.item_node.defaultIndex+1}`)
            item_puzzle_splice.active=false
        }
    },

    // update (dt) {},
});
