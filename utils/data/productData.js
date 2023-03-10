import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products/${productId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: Number(data.id),
        title: data.title,
        cost: data.cost,
        description: data.description,
        quantity: data.quantity,
        image: data.image,
        productType: data.product_type,
        seller: data.seller,
      });
    }).catch((error) => reject(error));
});

const updateProduct = (product, productId) => new Promise((resolve, reject) => {
  const productObj = {
    title: product.title,
    cost: product.cost,
    description: product.description,
    quantity: product.quantity,
    image: product.image,
    product_type: Number(product.productType.id),
    seller: product.seller.id,
  };
  fetch(`${dbUrl}/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(productObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createProduct = (product, user) => new Promise((resolve, reject) => {
  const productObj = {
    title: product.title,
    cost: product.cost,
    description: product.description,
    quantity: product.quantity,
    image: product.image,
    product_type: Number(product.productType),
    seller: user.id,
  };
  fetch(`${dbUrl}/products`, {
    method: 'POST',
    body: JSON.stringify(productObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products/${productId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const getProductsBySeller = (customerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products?seller=${customerId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export {
  getProducts, getSingleProduct, updateProduct, createProduct, deleteProduct, getProductsBySeller,
};
