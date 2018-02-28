import http from '@/config/http'
import {
    baseUrl
} from '../config/env'
const host = baseUrl + '/api/v1';

export const login = data => http.post(baseUrl + '/loginBack', data);

export const signout = () => http.get('/admin/singout');

/**
 * 获取管理员信息
 */

export const getAdminInfo = (id) => http.get(host + '/role/' + id);

export const apiCount = date => http.get('/statis/api/' + date + '/count');

export const apiAllCount = () => http.get('/statis/api/count');

export const apiAllRecord = () => http.get('/statis/api/all');

export const userCount = date => http.get(host + '/user?type=reg&dt=' + date);

export const articleCount = date => http.get(host + '/article?type=reg&dt=' + date);

export const adminDayCount = date => http.get(host + '/role?type=2&dt=' + date);

export const adminList = data => http.get(host + '/role?type=3');

export const adminCount = () => http.get(host + '/role?type=1');


export const cityGuess = () => http.get('/v1/cities', {
    type: 'guess'
});


export const addRole = data => http.get('/shopping/addRole', data, 'POST');

export const searchplace = (cityid, value) => http.get('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});
//删除用户
export const delUser = uid => http.delete(host + '/user/'+uid);
export const getUserList = data => http.get(host + '/user?type=1', data);

export const getUserCount = data => http.get(host + '/user?type=3', data);

export const getCatalog = data => http.get(host + '/catalog', data);

/**
 * 获取文章列表
 */

export const getArticleList = data => http.get(host + '/article', data);
/**
 * 获取文章详情
 */

export const getArticleByid = aid => http.get(host + '/article/' + aid);

/**
 * 获取用户信息
 */

export const getUserInfo = uid => http.get(host + '/user/' + uid);

export const getUserCity = uid => http.get(host + '/user/' + uid);
/**
 * 删除文章
 * @param {*} aid 
 */
export const deleteArticle = aid => http.delete(host + '/article/' + aid);
/**
 * 
 * @param {*文章详情} aid 
 */
export const getArticleDetail = aid => http.get(host + '/article/' + aid);
/**
 * 文章总数
 */
export const getACount = (catalog_id) => http.get(host + '/article?type=count&catalog_id=' + catalog_id);
/**
 * 文章列表
 */
export const getArticles = (catalog, offset, limit) => http.get(host + '/article?type=1&offset=' + offset + '&limit=' + limit + '&catalog=' + catalog);
/**
 * 查询分类
 */
export const arCategory = () => http.get(host + '/catalog?type=1');
/**
 * 添加文章
 */
export const addArticle = (data) => http.post(host + '/article', data);
/**
 * 更新文章
 */
export const updateArticle = (aid, data) => http.put(host + '/article/' + aid, data);
export const addCategory = () => http.get(host + '/catalog?type=1');
export const getCategory = () => http.get(host + '/catalog?type=1');
export const foodCategory = () => http.get(host + '/catalog?type=1');
//查询新增文章总数
export const getAritleCount = () => http.get(host + '/article?type=count');
/**
 * 反馈列表
 */
export const getFeedback = (offset, limit) => http.get(host + '/feedback?offset=' + offset + '&limit=' + limit);
//删除反馈
export const delFeedback = fid => http.delete(host + '/feedback/' + fid);

export const btc_getbalance = () => http.get('http://localhost:7002/balance');
export const btc_getOrderList = (coinname) => http.post('http://localhost:7002/getOrderList', coinname);
