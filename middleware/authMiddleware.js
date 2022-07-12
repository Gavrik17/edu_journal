const jwt = require('jsonwebtoken')
const errorApi = require('../error/error-api')

module.exports = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return next(errorApi.unauthorized('Пользователь не авторизирован'))
        }
        
        const receivedData = jwt.verify(token, process.env.SECRET_KEY)
        req.user = receivedData
        next()
    } catch(err) {
        return next(errorApi.unauthorized('Пользователь не авторизирован'))
    }
}