'use strict'

const { SuccessResponse } = require('../core/success.response')
// const ProductService = require('../services/product.service')
const ProductServiceV2 = require('../services/product.service.xxx')

class ProductController {
  createProduct = async (req, res) => {
    // //v1
    // new SuccessResponse({
    //   message: 'Create new Product Success!',
    //   metadata: await ProductService.createProduct(req.body.product_type, {
    //     ...req.body,
    //     product_shop: req.user.userId
    //   })
    // }).send(res)

    // v2
    new SuccessResponse({
      message: 'Create new Product Success!',
      metadata: await ProductServiceV2.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId
      })
    }).send(res)
  }

  // update Product
  updateProduct = async (req, res) => {
    new SuccessResponse({
      message: 'Update Product Success!',
      metadata: await ProductServiceV2.updateProduct(
        req.body.product_type,
        req.params.productId,
        {
          ...req.body,
          product_shop: req.user.userId
        }
      )
    }).send(res)
  }

  publishProductByShop = async (req, res) => {
    new SuccessResponse({
      message: 'Publish Product Success!',
      metadata: await ProductServiceV2.publishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId
      })
    }).send(res)
  }

  unPublishProductByShop = async (req, res) => {
    new SuccessResponse({
      message: 'Un-Publish Product Success!',
      metadata: await ProductServiceV2.publishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId
      })
    }).send(res)
  }

  // QUERY //
  /**
   * @description Get all Drafts for shop
   * @param {*} req 
   * @param {*} res 
   */
  getAllDraftsForShop = async (req, res) => {
    new SuccessResponse({
      message: 'Get list Drafts Success!',
      metadata: await ProductServiceV2.findAllDraftsForShop({
        product_shop: req.user.userId
      })
    }).send(res)
  }

  getAllPublishForShop = async (req, res) => {
    new SuccessResponse({
      message: 'Get list Publish Success!',
      metadata: await ProductServiceV2.findAllPublishsForShop({
        product_shop: req.user.userId
      })
    }).send(res)
  }

  getListSearchProductByUser = async (req, res) => {
    console.log(req.params)
    new SuccessResponse({
      message: 'Get list getListSearchProductByUser Success!',
      metadata: await ProductServiceV2.getListSearchProductByUser(req.params)
    }).send(res)
  }

  findAllProducts = async (req, res) => {
    console.log(req.params)
    new SuccessResponse({
      message: 'Get list findAllProducts Success!',
      metadata: await ProductServiceV2.findAllProducts(req.query)
    }).send(res)
  }

  findProduct = async (req, res) => {
    console.log(req.params)
    new SuccessResponse({
      message: 'Get findProduct Success!',
      metadata: await ProductServiceV2.findProduct({
        product_id: req.params.product_id
      })
    }).send(res)
  }
  // END QUERY //
}

module.exports = new ProductController()
