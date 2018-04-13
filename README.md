# b-api

## Installation

    1. git clone this repo
    2. cd to dir
    3. npm install
    4. npm start

## Available API requests

1. Part 1 - Create order per customer

    var options = {
      method: 'POST',
      url: 'http://{host}:3000/orders',
      headers:  {'content-type': 'application/json' },
      body:
       { orders: 'fdasdg fsdgfsd gfsd gfsd gfsd',
         name: 'taltal',
         address: 'tamar ben shemen',
         phone: '0547392227',
         email: 'tal@tal.com',
         customer_id: 7245851 }
       };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });

2. Part 2 - Create customer and task

    var options = {
      method: 'POST',
      url: 'http://{host}:3000/ct',
      headers:  {'content-type': 'application/json' },
      body:
       { orders: 'fdasdg fsdgfsd gfsd gfsd gfsd',
         name: 'taltal',
         address: 'tamar ben shemen',
         phone: '0547392227',
         email: 'tal@tal.com',
         customer_id: 7245851 }
       };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });

3. Part 3 - Get customer previous week orders