var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    people:null,
    trapTrap:null,
    rocketTrap:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        var people=new PeopleClass(res.Stand_right_png);
        this.people=people;
        people.x=size.width/2;
        people.y=size.height/2;
        this.addChild(people);

        var trapTrap=new TrapTrapClass();
        this.trapTrap=trapTrap;
        trapTrap.x=size.width*0.8;
        trapTrap.y=size.height/2;
        this.addChild(trapTrap);

        var rocketTrap=new RocketTrapClass();
        rocketTrap.x=size.width*0.3;
        rocketTrap.y=size.height/2;
        this.addChild(rocketTrap);
        this.rocketTrap=rocketTrap;

        this.schedule(this.killCallBack,1);

        return true;
    },
    killCallBack:function()
    {
        var peopleBox=this.people.getBoundingBox();
        var trapTrapBox=this.trapTrap.getBoundingBox();
        // if(cc.rectIntersectsRect(peopleBox,trapTrapBox))
        // {
            cc.log(peopleBox.x+"aaa");
            cc.log(trapTrapBox.x);
        // }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});