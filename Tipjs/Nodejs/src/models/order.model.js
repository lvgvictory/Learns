"use strict";

const { type } = require("express/lib/response");
const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "orders";

const orderSchema = new Schema({
  order_userId: {
    type: Number,
    required: true,
  },
  /**
   * totalPrice
   * totalApplyDiscount
   * feeShip
   */
  order_checkout: { type: Object, default: {} },
  /**
   * street
   * city
   * state
   * country
   */
  order_shipping: { type: Object, default: {} },
  order_payment: {
    type: Object,
    default: {},
  },
  order_products: {
    type: Array,
    required: true,
  },
  order_trackingNumber: { type: String, default: "#0000118052022" },
  order_status: { type: String, default: "pending", enum: ["pending", "shipped", "delivered", "confirmed", "cancelled"] },
}, { 
  collection: COLLECTION_NAME,
  timestamps: {
    createdAt: "createdOn",
    updatedAt: "modifiedOn",
  },
});

module.exports = {
  order: model(DOCUMENT_NAME, orderSchema),
}
