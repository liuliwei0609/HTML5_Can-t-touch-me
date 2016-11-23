var SelectLayer = cc.Layer.extend({
    sprite:null,
    Block:[],
    Num_img:[],
    Star_img:[],
    failedStar_img:[],
    Lock_img:[],
    //过关数
    //每关的评分
    //总分

    ctor:function () {
        this._super();

        var size = cc.winSize;
        //背景创建
        var bg=new cc.Sprite(res.Bg_jpg);
        bg.x=size.width/2;
        bg.y=size.height/2;
        this.addChild(bg);

        var ls=cc.sys.localStorage;
        //设定目前的通关数
        ls.setItem("PassedLevels",4);
        //设定每关的评分数
        ls.setItem("PerLevelsStarNum",[3221]);
        // cc.log(ls.getItem("PerLevelsStarNum"));

        //计算总评分数
        var StarCount=0;
        for(var i=0;i<ls.getItem("PassedLevels");i++)
        {
            StarCount+=parseInt(ls.getItem("PerLevelsStarNum")[i]);
            // cc.log(ls.getItem("PerLevelsStarNum")[i]);

        }
        // cc.log(StarCount);

        //建立总分数label
        var ConutLabel=new cc.LabelTTF(StarCount+"/18");
        ConutLabel.setFontSize(size.width/22);
        ConutLabel.x=size.width*0.7;
        ConutLabel.y=size.height*0.9;
        this.addChild(ConutLabel);

        var Star=new cc.Sprite(res.Star_png);
        Star.setScale(0.5);
        Star.x=size.width*0.77;
        Star.y=size.height*0.91;
        this.addChild(Star);

        //建立已通关关卡
        //根据关卡数 建立通关的关卡 第一关默认为通关
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
            this.Num_img[i]=new cc.Sprite("res/SelectScene/Num_"+j+".png");
            this.Num_img[i].setScale(0.6);
            if(i<3)
            {
                this.Num_img[i].x=size.width*0.247*(i+1);
                this.Num_img[i].y=size.height*0.7;
            }
            else
            {
                this.Num_img[i].x=size.width*0.247*(i-2);
                this.Num_img[i].y=size.height*0.32;
            }
            this.addChild(this.Num_img[i]);
            //获取评分
            var grade=parseInt(ls.getItem("PerLevelsStarNum")[i]);
            //已获得的星星
            for(var k=1;k<=grade;k++)
            {
                this.Star_img[k] = new cc.Sprite(res.Star_png);
                this.Star_img[k].setScale(0.5);
                this.Star_img[k].x=(this.Block[i].x-(this.Block[i].getBoundingBox().width/2))+k*70;
                this.Star_img[k].y=this.Block[i].y-120;
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
                this.failedStar_img[x].x = (this.Block[i].x-(this.Block[i].getBoundingBox().width/2))+(tempGrade+1)*70;
                this.failedStar_img[x].y = this.Block[i].y-120;
                tempGrade++;
                this.addChild(this.failedStar_img[x]);
            }

        }



        //建立未通关关卡  总关卡暂且为6，可以根据需要调整
        for(var i=ls.getItem("PassedLevels");i<6;i++)
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
            //建立锁子图片
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