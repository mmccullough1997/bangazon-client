import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const createOrder = (orderObj, user) => new Promise((resolve, reject) => {
  const newOrder = {
    cost: orderObj.cost,
    payment_type: orderObj.paymentType,
    customer: user.id,
    date_placed: new Date().toISOString().split('T')[0],
  };
  fetch(`${dbUrl}/orders`, {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getOrdersByCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders?customer=${customerId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export { createOrder, getOrdersByCustomer };
