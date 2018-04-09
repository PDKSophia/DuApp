import Vue from 'vue'
import Router from 'vue-router'

// import All Page
import DuDuHomePage from '@/components/pages/home/home'                         // 引入主页
import DuDuMTPage from '@/components/pages/movie/movie_book'                    // 引入书影音页
import DuDuFoundPage from '@/components/pages/found/found'                      // 引入发现页
import DuDuPersonnalPage from '@/components/pages/personnal/people'             // 引入个人页
import DuDuIndexCirclePage from '@/components/pages/cricle/index'               // 引入圈子页
import DuDuCirclePage from '@/components/pages/cricle/home'                     // 引入圈子页

import MorePage from '@/components/pages/movie/product/more'                    // 引入更多页
import DetailPage from '@/components/pages/movie/product/detail_page'           // 引入电影or电视剧详情页
import SendCircle from '@/components/pages/cricle/send'                         // 引入朋友圈发送页

// import User calendar sign
import CalendarSignPage from '@/components/pages/personnal/calendar/sign'       // 引入签到页
import GamesRouterPage from '@/components/pages/personnal/game/routers'         // 游戏路由
import GameListPage from '@/components/pages/personnal/game/list'               // 游戏列表
import GoBangPage from '@/components/pages/personnal/game/gobang/gobang'        // 引入五子棋
import AnswerPage from '@/components/pages/personnal/game/answer/answer'        // 引入脑筋急转弯


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DuDuHomePage',
      component: DuDuHomePage
    },
    // 书影音
    {
      path: '/bookmusic',
      name: 'DuDuMTPage',
      component: DuDuMTPage
    },
    // 发现
    {
      path: '/display',
      name: 'DuDuFoundPage',
      component: DuDuFoundPage
    },
    // 圈子
    {
      path: '/circle',
      name: 'DuDuIndexCirclePage',
      component: DuDuIndexCirclePage,
      redirect : '/circle/list',
      children : [
        {
          path : 'list',
          name : 'DuDuCirclePage',
          component : DuDuCirclePage
        },
        {
          path : 'send',
          name : 'SendCircle',
          component : SendCircle
        }
      ]
    },
    // 我的
    {
      path: '/user/info',
      name: 'DuDuPersonnalPage',
      component: DuDuPersonnalPage
    },
    // 书影音类型
    {
      path: '/bookmusic/:type',
      name: 'MorePage',
      component: MorePage
    },
    // 书影音具体电影或电视剧
    {
      path: '/bookmusic/product/:id',
      name: 'DetailMovieOrTv',
      component: DetailPage
    },
    // 签到打卡
    {
      path: '/user/calendar/sign',
      name: 'calendar',
      component : CalendarSignPage
    },
    // 游戏
    {
      path: '/user/game',
      name: 'gamerouters',
      component : GamesRouterPage,
      redirect : '/user/game/list',
      children : [
        {
          path : 'list',
          name : 'gamelist',
          component : GameListPage
        },
        {
          path : 'gobang',
          name : 'gobang',
          component : GoBangPage
        },
        {
          path : 'answer',
          name : 'answer',
          component : AnswerPage
        }
      ]
    }
  ]
})