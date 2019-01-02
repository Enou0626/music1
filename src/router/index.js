import Vue from "vue";
import Router from "vue-router";

import Recommend from "components/recommend/recommend"
import Singer from "components/Singer/Singer"
import SingerList from "components/singer-detail/singer-list"
import SingerDetail from "components/singer-detail/singer-detail"
import RecommendList from "components/recommend/Recommend-list"

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
      component: Singer,
      path: '/singer',
      redirect: '/singer/list',
      children: [{
        path: '/singer/list',
        component: SingerList
      }, {
        path: '/singer/:id',
        component: SingerDetail
      }]
    }
    ]
  })
