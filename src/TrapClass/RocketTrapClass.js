var RocketTrapClass = cc.Sprite.extend({
    boolNum:0,
    rangeX:0,
    activate:false,
    ctor:function(fileName,x) {
        this._super(fileName,x);
        var size=cc.winSize;
        this.fly();
        // this.schedule(this.rocket,0.01);
    },
    onExit:function(){
        this._super();
    },
    fly:function()
    {
        var rocket_animation=new cc.Animation();
        for(var i=1;i<3;i++)
        {
            var frameName=res["Rocket_Fly"+i];
            rocket_animation.addSpriteFrameWithFile(frameName);
        }
        rocket_animation.setDelayPerUnit(1/8);
        rocket_animation.setRestoreOriginalFrame(true);
        var fly=cc.animate(rocket_animation);
        this.runAction(fly.repeatForever());
    },
    rocket:function()
    {
        if(0==this.boolNum)
        {
            this.x-=20;
            if(this.x<=200+this.rangeX)
            {
                this.boolNum=1;
                this.runAction(cc.flipX(true));
            }
        }
        else if(1==this.boolNum)
        {
            this.x+=20;
            if(this.x>=500+this.rangeX)
            {
                this.boolNum=0;
                this.runAction(cc.flipX(false));
            }
        }

    }



});

//
// var BgLayer=cc.Layer.extend({
//     bg:null,
//     BgSprite:[],
//     ctor:function()
//     {
//         this._super();
//         this.bg=new cc.Sprite(res.Bg_png);
//         this.bg.setAnchorPoint(0,0);
//         this.addChild(this.bg);
//     }
// });
//
// var SceneLayer=cc.Layer.extend({
//     block:[],
//     trapTrap:[],
//     SceneSprite:[],
//     rocketTrap:[],
//     ctor:function()
//     {
//         this._super();
//         var size=cc.winSize;
//         //创建地面材质
//         this.block[0]=new BlockClass(res.floor_block_png);
//         // this.block[0].setScale(14,0.8);
//         this.block[0].setAnchorPoint(0.5,1);
//         this.block[0].x=size.width*0.6;
//         this.block[0].y=size.height*0.2;
//         //创建浮空材质
//         this.block[1]=new BlockClass(res.block_png);
//         // this.block[1].setScale(2,0.8);
//         this.block[1].setAnchorPoint(0.5,1);
//         this.block[1].x=size.width*0.7;
//         this.block[1].y=size.height*0.4;
//         //创建陷阱
//         this.trapTrap[0]=new TrapTrapClass(res.Cactus_png);
//         this.trapTrap[0].x=size.width*0.6;
//         this.trapTrap[0].y=size.height*0.5;
//         //创建火箭
//         this.rocketTrap[0]=new RocketTrapClass(res.Rocket_Fly1);
//         this.rocketTrap[0].x=size.width;
//         this.rocketTrap[0].y=size.height*0.5;
//
//         this.addChild(this.block[0]);
//         this.addChild(this.block[1]);
//         this.addChild(this.trapTrap[0]);
//         this.addChild(this.rocketTrap[0]);
//     }
// });
//
// var PlayerLayer=cc.Layer.extend({
//     people:null,
//     listener:null,
//     speed:0,
//     flag:0,
//     ctor:function()
//     {
//         this._super();
//         var size=cc.winSize;
//         this.people=new PeopleClass(res.Stand_right_png);
//         this.people.x=size.width*0.5;
//         this.people.y=size.height*0.4;
//         this.people.setAnchorPoint(0.5,0);
//         this.addChild(this.people);
//         //自由落体
//         this.schedule(this.myCallBack,0.02,cc.REPEAT_FOREVER,0);
//
//         this.schedule(this.TrapCollisionDetection,0.02,cc.REPEAT_FOREVER,0);
//
//         this.schedule(this.fireRocket,0.1,cc.REPEAT_FOREVER,0);
//
//         var that=this;
//
//         //监听器
//         var listener = cc.EventListener.create({
//             event: cc.EventListener.KEYBOARD,
//             onKeyPressed: function (code, event) {
//                 if(code==cc.KEY.right)
//                 {
//                     if(-that.getParent().BgLayer.bg.x+size.width>=that.getParent().BgLayer.bg.getContentSize().width)
//                     {
//                         that.getParent().SceneLayer.SceneSprite = that.getParent().SceneLayer.getChildren();
//                         that.getParent().BgLayer.BgSprite = that.getParent().BgLayer.getChildren();
//                         for (var i = 0; i < that.getParent().SceneLayer.SceneSprite.length; i++) {
//                             that.getParent().SceneLayer.SceneSprite[i].stopAllActions();
//                         }
//                         for (var j = 0; j < that.getParent().BgLayer.BgSprite.length; j++) {
//                             that.getParent().BgLayer.BgSprite[j].stopAllActions();
//                         }
//                     }
//                     else {
//                         that.people.runAction(that.people.run_animate_right);
//                         that.getParent().SceneLayer.SceneSprite = that.getParent().SceneLayer.getChildren();
//                         that.getParent().BgLayer.BgSprite = that.getParent().BgLayer.getChildren();
//                         for (var i = 0; i < that.getParent().SceneLayer.SceneSprite.length; i++) {
//                             that.getParent().SceneLayer.SceneSprite[i].runAction(cc.moveBy(0.8, cc.p(-20, 0)));
//                         }
//                         for (var j = 0; j < that.getParent().BgLayer.BgSprite.length; j++) {
//                             that.getParent().BgLayer.BgSprite[j].runAction(cc.moveBy(0.8, cc.p(-20, 0)));
//                         }
//                         for(var k=0;k<that.getParent().SceneLayer.rocketTrap.length;k++)
//                         {
//                             that.getParent().SceneLayer.rocketTrap[k].rangeX-=20;
//                         }
//                     }
//
//                 }
//                 if(code==cc.KEY.left)
//                 {
//                     if(-that.getParent().BgLayer.bg.x<=0)
//                     {
//                         that.getParent().SceneLayer.SceneSprite = that.getParent().SceneLayer.getChildren();
//                         that.getParent().BgLayer.BgSprite = that.getParent().BgLayer.getChildren();
//                         for (var i = 0; i < that.getParent().SceneLayer.SceneSprite.length; i++) {
//                             that.getParent().SceneLayer.SceneSprite[i].stopAllActions();
//                         }
//                         for (var j = 0; j < that.getParent().BgLayer.BgSprite.length; j++) {
//                             that.getParent().BgLayer.BgSprite[j].stopAllActions();
//                         }
//                     }
//                     else
//                     {
//                         that.people.runAction(that.people.run_animate_left);
//                         that.getParent().SceneLayer.SceneSprite = that.getParent().SceneLayer.getChildren();
//                         that.getParent().BgLayer.BgSprite = that.getParent().BgLayer.getChildren();
//                         for (var i = 0; i < that.getParent().SceneLayer.SceneSprite.length; i++) {
//                             that.getParent().SceneLayer.SceneSprite[i].runAction(cc.moveBy(0.8, cc.p(20, 0)));
//                         }
//                         for (var j = 0; j < that.getParent().BgLayer.BgSprite.length; j++) {
//                             that.getParent().BgLayer.BgSprite[j].runAction(cc.moveBy(0.8, cc.p(20, 0)));
//                         }
//                         for(var k=0;k<that.getParent().SceneLayer.rocketTrap.length;k++)
//                         {
//                             that.getParent().SceneLayer.rocketTrap[k].rangeX+=20;
//                         }
//                     }
//                 }
//                 if(code==cc.KEY.up)
//                 {
//                     that.speed = 40;
//                 }
//             },
//             onKeyReleased: function (touch, event) {
//             }
//         });
//
//         // 注册监听器
//         cc.eventManager.addListener(listener, this.people);
//         this.listener=listener;
//
//     },
//     myCallBack:function()
//     {
//         this.people.y+=this.speed;
//         // if(this.people.y<0)
//         // {
//         //     this.speed = 0;
//         //     this.people.y = 0;
//         // }
//         // else
//         // {
//         //      this.speed-=5;
//         // }
//         var peoplePoint=this.people.getPosition();
//         for(var i=0;i<this.getParent().SceneLayer.block.length;i++)
//         {
//             var blockBox=this.getParent().SceneLayer.block[i].getBoundingBox();
//             if(cc.rectContainsPoint(blockBox,peoplePoint))
//             {
//                 this.flag=i;
//             }
//         }
//         if(cc.rectContainsPoint(this.getParent().SceneLayer.block[this.flag].getBoundingBox(),peoplePoint))
//         {
//             this.people.setPositionY(this.getParent().SceneLayer.block[this.flag].y);
//             this.speed=0;
//         }
//         else
//         {
//             this.speed-=5;
//         }
//     },
//     TrapCollisionDetection:function()
//     {
//         var peopleBox=this.people.getBoundingBox();
//         var trapBox=this.getParent().SceneLayer.trapTrap[0].getBoundingBox();
//         if(cc.rectIntersectsRect(peopleBox,trapBox))
//         {
//             cc.log("碰撞到陷阱，死亡");
//         }
//     },
//     fireRocket:function()
//     {
//         if(this.getParent().SceneLayer.rocketTrap[0].activate==true)
//         {
//             this.getParent().SceneLayer.rocketTrap[0].rocket();
//         }
//         else if(this.getParent().SceneLayer.rocketTrap[0].x-this.people.x<=100)
//         {
//             this.getParent().SceneLayer.rocketTrap[0].rocket();
//             this.getParent().SceneLayer.rocketTrap[0].activate=true;
//         }
//     }
// });
//
//
// var MainScene = cc.Scene.extend({
//     BgLayer:null,
//     SceneLayer:null,
//     PlayerLayer:null,
//     onEnter:function () {
//         this._super();
//         this.BgLayer=new BgLayer();
//         this.addChild(this.BgLayer,0);
//         this.SceneLayer=new SceneLayer();
//         this.addChild(this.SceneLayer,1);
//         this.PlayerLayer=new PlayerLayer();
//         this.addChild(this.PlayerLayer,2);
//     }
// });