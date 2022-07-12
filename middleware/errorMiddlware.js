const errorApi = require('../error/error-api')


module.exports = function (err, req, res, next) {
    if (err instanceof errorApi) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка!'})
}