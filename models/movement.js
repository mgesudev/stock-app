const mongoose = require("mongoose")

const movementSchema = mongoose.Schema(
  {
    type: String, // Compra o Venta
    quantity: Number,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Movement = mongoose.model("Movement", movementSchema)

module.exports = Movement
