const express = require('express')
require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
  console.log('Petición recibida')

  res.status(200).send('<h1>Hola mundo con la nueva cuenta de Azure!</h1>')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
