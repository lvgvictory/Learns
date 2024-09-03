"use strict";

const { type } = require("express/lib/response");
const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

// Declare the Schema of the Mongo model
const cartSchema = new Schema({
  cart_state: {
    type: String,
    required: true,
    enum: ["active", "completed", "failed", "pending"],
    default: "active",
  },

  cart_products: {
    type: Array,
    required: true,
    default: [],
  },
  /*
    [
      {
        productId,
        shopId,
        quantity,
        name,
        price,
      }
    ]
  */

  cart_count_product: {type: String, default: 0},
  cart_userId: { type: Number, required: true }
}, {
  collection: COLLECTION_NAME,
  timestamps: {
    createdAt: "createdOn",
    updatedAt: "modifiedOn",
  }
});

module.exports = {
  cart: model(DOCUMENT_NAME, cartSchema),
}
