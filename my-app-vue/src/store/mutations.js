import {
	RECORD_USERINFO,
	GET_USERINFO,
	RECORD_CODE,
	SAVE_COUPON,
	REMOVE_COUPON
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
	// 商品code
	[RECORD_CODE](state, code) {
		state.code =code;
	},

	//保存选中优惠券信息
	[SAVE_COUPON](state,coupon){
		state.coupon=coupon;
	},
	// 删除优惠券信息
	[REMOVE_COUPON](state){
		state.coupon=null;
	}
}
