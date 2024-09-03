"use strict";

const { cart } = require("../models/cart.model");
const { getProductById } = require("../models/repositoies/product.repo");
const { NotFoundError } = require('../core/error.response')

/*
  Key features of the CartService class:
  - add product to cart [user]
  - reduce product quantity by one [user]
  - increase product quantity by one [user]
  - get cart [user]
  - remove product from cart [user]
  - delete cart item [user]
*/

class CartService {
  /// START REPO CART ///
  static async createUserCart({ userId, product }) {
    const query  = { cart_userId: userId, cart_state: 'active'},
    updateOrInsert = {
      $addToSet: {
        cart_products: product
      }
    }, options = { upsert: true, new: true }

    return await cart.findOneAndUpdate(query, updateOrInsert, options);
  }

  static async updateUserCartQuantity({ userId, product }) {
    const { productId, quantity } = product;
    const query  = {
      cart_userId: userId,
      'cart_products.productId': productId,
      cart_state: 'active'
    },
    updateSet = {
      $inc: {
        'cart_products.$.quantity': quantity
      }
    }, options = { upsert: true, new: true }

    return await cart.findOneAndUpdate(query, updateSet, options);
  }
  /// END REPO CART ///

  static async addToCart({ userId, product = {}}) {
    // check cart ton tai hay khong?
    const userCart = await cart.findOne({ cart_userId: userId });

    if (!userCart) {
      // tao moi cart moi
      return await CartService.createUserCart({ userId, product });
    }

    // neu co gio hang roi nhung chua co san pham
    if (!userCart.cart_products.length) {
      userCart.cart_products.push(product);
      
      return await userCart.save();
    }

    // gio hang da co san pham, thi update so luong
    return await CartService.updateUserCartQuantity({ userId, product });
  }

  // update cart
  /*
    shop_order_id: [
      {
        shopId,
        item_products: [
          {
            quantity,
            price,
            shopId,
            old_quantity,
            productId,
          }
        ],
        vendorId,
      }
    ]
  */
  static async addToCartV2({ userId, shop_order_ids }) {
    const { productId, quantity, old_quantity } = shop_order_ids[0].item_products[0]

    const foundProduct = await getProductById(productId);
    
    // check product ton tai hay khong?
    if (!foundProduct) {
      throw new NotFoundError('Product not found');
    }

    // compare
    if (foundProduct.product_shop.toString() !== shop_order_ids[0].shopId.toString()) {
      throw new NotFoundError('Product do not belong to this shop');
    }

    if (quantity === 0) {
      // deleted
    }

    return await CartService.updateUserCartQuantity({
      userId,
      product: {
        productId,
        quantity: quantity - old_quantity
      }
    })
  }

  static async deleteUserCart({userId, productId}) {
    const query = { cart_userId: userId, cart_state: 'active'}
    const updateSet = { $pull: { cart_products: { productId } } }

    const deleteCart = await cart.updateOne(query, updateSet);

    return deleteCart
  }

  static async getListUserCart({userId}) {
    return await cart.findOne({ cart_userId: +userId, cart_state: 'active' }).lean()
  }
}

module.exports = CartService;
