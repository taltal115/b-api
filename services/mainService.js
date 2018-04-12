const request = require('request'),
      CryptoJS = require("crypto-js"),
      ACCESS_TOKEN = 'ZtWsDxzfTTkGnnsjp8yC',
      SECRET_KEY = 'V_-es-3JD82YyiNdzot7',
      baseUrl = 'https://developer-api.bringg.com/partner_api';


/**
 * set request credentials and prepare payload
 * @param params
 * @returns {*}
 */
let paramsProcessore = (params=null) => {
    if(!params) var params = {};
    params.timestamp = Date.now();
    params.access_token = ACCESS_TOKEN;
    params.page = 1;
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
    let all = [res];
    while(res && JSON.parse(res).length > 0){
        page++;
        res=await getPreviousWeekOrders(page);
        all.push(res)
    }
    return all
};

createCustomer = async (params) => {
    // let params = req.body;
    return new Promise((res, rej) => {
        paramsProcessore(params);
        let options = {
            url: `${baseUrl}/customers`,
            method: 'POST',
            headers: {'content-type': 'application/json'},
            form: params
        };
        request(options, (error, response, body) => error ? rej(error) : res(body))
    })
};

createTask = async (params) => {
    if(params && !params.customer_id) {
        return new Error('customer_id')
    }
    return new Promise((res, rej) => {
        paramsProcessore(params);
        let options = {
            url: `${baseUrl}/tasks`,
            method: 'POST',
            headers: {'content-type': 'application/json'},
            form: params
        };
        request(options, (error, response, body) => error ? rej(error) : res(body))
    })
};

getPreviousWeekOrders = async () => {
    return new Promise((res, rej) => {
        let params = paramsProcessore();
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