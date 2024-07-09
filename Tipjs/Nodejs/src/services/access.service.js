'use strict'

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair, verifyJWT } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response')
const { findByEmail } = require('./shop.service')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}
class AccessService {
    /*
        1 - check email in dbs
        2 - match password
        3 - create AT vs RT and save
        4 - generate tokens
        5 - get data return login
    */
    static login = async ({ email, password, refreshToken = null }) => {
        // 1.check email in dbs
        const foundShop = await findByEmail({email})
        if (!foundShop) {
            throw new BadRequestError('Error: Shop not registered')
        }

        // 2.match password
        const match = bcrypt.compare(password, foundShop.password)
        if (!match) {
            throw new AuthFailureError('Error: Authentication failed')
        }

        // 3.create AT vs RT and save
        // created privateKey, publicKey doi xung
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        // 4.generate tokens
        // create token pair
        const { _id: userId } = foundShop
        const tokens = await createTokenPair({userId: foundShop._id, email}, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId
        })

        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
            tokens
        }

    }

    static signUp = async ({ name, email, password }) => {
        // step1: check email exists ??
        const holdelShop = await shopModel.findOne({ email }).lean() // lean() giảm tải size của obj

        if (holdelShop) {
            throw new BadRequestError('Error: Shop already registered!')
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            roles: [RoleShop.SHOP]
        })

        if (newShop) {
            // created privateKey, publicKey Bat doi xung
            // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'pkcs1', // Public Key CryptoGraphics Standards
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     }
            // })

            // created privateKey, publicKey doi xung
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })

            if (!keyStore) {
                throw new BadRequestError('Error: publicKeyString error!')
            }

            // create token pair
            const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey)

            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                    tokens
                }
            }
        }

        return {
            code: 200,
            metadata: null
        }
    }

    static logout = async ({ keyStore }) => {
        const delKey = await KeyTokenService.removeKeyById(keyStore._id)

        return delKey
    }

    /*
        Check token used
    */
    static handlerRefreshTokenV2 = async ({refreshToken, user, keyStore}) => {
        const { userId, email } = user

        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            // Xoa tat ca token trong keyStore
            await KeyTokenService.deleteById(userId)
            throw new ForbiddenError('Something wrong happed!! Please relogin')
        }
        
        if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('Error: Shop not registered')

        // check userId
        const foundShop = await findByEmail({email})

        if (!foundShop) {
            throw new AuthFailureError('Error: Shop not registered')
        }

        // create 1 cap moi
        const tokens = await createTokenPair({userId, email}, keyStore.publicKey, keyStore.privateKey)

        // update token
        await keyStore.updateOne({
            $set: {
                refreshToken: tokens.refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken // da duoc su dung de lay token moi roi
            }
        })

        return {
            user,
            tokens
        }
    }
}

module.exports = AccessService
