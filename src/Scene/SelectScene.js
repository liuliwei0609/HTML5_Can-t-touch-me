
var SelectLayer = cc.Layer.extend({
    sprite:null,
    Block:[],
    Num_img:[],
    Star_img:[],
    failedStar_img:[],
    Lock_img:[],
    NumItem:[],
    NumMenu:[],
    Bg1:[],
    Bg2:[],
    //过关数
    //每关的评分
    //总分

    ctor:function () {
        this._super();

        var size = cc.winSize;
        //背景创建
        var bg2_1=new cc.Sprite(res.Bg2_png);
        bg2_1.x = cc.winSize.width/2;
        bg2_1.y = cc.winSize.height/2;
        this.addChild(bg2_1);
        this.Bg2[0]=bg2_1;

        var bg2_2=new cc.Sprite(res.Bg2_png);
        bg2_2.x = cc.winSize.width/2+bg2_1.getBoundingBox().width;
        bg2_2.y = cc.winSize.height/2;
        this.addChild(bg2_2);
        this.Bg2[1]=bg2_2;

        var bgf_1=new cc.Sprite(res.Bgf_png);
        bgf_1.x = cc.winSize.width/2;
        bgf_1.y = cc.winSize.height/2;
        this.addChild(bgf_1);
        this.Bg1[0]=bgf_1;

        var bgf_2=new cc.Sprite(res.Bgf_png);
        bgf_2.x = cc.winSize.width/2+bgf_1.getBoundingBox().width;
        bgf_2.y = cc.winSize.height/2;
        this.addChild(bgf_2);
        this.Bg1[1]=bgf_2;


        this.schedule(this.bg1CallBack,0.01);
        this.schedule(this.bg2CallBack,0.01);

        var ls=cc.sys.localStorage;
        // //设定目前的通关数（删除）
        ls.setItem("PassedLevels",2);
        // //设定每关的评分数（删除）
        ls.setItem("PerLevelsStarNum",2);

        //计算总评分数
        var StarCount=0;
        for(var i=0;i<ls.getItem("PassedLevels")-1;i++)
        {
            StarCount+=parseInt(ls.getItem("PerLevelsStarNum")[i]);

        }
        cc.log(StarCount);

        //建立总分数label
        var ConutLabel=new cc.LabelTTF(StarCount+"/18");
        ConutLabel.setFontSize(size.width/22);
        ConutLabel.x=size.width*0.7;
        ConutLabel.y=size.height*0.9;
        this.addChild(ConutLabel);

        var Star=new cc.Sprite(res.Star_png);
        Star.setScale(0.5);
        Star.x=size.width*0.77+20;
        Star.y=size.height*0.91;
        this.addChild(Star);

        //建立已通关关卡

        for(var i=0;i<ls.getItem("PassedLevels");i++)
        {
            //建立边框
            this.Block[i]=new cc.Sprite(res.Block_png);
            if(i<3)
            {
                this.Block[i].x=size.width*0.247*(i+1);
                this.Block[i].y=size.height*0.7;
            }
            else
            {
                this.Block[i].x=size.width*0.247*(i-2);
                this.Block[i].y=size.height*0.32;
            }
            this.addChild(this.Block[i]);
            //建立数字图片
            var j=i+1;
            var callBack;
            switch (i){
                case 0:
                    callBack = function () {
                        cc.director.runScene(new MainSceneOne());
                    };
                    break;
                case 1:
                    callBack = function () {
                        cc.director.runScene(new MainSceneTwo());
                    };
                    break;
                case 2:
                    callBack = function () {
                        cc.log(33333);
                    };
                    break;
                case 3:
                    break;
            }
            this.NumItem[i]=new cc.MenuItemImage("res/SelectScene/Num_"+j+".png","res/SelectScene/Num_"+j+".png",callBack,this);
            this.NumMenu[i]=new cc.Menu(this.NumItem[i]);
            if(i<3)
            {
                this.NumMenu[i].x=size.width*0.247*(i+1);
                this.NumMenu[i].y=size.height*0.7;
            }
            else
            {
                this.NumMenu[i].x=size.width*0.247*(i-2);
                this.NumMenu[i].y=size.height*0.32;
            }
            this.addChild(this.NumMenu[i]);
            //获取评分
            var grade=parseInt(ls.getItem("PerLevelsStarNum")[i]);
            //已获得的星星
            for(var k=1;k<=grade;k++)
            {
                this.Star_img[k] = new cc.Sprite(res.Star_png);
                this.Star_img[k].setScale(0.5);
                this.Star_img[k].x=(this.Block[i].x-40-(this.Block[i].getBoundingBox().width/2))+k*70;
                this.Star_img[k].y=this.Block[i].y-130;
                this.addChild(this.Star_img[k]);
            }
            //未获得的星星;
            var failedStar=3-grade;
            // for (; j <= 3; j++) {
            //     this.starImg[j] = new cc.Sprite(res.Star_Failed_png);
            //     this.starImg[j].x = size.width * 0.3 + 138 * j;
            //     this.starImg[j].y = size.height * 0.5;
            //     this.addChild(this.starImg[j]);
            // }
            var tempGrade=grade;
            for(var x=1;x<=failedStar;x++)
            {
                this.failedStar_img[x] = new cc.Sprite(res.Star_Failed_png);
                this.failedStar_img[x].setScale(0.5);
                this.failedStar_img[x].x = (this.Block[i].x-40-(this.Block[i].getBoundingBox().width/2))+(tempGrade+1)*70;
                this.failedStar_img[x].y = this.Block[i].y-130;
                tempGrade++;
                this.addChild(this.failedStar_img[x]);
            }


        }



        //建立未通关关卡  总关卡暂且为6，可以根据需要调整
        for(var i=ls.getItem("PassedLevels");i<6;i++)
        {
            //建立边框
            i=parseInt(i);
            this.Block[i]=new cc.Sprite(res.Block_png);
            if(i<3)
            {
                this.Block[i].x=size.width*0.247*(i+1);
                this.Block[i].y=size.height*0.7;
            }
            else
            {
                this.Block[i].x=size.width*0.247*(i-2);
                this.Block[i].y=size.height*0.32;
            }
            this.addChild(this.Block[i]);
            // 建立锁子图片
            var j=i+1;
            this.Lock_img[i]=new cc.Sprite(res.Lock_png);
            // this.Lock_img[i].setScale(0.6);
            if(i<3)
            {
                this.Lock_img[i].x=size.width*0.247*(i+1);
                this.Lock_img[i].y=size.height*0.7;
            }
            else
            {
                this.Lock_img[i].x=size.width*0.247*(i-2);
                this.Lock_img[i].y=size.height*0.32;
            }
            this.addChild(this.Lock_img[i]);

        }

        //增加返回主界面和选关按钮
        var backItem=new cc.MenuItemImage(res.SelectBack_png,res.SelectBack_png,function(){
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            cc.director.runScene(new StartScene());
        },this);
        backItem.setScale(0.6);
        var backMenu=new cc.Menu(backItem);
        backMenu.x=size.width*0.24;
        backMenu.y=size.height*0.06;

        var nextItem=new cc.MenuItemImage(res.SelectNext_png,res.SelectNext_png,function(){
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            cc.director.runScene(new MainSceneOne());
        },this);
        nextItem.setScale(0.6);
        var nextMenu=new cc.Menu(nextItem);
        nextMenu.x=size.width*0.74;
        nextMenu.y=size.height*0.06;

        this.addChild(backMenu);
        this.addChild(nextMenu);






        return true;
    },
    bg1CallBack:function (dt) {
        for(var i in this.Bg1){
            if(this.Bg1[i].x<-512){
                this.Bg1[i].x+=2*1024;
            }
            this.Bg1[i].x -=2;
        }
    },
    bg2CallBack:function (dt) {
        for(var i in this.Bg2){
            if(this.Bg2[i].x<-514){
                this.Bg2[i].x+=2*1024;
            }
            this.Bg2[i].x -= 0.8;
        }
    }
});

var SelectScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SelectLayer();
        this.addChild(layer);
    }
});