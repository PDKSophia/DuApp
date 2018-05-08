const state = {
    CurrentName : '',               // 当前登陆人名字
    CurrentU_ID : '',               // 当前登陆人U_ID
    CurrentImg : '',                // 当前登陆人头像
    CurrentScore : 0,               // 当前登陆人积分
    Code : '',                      // 验证码
    Current_Flag : false,           // 第一次弹窗告知需登陆

    MovieScore : [],                // 电影的评分

    NavTabList : [
        {
            pic : require('../assets/page/time.png'),
            name : '时间'
        },
        {
            pic : require('../assets/page/hot.png'),
            name : '日推'
        },
        {
            pic : require('../assets/page/calendars.png'),
            name : '歌单'
        },
        {
            pic : require('../assets/page/ranking.png'),
            name : '打榜'
        },
    ],
    slides : [
        {
            src : require('../assets/page/1.jpg'),
            name : '薛之谦',
            path : '/singer'
        },
        {
            src : require('../assets/page/2.jpg'),
            name : '周玥',
            path : '/singer'
        },
        {
            src : require('../assets/page/3.jpg'),
            name : '林俊杰',
            path : '/singer'
        },
        {
            src : require('../assets/page/4.jpg'),
            name : '陈粒',
            path : '/singer'
        },
        {
            src : require('../assets/page/5.jpg'),
            name : '徐佳莹',
            path : '/singer'
        }
    ],

    mp3_mid : '',                   // 歌曲播放的mid
    Mp3Url : '',                    // 歌曲播放地址
    IsPlay : false,            
    RemovePicIndex : '',

    isSign : false,                 // 是否已经签到
    isCheesOut : false,             // 是否五子棋挑战次数已完
    chees_count : 10                 // 每日三次挑战机会
}

export default state