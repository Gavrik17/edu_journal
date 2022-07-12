require('dotenv').config()
const errorMiddleware = require('./middleware/errorMiddlware')
const allowCrossDomain = require('./middleware/domainMiddleware')
const express = require('express')
const routes = require('./routes/index')
const app = express()
const cors = require('cors')

app.use(cors({
    origin: '*'
}));

app.use(allowCrossDomain);

app.use(express.json({extended: true}))

app.use('', routes)

app.use(errorMiddleware)

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})