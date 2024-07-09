'use strict';

const { Types } = require('mongoose');
const { inventory } = require('./../inventory.model');

const insertInventory = async ({productId, stock, shopId, location = 'unknown'}) => {
    return await inventory.create({
        inven_productId: productId,
        inven_shopId: shopId,
        inven_location: location,
        inven_stock: stock
    })
}

module.exports = {
    insertInventory
}