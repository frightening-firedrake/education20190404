import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login.vue'
import Layout from '@/components/common/layout/Layout.vue'
//首页
import Home from '@/components/home/Home.vue'



//权限部分基本公用
import RoleList from '@/components/authorityManagement/role/RoleList.vue'
import RoleEdit from '@/components/authorityManagement/role/RoleEdit.vue'
import RoleAdd from '@/components/authorityManagement/role/RoleAdd.vue'
import RoleAut from '@/components/authorityManagement/role/RoleAut.vue'
import UserList from '@/components/authorityManagement/user/UserList.vue'
import UserEdit from '@/components/authorityManagement/user/UserEdit.vue'
import UserAdd from '@/components/authorityManagement/user/UserAdd.vue'
import UserAut from '@/components/authorityManagement/user/UserAut.vue'
import ResourcesEdit from '@/components/authorityManagement/resources/ResourcesEdit.vue'
import ResourcesAdd from '@/components/authorityManagement/resources/ResourcesAdd.vue'
import ResourcesList from '@/components/authorityManagement/resources/ResourcesList.vue'

import error403 from '@/components/error/error403.vue'



Vue.use(Router)

const routes = [{
        path: '/',
//      redirect: '/login',
        redirect: '/index',//暂时屏蔽掉了登录与首页直接列表页开始
        name: '',
    },
    {
        path: '/login',
        name: '登陆',
        component: Login,
    },
    {
        path: '/index',
        component: Layout,
        redirect: '/index/home',
        children: [{
                path: "home",
                name: '首页',
                component: Home,
            },
            {
                path: "error403",
                name: '没有权限',
                component: error403,
            },
            

//
            //        权限管理AuthorityManagement
            {
                path: "AuthorityManagement",
                name: '权限管理',
                component: RoleList,
                redirect: 'AuthorityManagement/RoleList',
            },
            {
                path: "AuthorityManagement/RoleList",
                name: "权限管理/角色管理",
                component: RoleList,
                meta: { needAuth: '角色管理' },
            },
            {
                path: "AuthorityManagement/RoleList/RoleEdit",
                name: "权限管理/角色管理/编辑角色",
                component: RoleEdit,
                meta: { needAuth: '角色管理' },
            },
            {
                path: "AuthorityManagement/RoleList/RoleAdd",
                name: "权限管理/角色管理/新建角色",
                component: RoleAdd,
                meta: { needAuth: '角色管理' },
            },
            {
                path: "AuthorityManagement/RoleList/RoleAut",
                name: "权限管理/角色管理/角色授权",
                component: RoleAut,
                meta: { needAuth: '角色管理' },
            },
            {
                path: "AuthorityManagement/UserList",
                name: "权限管理/用户管理",
                component: UserList,
                meta: { needAuth: '用户管理' },
            },
            {
                path: "AuthorityManagement/UserList/UserEdit",
                name: "权限管理/用户管理/编辑用户",
                component: UserEdit,
                meta: { needAuth: '用户管理' },
            },
            {
                path: "AuthorityManagement/UserList/UserAdd",
                name: "权限管理/用户管理/新建用户",
                component: UserAdd,
                meta: { needAuth: '用户管理' },
            },
            {
                path: "AuthorityManagement/UserList/UserAut",
                name: "权限管理/用户管理/用户授权",
                component: UserAut,
                meta: { needAuth: '用户管理' },
            },
            {
                path: "AuthorityManagement/ResourcesList",
                name: "权限管理/资源管理",
                component: ResourcesList,
                meta: { needAuth: '资源管理' },
            },
            {
                path: "AuthorityManagement/ResourcesList/ResourcesEdit",
                name: "权限管理/资源管理/编辑资源",
                component: ResourcesEdit,
                meta: { needAuth: '资源管理' },
            },
            {
                path: "AuthorityManagement/ResourcesList/ResourcesAdd",
                name: "权限管理/资源管理/新建资源",
                component: ResourcesAdd,
                meta: { needAuth: '资源管理' },
            },

        ]
    },

];

const router = new Router({ routes })
    //通过全局导航守卫检查权限？
router.beforeEach((to, from, next) => {
    var userAuth = router.app.$store.getters.userAuth


    //	验证登录状态
    if (!userAuth && to.path !== '/login') {
        console.log('没登陆')
        next({
//          path: '/login',//离线时屏蔽
            //query: { redirect: to.fullPath }// 考虑登录成功之后可以根据query中的内容跳转回原来的路由(页面)
        })
    } else if (userAuth && to.path == '/index') {
        //		验证用户权限制定不同首页地址重定向
        //		userAuth=userAuth.split(',');
        //	  	if (userAuth.includes('新建扦样登记表')) {
        //
        //	    	next({path: '/index/grainDepot'})	  	
        //	  	}else{	  		
        //	  		next({path: '/index/sampling'})	  	
        //	  	}
        next()
    } else if (to.matched.some(record => record.meta.needAuth)) {
        //		验证用户权限
          		console.log('needAuth')
        userAuth = userAuth.split(',');
        if (!userAuth.includes(to.meta.needAuth)) {
            console.log('没权限')
            next({
                path: '/index/error403'
            })
        } else {
            next()
        }
    } else {
        //		console.log('最终')
        next()
    }
})
export default router;