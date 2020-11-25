const getProductDescription = require('../functions/getProductDescription');
const getSearchResults = require('../functions/getSearchResults');

const router = require('express').Router();

// be aware of auth, Diego...
router.get("/items", getSearchResults);
router.get("/items/:id", getProductDescription);

module.exports = router;