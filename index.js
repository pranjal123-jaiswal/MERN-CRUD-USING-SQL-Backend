const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const databaseModel  = require("./db/config")
const ProductsRoutes = require("./Routes/Product.js")
const MediaRoutes = require("./Routes/Media.js")
const MaterialRoutes = require("./Routes/Material.js")
const CategoryRoutes = require("./Routes/Category.js")
const app = express()

dotenv.config({
  path: "./config.env"  
})  
  
app.use(express.json())
app.use(cors())
    
databaseModel.createTables()

app.use("/products" , ProductsRoutes)
app.use("/media" , MediaRoutes)
app.use("/material" , MaterialRoutes)
app.use("/category" , CategoryRoutes)
app.get("/" , (req , resp) => {
    resp.send("app is working")  
})


app.listen(process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}`)
});  