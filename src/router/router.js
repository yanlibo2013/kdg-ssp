import App from '../App'

const container = r => require.ensure([], () => r(require('../page/container')), 'container') // 父及容器
const home = r => require.ensure([], () => r(require('../page/home/index')), 'home') //首页
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login') //登录页面



const detail = r => require.ensure([], () => r(require('../page/resouce/detail/index')), 'detail') //资源明细
const config = r => require.ensure([], () => r(require('../page/resouce/config/index')), 'config') //接入配置
const createmedia = r => require.ensure([], () => r(require('../page/resouce/addmedia')), 'createmedia') //创建媒体
const createplatform = r => require.ensure([], () => r(require('../page/resouce/addplatform')), 'createplatform') //创建平台
const adlist = r => require.ensure([], () => r(require('../page/resouce/adlist')), 'adlist') //广告位列表
const createad = r => require.ensure([], () => r(require('../page/resouce/addadvertise')), 'createad') //创建广告位
const demand = r => require.ensure([], () => r(require('../page/flow/demand/index')), 'demand') //需求方管理
const ademander = r => require.ensure([], () => r(require('../page/flow/demand/ademander')), 'ademander') //需求方创建
const policyset = r => require.ensure([], () => r(require('../page/flow/demand/policyset')), 'policyset') //需求方政策配置
const flowset = r => require.ensure([], () => r(require('../page/flow/demand/flowset')), 'flowset') //需求方流量配置
const cheat = r => require.ensure([], () => r(require('../page/flow/cheat/index')), 'cheat') //反作弊管理

const resourse = r => require.ensure([], () => r(require('../page/order/resourse/index')), 'resourse') //资源推荐
const setorder = r => require.ensure([], () => r(require('../page/order/resourse/setorder')), 'setorder') //订单设置
const pd = r => require.ensure([], () => r(require('../page/order/pd/index')), 'pd') //PD订单
const pdashboard = r => require.ensure([], () => r(require('../page/order/pd/pdashboard')), 'pdashboard') //PD订单dashboard
const gd = r => require.ensure([], () => r(require('../page/order/gd/index')), 'gd') //GD订单

const consumption = r => require.ensure([], () => r(require('../page/report/consumption/index')), 'consumption') //竞价消耗报表
const failure = r => require.ensure([], () => r(require('../page/report/failure/index')), 'failure') //GD订单

const advertisers = r => require.ensure([], () => r(require('../page/review/advertisers/index')), 'advertisers') //广告主审核
const creative = r => require.ensure([], () => r(require('../page/review/creative/index')), 'creative') //创意素材审核
const achievements = r => require.ensure([], () => r(require('../page/review/achievements/index')), 'achievements') //审核政绩管理


const flowfinance = r => require.ensure([], () => r(require('../page/finance/flow/index')), 'flow') //财务流水
const recording = r => require.ensure([], () => r(require('../page/finance/recording/index')), 'recording') //财务记录
const permission = r => require.ensure([], () => r(require('../page/system/permission/index')), 'permission') //权限管理
const adaccount = r => require.ensure([], () => r(require('../page/system/permission/adaccount')), 'adaccount') //创建/编辑帐户

const pmp = r => require.ensure([], () => r(require('../page/resouce/pmp/index')), 'pmp') //pmp 配置 列表
const addpmp = r => require.ensure([], () => r(require('../page/resouce/pmp/add')), 'pmp') //pmp 配置 添加





//测试
const drag = r => require.ensure([], () => r(require('../../src/test/index')), 'drag')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/login'
        },
        {
            path: '/drag',
            component: drag
        },
        //容器
        {
            path: '/container',
            component: container,
            children: [
                //首页城市列表页
                {
                    path: '/home',
                    component: home
                },
                // 资源明细
                {
                    path: '/detail',
                    component: detail
                },
                // 接入配置
                {
                    path: '/config',
                    component: config
                },
                  // pmp
                {
                    path: '/pmp',
                    component: pmp
                },
                {
                    path: '/addpmp',
                    component: addpmp
                },
                {
                    path: '/editpmp/:id',
                    component: addpmp
                },
                //创建媒体
                {
                    path: '/createmedia',
                    component: createmedia
                },
                //编辑创建媒体
                {
                    path: '/editmedia/:id',
                    component: createmedia
                },
                //创建平台
                {
                    path: '/createplatform',
                    component: createplatform
                },
                //编辑创建平台
                {
                    path: '/editplatform/:id',
                    component: createplatform
                },
                //广告位列表
                {
                    path: '/adlist/:id?',
                    component: adlist
                },
                //创建和编辑广告位
                {
                    path: '/createad/:mediaId?/:adId?',
                    component: createad
                },
                //需求方列表
                {
                    path: '/demand',
                    component: demand
                },
                //需求方创建
                {
                    path: '/ademander',
                    component: ademander
                },
                {
                    path: '/ademandereidt/:id',
                    component: ademander
                },
                //需求方政策配置
                {
                    path: '/policyset/:id',
                    component: policyset
                },
                //需求方流量配置
                {
                    path: '/flowset/:id',
                    component: flowset
                },
                {
                    path: '/cheat',
                    component: cheat
                },
                //资源推荐
                {
                    path: '/resourse',
                    component: resourse
                },
                //订单设置 
                {
                    path: '/setorder',
                    component: setorder
                },
                // 订单编辑
                {
                    path: '/editsetorder/:id',
                    component: setorder
                },
                //PD订单
                {
                    path: '/pd',
                    component: pd
                },
                //PD订单dashboard
                {
                    path: '/pdashboard/:id',
                    component: pdashboard
                },
                {
                    path: '/gd',
                    component: gd
                },
                //竞价消耗报表
                {
                    path: '/consumption',
                    component: consumption
                },
                //创建帐户
                {
                    path: '/adaccount',
                    component: adaccount
                },
                //编辑帐户
                {
                    path: '/editaccount/:id',
                    component: adaccount
                },
                {
                    path: '/failure',
                    component: failure
                },

                {
                    path: '/advertisers',
                    component: advertisers
                },
                {
                    path: '/creative',
                    component: creative
                },
                {
                    path: '/achievements',
                    component: achievements
                },

                {
                    path: '/flowfinance',
                    component: flowfinance
                },
                {
                    path: '/recording',
                    component: recording
                },
                {
                    path: '/permission',
                    component: permission
                },


            ]
        },
        //首页登录页
        {
            path: '/login',
            component: login
        }


    ]
}]




