const service = require('../services/mainService'),
    moment = require('moment');

    module.exports = (app) => {
    app.route('/orders')
        .get(async (req, res) => {
            try {
                const orders = await service.getPreviousWeekOrders();
                let mapped = JSON.parse(orders).map(item => {
                    return {
                        id: item.id,
                        scheduled_at: item.scheduled_at,
                        phone: item.phone
                    }
                }).filter(item => {
                    return moment().week()-1 === moment(item.scheduled_at).week() && moment().year() === moment(item.scheduled_at).year();
                });
                console.log(mapped);
                console.log(mapped.length);
                res.json(mapped);
            } catch (err) {
                res.status(404).json(err);
            }
        })
        .post(async (req, res) =>{
            try {
                let response = req.body,
                    customer = await service.createCustomer(response);
                try {
                    customer = JSON.parse(customer);
                } catch (e) {
                    res.status(404).send(e);
                }
                response.customer_id = customer.customer.id;
                await service.createTask(response);
                res.json('DONE!!!');
            } catch (err) {
                res.status(404).json(err);
            }
        })
};

