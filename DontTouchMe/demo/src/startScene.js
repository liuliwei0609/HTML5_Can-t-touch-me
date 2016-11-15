var musicLayer = cc.Layer.extend({
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
        //背景音乐开关按钮
        //1.创建两个菜单项
        var bgMusicOnItem  = new cc.MenuItemImage(res.MusicOnNormal_png,res.MusicOffNormal_png,function () {
        },this);
        var bgMusicOffItem = new cc.MenuItemImage(res.MusicOnNormal_png,res.MusicOffNormal_png,function () {
        },this);
        var ls = cc.sys.localStorage;
        if(ls.getItem("isMusicOn") == null){
            ls.setItem("isMusicOn","YES");
            ls.setItem("isEffectOn","YES");
        }
        //2.创建开关菜单项
        var togglebgMenuItem = new cc.MenuItemToggle(bgMusicOnItem,bgMusicOffItem,function () {
            ls.setItem("isBgMusicOn", togglebgMenuItem.getSelectedIndex() == 0 ? "on" : "off");
        },this);

        if("null" == ls.getItem("isBgMusicOn")){
            togglebgMenuItem.setSelectedIndex(0);
            cc.audioEngine.playMusic(res.BgMusic_mp3,true);
        }else if ("on" == ls.getItem("isBgMusicOn"))
        {
            togglebgMenuItem.setSelectedIndex(0);
            cc.audioEngine.playMusic(res.BgMusic_mp3,true);
        } else if ("off" == ls.getItem("isBgMusicOn"))
        {
            togglebgMenuItem.setSelectedIndex(1);
            cc.audioEngine.stopMusic();
        }else
        {
            cc.log("else");
        }
        var bgMusicMenu = new cc.Menu(togglebgMenuItem);
        bgMusicMenu.x=size.width*0.5;
        bgMusicMenu.y=size.height*0.6;
        this.addChild(bgMusicMenu);

        //音效音乐开关按钮
        var MusicOnItem  = new cc.MenuItemImage(res.MusicOnNormal_png,res.MusicOffNormal_png,function () {
        },this);
        var MusicOffItem = new cc.MenuItemImage(res.MusicOnNormal_png,res.MusicOffNormal_png,function () {
        },this);
        //2.创建开关菜单项
        var toggleMenuItem = new cc.MenuItemToggle(MusicOnItem,MusicOffItem,function () {
            ls.setItem("isMusicOn", toggleMenuItem.getSelectedIndex() == 0 ? "on" : "off");
        },this);

        if("null" == ls.getItem("isMusicOn")){
            toggleMenuItem.setSelectedIndex(0);
            cc.audioEngine.playEffect(res.Music_mp3,true);
        }else if ("on" == ls.getItem("isMusicOn"))
        {
            toggleMenuItem.setSelectedIndex(0);
            cc.audioEngine.playEffect(res.Music_mp3,true);;
        } else if ("off" == ls.getItem("isMusicOn"))
        {
            toggleMenuItem.setSelectedIndex(1);
            cc.audioEngine.stopEffect();
        }else
        {
            cc.log("else");
        }
        var MusicMenu = new cc.Menu(toggleMenuItem);
        MusicMenu.x=size.width*0.5;
        MusicMenu.y=size.height*0.4;
        this.addChild(MusicMenu);
        //标签
        var bgMusicLabel = new cc.LabelTTF("音乐：","",20);
        bgMusicLabel.setFontFillColor(cc.color.RED);
        bgMusicLabel.enableStroke(cc.color.YELLOW,5);
        bgMusicLabel.x = size.width*0.4;
        bgMusicLabel.y = size.height*0.6;
        this.addChild(bgMusicLabel);

        var MusicLabel = new cc.LabelTTF("音效：","",20);
        MusicLabel.setFontFillColor(cc.color.RED);
        MusicLabel.enableStroke(cc.color.YELLOW,5);
        MusicLabel.x = size.width*0.4;
        MusicLabel.y = size.height*0.4;
        this.addChild(MusicLabel);
        //关闭按钮
        var closeMenuItem = new cc.MenuItemImage(res.StartLabelClose_png,res.StartLabelClose_png,function () {
            this.removeFromParent();
        },this);
        var closeMenu = new cc.Menu(closeMenuItem);
        closeMenu.x=size.width*0.7;
        closeMenu.y=size.height*0.7;
        this.addChild(closeMenu);
        return true;
    }
});
var labelLayer = cc.Layer.extend({
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
        //团队成员标签
        var teamLabel = new cc.LabelTTF("团队成员：赵森 刘力伟。。","",20);
        teamLabel.setFontFillColor(cc.color.RED);
        teamLabel.enableStroke(cc.color.YELLOW,5);
        teamLabel.x = size.width*0.5;
        teamLabel.y = size.height*0.5;
        this.addChild(teamLabel);
        //关闭按钮
        var closeMenuItem = new cc.MenuItemImage(res.StartLabelClose_png,res.StartLabelClose_png,function () {
            this.removeFromParent();
        },this);
        var closeMenu = new cc.Menu(closeMenuItem);
        closeMenu.x=size.width*0.7;
        closeMenu.y=size.height*0.7;
        this.addChild(closeMenu);

        return true;
    }
});

var startLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        //开始界面背景图
        var bg = new cc.Sprite(res.StartBg_jpg);
        bg.x=size.width/2;
        bg.y=size.height/2;
        //bg.setAnchorPoint(0,0);
        this.addChild(bg);

         //游戏名称
         var nameLabel = new cc.LabelTTF("Don't Touch Me","",50);
        nameLabel.x = size.width*0.5;
        nameLabel.y = size.height*0.8;
        this.addChild(nameLabel);
        nameLabel.setFontFillColor(cc.color.RED);
        nameLabel.enableStroke(cc.color.YELLOW,5);
        nameLabel.enableShadow(cc.color.GREEN,cc.p(5,5),5);

        //游戏开始按钮
        var startMenuItem = new cc.MenuItemImage(res.StartBtn_jpg,res.StartBtn_jpg,function () {
            // cc.director.runScene(HelloWorldScene);
            console.log("1");
        },this);
        var startMenu = new cc.Menu(startMenuItem);
        startMenu.x=size.width*0.5;
        startMenu.y=size.height*0.5;
        this.addChild(startMenu);

        //游戏开始界面左按钮
        var startMenuItemLeft = new cc.MenuItemImage(res.StartBtnLeft_jpg,res.StartBtnLeft_jpg,function(){
            console.log("2");
            this.getParent().addChild(this.getParent().musicLayer,2);
        },this);
        var startMenuLeft = new cc.Menu(startMenuItemLeft);
        startMenuLeft.x=size.width*0.3;
        startMenuLeft.y=size.height*0.3;
        this.addChild(startMenuLeft);

        //游戏开始界面右按钮
        var startMenuItemRight = new cc.MenuItemImage(res.StartBtnRight_jpg,res.StartBtnRight_jpg,function () {
            console.log("3");
            // this.getParent().labelLayer.setVisible(true);
            this.getParent().addChild(this.getParent().labelLayer,1);
        },this);
        var startMenuRight = new cc.Menu(startMenuItemRight);
        startMenuRight.x=size.width*0.7;
        startMenuRight.y=size.height*0.3;
        this.addChild(startMenuRight);

        return true;
    }
});

var startScene = cc.Scene.extend({
    labelLayer:null,
    startLayer:null,
    musicLayer:null,
    onEnter:function () {
        this._super();

        this.startLayer = new startLayer();
        this.addChild(this.startLayer,0);

        this.labelLayer = new labelLayer();
        // this.addChild(this.labelLayer,1);

        this.musicLayer = new musicLayer();
        //this.addChild(this.musicLayer,2);
    }
});

/**
 * Created by Administrator on 11/14 0014.
 */
