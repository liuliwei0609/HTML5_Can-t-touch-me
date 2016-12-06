var audioEngine=cc.audioEngine; //音乐基类

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    people:null,
    trapTrap:[],
    rocketTrap:[],
    block:[],
    listener:null,
    bg:null,
    bg1:null,
    YOrder:0,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        //创建视差背景
        this.bg = new cc.ParallaxNode();
        this.bg1 = new cc.Sprite(res.Bg2_jpg);
        //创建材质
        this.block[0]=new BlockClass(res.floor_block_png);
        this.block[0].setScale(14,0.8);
        this.block[0].setAnchorPoint(0.5,1);
        this.block[0].x=size.width/2;
        this.block[0].y=size.height*0.2;

        this.block[1]=new BlockClass(res.block_png);
        this.block[1].setScale(2,0.8);
        this.block[1].setAnchorPoint(0.5,1);
        this.block[1].x=size.width*0.6;
        this.block[1].y=size.height*0.4;


        this.trapTrap[0]=new TrapTrapClass(res.Cactus_png);
        this.trapTrap[0].x=size.width*0.6;
        this.trapTrap[0].y=size.height*0.5;

        this.rocketTrap[0]=new RocketTrapClass(res.Cactus_png);
        this.rocketTrap[0].x=size.width*0.7;
        this.rocketTrap[0].y=size.height*0.5;

         //敌人1(1)
        var enemyOne = new EnemyClassOne(res.EnemyRun1_png);
        enemyOne.x = size.width*0.5;
        enemyOne.y = size.height*0.5;
        this.addChild(enemyOne,1);
        this.enemyOne[0] = enemyOne;

        //敌人2(2)
        var enemyTwo = new EnemyClassTwo(res.Run1_png);
        enemyTwo.x = 400;
        enemyTwo.y = 700;
        this.addChild(enemyTwo,1);
        this.enemyTwo[0]= enemyTwo;

        this.bg.addChild(this.bg1, 0, cc.p(1.0, 1.0), cc.p(this.bg1.width / 2, this.bg1.height / 2));

        this.addChild(this.bg);
        this.addChild(this.block[0],1);
        this.addChild(this.block[1],1);
        this.addChild(this.trapTrap[0],1);
        this.addChild(this.rocketTrap[0],1);



        //创建玩家角色
        var people=new PeopleClass(res.Stand_right_png);
        people.x=size.width*0.1;
        people.y=size.height*0.2;
        this.addChild(people);
        this.people=people;
        //重新设置角色的锚点
        this.people.setAnchorPoint(0.5,0);

        //材质检测碰撞
        this.schedule(this.BlockCollisionDetection,0.01);

        //跳跃
        var isJumping=false;
        var jump=cc.sequence(cc.jumpBy(1,cc.p(0,0),400,1),cc.callFunc(function(){
            isJumping=false;
        }));

        this.schedule(this.TrapCollisionDetection,0.01);

        var that=this;


        var listener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (code, event) {
                // var location=touch.getLocation();
                var target = event.getCurrentTarget();//实例化地图对象
                var people_location=that.people.getPosition();//获取人物在屏幕上的坐标
                var map_location=target.getPosition();//获取地图在屏幕上的坐标
                if(code==cc.KEY.right)
                {
                    if(people_location.x<=size.width/2)
                    {
                        that.people.runAction(that.people.run_animate_right);
                        that.people.x+=20;
                    }
                    else
                    {
                        if(-map_location.x+size.width>=that.bg1.getContentSize().width)
                        {
                            if(people_location.x>cc.winSize.width-that.people.getBoundingBox().width/2)
                            {
                                console.log("出→");
                                that.people.runAction(that.people.run_animate_right);

                            }
                            else {
                                that.people.runAction(that.people.run_animate_right);
                                that.people.x += 20;
                            }
                        }
                        else
                        {
                            that.people.runAction(that.people.run_animate_right);
                            //target.setPositionX(target.getPosition().x-=20);
                            target.x-=20;
                            for(var i=0;i<that.block.length;i++)
                            {
                                that.block[i].x-=20;
                            }
                            for(var i=0;i<that.trapTrap.length;i++)
                            {
                                that.trapTrap[i].x-=20;
                            }
                            for(var i=0;i<that.rocketTrap.length;i++)
                            {
                                that.rocketTrap[i].x-=20;
                                that.rocketTrap[i].rangeX-=20;
                            }
                            for(var i=0;i<that.enemyOne.length;i++)
                            {
                                that.enemyOne[i].x-=20;
                                that.enemyOne[i].rangeX-=20;
                            }
                            for(var i=0;i<that.enemyTwo.length;i++)
                            {
                                that.enemyTwo[i].x-=20;
                                that.enemyTwo[i].rangeX-=20;
                            }
                        }
                    }
                    // cc.log(that.people.y);
                }
                if(code==cc.KEY.left)
                {
                    if(people_location.x>=size.width/2)
                    {
                        that.people.runAction(that.people.run_animate_left);
                        that.people.x-=20;
                    }
                    else
                    {
                        if(-map_location.x<=0)
                        {
                            if (people_location.x <0+that.people.getBoundingBox(). width / 2) {
                                console.log("出左");
                                that.people.runAction(that.people.run_animate_left);

                            }
                            else {
                                that.people.runAction(that.people.run_animate_left);
                                that.people.x -= 20;
                            }
                        }
                        else
                        {
                            that.people.runAction(that.people.run_animate_left);
                            target.setPositionX(target.getPosition().x+=20);
                             for(var i=0;i<that.block.length;i++)
                            {
                                that.block[i].x +=20;
                            }
                            for(var i=0;i<that.trapTrap.length;i++)
                            {
                                that.trapTrap[i].x +=20;
                            }
                            for(var i=0;i<that.rocketTrap.length;i++)
                            {
                                that.rocketTrap[i].x +=20;
                                that.rocketTrap[i].rangeX +=20;
                            };
                            for(var i=0;i<that.enemyOne.length;i++)
                            {
                                that.enemyOne[i].x +=20;
                                that.enemyOne[i].rangeX +=20;
                            };
                            for(var i=0;i<that.enemyTwo.length;i++)
                            {
                                that.enemyTwo[i].x+=20;
                                that.enemyTwo[i].rangeX+=20;
                            }
                        }
                    }
                }
                if(code==cc.KEY.up)
                {
                    if(isJumping==false)
                    {
                        // that.people.runAction(jump);
                        isJumping=true;
                        that.people.runAction(jump);
                    }
                }
                if(code==cc.KEY.escape)
                {
                    that.getParent().addChild(that.getParent().EscLayer,1);
                    cc.director.pause();
                }

            },
            onKeyReleased: function (touch, event) {
            }
        });
        // 注册监听器
        cc.eventManager.addListener(listener, this.bg);
        this.listener=listener;

        var settingLabel=new cc.LabelTTF("设置");
        settingLabel.setFontSize(size.width/20);
        var settingItem=new cc.MenuItemLabel(settingLabel,function(){
            this.getParent().addChild(this.getParent().PopLayer,1);
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            cc.director.pause();
        },this);
        var settingMenu=new cc.Menu(settingItem);
        settingMenu.x=size.width*0.8;
        settingMenu.y=size.height*0.95;
        this.addChild(settingMenu);


        return true;
    },
    TrapCollisionDetection:function()
    {
        var peopleBox=this.people.getBoundingBox();
        var trapBox=this.trapTrap[0].getBoundingBox();
        if(cc.rectIntersectsRect(peopleBox,trapBox))
        {
            cc.log("碰撞到陷阱，死亡");
        }
    },
    BlockCollisionDetection:function(dt)
    {
        var peoplePoint=this.people.getPosition();
        for(var i=0;i<this.block.length;i++)
        {
            var blockBox=this.block[i].getBoundingBox();
            if(cc.rectContainsPoint(blockBox,peoplePoint))
            {
                this.people.setPositionY(this.block[i].y);
                this.YOrder=0;
            }
            else
            {
                //定义每秒下落位移
                this.YOrder+=10*dt;
                this.people.y-=this.YOrder;
                if(200==this.people.y)
                {
                    this.people.setPositionY(200);
                }
            }
        }
    }
});

var PopLayer = cc.Layer.extend({
    // 遮蔽层
    onEnter: function () {
        this._super();
        this.setColor(cc.color.BLACK);
        this.setOpacity(160);
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
        this._listener = listener;
    },
    onExit: function () {
        cc.eventManager.removeListener(this._listener);
        this._super();
    },
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var pop=new cc.Sprite(res.Pop_png);
        pop.x=size.width/2;
        pop.y=size.height/2;
        this.addChild(pop);
        //添加“背景音乐”Label
        var text1=new cc.LabelTTF("背景音乐");
        text1.setFontSize(size.width/38);
        text1.setFontFillColor(cc.color.BLACK);
        text1.x=size.width*0.46;
        text1.y=size.height*0.6;
        this.addChild(text1);


        //添加“背景音效”Label
        var text2=new cc.LabelTTF("背景音效");
        text2.setFontSize(size.width/38);
        text2.setFontFillColor(cc.color.BLACK);
        text2.x=size.width*0.46;
        text2.y=size.height*0.47;
        this.addChild(text2);

        //添加背景音乐按钮
        var bgmonItem=new cc.MenuItemImage(res.MusicOnNormal,res.MusicOnSelected,function(){
            //点击按钮的音效
        },this);
        var bgmoffItem=new cc.MenuItemImage(res.MusicOffNormal,res.MusicOffSelected,function(){},this);
        var ls=cc.sys.localStorage;
        var bgmtoggleItem=new cc.MenuItemToggle(bgmonItem,bgmoffItem,function(){
            //通过图标控制localstorage里的bgmisOn，背景音乐
            if(bgmtoggleItem.getSelectedIndex()==0)
            {
                ls.setItem("bgmisOn",0);
                audioEngine.playMusic(res.Bgm_mp3,true);
            }
            else
            {
                ls.setItem("bgmisOn",1);
                audioEngine.stopMusic(res.Bgm_mp3);
            }

        },this);

        //通过localstorage里的bgmisOn控制图标（刚打开）
        if(null==ls.getItem("bgmisOn"))
        {

        }
        else if(0==ls.getItem("bgmisOn"))
        {
            bgmtoggleItem.setSelectedIndex(0); //将图标变为序列1的图标
            if(audioEngine.isMusicPlaying())
            {
                //continue
            }
            else {
                audioEngine.playMusic(res.Bgm_mp3, true);
            }
        }
        else if(1==ls.getItem("bgmisOn"))
        {
            bgmtoggleItem.setSelectedIndex(1);
            audioEngine.stopMusic(res.Bgm_mp3);
        }

        var bgmMenu=new cc.Menu(bgmtoggleItem);
        bgmMenu.x=size.width*0.55;
        bgmMenu.y=size.height*0.6;
        this.addChild(bgmMenu);

        //添加背景音效按钮
        var soundonItem=new cc.MenuItemImage(res.MusicOnNormal,res.MusicOnSelected,function(){},this);
        var soundoffItem=new cc.MenuItemImage(res.MusicOffNormal,res.MusicOffSelected,function(){},this);
        var soundtoggleItem=new cc.MenuItemToggle(soundonItem,soundoffItem,function(){
            //通过图标控制localstorage里的isOn
            if(soundtoggleItem.getSelectedIndex()==0)
            {
                ls.setItem("soundisOn",0);
                // isSoundEffect=true;
            }
            else
            {
                ls.setItem("soundisOn",1);
                // isSoundEffect=false;
            }

        },this);

        //通过localstorage里的isOn控制图标（刚打开）
        if(null==ls.getItem("soundisOn"))
        {

        }
        else if(0==ls.getItem("soundisOn"))
        {
            soundtoggleItem.setSelectedIndex(0); //将图标变为序列1的图标
            // isSoundEffect=true;
        }
        else if(1==ls.getItem("soundisOn"))
        {
            soundtoggleItem.setSelectedIndex(1);
            // isSoundEffect=false;
        }

        var soundMenu=new cc.Menu(soundtoggleItem);
        soundMenu.x=size.width*0.55;
        soundMenu.y=size.height*0.47;
        this.addChild(soundMenu);

        var closeItem=new cc.MenuItemFont("关闭",function(){
            cc.director.resume();
            this.removeFromParent();
        },this);
        var CloseMenu=new cc.Menu(closeItem);
        CloseMenu.x=size.width/2;
        CloseMenu.y=size.height*0.4;
        this.addChild(CloseMenu);

        return true;
    }
});

var EscLayer = cc.Layer.extend({
    // 遮蔽层
    onEnter: function () {
        this._super();
        this.setColor(cc.color.BLACK);
        this.setOpacity(160);
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
        this._listener = listener;
    },
    onExit: function () {
        cc.eventManager.removeListener(this._listener);
        this._super();
    },
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var pop=new cc.Sprite(res.Pop_png);
        pop.x=size.width/2;
        pop.y=size.height/2;
        this.addChild(pop);

        var yesLabel=new cc.LabelTTF("是");
        yesLabel.setFontSize(size.width/20);
        yesLabel.setFontFillColor(cc.color.BLACK);
        var yesItem=new cc.MenuItemLabel(yesLabel,function(){
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            cc.log("跳转到选关界面");

        },this);
        var yesMenu=new cc.Menu(yesItem);
        yesMenu.x=size.width*0.5;
        yesMenu.y=size.height*0.55;
        this.addChild(yesMenu);

        var noLabel=new cc.LabelTTF("否");
        noLabel.setFontSize(size.width/20);
        noLabel.setFontFillColor(cc.color.BLACK);
        var noItem=new cc.MenuItemLabel(noLabel,function(){
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            this.removeFromParent();
            cc.director.resume();
        },this);
        var noMenu=new cc.Menu(noItem);
        noMenu.x=size.width*0.5;
        noMenu.y=size.height*0.45;
        this.addChild(noMenu);


        return true;
    }
});



var HelloWorldScene = cc.Scene.extend({
    PopLayer:null,
    EscLayer:null,
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
        this.PopLayer=new PopLayer();
        this.EscLayer=new EscLayer();
    }
});


