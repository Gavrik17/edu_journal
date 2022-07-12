const sha256 = require('sha256')
const jwt = require('jsonwebtoken')
const userRepository = require('./user-repository')

class userServices{
    async verify(data, pass){
        let isCorrect = data.Hash === sha256(pass + data.Salt)
        return isCorrect
    }

    generateToken(CodPE, FIO, observer){
        const payload = {
            id: CodPE,
            FIO, 
            observer
        }

        return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '180d'})
    }

    async permission(CodPE){
        let permission = await userRepository.getPermission(CodPE)

        if (typeof(permission) == 'undefined'){
            await userRepository.createPermission(CodPE)
            permission = await userRepository.getPermission(CodPE)
        }

        return permission
    }
}

module.exports = new userServices