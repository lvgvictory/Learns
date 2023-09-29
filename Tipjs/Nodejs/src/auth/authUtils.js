'use strict'

const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })
        console.log('accessToken', accessToken)

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

module.exports = {
    createTokenPair
}
