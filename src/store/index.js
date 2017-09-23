import Vue from 'vue'
import Vuex from 'vuex'
import {
    getAdminInfo
} from '@/api/getData'

Vue.use(Vuex)

const state = {
    adminInfo: {
        avatar: 'http://res-qiniu.12xue.com/bao.png',
    },
}

const mutations = {
    saveAdminInfo(state, data) {
        console.log('mutations data==' + JSON.stringify(data));
        state.adminInfo = data;
    }
}

const actions = {
    async getAdminData({
        commit
    }) {
        // try {
            console.log('getAdminData=='+JSON.stringify(state.adminInfo))
        //     const res = await getAdminInfo(state.adminInfo.id);
        //     if (res) {
        //         commit('saveAdminInfo', res.data[0]);
        //     } else {
        //         throw new Error(res)
        //     }
        // } catch (err) {
            // console.log('您尚未登陆或者session失效' + err);
        // }
    },
    async saveAdminData({
        commit
    }, data) {
        commit('saveAdminInfo', data)
    },
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})
