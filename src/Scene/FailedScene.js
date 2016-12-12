//失败后通关数不变
//评分不计
var FailedLayer = cc.Layer.extend({
    sprite:null,
    starImg:[],
    failImg:[],
    ctor:function () {
        this._super();

        var size = cc.winSize;
        //背景创建
        var bg=new cc.Sprite(res.Bg_jpg);
        bg.x=size.width/2;
        bg.y=size.height/2;
        this.addChild(bg);
        //失败label创建
        var failedLabel = new cc.LabelTTF("失败","",50);
        failedLabel.x = size.width*0.5;
        failedLabel.y = size.height*0.8;
        failedLabel.setFontFillColor(cc.color.RED);
        failedLabel.enableStroke(cc.color.YELLOW,5);
        failedLabel.enableShadow(cc.color.GREEN,cc.p(5,5),5);
        this.addChild(failedLabel);

        //星级评定
        var ls = cc.sys.localStorage;
        if (null == ls.getItem("failStar")) {  //不存在star数量
            console.log("还没打游戏怎么到这个界面了？");
        }
        else {
            //成功star数量
            var starNum = parseInt(ls.getItem("failStar"));
            for (var i = 1; i <= starNum; i++) {
                this.starImg[i] = new cc.Sprite(res.Star_png);
                this.starImg[i].x = size.width * 0.2 + 149* i;
                this.starImg[i].y = size.height * 0.5;
                this.addChild(this.starImg[i]);
            }
            // 失败star数量
            for(var j=starNum+1;j<=3;j++)
            {
                this.failImg[j] = new cc.Sprite(res.Star_Failed_png);
                this.failImg[j].x = size.width * 0.2 + 149 * j;
                this.failImg[j].y = size.height * 0.5;
                this.addChild(this.failImg[j]);
            }
        }

        //返回主页面 重试按钮
        var selectLeftItem = new cc.MenuItemImage(res.SelectBack_png,res.SelectBack_png,function () {
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            cc.director.runScene(new StartScene());
        },this);
        var selectAgainItem = new cc.MenuItemImage(res.SelectReturn_png,res.SelectReturn_png,function () {
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            // cc.director.runScene(new selectTwoScene());
        },this);
        var menu= new cc.Menu(selectLeftItem,selectAgainItem);
        menu.x=size.width*0.5;
        menu.y=size.height*0.2;
        this.addChild(menu);
        menu.alignItemsHorizontally();
        menu.alignItemsHorizontallyWithPadding(size.width*0.5);

        return true;
    }
});

var FailedScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FailedLayer();
        this.addChild(layer);
    }
});