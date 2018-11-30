import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取行情
 */
export const hangqing = (codelist) => fetch('/wyb/hangqing', {
	codelist
},'POST');

/**
 * 获取行情banner
 */
export const getBanner = () => fetch('/wyb/bannerquery', {},'POST');