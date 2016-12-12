var PropClass = cc.Sprite.extend({
    ctor:function(fileName, rect, rotated){
        this._super(fileName, rect, rotated);
        //初始化道具框
        //搭建枚举函数
        this.createEnum();
        cc.sys.localStorage.setItem("currentHavedProp",prop.s_0_0_0);
        //根据本地存储道具类，显示道具
        this.showProp();
        return true;
    },
    onExit:function(){

    },
    createEnum:function()
    {
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
    },
    showProp:function()
    {
        var a=parseInt(cc.sys.localStorage.getItem("currentHavedProp"));
        switch (a)
        {
            case 0:
                cc.log(0);
                break;
            case 1:
                cc.log(1);
                break;
            case 2:
                cc.log(2);
                break;
            case 3:
                cc.log(3);
                break;
            case 4:
                cc.log(4);
                break;
            case 5:
                cc.log(5);
                break;
            case 6:
                cc.log(6);
                break;
            case 7:
                cc.log(7);
                break;

        }
    }
});