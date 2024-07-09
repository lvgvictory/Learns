'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
  signUp = async (req, res, next) => {
    return new CREATED({
      message: 'Registered OK!',
      metadata: await AccessService.signUp(req.body),
      options: {
        limmit: 10
      }
    }).send(res)
  }

  login = async (req, res) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body)
    }).send(res)
  }

  logout = async (req, res) => {
    new SuccessResponse({
      message: 'Logout OK!',
      metadata: await AccessService.logout({keyStore: req.keyStore})
    }).send(res)
  }

  handlerRefreshToken = async (req, res) => {
    new SuccessResponse({
      message: 'Get token Success!',
      metadata: await AccessService.handlerRefreshTokenV2({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      })
    }).send(res)
  }
}

module.exports = new AccessController()
