


import http from '../config/axios'

export const selectionquery = () => http('/api/api/jselectionquery', {}, 'POST');


export const commodityquery = (selectid = 0) => http('/api/api/jcommodityquery', {
    selectid
}, 'POST');