const express = require("express")
const Products = require("../Controllers/Media.js")
const router = express.Router()

router.post("/addMedia" , Products.addMedia)

module.exports = router
