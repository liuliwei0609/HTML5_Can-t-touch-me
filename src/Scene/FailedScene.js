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
        var bg=new cc.Sprite(res.FailedBg);
        bg.x=size.width/2;
        bg.y=size.height/2;
        this.addChild(bg);

        var failedBlock=new cc.Sprite(res.FailedBlock);
        failedBlock.x=size.width/2;
        failedBlock.y=size.height/2+70;
        this.addChild(failedBlock);

        //星级评定
        var ls = cc.sys.localStorage;

        ls.setItem("failStar",0);
        if (null == ls.getItem("failStar")) {  //不存在star数量
            console.log("还没打游戏怎么到这个界面了？");
        }
        else {
            //成功star数量
            var starNum = parseInt(ls.getItem("failStar"));
            for (var i = 1; i <= starNum; i++) {
                this.starImg[i] = new cc.Sprite(res.PassStarSuccess);
                this.starImg[i].x = size.width * 0.2 + 149* i;
                this.starImg[i].y = size.height * 0.5;
                this.addChild(this.starImg[i]);
            }
            // 失败star数量
            for(var j=starNum+1;j<=3;j++)
            {
                this.failImg[j] = new cc.Sprite(res.PassStarFailed);
                this.failImg[j].x = size.width * 0.2+76 + 120* j;
                this.failImg[j].y = size.height * 0.5-30;
                this.addChild(this.failImg[j]);
            }
        }

        //返回主页面 重试按钮
        var selectLeftItem = new cc.MenuItemImage(res.PassSelect,res.PassSelectSelect,function () {
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            cc.director.runScene(new SelectScene());
        },this);
        var LeftMenu= new cc.Menu(selectLeftItem);
        LeftMenu.x=cc.winSize.width*0.5;
        LeftMenu.y=cc.winSize.height*0.2-40;
        this.addChild(LeftMenu);
        var selectAgainItem = new cc.MenuItemImage(res.FailedAgain,res.FailedAgainSelect,function () {
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            //重玩按钮功能实现
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
            // cc.director.runScene(new MainSceneOne());
        },this);
        var AgainMenu=new cc.Menu(selectAgainItem);
        AgainMenu.x=cc.winSize.width/2+6;
        AgainMenu.y=cc.winSize.height/2-125;
        this.addChild(AgainMenu);


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