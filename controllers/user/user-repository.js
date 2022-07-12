const managmentDB = require('../../managmentDB')


class UserRepository{
    constructor(){
        this.database = new managmentDB(process.env.DB_PERSONAL)
    }

    async getOne(login){
        let user = await this.database.request(`SELECT  [CodPE],
                                                        TRIM(FIO) as FIO,
                                                        TRIM(nik) as nik,
                                                        TRIM(Hash) as Hash,
                                                        TRIM(Salt) as Salt
                                                FROM dbo.MyPassword 
                                                WHERE nik = '${login}'`)

        return user[0]
    }

    async getPermission(CodPE){
        let permission = await this.database.request(`  SELECT [observer]
                                                        FROM academia.dbo.JournalPermission 
                                                        WHERE CodPE = ${CodPE}`)

        return permission[0]
    }

    async createPermission(CodPE){
        await this.database.request(`  INSERT INTO academia.dbo.JournalPermission (CodPE, observer)
                                                        VALUES (${CodPE}, 0)
                                                        
                                                        SELECT @@ROWCOUNT AS rows`)
    }

    async getAll(){
        let users = await this.database.request(`SELECT [CodPE],
                                                        TRIM(FIO) as FIO
                                                FROM dbo.MyPassword`)

        return users
    }
}


module.exports = new UserRepository