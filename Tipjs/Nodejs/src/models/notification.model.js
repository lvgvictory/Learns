'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Notification';
const COLLECTION_NAME = 'notifications';

// ORDER-001: order successfully
// ORDER-002: order failed
// PROMOTION-001:  new promotion
// SHOP-001: new product by user following

const NotificationSchema = new Schema(
  {
    noti_type: {
      type: String,
      enum: ['ORDER-001', 'ORDER-002', 'PROMOTION-001', 'SHOP-001'],
      required: true,
    },
    noti_senderId: {
      type: String,
      required: true,
    },
    noti_receiverId: {
      type: Number,
      required: true,
    },
    noti_content: {
      type: String,
      required: true,
    },
    noti_options: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

const Notification = model(DOCUMENT_NAME, NotificationSchema);
module.exports = Notification;
