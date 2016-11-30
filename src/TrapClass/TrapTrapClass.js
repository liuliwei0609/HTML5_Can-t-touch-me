var TrapTrapClass = cc.Sprite.extend({
    ctor:function(fileName, rect, rotated) {
        this._super(fileName, rect, rotated);
        var trap=new cc.Sprite(res.Cactus_png);
        this.addChild(trap);
        this.killPlayer();

    },
    onExit:function(){
        this._super();
    },
    killPlayer:function()
    {
        //
    }
});
