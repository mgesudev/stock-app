const Product = require("../models/product")
const Movement = require("../models/movement")

const getProducts = async (req, res) => {
  // const products = await Product.find({ deleted: false }).sort({ _id: -1 })

  const products = await Product.aggregate([
    {
      $match: { deleted: false }, // 208
    },
    {
      $sort: { _id: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: "movements",
        localField: "_id",
        foreignField: "product",
        as: "movements",
      },
    },
    {
      $unwind: {
        path: "$movements",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: { _id: "$_id", name: "$name", price: "$price" },
        stock: {
          $sum: "$movements.quantity",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        price: "$_id.price",
        stock: 1,
      },
    },
    { $sort: { stock: -1 } },
  ])

  res.status(200).json({ ok: true, products, count: products.length })
}

const createProduct = (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      ok: false,
      message: "El campo Nombre del producto es obligatorio",
    })
    return
  }
  const newProduct = new Product(req.body)

  newProduct
    .save()
    .then((product) => {
      console.log({ product })
      res.status(201).json({ ok: true, product })
    })
    .catch((err) => console.log(err))
}

const deleteProduct = async (req, res) => {
  const { id } = req.params

  await Product.findByIdAndUpdate(id, {
    deleted: true,
  })

  res.status(200).json({ ok: true, message: "Producto eliminado con éxito!" })
  console.log({ id })
}

const createMovement = (req, res) => {
  const { productId } = req.params
  const { type, quantity } = req.body
  const newMovement = new Movement({
    type,
    quantity: type === "Compra" ? quantity : quantity * -1,
    product: productId,
  })

  newMovement
    .save()
    .then((movement) => {
      console.log({ movement })
      res.status(201).json({ ok: true, movement })
    })
    .catch((err) => console.log(err))
}

const deleteMovement = async (req, res) => {
  const { id } = req.params

  await Movement.findByIdAndUpdate(id, {
    deleted: true,
  })

  res
    .status(200)
    .json({ ok: true, message: "Movimiento de stock eliminado con éxito!" })
}

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  createMovement,
  deleteMovement,
}
