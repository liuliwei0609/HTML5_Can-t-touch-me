var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    people:null,
    trapTrap:null,
    rocketTrap:null,
    block:[],
    trap:[],
    listener:null,
    bg:null,
    bg1:null,
    YOrder:0,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        // var people=new PeopleClass(res.Stand_right_png);
        // people.setAnchorPoint(0.5,1);
        // this.people=people;
        // people.x=size.width/2;
        // people.y=size.height/2;
        // this.addChild(people);
        //
        // var trapTrap=new TrapTrapClass(res.Cactus_png);
        // this.trapTrap=trapTrap;
        // trapTrap.x=size.width*0.8;
        // trapTrap.y=size.height/2;
        // this.addChild(trapTrap);
        //
        //
        // var rocketTrap=new RocketTrapClass(res.Rocket_Fly1);
        // rocketTrap.x=size.width*0.8;
        // rocketTrap.y=size.height/2;
        // this.addChild(rocketTrap);
        // this.rocketTrap=rocketTrap;
        //
        // this.schedule(this.TrapCollisionDetection,1);
        //
        // BlockClass.prototype.type="block";
        // var block=new BlockClass(res.block_png);
        // block.x=size.width*0.7;
        // block.y=size.height*0.6;
        // this.block=block;
        // this.addChild(block);
        //
        // this.schedule(this.BlockCollisionDetection,0.01);

        //创建视差背景
        this.bg = new cc.ParallaxNode();
        this.bg1 = new cc.Sprite(res.Bg2_jpg);
        this.block[0]=new BlockClass(res.floor_block_png);
        this.block[0].setScale(14,0.8);
        this.block[0].setAnchorPoint(0.5,1);
        //
        this.block[1]=new BlockClass(res.block_png);
        this.block[1].setScale(2,0.8);
        this.block[1].setAnchorPoint(0.5,1);

        //坐标错误
        this.bg.addChild(this.bg1, 0, cc.p(0.5, 0), cc.p(this.bg1.width / 2, this.bg1.height / 2));
        this.bg.addChild(this.block[0], 1, cc.p(0.5, 0), cc.p(this.block[0].width*0.1, this.block[0].height*2));
        this.bg.addChild(this.block[1], 1, cc.p(0.5, 0), cc.p(this.block[1].width*2, this.block[1].height*4));
        this.addChild(this.bg);


        //创建玩家角色
        var people=new PeopleClass(res.Stand_right_png);
        people.x=size.width*0.1;
        people.y=size.height*0.2;
        this.addChild(people);
        this.people=people;
        //重新设置角色的锚点
        this.people.setAnchorPoint(0.5,0);

        // //创建材质
        // var block=new BlockClass(res.floor_block_png);
        // block.x=size.width*0.1;
        // block.y=size.height*0.5;
        // this.block[0]=block;
        // this.addChild(block);
        this.schedule(this.BlockCollisionDetection,0.001);
        // this.block[0].setAnchorPoint(0.5,1);

        //跳跃
        var isJumping=false;
        var jump=cc.sequence(cc.jumpBy(1,cc.p(0,0),600,1),cc.callFunc(function(){
            isJumping=false;
        }));






        var that=this;

        //事件侦听
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var location=touch.getLocation();
                var target = event.getCurrentTarget();//实例化地图对象
                var people_location=that.people.getPosition();//获取人物在屏幕上的坐标
                var map_location=target.getPosition();//获取地图在屏幕上的坐标
                if(location.x>cc.winSize.width/2)
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
                            that.people.runAction(that.people.run_animate_right);
                            that.people.x+=20;
                        }
                        else
                        {
                            that.people.runAction(that.people.run_animate_right);
                            target.setPositionX(target.getPosition().x-=20);
                            cc.log(-map_location.x);
                        }
                    }
                    // cc.log(that.people.y);
                }

                if(location.x<=cc.winSize.width/2)
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
                            that.people.runAction(that.people.run_animate_left);
                            that.people.x-=20;
                        }
                        else
                        {
                            that.people.runAction(that.people.run_animate_left);
                            target.setPositionX(target.getPosition().x+=20);
                        }
                    }
                }
                return true;
            },
            onTouchMoved: function (touch, event) {
                if(isJumping==false)
                {
                    // that.people.runAction(jump);
                    isJumping=true;
                    that.people.runAction(jump);
                }
            },
            onTouchEnded: function (touch, event) {
                // 点击事件结束处理
            },
        });


        // 注册监听器
        cc.eventManager.addListener(listener, this.bg);
        this.listener=listener;

        return true;
    },
    // TrapCollisionDetection:function()
    // {
    //     var peopleBox=this.people.getBoundingBox();
    //     var rocketTrapBox=this.rocketTrap.getBoundingBox();
    //     if(cc.rectIntersectsRect(peopleBox,rocketTrapBox))
    //     {
    //         cc.log("碰撞到陷阱，死亡");
    //     }
    // },
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
            // else
            // {
            //     //定义每秒下落位移
            //     this.YOrder+=10*dt;
            //     this.people.y-=this.YOrder;
            // }
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


