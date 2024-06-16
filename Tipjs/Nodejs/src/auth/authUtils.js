'use strict'

const JWT = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const { asyncHandler } = require('../helpers/asyncHandler')

const { AuthFailureError, NotFoundError } = require('../core/error.response')
const KeyTokenService = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-rtoken-id',
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        // refreshToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error('Error verify', err)
            } else {
                console.log('Decode verified', decode)
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log('authUtils', error)
    }
}

const authenticationV2 = asyncHandler(async (req, res, next) => {
    /*
        1. check userId is missing
        2. get accessToken
        3. 
        4. 
        5. 
        6. 
    */
    // 1. check userId is missing
    const userId = req.headers[HEADER.CLIENT_ID]

    if (!userId) {
        throw new AuthFailureError('Error: Invalid request')
    }
    // 2. get KeyStore
    const keyStore = await KeyTokenService.findByUserId(userId)
    if (!keyStore) {
        throw new NotFoundError('Error: Not fonrd keystore')
    }

    // 3. check refreshToken
    const refreshToken = req.headers[HEADER.REFRESHTOKEN]
    
    if (refreshToken) {
        try {
            // 4. 
            const decodeUser = JWT.verify(refreshToken, keyStore.privateKey)
            
            // 5. 
            if (userId !== decodeUser.userId) {
                throw new AuthFailureError('Error: Invalid request')
            }
    
            req.keyStore = keyStore
            req.user = decodeUser
            req.refreshToken = refreshToken
    
            // 
            return next()
        } catch (error) {
            throw error
        }
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]

    if (!accessToken) {
        throw new AuthFailureError('Error: Invalid request')
    }

    try {
        // 4. 
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        
        // 5. 
        if (userId !== decodeUser.userId) {
            throw new AuthFailureError('Error: Invalid request')
        }

        req.keyStore = keyStore
        req.user = decodeUser
        // 
        return next()
    } catch (error) {
        throw error
    }
})

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret)
}

module.exports = {
    createTokenPair,
    authenticationV2,
    verifyJWT
}
