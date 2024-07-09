'use strict';

const { Types } = require('mongoose');
const { product, electronic, clothing, furniture } = require('./../product.model');
const { getSelectData, unGetSelectData } = require('../../utils');

const queryProduct = async ({query, limit, skip}) => {
    return await product.find(query).populate('product_shop', 'name email -_id')
        .sort({updateAt: -1})
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const findAllDraftsForShop = async ({query, limit, skip}) => {
    return await queryProduct({query, limit, skip})
}

const findAllPublishsForShop = async ({query, limit, skip}) => {
    return await queryProduct({query, limit, skip})
}

const publishProductByShop = async ({product_shop, product_id}) => {
    const foundShop = await product.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    })

    if (!foundShop) return null

    await foundShop.updateOne({
        $set: {
            isDraft: false,
            isPublished: true
        }
    })

    return 1
}

const unPublishProductByShop = async ({product_shop, product_id}) => {
    const foundShop = await product.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    })

    if (!foundShop) return null

    await foundShop.updateOne({
        $set: {
            isDraft: true,
            isPublished: false
        }
    })

    return 1
}


const searchProductByUser = async ({keySearch}) => {
    const regexSearch = new RegExp(keySearch)

    const result = await product.find(
        {
            isPublished: true,
            $text: {$search: regexSearch}
        },
        {score: {$meta: 'textScore'}}
    ).sort({score: {$meta: 'textScore'}}).lean()

    return result
}

const findAllProducts = async ({limit, sort, page, filter, select}) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? {_id: -1} : {_id: 1}

    const products = product.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
    
    return products
}

const findProduct = async ({product_id, unSelected}) => {
    return await product.findById(product_id).select(unGetSelectData(unSelected))
}

const updateProductById = async ({productId, bodyUpdate, model, isNew = true}) => {
    return await model.findByIdAndUpdate(productId, bodyUpdate, {
        new: isNew
    })
}

module.exports = {
    findAllDraftsForShop,
    publishProductByShop,
    findAllPublishsForShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProduct,
    updateProductById
}