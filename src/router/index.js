import Vue from "vue";
import Router from "vue-router";

import Recommend from "components/recommend/recommend"
import Singer from "components/Singer/Singer"
import SingerList from "components/singer-detail/singer-list"
import SingerDetail from "components/singer-detail/singer-detail"
import RecommendList from "components/recommend/Recommend-list"
import Rank from "components/rank/rank"
import TopList from "components/rank/toplist"
import Search from "components/search/search"

Vue.use(Router);

export default

  new Router({
    routes: [{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [{
        path: 'list',
        component: RecommendList
      }]
    },
    {
      path: '/singer',
      component: Singer,
      redirect: '/singer/list',
      children: [{
        path: 'list',
        component: SingerList
      }, {
        path: 'detail',
        component: SingerDetail
      }]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
    ]
  })
