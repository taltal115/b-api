const request = require('request');
var CryptoJS = require("crypto-js");

module.exports.createUser = async (params) => {
    // let params = req.body;
    params.timestamp = Date.now();
    params.access_token = 'ZtWsDxzfTTkGnnsjp8yC';

    var query_params = '';
    for (var key in params) {
        var value = params[key];
        if (query_params.length > 0) {
            query_params += '&';
        }
        query_params += key + '=' + encodeURIComponent(value);
    }
    params.signature = CryptoJS.HmacSHA1(query_params, "V_-es-3JD82YyiNdzot7").toString();
    let options = {
        url: 'https://developer-api.bringg.com/partner_api/customers',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        form: (params)
    };
    request(options, (error, response, body) => {
        if(error) {
            console.log(error);
            return error
            // res.status(404).send(error);
        }
        console.log(body);
        return body;
        // res.send(body);
    })
}

module.exports.createTask = async (params) => {

    if(params && !params.cust)

    // let params = req.body;
    params.timestamp = Date.now();
    params.access_token = 'ZtWsDxzfTTkGnnsjp8yC';

    var query_params = '';
    for (var key in params) {
        var value = params[key];
        if (query_params.length > 0) {
            query_params += '&';
        }
        query_params += key + '=' + encodeURIComponent(value);
    }
    params.signature = CryptoJS.HmacSHA1(query_params, "V_-es-3JD82YyiNdzot7").toString();
    let options = {
        url: 'https://developer-api.bringg.com/partner_api/tasks',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        form: (params)
    };
    request(options, (error, response, body) => {
        if(error) {
            console.log(error);
            return error
            // res.status(404).send(error);
        }
        console.log(body);
        return body;
        // res.send(body);
    })
};