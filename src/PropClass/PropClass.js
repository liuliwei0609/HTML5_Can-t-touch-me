var PropClass = cc.Sprite.extend({
    propOne:null,
    propTwo:null,
    propThree:null,

    ctor:function(fileName, rect, rotated){
        this._super(fileName, rect, rotated);
        //初始化道具框
        this.propNum();
        // // var a=parseInt(cc.sys.localStorage.getItem("currentHavedProp"));
        // // console.log(a);
        // // switch (a){
        // //     //无
        // //     case 0:
        // //         break;
        // //     //道具1
        // //     case 1:
        // //
        // //         //this.showProp1();
        // //         this._super("res/prop1.png");
        // //         this.x = cc.winSize.width*0.3;
        // //         this.y = cc.winSize.height*0.4;
        // //         console.log(1);
        // //         break;
        // //     //道具2
        // //     case 2:
        // //
        // //         this._super("res/prop2.png");
        // //         this.x = cc.winSize.width*0.4;
        // //         this.y = cc.winSize.height*0.4;
        // //         console.log(2);
        // //         //this.showProp2();
        // //         break;
        // //     //道具3
        // //     case 3:
        // //
        // //         this._super("res/prop3.png");
        // //         this.x = cc.winSize.width*0.5;
        // //         this.y = cc.winSize.height*0.4;
        // //         console.log(3);
        //         this.showProp2();
        //         break;
        // }
        this.showMenu();
        return true;
    },

    //搭建枚举函数
    propNum:function () {
        prop={
            s_0_0_0:0,
            s_1_0_0:1,
            s_0_1_0:2,
            s_0_0_1:3,
            s_1_1_0:4,
            s_1_0_1:5,
            s_0_1_1:6,
            s_1_1_1:7
        };
        //根据本地存储道具类，显示道具
        cc.sys.localStorage.setItem("currentHavedProp",prop.s_1_1_1);
    },
    //显示道具1
    showProp1:function () {
        var Prop1=new PropOne("res/Prop/prop1.png");
        //道具1的位置
        var size = cc.winSize;
        Prop1.x = size.width*0.3;
        Prop1.y = size.height*0.4;
        this.addChild(Prop1);
        this.propOne = Prop1;
        console.log(1);
    },
    //显示道具2
    showProp2:function () {
        var Prop2 = new PropTwo("res/Prop/Prop2.png");
        //道具2的位置
        var size = cc.winSize;
        Prop2.x =size.width*0.4;
        Prop2.y = size.height*0.4;
        this.addChild(Prop2);
        console.log(2);
        //this.useProp();
    },
    //显示道具3
    showProp3:function () {
        var Prop3 = new PropThree("res/Prop/Prop3.png");
        //道具2的位置
        var size = cc.winSize;
        Prop3.x =size.width*0.5;
        Prop3.y = size.height*0.4;
        this.addChild(Prop3);
        this.propThree = Prop3;
        console.log(3);
        //this.useProp();
    },
    //道具栏显示
    showMenu:function () {
        var a=parseInt(cc.sys.localStorage.getItem("currentHavedProp"));
        console.log(a);
        switch (a){
            //无
            case 0:
                break;
            //道具1
            case 1:
                console.log(1);
                this.showProp1();
                //this.useProp1();
                break;
            //道具2
            case 2:
                console.log(2);
                this.showProp2();
                // this.useProp2();
                break;
            //道具3
            case 3:
                console.log(3);
                this.showProp3();
                //this.useProp3();
                break;
            //道具1、2
            case 4:
                console.log(1.2);
                this.showProp1();
                //this.useProp1();
                this.showProp2();
                // this.useProp3();
                break;
            //道具1、3
            case 5:
                console.log(1.3);
                this.showProp1();
                this.showProp3();
                break;
            //道具2、3
            case 6:
                console.log(2.3);
                this.showProp2();
                this.showProp3();
                break;
            //道具1、2、3
            case 7:
                console.log(1.2,3);
                this.showProp1();
                //this.useProp1();
                this.showProp2();
                //this.useProp2();
                this.showProp3();
                //this.useProp3();
                break;
        }
    },
    onExit:function(){
    }
});