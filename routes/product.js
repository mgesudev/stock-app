const express = require("express")
const router = express.Router()
const productController = require("../controllers/product")

router.get("/", productController.getProducts)
router.post("/", productController.createProduct)
router.delete("/:id", productController.deleteProduct)
router.post("/movement/:productId", productController.createMovement)
router.delete("/movement/:id", productController.deleteMovement)

module.exports = router
