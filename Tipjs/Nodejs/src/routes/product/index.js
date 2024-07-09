'use strict'

const express = require('express')
const productController = require('../../controllers/product.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')
const router = express.Router()

//
router.get('/search/:keySearch', asyncHandler(productController.getListSearchProductByUser))
router.get('/:product_id', asyncHandler(productController.findProduct))
router.get('', asyncHandler(productController.findAllProducts))

// authentication check các request gửi lên
router.use(authenticationV2)

router.post('/publish/:id', asyncHandler(productController.publishProductByShop))
router.post('/un-publish/:id', asyncHandler(productController.unPublishProductByShop))
router.patch('/:productId', asyncHandler(productController.updateProduct))
router.post('', asyncHandler(productController.createProduct))

// QUERY
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
router.get('/published/all', asyncHandler(productController.getAllPublishForShop))

module.exports = router