var EnemyClassOne = cc.Sprite.extend({
    EnemyOne:null,
    rangeX:0,
    boolNum:0,
    xp:0,
    yp:0,
    ctor:function(fileName,xp,yp){
        this._super(fileName,xp,yp);
        var size = cc.winSize;
        this.moveOne();
        this.xp=xp;
        this.yp=yp;
        this.schedule(this.scheduleCallOne,0.1);
        return true;
    },
    moveOne:function () {
        //跑动动画封装
        var run_Animation=new cc.Animation();
        for(var i=1;i<=4;i++)
        {
            var frameName = res["EnemyRun"+i+"_png"];
            run_Animation.addSpriteFrameWithFile(frameName);
        }
        run_Animation.setDelayPerUnit(1/10);
        run_Animation.setRestoreOriginalFrame(true);//回到初始帧
        var action = cc.animate(run_Animation);
        this.runAction(action.repeatForever());
    },
    scheduleCallOne:function () {
        var x = this.x;

        if(0==this.boolNum)
        {
            this.x-=10;
            if(this.x<=cc.winSize.width*this.xp+this.rangeX)
            {
                this.boolNum=1;
                this.runAction(cc.flipX(true));
            }
        }
        else if(1==this.boolNum)
        {
            this.x+=10;
            if(this.x>=cc.winSize.width*this.yp+this.rangeX)
            {
                this.boolNum=0;
                this.runAction(cc.flipX(false));
            }
        }

    },
});
