//通关后通关数加1
//章节数满足6的倍数则加1
//评分数存入评分数组
//评分书存入总分数
var SuccessLayer = cc.Layer.extend({
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
        //通关label创建
        var SuccessLabel = new cc.LabelTTF("过 关！","",50);
        SuccessLabel.x = size.width*0.5;
        SuccessLabel.y = size.height*0.8;
        SuccessLabel.setFontFillColor(cc.color.RED);
        SuccessLabel.enableStroke(cc.color.YELLOW,5);
        SuccessLabel.enableShadow(cc.color.GREEN,cc.p(5,5),5);
        this.addChild(SuccessLabel);

        //星级评定
        var ls = cc.sys.localStorage;
        if (null == ls.getItem("star")) {  //不存在star数量
            console.log("还没打游戏怎么到这个界面了？");
        }
        else {
            //成功star数量
            var starNum = parseInt(ls.getItem("star"));
            cc.log(starNum);
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

        //返回主页面 重玩 下一关按钮
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
        var selectNextItem=new cc.MenuItemImage(res.SelectNext_png,res.SelectNext_png,function(){
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            //判断当前关卡是多少，switch
            cc.director.runScene(new FailedScene());
        },this)
        var menu= new cc.Menu(selectLeftItem,selectAgainItem,selectNextItem);
        menu.x=size.width*0.5;
        menu.y=size.height*0.2;
        this.addChild(menu);
        menu.alignItemsHorizontally();
        menu.alignItemsHorizontallyWithPadding(size.width*0.2);

        return true;
    }
});

var SuccessScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SuccessLayer();
        this.addChild(layer);
    }
});