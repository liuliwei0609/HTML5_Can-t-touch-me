//失败后通关数不变
//评分不计
var MainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        //背景创建
        var bg=new cc.Sprite(res.Bg_jpg);
        bg.x=size.width/2;
        bg.y=size.height/2;
        this.addChild(bg);

        var player=new Player();
        player.x=size.width/2;
        player.y=size.height/2;
        this.addChild(player);


        return true;
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});