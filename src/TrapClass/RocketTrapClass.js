var RocketTrapClass = cc.Sprite.extend({
    rocketTrap:null,
    ctor:function(fileName, rect, rotated) {
        this._super(fileName, rect, rotated);
        var size=cc.winSize;
        var trap=new cc.Sprite(res.Rocket_Fly1);
        this.rocketTrap=trap;
        this.addChild(trap);
        this.killPlayer();
        this.fly();
        this.schedule(this.rocket,0.1);

    },
    onExit:function(){
        this._super();
    },
    killPlayer:function()
    {

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
        this.rocketTrap.runAction(fly.repeatForever());
    },
    rocket:function()
    {
        this.rocketTrap.x-=6;
        // var x=this.rocketTrap.getPosition().x;
        // var y=this.rocketTrap.getPosition().y;
        // cc.log(x);
        // cc.log(y);
        if(this.rocketTrap.x<=-450)
        {
            this.removeChild(this.rocketTrap);
            this.addChild(this.rocketTrap);
        }
    }
});