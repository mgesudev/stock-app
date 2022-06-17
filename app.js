require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())

mongoose
  .connect(
    `mongodb+srv://mgesualdo:${process.env.MONGO_DB_PASS}@development.7fstqap.mongodb.net/stock-app?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
    console.log('Conexión exitosa a la BBDD')
  })
  .catch((err) => console.log(err))

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: Number,
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

app.use(express.json())

app.post('/api/v1/products', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      ok: false,
      message: 'El campo Nombre del producto es obligatorio',
    })
    return
  }
  const newProduct = new Product(req.body)

  newProduct
    .save()
    .then((result) => {
      res.status(201).json({ ok: true })
    })
    .catch((err) => console.log(err))
})

const PORT = process.env.PORT
