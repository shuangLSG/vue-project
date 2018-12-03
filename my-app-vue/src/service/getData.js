import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取行情
 */
export const hangqing = codelist => fetch('/api/wyb/hangqing', {
	codelist:codelist
},'POST');

/**
 * 获取行情banner
 */
export const getBanner = () => fetch('/api/wyb/bannerquery', {},'POST');

/**
 * 获取涨幅榜
 */
export const getZF = () => fetch('/api/wyb/qhchangf', {
	PageSize: 8
},'POST');
