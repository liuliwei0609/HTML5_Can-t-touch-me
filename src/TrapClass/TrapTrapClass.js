var TrapTrapClass = cc.Sprite.extend({
    ctor:function(fileName, rect, rotated) {
        this._super(fileName, rect, rotated);
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
