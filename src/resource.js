var res = {
    //开始界面
    HelloWorld_png : "res/HelloWorld.png",
    Bg_png:"res/StartScene/bg_6144_1.png",
    Bg2_jpg:"res/StartScene/bg2.jpg",
    Play1_png:"res/StartScene/sjx1.png",
    Play2_png:"res/StartScene/sjx2.png",
    Pop_png:"res/StartScene/pop.png",
    MusicOnNormal:"res/StartScene/music-on-normal.png",
    MusicOffNormal:"res/StartScene/music-off-normal.png",
    MusicOnSelected:"res/StartScene/music-on-selected.png",
    MusicOffSelected:"res/StartScene/music-off-selected.png",
    Bgm_mp3:"res/music/bgm.mp3",
    Button1_wav:"res/music/button1.wav",

    //失败界面
    SelectBack_png:"res/FailedScene/selectBack.png",
    SelectReturn_png:"res/FailedScene/selectReturn.png",
    Star_png:"res/FailedScene/star.png",
    Star_Failed_png:"res/FailedScene/star_failed.png",
    SelectNext_png:"res/FailedScene/selectNext.png",

    //成功界面
    SelectNext_png:"res/SuccessScene/selectNext.png",

    //test
    Stand_right_png:"res/dragon_stand_right.png",
    Run_Right_1:"res/dragon_run1.png",
    Run_Right_2:"res/dragon_run2.png",
    Stand_left_png:"res/dragon_stand_left",
    Run_Left_1:"res/dragon_run3.png",
    Run_Left_2:"res/dragon_run4.png",
    Cactus_png:"res/cactus.png",

    Rocket_Fly1:"res/Rocket_Fly1.png",
    Rocket_Fly2:"res/Rocket_Fly2.png",

    //选关界面
    Block_png:"res/SelectScene/Select_Block.png",
    Lock_png:"res/SelectScene/Lock.png",
    Num_1_png:"res/SelectScene/Num_1.png",
    Num_2_png:"res/SelectScene/Num_2.png",
    Num_3_png:"res/SelectScene/Num_3.png",
    Num_4_png:"res/SelectScene/Num_4.png",
    Num_5_png:"res/SelectScene/Num_5.png",
    Num_6_png:"res/SelectScene/Num_6.png",
    Num_7_png:"res/SelectScene/Num_7.png",
    Num_8_png:"res/SelectScene/Num_8.png",
    //载入界面
    bg_jpg:"res/Loading/background.jpg",
    //材质
    diamond_png:"res/Block/diamond.png",
    passLevel_png:"res/Block/passLevel.png",
    yellow_floor_png:"res/Block/yellow_floor.png",
    green_floor_png:"res/Block/green_floor.png",
    red_floor_png:"res/Block/red_floor.png",
    nail_png:"res/Block/nail.png",
    nails_png:"res/Block/nails.png",
    nails_re_png:"res/Block/nails_reverse.png",

    //敌人1
    EnemyRun1_png:"res/EnemyRun/run1.png",
    EnemyRun2_png:"res/EnemyRun/run2.png",
    EnemyRun3_png:"res/EnemyRun/run3.png",
    EnemyRun4_png:"res/EnemyRun/run4.png",
    //敌人2
    Run1_png:"res/Run/run1.png",
    Run2_png:"res/Run/run2.png",
    Run3_png:"res/Run/run3.png",
    Run4_png:"res/Run/run4.png",
    Run5_png:"res/Run/run5.png",
    Run6_png:"res/Run/run6.png",
    //游戏主界面
    mainBg1_png:"res/MainScene/mainBg1.png",
    mainBg2_png:"res/MainScene/mainBg2.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
