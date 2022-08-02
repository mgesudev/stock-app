const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: Number,
    deleted: { type: Boolean, default: false },
    stock: Number,
  },
  { timestamps: true }
)

const Product = mongoose.model("Product", productSchema)

module.exports = Product
