import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/market/tradehistory',
                    component: resolve => require(['../components/page/Market.vue'], resolve)
                },
                {
                    path: '/market/depth',
                    component: resolve => require(['../components/page/MarketTrades.vue'], resolve)
                },
                {
                    path: '/trade',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/Users.vue'], resolve)
                },
                {
                  path: '/user/userId=:userId',
                  component: resolve => require(['../components/page/UserDetail.vue'], resolve)
                },
                {
                  path: '/user/userId=:userId/accountId=:accountId',
                  component: resolve => require(['../components/page/AccountTradeDetail.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
