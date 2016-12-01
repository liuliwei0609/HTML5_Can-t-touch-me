var EnemyClass = cc.Sprite.extend({
    //属性
    VHP:null,
    type:null,
    enemyOneLeftMax:null,
    enemyOneRightMax:null,
    enemyTwoLeftMax:null,
    enemyTwoRightMax:null,
    //动作
    runAnimate:null,
    turnAnimate:null,
    attackAnimate:null,
    moveAnimate:null,
    EnemyOne:null,
    EnemyTwo:null,
    ctor:function(type){
        this._super(type);
        var size = cc.winSize;
        //方向
        var ls = localStorage;
        if (ls.getItem("turnEnemyOne") == null) {
            ls.setItem("turnEnemyOne", "left");
        }
        if (ls.getItem("turnEnemyTwo") == null) {
            ls.setItem("turnEnemyTwo", "left");
        }

        switch(type){
            case 1:
                this.newEnemyOne();
                this.moveOne();
                this.rangeOne();
                this.schedule(this.scheduleCallOne,0.1);
                break;
            case 2:
                this.newEnemyTwo();
                 this.moveTwo();
                this.rangeTwo();
                this.schedule(this.scheduleCallTwo,0.2);
                break;
        }

        return true;
    },
    //坐标位置,移动范围
    rangeOne:function(){
        this.enemyOneLeftMax =  this.EnemyOne.x - 100;
        this.enemyOneRightMax =  this.EnemyOne.x + 100;},
    rangeTwo:function(){
        this.enemyTwoLeftMax =  this.EnemyTwo.x - 100;
        this.enemyTwoRightMax =  this.EnemyTwo.x + 100;},
    //定时器回调函数
    scheduleCallOne:function () {
        var x = this.EnemyOne.x;
        if(x<=this.enemyOneRightMax && x>=this.enemyOneLeftMax){
            if(cc.sys.localStorage.getItem("turnEnemyOne")=="left"){
                this.EnemyOne.x -= 10;}
            if(cc.sys.localStorage.getItem("turnEnemyOne")=="right"){
                this.EnemyOne.x += 10;}
        }else if(x<this.enemyOneLeftMax){
            this.EnemyOne.runAction(cc.flipX(true));
            cc.sys.localStorage.setItem("turnEnemyOne", "right");
            this.EnemyOne.x = this.enemyOneLeftMax;
        }else if(x>this.enemyOneRightMax){
            this.EnemyOne.runAction(cc.flipX(false));
            cc.sys.localStorage.setItem("turnEnemyOne", "left");
            this.EnemyOne.x = this.enemyOneRightMax;
        }else{}
    },
    scheduleCallTwo:function () {
        var x = this.EnemyTwo.x;
        if(x<=this.enemyTwoRightMax && x>=this.enemyTwoLeftMax){
            if(cc.sys.localStorage.getItem("turnEnemyTwo")=="left"){
                this.EnemyTwo.x -= 10;}
            if(cc.sys.localStorage.getItem("turnEnemyTwo")=="right"){
                this.EnemyTwo.x += 10;}
        }else if(x<this.enemyTwoLeftMax){
            this.EnemyTwo.runAction(cc.flipX(true));
            cc.sys.localStorage.setItem("turnEnemyTwo", "right");
            this.EnemyTwo.x = this.enemyTwoLeftMax;
        }else if(x>this.enemyTwoRightMax){
            this.EnemyTwo.runAction(cc.flipX(false));
            cc.sys.localStorage.setItem("turnEnemyTwo", "left");
            this.EnemyTwo.x = this.enemyTwoRightMax;
        }else{}
    },
    //创建敌人
    newEnemyOne:function() {
        var EnemyOne = new cc.Sprite("res/EnemyRun/run1.png");
        // var Enemy = this._super(res.EnemyRun1_png);
        var size = cc.winSize;
        EnemyOne.x = size.width* 0.6;
        EnemyOne.y = size.height* 0.7;
        this.EnemyOne= EnemyOne;
        console.log("敌人1");
        this.addChild(EnemyOne);
    },
    newEnemyTwo:function() {
        var EnemyTwo = new cc.Sprite("res/Run/run1.png");
        //var EnemyTwo = this._super(res.Run1_png);
        var size = cc.winSize;
        EnemyTwo.x = size.width* 0.6;
        EnemyTwo.y = size.height* 0.5;
        this.EnemyTwo=EnemyTwo;
        console.log("敌人2");
        this.addChild(EnemyTwo);
    },
    //移动
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
        this.EnemyOne.runAction(action.repeatForever());
    },
    moveTwo:function () {
        //跑动动画封装
        var run_Animation=new cc.Animation();
        for(var i=1;i<=6;i++)
        {
            var frameName = res["Run"+i+"_png"];
            run_Animation.addSpriteFrameWithFile(frameName);
        }
        run_Animation.setDelayPerUnit(1/10);
        run_Animation.setRestoreOriginalFrame(true);//回到初始帧
        var action = cc.animate(run_Animation);
        this.EnemyTwo.runAction(action.repeatForever());
    },
    run:function () {
        //this.EnemyOne.runAction(cc.moveBy(1.0,50,0));
        //this.EnemyTwo.runAction(cc.moveBy(1.0,50,0));
    },
    // 攻击
    attack:function () {
    },
    //转向
    turn:function () {
        //  this.runAction(this.turnAnimate);
        //     //转向
        //     this.turnAnimate = cc.flipX(true);
    },

});