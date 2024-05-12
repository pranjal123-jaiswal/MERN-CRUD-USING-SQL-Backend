const express = require("express")
const Products = require("../Controllers/Material.js")
const router = express.Router()

router.post("/addMaterial" , Products.addMaterial)
router.get("/getMaterial" , Products.getMaterial)

module.exports = router
