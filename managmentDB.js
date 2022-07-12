const sql = require('mssql')


class managementDB {
    constructor(dbName) {
        this.config = {
            user: process.env.DB_USER,
            password: process.env.DB_PASS, 
            database: dbName,
            server: process.env.DB_SERVER,
            pool: {
                max: 10, 
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
              encrypt: false, // for azure
              trustServerCertificate: false // change to true for local dev / self-signed certs
            }
        }
    }

    async request(req) {
        try {
            let pool = await sql.connect(this.config)
            const result = await pool.request().query(req)
            pool.close()
            return result.recordset
        } catch (err) {
            console.log(err)
            return false
        }
    }
}


module.exports = managementDB