/**
 * @fileoverview receives a query as string and 
 * @returns a json containing results 
 */
const axios = require('axios').default;

const transform = inputObject => {
    const outputObject = {
        author: {
            name: "Diego M.",
            lastname: "Maldini Freyre"
        },
        categories: [],
        items: [],
    }
    inputObject.available_filters
        .map(currentObject => { 
            if (currentObject.id === "category") {
                currentObject.values.map(currCategory => 
                    outputObject.categories.push(currCategory.name)
                );
            }})
    inputObject.results.map(currentItem => outputObject.items.push(
        {
            id: currentItem.id,
            title: currentItem.title,
            price: {
                currency: currentItem.currency_id,
                amount: Math.floor(currentItem.price),
                decimals: Math.floor((currentItem.price - Math.floor(currentItem.price)) * 100)
            },
            picture: currentItem.thumbnail,
            condition: currentItem.condition,
            free_shipping: currentItem.shipping.free_shipping,
        }
    ));
    return outputObject;
}

const getSearchResults = (req, res) => {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`;
    axios.get(url)
        .then(response => transform(response.data))
        .then(finalObject => res.json(finalObject))
        .catch(error => console.log(error));
}

module.exports = getSearchResults;