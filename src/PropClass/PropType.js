var PropOne = cc.Sprite.extend({
    ctor: function (fileName, rect, rotated) {
        this._super(fileName, rect, rotated);
        var that = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch,event) {
                var target = event.getCurrentTarget();
                var location = touch.getLocation();
                //cc.log(location.x+" "+location.y);

                //另外一种方法是用boundingBox来比较，不用坐标转换，如果旋转时可能不准确，非旋转时可以使用
                if (cc.rectContainsPoint(target.getBoundingBox(), location)) {
                    that.getParent().getParent().people.usePropOne();
                    //cc.log("精灵点击成功"+target.tag);
                    cc.log("精灵1点击成功");
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch,event){
            },
            onTouchEnded: function (touch,event) {
            },
            onTouchCancelled: function (touch, event) {
            }
        },this);
    },
    onExit:function(){
        this._super();
        cc.log("onExit调用，移除监听器");
        cc.eventManager.removeListener(this.listener);
    }
});
var PropTwo = cc.Sprite.extend({
    ctor: function (fileName, rect, rotated) {
        this._super(fileName, rect, rotated);
        var that = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch,event) {
                var target = event.getCurrentTarget();
                var location = touch.getLocation();
                //cc.log(location.x+" "+location.y);

                //另外一种方法是用boundingBox来比较，不用坐标转换，如果旋转时可能不准确，非旋转时可以使用
                if (cc.rectContainsPoint(target.getBoundingBox(), location)) {
                    that.getParent().getParent().people.usePropTwo();
                    //cc.log("精灵点击成功"+target.tag);
                    cc.log("精灵2点击成功");
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch,event){
            },
            onTouchEnded: function (touch,event) {
            },
            onTouchCancelled: function (touch, event) {
            }
        },this);
    },
    onExit:function(){
        this._super();
        cc.log("onExit调用，移除监听器");
        cc.eventManager.removeListener(this.listener);
    }
});
var PropThree = cc.Sprite.extend({
    ctor: function (fileName, rect, rotated) {
        this._super(fileName, rect, rotated);
        var that = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch,event) {
                var target = event.getCurrentTarget();
                var location = touch.getLocation();
                //cc.log(location.x+" "+location.y);

                //另外一种方法是用boundingBox来比较，不用坐标转换，如果旋转时可能不准确，非旋转时可以使用
                if (cc.rectContainsPoint(target.getBoundingBox(), location)) {
                    //道具点击后使用效果
                    that.getParent().getParent().people.usePropThree();
                    //cc.log("精灵点击成功"+target.tag);
                    cc.log("精灵3点击成功");
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch,event){
            },
            onTouchEnded: function (touch,event) {
            },
            onTouchCancelled: function (touch, event) {
            }
        },this);
    },
    onExit:function(){
        this._super();
        cc.log("onExit调用，移除监听器");
        cc.eventManager.removeListener(this.listener);
    }
});