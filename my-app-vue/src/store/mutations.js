import {
	RECORD_USERINFO,
	GET_USERINFO,
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

export default {
	// 记录用户信息
	[RECORD_USERINFO](state,info){
		state.userInfo=info;
		state.login=true;
	},
	// 获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (!state.login) {
			return
		}
		if(info.s==200){
			state.userInfo = {...info}
		}else{
			state.userInfo =null;
		}
	},

	

}