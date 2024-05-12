const express = require("express")
const Products = require("../Controllers/Category.js")
const router = express.Router()

router.post("/addCategory" , Products.addCategory)
router.get("/getCategory" , Products.getCategory)
router.get("/categoryStats" , Products.categoryStats)

module.exports = router
