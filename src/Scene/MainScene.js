//失败后通关数不变
//评分不计
var MainLayer = cc.Layer.extend({
    sprite:null,
    player:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        //背景创建
        var bg=new cc.Sprite(res.Bg_jpg);
        bg.x=size.width/2;
        bg.y=size.height/2;
        this.addChild(bg);

        var diedLabel=new cc.LabelTTF("死亡");
        diedLabel.setFontSize(size.width/22);
        var diedItem=new cc.MenuItemLabel(diedLabel,function(){
            cc.director.runScene(new FailedScene());
        },this);
        diedItem.x=size.width*0.1;
        diedItem.y=size.height*0.1;
        var diedMenu=new cc.Menu(diedItem);
        this.addChild(diedMenu);

        var passLabel=new cc.LabelTTF("过关");
        passLabel.setFontSize(size.width/22);
        var passItem=new cc.MenuItemLabel(passLabel,function(){
            cc.director.runScene(new SuccessScene());
        },this);
        passItem.x=size.width*0.3;
        passItem.y=size.height*0.1;
        var passMenu=new cc.Menu(passItem);
        this.addChild(passMenu);


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