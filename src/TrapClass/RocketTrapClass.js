var RocketTrapClass = cc.Sprite.extend({
    boolNum:0,
    ctor:function(fileName, rect, rotated) {
        this._super(fileName, rect, rotated);
        var size=cc.winSize;
        this.fly();
        this.schedule(this.rocket,0.01);
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
            this.x-=6;
            if(this.x<=0)
            {
                this.boolNum=1;
                this.runAction(cc.flipX(true));
            }
        }
        else if(1==this.boolNum)
        {
            this.x+=6;
            if(this.x>=cc.winSize.width)
            {
                this.boolNum=0;
                this.runAction(cc.flipX(false));
            }
        }

    }



});