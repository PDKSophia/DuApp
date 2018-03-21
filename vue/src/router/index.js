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
      path: '/info',
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
  ]
})
