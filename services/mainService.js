const request = require('request'),
      CryptoJS = require("crypto-js"),
      _ = require("lodash"),
      ACCESS_TOKEN = 'ZtWsDxzfTTkGnnsjp8yC',
      SECRET_KEY = 'V_-es-3JD82YyiNdzot7',
      baseUrl = 'https://developer-api.bringg.com/partner_api';


/**
 * set request credentials and prepare payload
 * @param params
 * @returns {*}
 */
let paramsProcessore = (params=null, page=1) => {
    if(!params) var params = {};
    params.timestamp = Date.now();
    params.access_token = ACCESS_TOKEN;
    params.page = page;
    let query_params = '';
    for (let key in params) {
        let value = params[key];
        if (query_params.length > 0) {
            query_params += '&';
        }
        query_params += key + '=' + encodeURIComponent(value);
    }
    params.signature = CryptoJS.HmacSHA1(query_params, SECRET_KEY).toString();
    return params;
};

/**
 * Convert object to query-params string
 * @param obj
 * @returns {string}
 */
let serialize = function(obj) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};

let paginationReq = async function (){
    let page = 1;
    let res = await getPreviousWeekOrders(page);
    let all = [JSON.parse(res)];
    while(res && JSON.parse(res).length > 0){
        page++;
        res=await getPreviousWeekOrders(page);
        all.push(JSON.parse(res))
    }
    return _.flatten(all)
};

/**
 * [API] Create new customer
 * @param params
 * @returns {Promise<any>}
 */
createCustomer = async (params) => {
    // let params = req.body;
    console.log('Creating customer...');
    return new Promise((res, rej) => {
        paramsProcessore(params);
        let options = {
            url: `${baseUrl}/customers`,
            method: 'POST',
            headers: {'content-type': 'application/json'},
            form: params
        };
        console.log(options);
        request(options, (error, response, body) => error ? rej(error) : res(body))
    })
};

/**
 * [API] Create task for customer
 * @param params
 * @returns {Promise<*>}
 */
createTask = async (params) => {
    if(params && !params.customer_id) {
        return new Error('customer_id')
    }
    console.log('Creating task...');
    return new Promise((res, rej) => {
        paramsProcessore(params);
        let options = {
            url: `${baseUrl}/tasks`,
            method: 'POST',
            headers: {'content-type': 'application/json'},
            form: params
        };
        console.log(options);
        request(options, (error, response, body) => error ? rej(error) : res(body))
    })
};

/**
 * [API] get previous week orders
 * @returns {Promise<any>}
 */
getPreviousWeekOrders = async (page) => {
    return new Promise((res, rej) => {
        let params = paramsProcessore(null, page);
        let options = {
            url: `${baseUrl}/tasks?${serialize(params)}`,
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        };
        console.log(options);
        request(options, (error, response, body) => error ? rej(error) : res(body))
    })
};

exports.createCustomer = createCustomer;
exports.createTask = createTask;
exports.getPreviousWeekOrders = getPreviousWeekOrders;
exports.paginationReq = paginationReq;