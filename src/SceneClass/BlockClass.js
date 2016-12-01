var BlockClass = cc.Sprite.extend({
    ctor:function(fileName) {
        this._super(fileName);
    },
    onExit:function(){
        this._super();
    }
});
