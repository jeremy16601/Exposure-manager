import http from '@/config/http'
import {
    baseUrl
} from '../config/env'
/**
 * 登陆
 */
const host = baseUrl + '/api/v1';

export const login = data => http.post(baseUrl + '/loginBack', data);

/**
 * 退出
 */

export const signout = () => http.get('/admin/singout');

/**
 * 获取管理员信息
 */

export const getAdminInfo = () => http.get(host + '/role');

/**
 * api请求量
 */

export const apiCount = date => http.get('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => http.get('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => http.get('/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => http.get('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => http.get('/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => http.get('/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

export const adminList = data => http.get('/admin/all', data);

/**
 * 管理员数量
 */

export const adminCount = () => http.get('/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => http.get('/v1/cities', {
    type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => http.get('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => http.get('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});
/**
 * 获取用户列表
 */

export const getUserList = data => http.get(host + '/user?type=1', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => http.get(host + '/user?type=3', data);

/**
 * 获取分类列表
 */

export const getCatalog = data => http.get(host + '/catalog', data);

/**
 * 获取文章列表
 */

export const getArticleList = data => http.get(host + '/article', data);

/**
 * 获取用户信息
 */

export const getUserInfo = uid => http.get(host + '/user/' + uid);

export const getUserCity = uid => http.get(host + '/user/' + uid);

export const deleteArticle = aid => http.get(host + '/article/' + aid);
/**
 * 
 * @param {*文章详情} aid 
 */
export const getArticleDetail = aid => http.get(host + '/article/' + aid);
/**
 * 文章总数
 */
export const getACount = () => http.get(host + '/article?type=count');
/**
 * 文章列表
 */
export const getArticles = () => http.get(host + '/article?type=1');
/**
 * 查询分类
 */
export const arCategory = () => http.get(host + '/catalog?type=1');

export const addFood = () => http.get(host + '/catalog?type=1');
export const addCategory = () => http.get(host + '/catalog?type=1');
export const getCategory = () => http.get(host + '/catalog?type=1');
export const foodCategory = () => http.get(host + '/catalog?type=1');
export const getOrderCount = () => http.get(host + '/catalog?type=1');