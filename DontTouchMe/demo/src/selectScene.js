/**
 * Created by Administrator on 11/15 0015.
 */

var SelectLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        //选关界面背景图
        var bg = new cc.Sprite(res.StartBg_jpg);
        bg.x=size.width/2;
        bg.y=size.height/2;
        //bg.setAnchorPoint(0,0);
        this.addChild(bg);

        
        return true;
    }
});

var SelectScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SelectLayer();
        this.addChild(layer);
    }
});

