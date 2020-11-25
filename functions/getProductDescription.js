/**
 * @fileoverview receives a product_id as param in url
 * @returns json containing product description. * 
 */
const axios = require('axios').default;

const transform = inputObject => {
    const outputObject = {
        author: {
            name: "Diego M.",
            lastname: "Maldini Freyre"
        },
        item: {
            id: inputObject.id,
            title: inputObject.title,
            price: {
                currency: inputObject.currency_id,
                amount: Math.floor(inputObject.price),
                decimals: Math.floor((inputObject.price - Math.floor(inputObject.price)) * 100)
            },
            picture: inputObject.thumbnail,
            condition: inputObject.condition,
            free_shipping: inputObject.shipping.free_shipping,
            sold_quantity: inputObject.sold_quantity,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium repellat et molestias hic fugiat quisquam quos eaque deleniti odio quas a officia tempore modi nulla, quod, culpa saepe animi magnam? Expedita deserunt qui, quod recusandae debitis optio quas aut nam quo accusantium iure, amet quaerat totam dignissimos, ratione rerum commodi."
        }
    }
    return outputObject;
}

/* const getDescriptionString = (object) => {
    const itemDescriptionURL = `https://api.mercadolibre.com/items/${object.item.id}/description`;
    axios.get(itemDescriptionURL)
        .then(response => response.data.plain_text)
        .then(res => { return res })
        .catch(error => console.log(error))
}; */

const getProductDescription = (req, res) => {
    const itemURL = `https://api.mercadolibre.com/items/${req.params.id}`
    axios.get(itemURL)
        .then(response => res.send(transform(response.data)))
        // .then(response => transform(response.data))
        // .then(object => getDescriptionString(object))
        .catch(error => console.log(error))
};

module.exports = getProductDescription;