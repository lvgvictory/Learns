'use strict';

const { BadRequestError } = require('../core/error.response');
const {product, clothing, electronic, furniture} = require('../models/product.model');
const { insertInventory } = require('../models/repositoies/inventory.repo');
const {
    findAllDraftsForShop, 
    publishProductByShop, 
    findAllPublishsForShop, 
    searchProductByUser,
    findAllProducts,
    findProduct,
    updateProductById
} = require('../models/repositoies/product.repo');
const { removeUndefinedObject, updateNestedObjectParse } = require('../utils');
const { pushNotiToSystem } = require('./notification.service');

// define Factory class to create products
class ProductFactory {
    static productRegistry = {}

    static registerProductType = (type, classRef) => {
        ProductFactory.productRegistry[type] = classRef
    }

    /**
     * type: 'Clothing'
     * payload
     */
    static createProduct = async (type, payload) => {
        const productClass = ProductFactory.productRegistry[type]

        if (!productClass) {
            throw new BadRequestError('Invalid product type ' + type)
        }

        return new productClass(payload).createProduct()
    }

    static updateProduct = async (type, productId ,payload) => {
        const productClass = ProductFactory.productRegistry[type]

        if (!productClass) {
            throw new BadRequestError('Invalid product type ' + type)
        }

        return new productClass(payload).updateProduct(productId)
    }

    // PUT //
    static publishProductByShop = async ({product_shop, product_id}) => {
        return await publishProductByShop({product_shop, product_id})
    }

    static unPublishProductByShop = async ({product_shop, product_id}) => {
        return await publishProductByShop({product_shop, product_id})
    }
    // END PUT //

    // QUERY //
    static findAllDraftsForShop = async ({product_shop, limit = 50, skip = 0}) => {
        const query = { product_shop, isDraft: true }
        
        return await findAllDraftsForShop({query, limit, skip})
    }

    static findAllPublishsForShop = async ({product_shop, limit = 50, skip = 0}) => {
        const query = { product_shop, isPublished: true }
        
        return await findAllPublishsForShop({query, limit, skip})
    }

    static getListSearchProductByUser = async ({keySearch}) => {
        return await searchProductByUser({keySearch})
    }

    static findAllProducts = async ({limit = 50, sort = 'ctime', page = 1, filter = {isPublished: true}}) => {
        return await findAllProducts({limit, sort, page, filter, select: ['product_name', 'product_price', 'product_thumb', 'product_shop']})
    }

    static findProduct = async ({product_id}) => {
        return await findProduct({product_id, unSelected: ['__v']})
    }
    // END QUERY //
}

// define base product class
class Product {
    constructor({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes,
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    // create new product
    async createProduct(product_id) {
        const newProduct = await product.create({
            ...this,
            _id: product_id
        })

        if (newProduct) {
            await insertInventory({
                productId: newProduct._id,
                shopId: this.product_shop,
                stock: this.product_quantity
            })

            // push notification to system collection
            pushNotiToSystem({
                type: 'SHOP-001',
                senderId: this.product_shop,
                receiverId: 1,
                options: {
                    product_name: this.product_name,
                    shop_name: this.product_shop
                }
            }).then((res) => {
                console.log('push notification success: ', res)
            }).catch((err) => {
                console.log('push notification error: ', err)
            })
        }

        return newProduct
    }

    // update product
    async updateProduct(productId, bodyUpdate) {
        return await updateProductById({productId, bodyUpdate, model: product})
    }
}

// Define sub-class for different product types Clothing
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })

        if (!newClothing) {
            throw new BadRequestError('create new Clothing error!')
        }
        
        const newProduct = await super.createProduct(newClothing._id)

        if (!newProduct) {
            throw new BadRequestError('create new Product error!')
        }

        return newProduct
    }

    async updateProduct(productId) {
        // 1. remove attr has null and undefined
        const objectParams = removeUndefinedObject(this)

        // 2. check xem update o dau
        if (objectParams.product_attributes) {
            // update child
            await updateProductById({
                productId, 
                bodyUpdate: updateNestedObjectParse(objectParams.product_attributes), 
                model: clothing
            })
        }

        const updateProduct = await super.updateProduct(productId, updateNestedObjectParse(objectParams))

        return updateProduct
    }
}

// Define sub-class for different product types Electronic
class Electronic extends Product {
    async createProduct() {
        const newElectronic = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })

        if (!newElectronic) {
            throw new BadRequestError('create new Electronic error!')
        }

        const newProduct = await super.createProduct(newElectronic._id)

        if (!newProduct) {
            throw new BadRequestError('create new Product error!')
        }

        return newProduct
    }
}

// Define sub-class for different product types Furniture
class Furniture extends Product {
    async createProduct() {
        const newFurniture = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })

        if (!newFurniture) {
            throw new BadRequestError('create new Electronic error!')
        }

        const newProduct = await super.createProduct(newFurniture._id)

        if (!newProduct) {
            throw new BadRequestError('create new Product error!')
        }

        return newProduct
    }
}

// register product types
ProductFactory.registerProductType('Clothing', Clothing)
ProductFactory.registerProductType('Electronic', Electronic)
ProductFactory.registerProductType('Furniture', Furniture)

module.exports = ProductFactory
