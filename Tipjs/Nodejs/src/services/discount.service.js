'use strict';

const { find } = require('lodash');
const {discount} = require('../models/discount.model');
const { convertToObjectIdMongodb } = require('../utils');
const {BadRequestError, NotFoundError} = require('./../core/error.response')
const {
    findAllProducts
} = require('../models/repositoies/product.repo');
const { product } = require('../models/product.model');
const { findAllDiscountCodesUnselect, checkDiscountExists } = require('../models/repositoies/discount.repo');

/**
 * Discount service
 * 1 - Generator discount code [Shop | Admin]
 * 2 - Get discount amount [User]
 * 3 - Get all discount codes [Shop | User]
 * 4 - Verify discount code [User]
 * 5 - Delete discount code [Admin | Shop]
 * 6 - Cancel discount code [User]
 */

class DiscountService {
    static async createDiscount(payload) {
        const {
            code, start_date, end_date, is_active,
            shopId, min_order_value, product_ids, applies_to, name, description,
            type, value, max_value, max_uses, uses_count, max_uses_per_user, users_used
        } = payload
        console.log('payload', payload)
        if (new Date() < new Date(start_date) || new Date(end_date) < new Date()) {
            throw new BadRequestError('Discout code has expired!')
        }

        if (new Date(start_date) >= new Date(end_date)) {
            throw new BadRequestError('Start day must be before end day')
        }

        // create index for discount code
        const foundDiscount = await discount.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongodb(shopId)
        }).lean()

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BadRequestError('Discount exists!')
        }        

        const newDiscount = await discount.create({
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_code: code,
            discount_value: value,
            discount_min_order_value: min_order_value || 0,
            discount_max_value: max_value,
            discount_start_date: new Date(start_date),
            discount_end_date: new Date(end_date),
            discount_max_uses: max_uses,
            discount_uses_count: uses_count,
            discount_users_used: users_used,
            discount_shopId: shopId,
            discount_max_uses_per_user: max_uses_per_user,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all' ? [] : product_ids,
        })

        return newDiscount
    }

    static async updateDiscountCode() {
        
    }

    /**
     * Get all discount codes available with products
     */
    static async getAllDiscountCodesWithProducts({
        code, shopId, userId, limit, page
    }) {
        // create index for discount code
        const foundDiscount = await discount.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongodb(shopId)
        }).lean()

        if (!foundDiscount || !foundDiscount.discount_is_active) {
            throw new NotFoundError('Discount code not found!')
        }

        const { discount_product_ids, discount_applies_to } = foundDiscount
        let products = []

        if (discount_applies_to === 'all') {
            products = await findAllProducts({
                filter: {
                    product_shop: convertToObjectIdMongodb(shopId),
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name']
            })
        }

        if (discount_applies_to === 'specific') {
            products = await findAllProducts({
                filter: {
                    _id: {$in: discount_product_ids},
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name']
            })
        }

        return products
    }

    /**
     * Get all discount codes of shop
     */

    static async getAllDiscountCodesByShop({shopId, limit, page}) {
        const discounts = await findAllDiscountCodesUnselect({
            limit: +limit,
            page: +page,
            filter: {
                discount_shopId: convertToObjectIdMongodb(shopId),
                discount_is_active: true
            },
            unSelect: ['__v', 'discount_shopId'],
            model: discount
        })

        return discounts
    }

    /**
     * Apply discount code
     * products: [
     * {
     *  productId,
     *  shopId,
     *  quantity,
     *  price,
     *  name,
     * }]
     */
    static async getDiscountAmount({codeId, userId, shopId, products}) {
        const foundDiscount = await checkDiscountExists({model: discount, filter: {
            discount_code: codeId,
            discount_shopId: convertToObjectIdMongodb(shopId)
        }})

        if (!foundDiscount) {
            throw new NotFoundError('Discount dose not exists!')
        }

        const {
            discount_is_active,
            discount_max_uses,
            discount_min_order_value,
            discount_end_date,
            discount_start_date,
            discount_max_uses_per_user,
            discount_users_used,
            discount_type,
            discount_value
        } = foundDiscount

        if (!discount_is_active) {
            throw new NotFoundError('Discount expried!')
        }

        if (!discount_max_uses) {
            throw new NotFoundError('Discount are out!')
        }

        if (new Date() < new Date(discount_start_date) || new Date(discount_end_date) < new Date()) {
            throw new NotFoundError('Discout code has expired!')
        }

        // check xem co gia tri toi thieu khong
        let totalOrder = 0

        if (discount_min_order_value > 0) {
            totalOrder = products.reduce((acc, product) => {
                return acc + (product.price * product.quantity)
            }, 0)

            if (totalOrder < discount_min_order_value) {
                throw new NotFoundError(`Discount require a minium order value of ${discount_min_order_value}!`)
            }
        }

        if (discount_max_uses_per_user > 0) {
            const userUseDiscount = discount_users_used.find(user => user.userId === userId)

            if (userUseDiscount) {
                
            }
        }

        // check xem discount nay la fixed_amount
        const amount = discount_type === 'fixed_amount' ? discount_value : totalOrder * (discount_value / 100)

        return {
            totalOrder,
            discount: amount,
            totalPrice: totalOrder - amount
        }
    }

    // delete discount code
    static async deleteDiscountCode({codeId, shopId}) {
        const deleted = await discount.findOneAndDelete({
            discount_code: codeId,
            discount_shopId: convertToObjectIdMongodb(shopId)
        })

        return deleted
    }

    static async cancelDiscountCode({codeId, userId, shopId}) {
        const foundDiscount = await checkDiscountExists({model: discount, filter: {
            discount_code: codeId,
            discount_shopId: convertToObjectIdMongodb(shopId)
        }})

        if (!foundDiscount) {
            throw new NotFoundError('Discount dose not exists!')
        }

        const result = await discount.findByIdAndUpdate({
            $pull: {
                discount_users_used: userId
            },
            $inc: {
                discount_max_uses: 1,
                discount_uses_count: -1
            }
        })
    }
}

module.exports = DiscountService;
