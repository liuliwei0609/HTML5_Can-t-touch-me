var res = {
    //开始界面
    HelloWorld_png : "res/HelloWorld.png",
    Bg_jpg:"res/StartScene/bg.jpg",
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
    Stand_png:"res/dragon_stand.png",
    Run1_png:"res/dragon_run1.png",
    Run2_png:"res/dragon_run2.png",
    Stand_left_png:"res/dragon_stand_left",
    Run3_png:"res/dragon_run3.png",
    Run4_png:"res/dragon_run4.png",
    Cactus_png:"res/cactus.png",

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
    bg_jpg:"res/Loading/background.jpg"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
