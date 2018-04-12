const service = require('../services/mainService'),
    moment = require('moment');

    module.exports = (app) => {

        /**
         * Get previous week orders
         * Create order for customer
         */
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
            .post(async (req, res) => {
                // name, cell number, address and order details.
                let response = req.body,
                    orderObject = {
                        name: response.name,
                        cellNumber: response.cellNumber,
                        address: response.address,
                        orderDetails: response.orderDetails
                    };
                // @TODO: as i understand this task is only to revel the end point and not to use Bringg API
                res.status(200).json('Order received');
                });

        /**
         * Create new customer and task
         */
        app.route('/ct')
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
                    let task = await service.createTask(response);
                    res.json({
                        customer:customer,
                        task:task
                    });
                } catch (err) {
                    res.status(404).json(err);
                }
            })
};

