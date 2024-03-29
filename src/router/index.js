import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addRole = r => require.ensure([], () => r(require('@/page/addRole')), 'addRole');
const addArticle = r => require.ensure([], () => r(require('@/page/addArticle')), 'addArticle');
const updateArticle = r => require.ensure([], () => r(require('@/page/updateArticle')), 'updateArticle');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const articleList = r => require.ensure([], () => r(require('@/page/articleList')), 'articleList');
const catalogList = r => require.ensure([], () => r(require('@/page/catalogList')), 'catalogList');
const feedbackList = r => require.ensure([], () => r(require('@/page/feedbackList')), 'feedbackList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addRole',
			component: addRole,
			meta: ['添加数据', '添加商铺'],
		},{
			path: '/addArticle',
			component: addArticle,
			meta: ['添加数据', '添加文章'],
		},{
			path: '/updateArticle',
			component: updateArticle,
			meta: ['更新数据', '更新文章'],
		},{
			path: '/userList',
			component: userList,
			meta: ['数据管理', '用户列表'],
		},{
			path: '/articleList',
			component: articleList,
			meta: ['数据管理', '文章列表'],
		},{
			path: '/catalogList',
			component: catalogList,
			meta: ['数据管理', '分类列表'],
		},{
			path: '/feedbackList',
			component: feedbackList,
			meta: ['数据管理', '订单列表'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
