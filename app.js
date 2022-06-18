require('dotenv').config()
const express = require('express')
const dbConnect = require('./db')
const cors = require('cors')
const productRouter = require('./routes/product')

const app = express()

dbConnect(app)

app.use(cors({ origin: true }))

app.use(express.json())

app.use('/api/v1/products', productRouter)
