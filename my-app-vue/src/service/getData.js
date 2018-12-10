import fetch from '../config/fetch'
import {
  getStore
} from '../config/mUtils'

/**
 * 获取行情
 */
export const hangqing = codelist => fetch('/api/wyb/hangqing', {
  codelist: codelist
}, 'POST');

/**
 * 获取行情banner
 */
export const getBanner = () => fetch('/api/wyb/bannerquery', {}, 'POST');

/**
 * 获取涨幅榜
 */
export const getZF = (size) => fetch('/api/wyb/qhchangf', {
  PageSize: size
}, 'POST');
/**
 * 获取产品列表
 */
export const getGoodsList = () => fetch('/api/wyb/getgoodslist', {}, 'POST');
/**
 * 获取优惠券
 */
export const getCouponList = () => fetch('/api/wyb/getcouponlist', {
  tradesign: 0,
  status: 0
}, 'POST');
/**
 * 建仓
 */
export const createTrade = (id,stock,type,toprate,lowrate,flag,couponids) => fetch('/api/wyb/createtrade', {
  goodsid: id,
  stock: stock,
  tradetype: type,
  toprate: toprate,
  lowrate: lowrate,
  usecouponflag:flag,
  couponids:couponids
}, 'POST');
/**
 * 获取持仓列表
 */
export const getTradeList = () => fetch('/api/wyb/tradelist', {}, 'POST');

export const login = (mobile, password) => fetch('/api/wyb/dologin', {
  mobile,
  password
}, 'POST');
