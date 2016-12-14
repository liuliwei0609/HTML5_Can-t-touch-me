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
        var bg=new cc.Sprite(res.PassBg);
        bg.x=size.width/2;
        bg.y=size.height/2;
        this.addChild(bg);
        var bgBlock=new cc.Sprite(res.PassBlock);
        bgBlock.x=size.width/2;
        bgBlock.y=size.height/2+70;
        this.addChild(bgBlock);
        var bgSuccess=new cc.Sprite(res.PassSuccess);
        bgSuccess.x=size.width/2;
        bgSuccess.y=size.height/2+185;
        this.addChild(bgSuccess);
        //通关label创建
        // var SuccessLabel = new cc.LabelTTF("过 关！","",50);
        // SuccessLabel.x = size.width*0.5;
        // SuccessLabel.y = size.height*0.8;
        // SuccessLabel.setFontFillColor(cc.color.RED);
        // SuccessLabel.enableStroke(cc.color.YELLOW,5);
        // SuccessLabel.enableShadow(cc.color.GREEN,cc.p(5,5),5);
        // this.addChild(SuccessLabel);

        //星级评定
        var ls = cc.sys.localStorage;

        ls.setItem("star",2);

        if (null == ls.getItem("star")) {  //不存在star数量
            console.log("还没打游戏怎么到这个界面了？");
        }
        else {
            //成功star数量
            var starNum = parseInt(ls.getItem("star"));
            cc.log(starNum);
            for (var i = 1; i <= starNum; i++) {
                this.starImg[i] = new cc.Sprite(res.PassStarSuccess);
                this.starImg[i].x = size.width * 0.2+76 + 120* i;
                this.starImg[i].y = size.height * 0.5-30;
                this.addChild(this.starImg[i]);
            }
            // 失败star数量
            for(var j=starNum+1;j<=3;j++)
            {
                this.failImg[j] = new cc.Sprite(res.PassStarFailed);
                this.failImg[j].x = size.width * 0.2+76 + 120 * j;
                this.failImg[j].y = size.height * 0.5-30;
                this.addChild(this.failImg[j]);
            }
        }

        //返回主页面 重玩 下一关按钮
        var selectLeftItem = new cc.MenuItemImage(res.PassSelect,res.PassSelectSelect,function () {
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            cc.director.runScene(new SelectScene());
        },this);
        var LeftMenu= new cc.Menu(selectLeftItem);
        LeftMenu.x=cc.winSize.width*0.3-50;
        LeftMenu.y=cc.winSize.height*0.2-40;
        this.addChild(LeftMenu);
        var selectAgainItem = new cc.MenuItemImage(res.PassAgain,res.PassAgainSelect,function () {
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            switch (parseInt(ls.getItem("CurrentLevel"))){
                case 1:
                    cc.director.runScene(new MainSceneOne());
                    break;
                case 2:
                    cc.director.runScene(new MainSceneTwo());
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    break;
            }
        },this);
        var AgainMenu=new cc.Menu(selectAgainItem);
        AgainMenu.x=cc.winSize.width*0.6+150;
        AgainMenu.y=cc.winSize.height*0.2-40;
        this.addChild(AgainMenu);
        var selectNextItem=new cc.MenuItemImage(res.PassNext,res.PassNextSelect,function(){
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            switch (parseInt(ls.getItem("CurrentLevel"))){
                case 1:
                    cc.director.runScene(new MainSceneTwo());
                    break;
                case 2:
                    alert("程序猿正在开发！请等待！");
                    break;
                case 3:
                    alert("程序猿正在开发！请等待！");
                    break;
                case 4:
                    alert("程序猿正在开发！请等待！");
                    break;
                case 5:
                    alert("程序猿正在开发！请等待！");
                    break;
                case 6:
                    alert("程序猿正在开发！请等待！");
                    break;
            }
        },this);
        var NextMenu=new cc.Menu(selectNextItem);
        NextMenu.x=cc.winSize.width/2+6;
        NextMenu.y=cc.winSize.height/2-125;
        this.addChild(NextMenu);
        // var menu= new cc.Menu(selectLeftItem,selectAgainItem,selectNextItem);
        /*menu.x=size.width*0.5;
        menu.y=size.height*0.2;
        this.addChild(menu);
        menu.alignItemsHorizontally();
        menu.alignItemsHorizontallyWithPadding(size.width*0.2);*/
        // menu.x=cc.winSize.width/2;
        // menu.y=cc.winSize.height/2;
        // this.addChild(menu);

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