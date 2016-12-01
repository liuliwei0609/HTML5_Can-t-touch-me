var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    prop:null,
    enemy:[],
    trapTrap:null,
    rocketTrap:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        //道具栏文本
        var propMenuLabel = new cc.LabelTTF("道具栏","",50);
        propMenuLabel.x = size.width*0.2;
        propMenuLabel.y = size.height*0.4;
        this.addChild(propMenuLabel,1);
        propMenuLabel.setFontFillColor(cc.color.RED);
        propMenuLabel.enableStroke(cc.color.YELLOW,5);
        propMenuLabel.enableShadow(cc.color.GREEN,cc.p(5,5),5);

        //道具栏
        var prop = new PropClass();
        this.addChild(prop,1);
        this.prop = prop;

        //敌人1类1
        var enemyOne = new EnemyClass(res1);
        // enemyOne.x = size.width* 0.7;
        // enemyOne.y = size.height* 0.7;
        this.addChild(enemyOne);
        cc.log("1lei");
        this.enemy[1] = enemyOne;

        // //敌人1类2
        // var enemyOne2 = new Enemys(1);
        // var size = cc.winSize;
        // enemyOne2.x = size.width* 0.3;
        // enemyOne2.y = size.height* 0.7;
        // this.addChild(enemyOne2);
        // cc.log("1lei2");
        // this.enemy[2] = enemyOne2;
        //敌人2
        var enemyTwo = new EnemyClass(2);
        // enemyTwo.x = size.width* 0.5;
        // enemyTwo.y = size.height* 0.7;
        this.addChild(enemyTwo);
        cc.log("2lei");
        this.enemy[2]= enemyTwo;

        var people=new PeopleClass(res.Stand_right_png);
        this.people=people;
        people.x=size.width/2;
        people.y=size.height/2;
        this.addChild(people);

        var trapTrap=new TrapTrapClass(res.Cactus_png);
        this.trapTrap=trapTrap;
        trapTrap.x=size.width*0.8;
        trapTrap.y=size.height/2;
        this.addChild(trapTrap);


        var rocketTrap=new RocketTrapClass(res.Rocket_Fly1);
        rocketTrap.x=size.width*0.8;
        rocketTrap.y=size.height/2;
        this.addChild(rocketTrap);
        this.rocketTrap=rocketTrap;

        this.schedule(this.TrapTrapCollisionDetection,0.1);
        this.schedule(this.RocketTrapCollisionDetection,0.1);
        this.schedule(this.EnemyOneCollisionDetection,0.1);
        this.schedule(this.EnemyTwoCollisionDetection,0.1);

        return true;
    },
    RocketTrapCollisionDetection:function()
    {
        var peopleBox=this.people.getBoundingBox();
        var rocketTrapBox=this.rocketTrap.getBoundingBox();
        if(cc.rectIntersectsRect(peopleBox,rocketTrapBox))
        {
            cc.log("碰撞到火箭，死亡");
        }
    },
    TrapTrapCollisionDetection:function()
    {
        var peopleBox=this.people.getBoundingBox();
        var trapTrapBox=this.trapTrap.getBoundingBox();
        if(cc.rectIntersectsRect(peopleBox,trapTrapBox))
        {
            cc.log("碰撞到陷阱，死亡");
        }
    },
    EnemyOneCollisionDetection:function()
    {
        var peopleBox=this.people.getBoundingBox();
        var enemyOneBox=this.enemy[1].getBoundingBox();
        if(cc.rectIntersectsRect(peopleBox,enemyOneBox))
        {
            cc.log("碰撞到敌人1，死亡");
        }
    },
    EnemyTwoCollisionDetection:function()
    {
        var peopleBox=this.people.getBoundingBox();
        var enemyTwoBox=this.enemy[2].getBoundingBox();
        if(cc.rectIntersectsRect(peopleBox,enemyTwoBox))
        {
            cc.log("碰撞到敌人2，死亡");
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