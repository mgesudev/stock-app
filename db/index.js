const mongoose = require("mongoose")

const dbConnect = (app) => {
  mongoose
    .connect(
      `mongodb+srv://mgesualdo:${process.env.MONGO_DB_PASS}@development.7fstqap.mongodb.net/stock-app?retryWrites=true&w=majority`
    )
    .then((result) => {
      const PORT = process.env.PORT
      app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`)
      })
      console.log("Conexión exitosa a la BBDD")
    })
    .catch((err) => console.log(err))
}

module.exports = dbConnect
