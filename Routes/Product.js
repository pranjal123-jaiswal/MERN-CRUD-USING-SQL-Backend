const express = require("express")
const Products = require("../Controllers/Products.js")
const router = express.Router()

router.post("/addProducts" , Products.addProduct)
router.get("/getProducts" , Products.getProducts)
router.delete("/deleteProduct/:id" , Products.deleteProduct)
router.get("/getProductById/:id" , Products.getProductById)  
router.patch("/updateProduct/:id" , Products.updateProduct)
router.get("/getNoMediaProducts" , Products.getNoMediaProducts)
router.get("/search" , Products.search)   

module.exports = router
