var diamondNum=1;//钻石数量(自己修改)
var passLevelTime=0;//通关时间（秒）
var ls=cc.sys.localStorage;
ls.setItem("CurrentLevel",1);//每关必须修改

var BgLayer=cc.Layer.extend({
    bg:null,
    bg2:null,
    BgSprite:[],
    ctor:function()
    {
        this._super();
        this.bg2=new cc.Sprite(res.mainBg2_png);
        this.bg2.setAnchorPoint(0,0);
        this.addChild(this.bg2);
        this.bg=new cc.Sprite(res.mainBg1_png);
        this.bg.setAnchorPoint(0,0);
        this.addChild(this.bg);

    }
});

var SceneLayer=cc.Layer.extend({
    block:[],//材质
    trapTrap:[],//陷阱
    enemyOne:[],//第一种敌人
    enemyTwo:[],//第二种敌人
    SceneSprite:[],//本层的所有精灵
    rocketTrap:[],//导弹陷阱
    diamond:[],//钻石
    passLevel:null,//过关点
    //缺敌人类
    ctor:function()
    {
        this._super();
        var size=cc.winSize;
        //创建地面材质
        this.block[0]=new BlockClass(res.green_floor_png);
        this.block[0].setScaleX(0.5);
        this.block[0].setAnchorPoint(0.5,1);
        this.block[0].x=size.width*0.6;
        this.block[0].y=size.height*0.2;

        this.block[1]=new BlockClass(res.green_floor_png);
        this.block[1].setScaleX(0.3);
        this.block[1].setAnchorPoint(0.5,1);
        this.block[1].x=size.width*1.27;
        this.block[1].y=size.height*0.4;

        this.block[2]=new BlockClass(res.green_floor_png);
        this.block[2].setScaleX(0.3);
        this.block[2].setAnchorPoint(0.5,1);
        this.block[2].x=size.width*1.65;
        this.block[2].y=size.height*0.6;

        this.block[3]=new BlockClass(res.green_floor_png);
        this.block[3].setScaleX(0.2);
        this.block[3].setAnchorPoint(0.5,1);
        this.block[3].x=size.width*2.1;
        this.block[3].y=size.height*0.6;

        this.block[4]=new BlockClass(res.green_floor_png);
        this.block[4].setScaleX(0.5);
        this.block[4].setAnchorPoint(0.5,1);
        this.block[4].x=size.width*2.4;
        this.block[4].y=size.height*0.3;

        this.block[5]=new BlockClass(res.green_floor_png);
        this.block[5].setScaleX(0.2);
        this.block[5].setAnchorPoint(0.5,1);
        this.block[5].x=size.width*2.9;
        this.block[5].y=size.height*0.3;

        this.block[6]=new BlockClass(res.green_floor_png);
        this.block[6].setScaleX(0.1);
        this.block[6].setAnchorPoint(0.5,1);
        this.block[6].x=size.width*3.2;
        this.block[6].y=size.height*0.9;

        this.block[7]=new BlockClass(res.green_floor_png);
        this.block[7].setScaleX(0.1);
        this.block[7].setAnchorPoint(0.5,1);
        this.block[7].x=size.width*3.45;
        this.block[7].y=size.height*0.9;


        //创建陷阱
        this.trapTrap[0]=new TrapTrapClass(res.nail_png);
        this.trapTrap[0].setAnchorPoint(0.5,0);
        this.trapTrap[0].setScale(0.6,0.6);
        this.trapTrap[0].x=size.width*1.67;
        this.trapTrap[0].y=size.height*0.6;
        //创建火箭
        // this.rocketTrap[0]=new RocketTrapClass(res.Rocket_Fly1);
        // this.rocketTrap[0].x=size.width;
        // this.rocketTrap[0].y=size.height*0.5;
        //创建钻石
        this.diamond[0]=new cc.Sprite(res.diamond_png);
        this.diamond[0].x=size.width;
        this.diamond[0].y=size.height/2;

        this.diamond[1]=new cc.Sprite(res.diamond_png);
        this.diamond[1].x=size.width*1.85;
        this.diamond[1].y=size.height*0.8;

        this.diamond[2]=new cc.Sprite(res.diamond_png);
        this.diamond[2].x=size.width*3.2;
        this.diamond[2].y=size.height*0.95;
        //创建第一种敌人
        this.enemyOne[0]=new EnemyClassOne(res.EnemyRun1_png,2.2,2.6);
        this.enemyOne[0].setAnchorPoint(0.5,0);
        this.enemyOne[0].x=size.width*2.4;
        this.enemyOne[0].y=size.height*0.3;
        //创建第二种敌人
        // this.enemyTwo[0]=new EnemyClassTwo(res.Run1_png);
        // this.enemyTwo[0].x=size.width*0.7;
        // this.enemyTwo[0].y=size.height*0.7;
        //通关材质
        this.passLevel=new cc.Sprite(res.passLevel_png);
        this.passLevel.x=size.width*3.45;
        this.passLevel.y=size.height*0.95;

        for(var i=0;i<this.block.length;i++)
        {
            this.addChild(this.block[i]);
        }
        for(var i=0;i<this.trapTrap.length;i++)
        {
            this.addChild(this.trapTrap[i]);
        }
        // this.addChild(this.trapTrap[0]);
        // this.addChild(this.rocketTrap[0]);
        for(var i=0;i<this.enemyOne.length;i++)
        {
            this.addChild(this.enemyOne[i]);
        }
        // this.addChild(this.enemyTwo[0]);
        for(var i=0;i<this.diamond.length;i++)
        {
            this.addChild(this.diamond[i]);
        }
        this.addChild(this.passLevel);
    }
});

var PlayerLayer=cc.Layer.extend({
    people:null,
    listener:null,
    speed:0,
    flag:0,
    ctor:function()
    {
        this._super();
        var size=cc.winSize;
        this.people=new PeopleClass(res.Stand_right_png);
        this.people.x=size.width*0.5;
        this.people.y=size.height*0.4;
        this.people.setAnchorPoint(0.5,0);
        this.addChild(this.people);
        //自由落体
        this.schedule(this.myCallBack,0.02,cc.REPEAT_FOREVER,0);
        //陷阱碰撞
        this.schedule(this.TrapCollisionDetection,0.1,cc.REPEAT_FOREVER,0);
        //火箭发射
        // this.schedule(this.fireRocket,0.02,cc.REPEAT_FOREVER,0);

        //钻石检测碰撞(评分要素之一)
        this.schedule(this.DiamondCollisionDetection,0.1,cc.REPEAT_FOREVER,0);
        //通关时间（评分要素之一）
        this.schedule(this.passLevelTime,1,cc.REPEAT_FOREVER,0);
        //通关点检测碰撞
        this.schedule(this.passLevel,0.5,cc.REPEAT_FOREVER,0);
        var that=this;

        //监听器
        var listener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (code, event) {
                if(code==cc.KEY.right)
                {
                    if(-that.getParent().BgLayer.bg.x+size.width>=that.getParent().BgLayer.bg.getContentSize().width)
                    {
                        that.getParent().SceneLayer.SceneSprite = that.getParent().SceneLayer.getChildren();
                        that.getParent().BgLayer.BgSprite = that.getParent().BgLayer.getChildren();
                        for (var i = 0; i < that.getParent().SceneLayer.SceneSprite.length; i++) {
                            that.getParent().SceneLayer.SceneSprite[i].stopAllActions();
                        }
                        for (var j = 0; j < that.getParent().BgLayer.BgSprite.length; j++) {
                            that.getParent().BgLayer.BgSprite[j].stopAllActions();
                        }
                    }
                    else {
                        that.people.runAction(that.people.run_animate_right);
                        that.getParent().SceneLayer.SceneSprite = that.getParent().SceneLayer.getChildren();
                        that.getParent().BgLayer.BgSprite = that.getParent().BgLayer.getChildren();
                        for (var i = 0; i < that.getParent().SceneLayer.SceneSprite.length; i++) {
                            that.getParent().SceneLayer.SceneSprite[i].runAction(cc.moveBy(0.8, cc.p(-20, 0)));
                        }
                        // for (var j = 0; j < that.getParent().BgLayer.BgSprite.length; j++) {
                        //     that.getParent().BgLayer.BgSprite[j].runAction(cc.moveBy(0.8, cc.p(-20, 0)));
                        // }
                        that.getParent().BgLayer.bg2.runAction(cc.moveBy(0.8,cc.p(-10,0)));
                        that.getParent().BgLayer.bg.runAction(cc.moveBy(0.8,cc.p(-20,0)));
                        for(var k=0;k<that.getParent().SceneLayer.rocketTrap.length;k++)
                        {
                            that.getParent().SceneLayer.rocketTrap[k].rangeX-=20;
                        }
                        for(var m=0;m<that.getParent().SceneLayer.enemyOne.length;m++)
                        {
                            that.getParent().SceneLayer.enemyOne[m].rangeX-=20;
                        }
                        for(var n=0;n<that.getParent().SceneLayer.enemyTwo.length;n++)
                        {
                            that.getParent().SceneLayer.enemyTwo[n].rangeX-=20;
                        }
                    }

                }
                if(code==cc.KEY.left)
                {
                    if(-that.getParent().BgLayer.bg.x<=0)
                    {
                        that.getParent().SceneLayer.SceneSprite = that.getParent().SceneLayer.getChildren();
                        that.getParent().BgLayer.BgSprite = that.getParent().BgLayer.getChildren();
                        for (var i = 0; i < that.getParent().SceneLayer.SceneSprite.length; i++) {
                            that.getParent().SceneLayer.SceneSprite[i].stopAllActions();
                        }
                        for (var j = 0; j < that.getParent().BgLayer.BgSprite.length; j++) {
                            that.getParent().BgLayer.BgSprite[j].stopAllActions();
                        }
                    }
                    else
                    {
                        that.people.runAction(that.people.run_animate_left);
                        that.getParent().SceneLayer.SceneSprite = that.getParent().SceneLayer.getChildren();
                        that.getParent().BgLayer.BgSprite = that.getParent().BgLayer.getChildren();
                        for (var i = 0; i < that.getParent().SceneLayer.SceneSprite.length; i++) {
                            that.getParent().SceneLayer.SceneSprite[i].runAction(cc.moveBy(0.8, cc.p(20, 0)));
                        }
                        that.getParent().BgLayer.bg2.runAction(cc.moveBy(0.8,cc.p(10,0)));
                        that.getParent().BgLayer.bg.runAction(cc.moveBy(0.8,cc.p(20,0)));
                        for(var k=0;k<that.getParent().SceneLayer.rocketTrap.length;k++)
                        {
                            that.getParent().SceneLayer.rocketTrap[k].rangeX+=20;
                        }
                        for(var m=0;m<that.getParent().SceneLayer.enemyOne.length;m++)
                        {
                            that.getParent().SceneLayer.enemyOne[m].rangeX+=20;
                        }
                        for(var n=0;n<that.getParent().SceneLayer.enemyTwo.length;n++)
                        {
                            that.getParent().SceneLayer.enemyTwo[n].rangeX+=20;
                        }
                    }
                }
                if(code==cc.KEY.up)
                {
                    if(that.speed==0)
                    {
                        that.speed=50;
                    }
                    // that.speed=50;
                }
            },
            onKeyReleased: function (touch, event) {
            }
        });

        // 注册监听器
        cc.eventManager.addListener(listener, this.people);
        this.listener=listener;

    },
    myCallBack:function()
    {
        this.people.y+=this.speed;
        this.speed-=5;
        if(this.speed>0)
        {
            //none
        }
        else
        {
            var peoplePoint=this.people.getPosition();
            for(var i=0;i<this.getParent().SceneLayer.block.length;i++)
            {
                var blockBox=this.getParent().SceneLayer.block[i].getBoundingBox();
                if(cc.rectContainsPoint(blockBox,peoplePoint))
                {
                    this.flag=i;
                }
            }
            if(cc.rectContainsPoint(this.getParent().SceneLayer.block[this.flag].getBoundingBox(),peoplePoint))
            {
                //每关的材质有几个特殊的（弹簧 消失 移动）
                if(this.flag==5)
                {
                    if(this.getParent().SceneLayer.block[this.flag].y>=cc.winSize.width*0.43)
                    {
                        this.getParent().SceneLayer.block[this.flag].removeFromParent();
                    }
                    else
                    {
                        this.getParent().SceneLayer.block[this.flag].y+=5;
                        this.people.y+=5;
                        this.speed = 0;
                    }
                }
                else
                {
                    this.people.setPositionY(this.getParent().SceneLayer.block[this.flag].y);
                    this.speed = 0;
                }
            }
        }
    },
    TrapCollisionDetection:function()
    {
        //陷阱类和导弹陷阱类都在这检测
        //增加敌人类检测
        var peopleBox=this.people.getBoundingBox();
        var failPoint=0;
        for(var i=0;i<this.getParent().SceneLayer.trapTrap.length;i++)
        {
            var trapPoint = this.getParent().SceneLayer.trapTrap[i].getPosition();
            if (cc.rectContainsPoint(peopleBox, trapPoint)) {
                if(diamondNum<=0)
                {
                    failPoint++;
                }
                ls.setItem("failStar",failPoint);
                cc.director.runScene(new FailedScene());

            }
        }
        for(var j=0;j<this.getParent().SceneLayer.rocketTrap.length;j++)
        {
            var trapBox = this.getParent().SceneLayer.rocketTrap[j].getBoundingBox();
            if (cc.rectIntersectsRect(peopleBox, trapBox)) {
                if(diamondNum<=0)
                {
                    failPoint++;
                }
                ls.setItem("failStar",failPoint);
                cc.director.runScene(new FailedScene());
            }
        }
        for(var m=0;m<this.getParent().SceneLayer.enemyOne.length;m++)
        {
            var enemyBox = this.getParent().SceneLayer.enemyOne[m].getBoundingBox();
            if (cc.rectIntersectsRect(peopleBox, enemyBox)) {
                if(diamondNum<=0)
                {
                    failPoint++;
                }
                ls.setItem("failStar",failPoint);
                cc.director.runScene(new FailedScene());
            }
        }
        for(var n=0;n<this.getParent().SceneLayer.enemyTwo.length;n++)
        {
            var enemyBox = this.getParent().SceneLayer.enemyTwo[n].getBoundingBox();
            if (cc.rectIntersectsRect(peopleBox, enemyBox)) {
                if(diamondNum<=0)
                {
                    failPoint++;
                }
                ls.setItem("failStar",failPoint);
                cc.director.runScene(new FailedScene());
            }
        }


    },
    // fireRocket:function()
    // {
    //     if(this.getParent().SceneLayer.rocketTrap[0].activate==true)
    //     {
    //         this.getParent().SceneLayer.rocketTrap[0].rocket();
    //     }
    //     else if(this.getParent().SceneLayer.rocketTrap[0].x-this.people.x<=100)
    //     {
    //         this.getParent().SceneLayer.rocketTrap[0].rocket();
    //         this.getParent().SceneLayer.rocketTrap[0].activate=true;
    //     }
    // },
    DiamondCollisionDetection:function()
    {
        //钻石
        var peopleBox=this.people.getBoundingBox();
        for(var i=0;i<this.getParent().SceneLayer.diamond.length;i++)
        {
            var diamondBox = this.getParent().SceneLayer.diamond[i].getBoundingBox();
            if (cc.rectIntersectsRect(peopleBox, diamondBox)) {
                diamondNum--;
                this.getParent().SceneLayer.diamond[i].setVisible(false);
                cc.log(diamondNum);
            }
        }

    },
    passLevel:function()
    {
        //过关点检测
        var peopleBox=this.people.getBoundingBox();
        var passLevelBox = this.getParent().SceneLayer.passLevel.getBoundingBox();
        var point=1;
        if (cc.rectIntersectsRect(peopleBox, passLevelBox))
        {
            //评分
            if(passLevelTime<=100)
            {
                point++;
            }
            if(diamondNum<=0)
            {
                point++;
            }
            //本地存储关卡数
            var passedLevels=parseInt(ls.getItem("PassedLevels"));
            var currentLevel=parseInt(ls.getItem("CurrentLevel"));
            if(passedLevels<currentLevel)
            {
                ls.setItem("PassedLevels",currentLevel);
            }
            //本地存储评分数
            var currentStarNum=parseInt(ls.getItem("PerLevelsStarNum")[currentLevel-1]);
            if(currentStarNum="null")
            {
                if(currentLevel==1)
                {
                    ls.setItem("PerLevelsStarNum",point.toString());
                    cc.log(ls.getItem("PerLevelsStarNum"));
                }
                else
                {
                    ls.setItem("PerLevelsStarNum", ls.getItem("PerLevelsStarNum") + point.toString());
                    cc.log(ls.getItem("PerLevelsStarNum"));
                }
            }
            //成功界面星星数
            ls.setItem("star",point);
            cc.director.runScene(new SuccessScene());
        }

    },
    passLevelTime:function()
    {
        //本关所用时间
        passLevelTime++;
    }
});


var MainScene = cc.Scene.extend({
    BgLayer:null,
    SceneLayer:null,
    PlayerLayer:null,
    onEnter:function () {
        this._super();
        this.BgLayer=new BgLayer();
        this.addChild(this.BgLayer,0);
        this.SceneLayer=new SceneLayer();
        this.addChild(this.SceneLayer,1);
        this.PlayerLayer=new PlayerLayer();
        this.addChild(this.PlayerLayer,2);
    }
});