var audioEngine=cc.audioEngine; //音乐基类

var StartLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        var bg=new cc.Sprite(res.Bg_jpg);
        bg.x=size.width/2;
        bg.y=size.height/2;
        this.addChild(bg);

        /*var logo=new cc.LabelTTF("别碰我");
        logo.setFontSize(size.width/8);
        logo.setFontFillColor(cc.color.BLACK);
        logo.enableStroke(cc.color.YELLOW,8);*/
        var logo = new cc.MenuItemImage(res.button_png);
        logo.x=size.width/2;
        logo.y=size.height*0.8;
        this.addChild(logo);

        var playItem=new cc.MenuItemImage(res.Play1_png,res.Play2_png,function(){
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
            cc.director.runScene(new SelectScene());
        },this);
        // var play2Item=new cc.MenuItemImage(res.Play2_png,function(){},this);
        // var toggleItem=new cc.MenuItemToggle(play1Item,play2Item,function(){},this);
        var playMenu=new cc.Menu(playItem);
        playMenu.x=size.width/2;
        playMenu.y=size.height/2;
        this.addChild(playMenu);

        var settingIcon=new cc.MenuItemImage(res.button_png);


        var aboutIcon=new cc.MenuItemImage(res.button_png);


        var settingItem=new cc.MenuItemLabel(settingIcon,function(){
            // this.getParent().PopLayer.setVisible(true);
            //按钮音效
            this.getParent().addChild(this.getParent().PopLayer,1);
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
        },this);
        var settingMenu=new cc.Menu(settingItem);
        settingMenu.x=size.width*0.3;
        settingMenu.y=size.height*0.2;

        var aboutItem=new cc.MenuItemLabel(aboutIcon,function(){
            this.getParent().addChild(this.getParent().AboutLayer,1);
            if(0==cc.sys.localStorage.getItem("soundisOn"))
            {
                audioEngine.playEffect(res.Button1_wav);
            }
        },this);
        var aboutMenu=new cc.Menu(aboutItem);
        aboutMenu.x=size.width*0.7;
        aboutMenu.y=size.height*0.2;

        this.addChild(settingMenu);
        this.addChild(aboutMenu);
        return true;
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
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        var pop=new cc.Sprite(res.Pop_png);
        pop.x=size.width/2;
        pop.y=size.height/2;
        this.addChild(pop);
        //添加“背景音乐”Label
        var backMusic = new cc.MenuItemImage(res.button_png);
        backMusic.x=size.width*0.46;
        backMusic.y=size.height*0.6;
        this.addChild(backMusic);


        //添加“背景音效”Label
        var backEffect =new cc.MenuItemImage(res.button_png);
        backEffect.x=size.width*0.46;
        backEffect.y=size.height*0.47;
        this.addChild(backEffect);

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

        var closeItem = new cc.MenuItemImage(res.button_png,res.button_png,function () {
            this.removeFromParent();
        },this);

        var CloseMenu=new cc.Menu(closeItem);
        CloseMenu.x=size.width/2;
        CloseMenu.y=size.height*0.4;
        this.addChild(CloseMenu);

        return true;
    }
});

var AboutLayer = cc.Layer.extend({
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
        //增加about里的文字部分
        var text1=new cc.LabelTTF("制作团队：Sprite");
        text1.setFontSize(size.width/66);
        text1.setFontFillColor(cc.color.BLACK);
        text1.x=size.width*0.47;
        text1.y=size.height*0.62;
        this.addChild(text1);

        var text2=new cc.LabelTTF("欢迎试玩本游戏！");
        text2.setFontSize(size.width/66);
        text2.setFontFillColor(cc.color.BLACK);
        text2.x=size.width*0.47;
        text2.y=size.height*0.56;
        this.addChild(text2);

        //关闭按钮
        var closeItem = new cc.MenuItemImage(res.button_png,res.button_png,function () {
            this.removeFromParent();
        },this)

        var CloseMenu=new cc.Menu(closeItem);
        CloseMenu.x=size.width/2;
        CloseMenu.y=size.height*0.4;
        this.addChild(CloseMenu);
        return true;
    }
});






var StartScene = cc.Scene.extend({
    PopLayer:null,
    StartLayer:null,
    AboutLayer:null,
    onEnter:function () {
        this._super();
        this.StartLayer = new StartLayer();
        this.addChild(this.StartLayer,0);
        this.PopLayer=new PopLayer();
        // this.addChild(this.PopLayer,1);
        this.AboutLayer=new AboutLayer();
        // this.addChild(this.AboutLayer,1);


    }
});