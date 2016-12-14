var audioEngine=cc.audioEngine; //音乐基类
var diamondNum=1;//钻石数量(自己修改)
var passLevelTime=0;//通关时间（秒）
var ls=cc.sys.localStorage;

var BgLayer_one=cc.Layer.extend({
    bg:null,
    bg2:null,
    BgSprite:[],
    ctor:function()
    {
        this._super();
        this.bg2=new cc.Sprite(res.mainBg2_png);
        this.bg2.setAnchorPoint(0.05,0);
        this.addChild(this.bg2);
        this.bg=new cc.Sprite(res.mainBg1_png);
        this.bg.setAnchorPoint(0,0);
        this.addChild(this.bg);

    }
});

var SceneLayer_one=cc.Layer.extend({
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
        ls.setItem("CurrentLevel",1);//每关必须修改
        //创建地面材质
        this.block[0]=new BlockClass(res.green_floor_0_5_png);
        this.block[0].x=size.width*0.6;
        this.block[0].y=size.height*0.2;

        this.block[1]=new BlockClass(res.green_floor_0_3_png);
        this.block[1].x=size.width*1.1;
        this.block[1].y=size.height*0.4;

        this.block[2]=new BlockClass(res.green_floor_0_3_png);
        this.block[2].x=size.width*1.5;
        this.block[2].y=size.height*0.6;

        this.block[3]=new BlockClass(res.green_floor_0_3_png);
        this.block[3].x=size.width*2;
        this.block[3].y=size.height*0.5;

        this.block[4]=new BlockClass(res.green_floor_0_1_png);
        this.block[4].x=size.width*2.4;
        this.block[4].y=size.height*0.5;

        this.block[5]=new BlockClass(res.green_floor_0_1_png);
        this.block[5].x=size.width*2.6;
        this.block[5].y=size.height*0.5;

        this.block[6]=new BlockClass(res.red_floor_0_3_png);
        this.block[6].x=size.width*2.8;
        this.block[6].y=size.height*0.3;

        this.block[7]=new BlockClass(res.green_floor_0_3_png);
        this.block[7].x=size.width*2.8;
        this.block[7].y=size.height*0.95;

        this.block[8]=new BlockClass(res.green_floor_0_2_png);
        this.block[8].x=size.width*3.4;
        this.block[8].y=size.height*0.5;

        this.block[9]=new BlockClass(res.green_floor_0_2_png);
        this.block[9].x=size.width*3.7;
        this.block[9].y=size.height*0.7;

        this.block[10]=new BlockClass(res.red_floor_0_1_png);
        this.block[10].x=size.width*4.1;
        this.block[10].y=size.height*0.3;

        this.block[11]=new BlockClass(res.green_floor_0_2_png);
        this.block[11].x=size.width*4.5;
        this.block[11].y=size.height*0.7;



        //创建陷阱
        this.trapTrap[0]=new TrapTrapClass(res.nail_png);
        this.trapTrap[0].setAnchorPoint(0.5,0);
        this.trapTrap[0].setScale(0.6,0.6);
        this.trapTrap[0].x=size.width*2;
        this.trapTrap[0].y=size.height*0.5;

        this.trapTrap[1]=new TrapTrapClass(res.nails_re_png);
        this.trapTrap[1].setAnchorPoint(0.5,0.5);
        this.trapTrap[1].setScale(0.6,0.6);
        this.trapTrap[1].x=size.width*2.76;
        this.trapTrap[1].y=size.height*0.85;

        this.trapTrap[2]=new TrapTrapClass(res.nails_re_png);
        this.trapTrap[2].setAnchorPoint(0.5,0.5);
        this.trapTrap[2].setScale(0.6,0.6);
        this.trapTrap[2].x=size.width*2.85;
        this.trapTrap[2].y=size.height*0.85;
        //创建火箭
        // this.rocketTrap[0]=new RocketTrapClass(res.Rocket_Fly1);
        // this.rocketTrap[0].x=size.width;
        // this.rocketTrap[0].y=size.height*0.5;
        //创建钻石
        this.diamond[0]=new cc.Sprite(res.diamond_png);
        this.diamond[0].x=size.width;
        this.diamond[0].y=size.height/2;

        this.diamond[1]=new cc.Sprite(res.diamond_png);
        this.diamond[1].x=size.width*2;
        this.diamond[1].y=size.height*0.8;

        this.diamond[2]=new cc.Sprite(res.diamond_png);
        this.diamond[2].x=size.width*3.2;
        this.diamond[2].y=size.height*0.8;
        //通关材质
        this.passLevel=new cc.Sprite(res.passLevel_png);
        this.passLevel.x=size.width*4.5;
        this.passLevel.y=size.height*0.73;

        for(var i=0;i<this.block.length;i++)
        {
            this.block[i].setAnchorPoint(0.5,1);
            this.addChild(this.block[i]);
        }
        for(var i=0;i<this.trapTrap.length;i++)
        {
            this.addChild(this.trapTrap[i]);
        }
        for(var i=0;i<this.diamond.length;i++)
        {
            this.addChild(this.diamond[i]);
        }
        this.addChild(this.passLevel);
    }
});

var PlayerLayer_one=cc.Layer.extend({
    people:null,
    listener:null,
    speed:0,
    flag:0,
    clock:0,//材质下落消失的计时器
    ctor:function()
    {
        this._super();
        var size=cc.winSize;
        this.people=new PeopleClass(res.Right_Run_1);
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
                    if(-that.getParent().BgLayer_one.bg.x+size.width>=that.getParent().BgLayer_one.bg.getContentSize().width)
                    {
                        that.getParent().SceneLayer_one.SceneSprite = that.getParent().SceneLayer_one.getChildren();
                        that.getParent().BgLayer_one.BgSprite = that.getParent().BgLayer_one.getChildren();
                        for (var i = 0; i < that.getParent().SceneLayer_one.SceneSprite.length; i++) {
                            that.getParent().SceneLayer_one.SceneSprite[i].stopAllActions();
                        }
                        for (var j = 0; j < that.getParent().BgLayer_one.BgSprite.length; j++) {
                            that.getParent().BgLayer_one.BgSprite[j].stopAllActions();
                        }
                    }
                    else {
                        that.people.runAction(that.people.run_animate_right);
                        that.getParent().SceneLayer_one.SceneSprite = that.getParent().SceneLayer_one.getChildren();
                        that.getParent().BgLayer_one.BgSprite = that.getParent().BgLayer_one.getChildren();
                        for (var i = 0; i < that.getParent().SceneLayer_one.SceneSprite.length; i++) {
                            that.getParent().SceneLayer_one.SceneSprite[i].runAction(cc.moveBy(0.8, cc.p(-20, 0)));
                        }
                        // for (var j = 0; j < that.getParent().BgLayer_one.BgSprite.length; j++) {
                        //     that.getParent().BgLayer_one.BgSprite[j].runAction(cc.moveBy(0.8, cc.p(-20, 0)));
                        // }
                        that.getParent().BgLayer_one.bg2.runAction(cc.moveBy(0.8,cc.p(-10,0)));
                        that.getParent().BgLayer_one.bg.runAction(cc.moveBy(0.8,cc.p(-20,0)));
                        for(var k=0;k<that.getParent().SceneLayer_one.rocketTrap.length;k++)
                        {
                            that.getParent().SceneLayer_one.rocketTrap[k].rangeX-=20;
                        }
                        for(var m=0;m<that.getParent().SceneLayer_one.enemyOne.length;m++)
                        {
                            that.getParent().SceneLayer_one.enemyOne[m].rangeX-=20;
                        }
                        for(var n=0;n<that.getParent().SceneLayer_one.enemyTwo.length;n++)
                        {
                            that.getParent().SceneLayer_one.enemyTwo[n].rangeX-=20;
                        }
                    }

                }
                if(code==cc.KEY.left)
                {
                    if(-that.getParent().BgLayer_one.bg.x<=0)
                    {
                        that.getParent().SceneLayer_one.SceneSprite = that.getParent().SceneLayer_one.getChildren();
                        that.getParent().BgLayer_one.BgSprite = that.getParent().BgLayer_one.getChildren();
                        for (var i = 0; i < that.getParent().SceneLayer_one.SceneSprite.length; i++) {
                            that.getParent().SceneLayer_one.SceneSprite[i].stopAllActions();
                        }
                        for (var j = 0; j < that.getParent().BgLayer_one.BgSprite.length; j++) {
                            that.getParent().BgLayer_one.BgSprite[j].stopAllActions();
                        }
                    }
                    else
                    {
                        that.people.runAction(that.people.run_animate_left);
                        that.getParent().SceneLayer_one.SceneSprite = that.getParent().SceneLayer_one.getChildren();
                        that.getParent().BgLayer_one.BgSprite = that.getParent().BgLayer_one.getChildren();
                        for (var i = 0; i < that.getParent().SceneLayer_one.SceneSprite.length; i++) {
                            that.getParent().SceneLayer_one.SceneSprite[i].runAction(cc.moveBy(0.8, cc.p(20, 0)));
                        }
                        that.getParent().BgLayer_one.bg2.runAction(cc.moveBy(0.8,cc.p(10,0)));
                        that.getParent().BgLayer_one.bg.runAction(cc.moveBy(0.8,cc.p(20,0)));
                        for(var k=0;k<that.getParent().SceneLayer_one.rocketTrap.length;k++)
                        {
                            that.getParent().SceneLayer_one.rocketTrap[k].rangeX+=20;
                        }
                        for(var m=0;m<that.getParent().SceneLayer_one.enemyOne.length;m++)
                        {
                            that.getParent().SceneLayer_one.enemyOne[m].rangeX+=20;
                        }
                        for(var n=0;n<that.getParent().SceneLayer_one.enemyTwo.length;n++)
                        {
                            that.getParent().SceneLayer_one.enemyTwo[n].rangeX+=20;
                        }
                    }
                }
                if(code==cc.KEY.up)
                {
                    if(0==cc.sys.localStorage.getItem("soundisOn"))
                    {
                        audioEngine.playEffect(res.Button1_wav);
                    }
                    if(that.speed==0)
                    {
                        that.speed=50;
                    }
                    // that.speed=50;
                }
                if(code==cc.KEY.escape)
                {
                    that.getParent().addChild(that.getParent().EscLayer,3);
                    cc.director.pause();
                }
            },
            onKeyReleased: function (touch, event) {
            }
        });
        // 注册监听器
        cc.eventManager.addListener(listener, this.people);
        this.listener=listener;
        //增加设置按钮
        var settingItem=new cc.MenuItemImage(res.Setting_png,res.Setting2_png,function(){
            this.getParent().addChild(this.getParent().PopLayer,3);
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            cc.director.pause();
        },this);
        var settingMenu=new cc.Menu(settingItem);
        settingMenu.x=size.width*0.9;
        settingMenu.y=size.height*0.9;
        this.addChild(settingMenu);
        return true;
    },
    myCallBack:function()
    {
        this.people.y+=this.speed;
        this.speed-=5;
        var failPoint=0;
        if(this.people.y<-this.people.getBoundingBox().height)
        {
            //掉落死亡
            if(diamondNum<=0)
            {
                failPoint++;
            }
            ls.setItem("failStar",failPoint);
            cc.director.runScene(new FailedScene());
        }
        if(this.speed>0)
        {
            //none
        }
        else
        {
            var peoplePoint=this.people.getPosition();
            for(var i=0;i<this.getParent().SceneLayer_one.block.length;i++)
            {
                var blockBox=this.getParent().SceneLayer_one.block[i].getBoundingBox();
                if(cc.rectContainsPoint(blockBox,peoplePoint))
                {
                    this.flag=i;
                }
            }
            if(cc.rectContainsPoint(this.getParent().SceneLayer_one.block[this.flag].getBoundingBox(),peoplePoint))
            {
                //每关的材质有几个特殊的（弹簧 消失 移动）
                if(this.flag==4)
                {
                    if(this.clock==1)
                    {
                        this.getParent().SceneLayer_one.block[this.flag].removeFromParent();
                    }
                    else
                    {
                        this.speed=0;
                        this.people.setPositionY(this.getParent().SceneLayer_one.block[this.flag].y);
                        this.scheduleOnce(function () {
                            this.clock=1;
                        },1)
                    }
                }
                else if(this.flag==5)
                {
                    this.getParent().SceneLayer_one.block[8].x-=2;
                    this.people.setPositionY(this.getParent().SceneLayer_one.block[this.flag].y);
                    this.speed=0;
                }
                else if(this.flag==6)
                {
                    this.speed=60;
                }
                else if(this.flag==8)
                {
                    this.getParent().SceneLayer_one.block[this.flag].x+=6;
                    this.people.setPositionY(this.getParent().SceneLayer_one.block[this.flag].y);
                    this.speed=0;
                }
                else if(this.flag==9)
                {
                    this.getParent().SceneLayer_one.block[8].removeFromParent();
                    // this.people.setPositionY(this.getParent().SceneLayer_one.block[this.flag].y);
                    this.speed=0;
                }
                else if(this.flag==10)
                {
                    this.speed=60;
                }
                else
                {
                    this.people.setPositionY(this.getParent().SceneLayer_one.block[this.flag].y);
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
        for(var i=0;i<this.getParent().SceneLayer_one.trapTrap.length;i++)
        {
            var trapPoint = this.getParent().SceneLayer_one.trapTrap[i].getPosition();
            if (cc.rectContainsPoint(peopleBox, trapPoint)) {
                if(diamondNum<=0)
                {
                    failPoint++;
                }
                ls.setItem("failStar",failPoint);
                cc.director.runScene(new FailedScene());

            }
        }
        for(var j=0;j<this.getParent().SceneLayer_one.rocketTrap.length;j++)
        {
            var trapBox = this.getParent().SceneLayer_one.rocketTrap[j].getBoundingBox();
            if (cc.rectIntersectsRect(peopleBox, trapBox)) {
                if(diamondNum<=0)
                {
                    failPoint++;
                }
                ls.setItem("failStar",failPoint);
                cc.director.runScene(new FailedScene());
            }
        }
        for(var m=0;m<this.getParent().SceneLayer_one.enemyOne.length;m++)
        {
            var enemyBox = this.getParent().SceneLayer_one.enemyOne[m].getBoundingBox();
            if (cc.rectIntersectsRect(peopleBox, enemyBox)) {
                if(diamondNum<=0)
                {
                    failPoint++;
                }
                ls.setItem("failStar",failPoint);
                cc.director.runScene(new FailedScene());
            }
        }
        for(var n=0;n<this.getParent().SceneLayer_one.enemyTwo.length;n++)
        {
            var enemyBox = this.getParent().SceneLayer_one.enemyTwo[n].getBoundingBox();
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
    //     if(this.getParent().SceneLayer_one.rocketTrap[0].activate==true)
    //     {
    //         this.getParent().SceneLayer_one.rocketTrap[0].rocket();
    //     }
    //     else if(this.getParent().SceneLayer_one.rocketTrap[0].x-this.people.x<=100)
    //     {
    //         this.getParent().SceneLayer_one.rocketTrap[0].rocket();
    //         this.getParent().SceneLayer_one.rocketTrap[0].activate=true;
    //     }
    // },
    DiamondCollisionDetection:function()
    {
        //钻石
        var peopleBox=this.people.getBoundingBox();
        for(var i=0;i<this.getParent().SceneLayer_one.diamond.length;i++)
        {
            var diamondBox = this.getParent().SceneLayer_one.diamond[i].getBoundingBox();
            if (cc.rectIntersectsRect(peopleBox, diamondBox)) {
                diamondNum--;
                this.getParent().SceneLayer_one.diamond[i].setVisible(false);
                cc.log(diamondNum);
            }
        }

    },
    passLevel:function()
    {
        //过关点检测
        var peopleBox=this.people.getBoundingBox();
        var passLevelBox = this.getParent().SceneLayer_one.passLevel.getBoundingBox();
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
            if(passedLevels<=currentLevel)
            {
                ls.setItem("PassedLevels",currentLevel+1);
            }
            cc.log("pass:"+ls.getItem("PassedLevels"));
            //本地存储评分数
            var currentStarNum=ls.getItem("PerLevelsStarNum")[currentLevel-1];
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


var MainSceneOne = cc.Scene.extend({
    BgLayer_one:null,
    SceneLayer_one:null,
    PlayerLayer_one:null,
    PopLayer:null,
    EscLayer:null,
    onEnter:function () {
        this._super();
        this.BgLayer_one=new BgLayer_one();
        this.addChild(this.BgLayer_one,0);
        this.SceneLayer_one=new SceneLayer_one();
        this.addChild(this.SceneLayer_one,1);
        this.PlayerLayer_one=new PlayerLayer_one();
        this.addChild(this.PlayerLayer_one,2);

        this.PopLayer=new PopLayer();
        this.EscLayer=new EscLayer();
    }
});