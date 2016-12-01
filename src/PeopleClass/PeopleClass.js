var PeopleClass = cc.Sprite.extend({
    speed:null,
    jumpHeight:null,
    vHp:1,
    people:null,
    listener:null,
    ctor:function(fileName, rect, rotated) {
        this._super(fileName, rect, rotated);
        // 跑动动画封装
        var run_animation_right=new cc.Animation();
        for(var i=1;i<3;i++)
        {
            var frameName=res["Run_Right_"+i];
            run_animation_right.addSpriteFrameWithFile(frameName);
        }
        run_animation_right.setDelayPerUnit(1/4);
        run_animation_right.setRestoreOriginalFrame(false);
        var run_right=cc.animate(run_animation_right);

        var run_animation_left=new cc.Animation();
        for(var i=1;i<3;i++)
        {
            var frameName=res["Run_Left_"+i];
            run_animation_left.addSpriteFrameWithFile(frameName);
        }
        run_animation_left.setDelayPerUnit(1/4);
        run_animation_left.setRestoreOriginalFrame(false);
        var run_left=cc.animate(run_animation_left);

        //跳动封装
        var isJumping=false;
        var jump_right=cc.sequence(cc.jumpBy(1,cc.p(100,0),100,1),cc.callFunc(function(){
            isJumping=false;
        }));
        var jump_left=cc.sequence(cc.jumpBy(1,cc.p(-100,0),100,1),cc.callFunc(function(){
            isJumping=false;
        }));

        var that=this;

        var listener=cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch,event)
            {
                var location=touch.getLocation();
                if(location.x>cc.winSize.width/2)
                {
                    that.runAction(run_right);
                    that.x+=15;
                }
                if(location.x<=cc.winSize.width/2)
                {
                    that.runAction(run_left);
                    that.x-=15;
                }
                return true;

            },
            onTouchMoved:function(touch,event)
            {
                var location=touch.getLocation();
                if(location.x>cc.winSize.width/2)
                {
                    if(isJumping==false)
                    {
                        that.runAction(jump_right);
                        isJumping=true;
                    }
                }
                if(location.x<=cc.winSize.width/2)
                {
                    if(isJumping==false)
                    {
                        that.runAction(jump_left);
                        isJumping=true;
                    }
                }

            },
            onTouchEnded:function(touch,event)
            {

            }

        });
        cc.eventManager.addListener(listener,this);
        this.listener = listener;


    },
    onExit:function(){
        this._super();
    },
    getSpeed:function()
    {
        return this.speed;
    },
    getJumpHeight:function()
    {
        return this.jumpHeight;
    },
    getvHp:function()
    {
        return this.vHp;
    },
    animate_right:function(fileName)
    {
        var name=fileName;
        var people_animation_right=new cc.Animation();
        for(var i=1;i<3;i++)
        {
            var frameName=res[name+i];
            people_animation_right.addSpriteFrameWithFile(frameName);
        }
        people_animation_right.setDelayPerUnit(1/8);
        people_animation_right.setRestoreOriginalFrame(true);
        return people_animation_right;
    },
    animate_left:function(fileName)
    {
        var name=fileName;
        var  people_animation_left=new cc.Animation();
        for(var i=1;i<3;i++)
        {
            var frameName=res[name+i];
            people_animation_left.addSpriteFrameWithFile(frameName);
        }
        people_animation_left.setDelayPerUnit(1/8);
        people_animation_left.setRestoreOriginalFrame(true);
        return people_animation_left;

    }
});
