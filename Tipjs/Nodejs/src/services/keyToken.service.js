'use strict'

const { Types } = require('mongoose')
const keytokenModel = require('../models/keytoken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        // level 0
        // try {
        //     const tokens = await keytokenModel.create({
        //         user: userId,
        //         publicKey,
        //         privateKey
        //     })

        //     return tokens ? tokens.publicKey : null
        // } catch (error) {
        //     return error.message
        // }

        // level xxx
        try {
            const filter = { user: userId }
            const update = {
                publicKey,
                privateKey,
                refreshTokensUsed: [],
                refreshToken
            }
            const options = {
                upsert: true,
                new: true
            }
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) => {
        return await keytokenModel.findOne({ user: new Types.ObjectId(userId) })
    }

    static removeKeyById = async (id) => {
        return await keytokenModel.deleteOne({
            _id:  new Types.ObjectId(id)
        })
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keytokenModel.findOne({refreshTokensUsed: refreshToken}).lean()
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keytokenModel.findOne({refreshToken})
    }

    static deleteById = async (userId) => {
        return keytokenModel.deleteOne({user: userId})
    }
}

module.exports = KeyTokenService
