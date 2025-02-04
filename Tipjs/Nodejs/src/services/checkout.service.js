"use strict";

const { BadRequestError } = require("../core/error.response");
const { findCartById } = require("../models/repositoies/cart.repo");
const DiscountService = require("./discount.service");
const { checkProductByServer } = require("./../models/repositoies/product.repo");
const { acquireLock } = require("./redis.service");
const { order } = require("./../models/order.model");

class CheckoutService {
  /*
    {
      cartId,
      userId,
      shop_order_ids: [
        {
          shopId,
          shop_discounts: [],
          item_products: [
            {
              price,
              quantity,
              productId,
            }
          ]
        },
        {
          shopId,
          shop_discounts: [
            {
              shopId,
              discountId,
              codeId,
            }
          ],
          item_products: [
            {
              price,
              quantity,
              productId,
            }
          ]
        }
      ]
    }
  */
  static async checkoutReview({
    cartId, userId, shop_order_ids = []
  }) {
    // check cartId ton tai khong
    const foundCart = await findCartById(cartId);

    if (!foundCart) {
      throw new BadRequestError("Cart not found");
    }

    const checkout_order = {
      totalPrice: 0, // tong tien hang
      totalDiscount: 0, // tong giam gia
      feeShip: 0, // phi van chuyen
      totalCheckout: 0, // tong tien phai thanh toan
    }, shop_order_ids_new = [];

    // tinh tong tien bill
    for(let i = 0; i < shop_order_ids.length; i++) {
      const shop_order = shop_order_ids[i];
      const { shopId, shop_discounts = [], item_products = [] } = shop_order;

      // check product available
      const checkProductServer = await checkProductByServer(item_products);

      if (!checkProductServer[0]) {
        throw new BadRequestError("Order wrong");
      }

      // tong tien don hang
      const checkoutPrice = checkProductServer.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);

      // tinh tong tien truoc khi xu ly
      checkout_order.totalPrice += checkoutPrice;

      const itemCheckout = {
        shopId,
        shop_discounts,
        priceRaw: checkoutPrice, // tien truoc khi giam gia
        priceApplyDiscount: checkoutPrice, // tien sau khi giam gia
        item_products: checkProductServer,
      }

      // neu shop_discounts co ton tai > 0, check xem co hop le hay khong
      if (shop_discounts.length > 0) {
        // gia su chi co mot discount
        // get amount discount
        const {totalPrice = 0, discount = 0 } = await DiscountService.getDiscountAmount({
          codeId: shop_discounts[0].codeId,
          userId,
          shopId,
          products: checkProductServer
        });

        // tong cong discount giam gia
        checkout_order.totalDiscount += discount;

        // neu tien giam gia lon hon 0
        if (discount > 0) {
          itemCheckout.priceApplyDiscount = checkoutPrice - discount;
        }
      }

      // tong thanh toan cuoi cung
      checkout_order.totalCheckout += itemCheckout.priceApplyDiscount;

      shop_order_ids_new.push(itemCheckout);
    }

    return {
      checkout_order,
      shop_order_ids,
      shop_order_ids_new,
    }
  }

  // order
  static async orderByUser({
    shop_order_ids,
    cartId,
    userId,
    user_address = {},
    user_payment = {},
  }) {
    const { shop_order_ids_new, checkout_order } = await CheckoutService.checkoutReview({
      cartId,
      userId,
      shop_order_ids,
    })

    // check lai mot lan nua xem co vuot ton kho hay khong
    // get new arr product
    const products = shop_order_ids_new.flatMap(shop_order => shop_order.item_products);
    console.log('products::::: ', products);
    const acquireProduct = [];

    for(let i = 0; i < products.length; i++) {
      const product = products[i];
      const { productId, quantity } = product;
      const keyLock = await acquireLock(productId, quantity, cartId);
      acquireProduct.push(keyLock ? true : false);

      if (!keyLock) {
        // release lock
        await releaseLock(keyLock);
      }
    }

    // kiem tra neu mot san pham het hang trong kho
    if (acquireProduct.includes(false)) {
      throw new BadRequestError("Mot so san pham da duoc cap nhat, vui long quay lai gio hang...!");
    }

    const newOrder = await order.create({
      order_userId: userId,
      order_checkout: checkout_order,
      order_shipping: user_address,
      order_payment: user_payment,
      order_products: shop_order_ids_new,
    })

    // truong hop neu insert order thanh cong, thi remove product co trong gio hang
    if (newOrder) {
      // remove product in cart
    
    }

    return newOrder;
  }

  /**
   * Query orders [users]
   */
  static async getOrdersByUser(){}

  /**
   * Query order using id [users]
   */
  static async getOneOrderByUser(){}

  /**
   * cancelled orders [users]
   */
  static async cancelledOrderByUser(){}

  /**
   * update order status [Shop | admin]
   */
  static async updateOrderStatusByShop(){}
}

module.exports = CheckoutService;