"use strict";

const { BadRequestError } = require("../core/error.response");
const { getProductById } = require("../models/repositoies/product.repo");

class InventoryService {
  static async addStockToInventory({
    stock,
    productId,
    shopId,
    location = '123, Tran Phu, Ha Dong',
  }) {
    const product = await getProductById(productId);
    if (!product) {
      throw new BadRequestError("Product not found");
    }

    const query = {
      inven_productId: productId,
      inven_shopId: shopId,
    }, updateSet = {
      $inc: { inven_stock: stock },
      $set: {
        inven_location: location,
      },
    }, options = {
      new: true,
      upsert: true,
    };

    return await inventory.findOneAndUpdate(query, updateSet, options);
  }
}

module.exports = InventoryService;
