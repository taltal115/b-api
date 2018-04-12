const service = require('../services/mainService');

module.exports = (app) => {
    app.route('/orders')
        .get((req, res) => {
            res.send('Get a random book')
        })
        .post(async (req, res) =>{
            try {
                const customer = await service.createUser(req.body);
                // const task = await service.createTask(req.body);
                console.log(customer);
                console.log('DONE!!!');
                res.send('DONE!!!');
            } catch (err) {
                res.status(404).send(err);
            }
        })
};

