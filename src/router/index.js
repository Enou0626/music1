import Vue from "vue";
import Router from "vue-router";

import Recommend from "components/recommend/recommend"
import Singer from "components/Singer/Singer"
import SingerDetail from "components/Singer-detail/Singer-detail"

Vue.use(Router);

export default

  new Router({
    routes: [{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    }
    ]
  })
