const request = require('request'),
      CryptoJS = require("crypto-js"),
      ACCESS_TOKEN = 'ZtWsDxzfTTkGnnsjp8yC',
      SECRET_KEY = 'V_-es-3JD82YyiNdzot7',
      baseUrl = 'https://developer-api.bringg.com/partner_api';


let paramsProcessore = (params) => {
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

let apiRequest = (url, method, params=null) => {
    params.timestamp = Date.now();
    params.access_token = ACCESS_TOKEN;
    let options = {
        url: url,
        method: method,
        headers: {
            'content-type': 'application/json'
        }
    };
    if(params) options.form = params;
    return request(options, (error, response, body) => {
        if(error) {
            console.error(error);
            return error
        }
        console.log('BODYYY');
        console.log(body);
        return body;
    })
};

module.exports.createUser = async (params) => {
    console.log(`Creating customer`);
    paramsProcessore(params);
    return apiRequest(`${baseUrl}/customers`, 'POST', params);
};

module.exports.createTask = async (params) => {
    if(params && !params.customer_id) {
        return new Error('customer_id must be supplied');
    }
    console.log(`Creating task`);
    paramsProcessore(params);
    return apiRequest(`${baseUrl}/tasks`, 'POST', params);
};