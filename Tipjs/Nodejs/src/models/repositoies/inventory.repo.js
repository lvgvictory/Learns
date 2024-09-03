"use strict";

const { Types } = require("mongoose");
const { inventory } = require("./../inventory.model");
const { convertToObjectIdMongodb } = require("../../utils");

const insertInventory = async ({
  productId,
  stock,
  shopId,
  location = "unknown",
}) => {
  return await inventory.create({
    inven_productId: productId,
    inven_shopId: shopId,
    inven_location: location,
    inven_stock: stock,
  });
};

const reservationInventory = async ({ productId, quantity, cartId }) => {
  const query = {
    inven_productId: convertToObjectIdMongodb(productId),
    inven_stock: { $gte: quantity },
  },
  updateSet = {
    $inc: { inven_stock: -quantity },
    $push: {
      inven_reservations: {
        quantity,
        cartId,
        createOn: new Date()
      },
    },
  }, options = {
    new: true,
    upsert: true,
  };

  // return await inventory.findOneAndUpdate(query, updateSet, options);
  return await inventory.updateOne(query, updateSet, options);
};

module.exports = {
  insertInventory,
  reservationInventory,
};
