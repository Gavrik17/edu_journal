const userRepository = require('./user-repository')
const userServices = require('./user-services')


class userController{
    async login(req, res){
        const {login, password} = req.body
        let userData = await userRepository.getOne(login)
        
        if (!userData) {
            return res.json('Неверная пара логин пароль')
        }

        let isCorrect = await userServices.verify(userData, password)

        if (isCorrect) {
            let permission = await userServices.permission(userData.CodPE)
        
            let token = userServices.generateToken(userData.CodPE, userData.FIO, permission.observer)
            return res.json(token)
        }
        return res.json('Неверная пара логин пароль')
    }

    async list(req, res){
        let userlist = await userRepository.getAll()

        return res.json(userlist)
    }
}


module.exports = new userController