var Player = cc.Sprite.extend({
    listener:null,
    player:null,
    speed:6,
    jumpY:160,
    VHP:1,
    isTools:false,
    rightRunAction:null,
    leftRunAction:null,
    ctor:function(fileName, rect, rotated){
        this._super(fileName, rect, rotated);
        //站立
        var dragon_stand=new cc.Sprite(res.Stand_png);
        this.player=dragon_stand;
        this.addChild(dragon_stand);
        //跑动动画封装
        var run_animation_right=new cc.Animation();
        for(var i=1;i<3;i++)
        {
            var frameName=res["Run"+i+"_png"];
            run_animation_right.addSpriteFrameWithFile(frameName);
        }
        run_animation_right.setDelayPerUnit(1/4);
        run_animation_right.setRestoreOriginalFrame(false);
        var run_right=cc.animate(run_animation_right);
        this.rightRunAction = run_right;

        var run_animation_left=new cc.Animation();
        for(var i=3;i<5;i++)
        {
            var frameName=res["Run"+i+"_png"];
            run_animation_left.addSpriteFrameWithFile(frameName);
        }
        run_animation_left.setDelayPerUnit(1/4);
        run_animation_left.setRestoreOriginalFrame(false);
        var run_left=cc.animate(run_animation_left);
        this.leftRunAction = run_left;

        //跳动封装
        var jump=cc.sequence(cc.jumpBy(1,cc.p(0,0),this.jumpY,1),cc.callFunc(function(){
            isJumping=false;
        }));

        var isLefting=false;
        var isRighting=false;

        var isJumping=false;//防止一直跳跃的状态
        // var isLeft=false;//判断跳跃

        var that=this.player;
        var speed=this.speed;
        var listener=cc.EventListener.create({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(Code,event)
            {
                cc.log("cureentKey = "+ Code);
                if(cc.KEY.up==Code&&cc.KEY.right)
                {
                    //jump

                    if (isJumping ==false)
                    {
                        isJumping = true;
                        that.runAction(jump);
                    }


                }
                if(cc.KEY.right==Code)
                {
                    //right
                    isRighting=true;
                    that.x+=6;
                    that.runAction(run_right);
                }
                if(cc.KEY.left==Code)
                {
                    //right
                    isLefting=true;
                    that.x-=6;
                    that.runAction(run_left);
                }

            },
            onKeyReleased:function(Code,event)
            {

            }

        });
        cc.eventManager.addListener(listener,this);
        this.listener = listener;
    },
    onExit:function(){
        this._super();
        cc.log("onExit调用，移除监听器");
        cc.eventManager.removeListener(this.listener);
    },
    callback:function()
    {
        var prop=cc.sys.localStorage.getItem("canUseProp");
        if(prop)
        {
            if(prop.c)
            {
                console.log(1);
            }
            if(prop.x)
            {
                console.log(2);
            }
            if(prop.t)
            {
                console.log(3);
            }
        }
    }
});