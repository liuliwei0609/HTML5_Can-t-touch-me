
var MainLayer = cc.Layer.extend({
    sprite:null,
    hills:[],
    s_tiles:[],
    ctor:function () {

        this._super();

        var size = cc.winSize;

        //道具栏
        // var propMenuLabel = new cc.LabelTTF("道具栏","",50);
        // propMenuLabel.x = size.width*0.2;
        // propMenuLabel.y = size.height*0.4;
        // this.addChild(propMenuLabel,1);
        // propMenuLabel.setFontFillColor(cc.color.RED);
        // propMenuLabel.enableStroke(cc.color.YELLOW,5);
        // propMenuLabel.enableShadow(cc.color.GREEN,cc.p(5,5),5);

        //道具栏
        // var Prop = new Props();
        // // Prop.x= 300;
        // // Prop.y= 300;
        // this.addChild(Prop,1);

        //瓦片地图测试
        //var tileMap = new TileMap();
        //this.addChild(tileMap,4);
        //碰撞测试
        var tileMap = new cc.TMXTiledMap(res.TMX_spritesheet_complete_tmx);
        this.addChild(tileMap,4);
        var mapSize=tileMap.getMapSize();
        var tileSize=tileMap.getTileSize();
        var bgLayer= tileMap.getLayer("BGLayer");
        var tileAt = bgLayer.getTileAt(cc.p(10,0));
        // tileAt.setColor(cc.color.BLUE);
        var tileGIDAt = bgLayer.getTileGIDAt(cc.p(4,0));
        var pixPosition = bgLayer.getPositionAt(cc.p(1,1));

        var objectGroup= tileMap.getObjectGroup("object");
        var player= objectGroup.getObject("player");
        var pp = new cc.Sprite(res.button_png);
        pp.setAnchorPoint(cc.p(0,1));
        pp.x=player.x;
        pp.y=player.y+tileSize.width;
        this.addChild(pp,4);
        function move(movePP) {
            var newPosition= cc.pAdd(pp.getPosition(),movePP);
            var tileX = Math.floor(newPosition.x/64);
            var tileY = Math.floor((size.height - newPosition.y)/64);
            var tileGID = bgLayer.getTileGIDAt(cc.p(tileX,tileY));
            var properties = tileMap.getPropertiesForGID(tileGID);
            /*if(properties == null){
                sp.setPosition(newPosition);
                return true;
            }else if (properties.type == "block"){
                return true;
            }else if (properties.type == "eat"){
                sp.setPosition(newPosition);
                bgLayer.getTileAt(cc.p(tileX,tileY)).setVisible(false);
            }else{
                sp.setPosition(newPosition);
            }*/

        }
        var listener = cc.EventListener.create({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(key,event){
                switch(key){
                    case cc.KEY.up:
                        move(cc.p(0,32));
                        break;
                    case cc.KEY.down:
                        move(cc.p(0,-32));
                        break;
                    case cc.KEY.left:
                        move(cc.p(-32,0));
                        break;
                    case cc.KEY.right:
                        move(cc.p(32,0));
                        break;
                    default:
                }
            }
        });
        cc.eventManager.addListener(listener,this);

        //背景
        var bg = new cc.Sprite(res.bg_png);
        bg.x=size.width/2;
        bg.y=size.height/2;
        //bg.setAnchorPoint(0,0);
        this.addChild(bg,1);

        var hills = new cc.Sprite(res.hills_png);
        hills.x=cc.winSize.width/2;
        hills.y=cc.winSize.height/2;
        this.addChild(hills,2);
        this.hills[0]=hills;

        var hills2 = new cc.Sprite(res.hills_png);
        hills.x=cc.winSize.width/2;
        hills.y=cc.winSize.height/2+hills.getBoundingBox().width;
        this.addChild(hills2,2);
        this.hills[1]=hills2;

        var s_tiles = new cc.Sprite(res.s_tiles_png);
        s_tiles.x=cc.winSize.width/2;
        s_tiles.y=cc.winSize.height/2;
        this.addChild(s_tiles,3);
        this.s_tiles[0]=s_tiles;

        var s_tiles2 = new cc.Sprite(res.s_tiles_png);
        s_tiles2.x=cc.winSize.width/2+s_tiles.getBoundingBox().width;
        s_tiles2.y=cc.winSize.height/2;
        this.addChild(s_tiles2,3);
        this.s_tiles[1]=s_tiles2;

        this.schedule(this.hillsCallBack,0.01);
        this.schedule(this.stCallBack,0.01);

        //材质
        //var tiles = new Tiles();
        //this.addChild(tiles);

        // var a = new cc.Sprite(res.Player_png);
        // a.x = size.width*0.5;
        // a.y = size.height*0.5;
        // a.runAction(cc.flipX(true));
        // this.addChild(a);
        //var run_Animation=new cc.Animation();
        // for(var i=1;i<=4;i++)
        // {
        //     var frameName = res["Run"+i+"_png"];
        //     run_Animation.addSpriteFrameWithFile(frameName);
        // }
        // run_Animation.setDelayPerUnit(1/10);
        // run_Animation.setRestoreOriginalFrame(true);//回到初始帧
        // this.runAnimate = cc.animate(run_Animation);
        // a.runAction(this.runAnimate.repeatForever());
        //var player = new Player();
        //player.x = size.width*0.3;
       // player.y = size.height*0.3;
        //this.addChild(player);



        //返回主页面 重试按钮
        /*var selectLeftItem = new cc.MenuItemImage(res.SelectReturn_png,res.SelectReturn_png,function () {
            cc.director.runScene(new StartScene());
        },this);
        var selectAgainItem = new cc.MenuItemImage(res.Aagin_gif,res.Aagin_gif,function () {
            cc.director.runScene(new MainScene());
        },this);
        var menu= new cc.Menu(selectLeftItem,selectAgainItem);
        menu.x=size.width*0.5;
        menu.y=size.height*0.2;
        this.addChild(menu);
        menu.alignItemsHorizontally();
        menu.alignItemsHorizontallyWithPadding(size.width*0.5);*/
        return true;
    },
    hillsCallBack:function (dt) {
        for(var i in this.hills){
            if(this.hills[i].x<-640){
                this.hills[i].x+=200;
            }
            this.hills[i].x -= 2;
        }
    },
    stCallBack:function (dt) {
        for(var i in this.s_tiles){
            if(this.s_tiles[i].x<-640){
                this.s_tiles[i].x+=200;
            }
            this.s_tiles[i].x -= 3;
        }
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});
/**
 * Created by Administrator on 11/22 0022.
 */
