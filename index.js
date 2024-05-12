const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const databaseModel  = require("./db/config")
// const {connection} = require("./db/config") 
const ProductsRoutes = require("./Routes/Product.js")
const MediaRoutes = require("./Routes/Media.js")
const MaterialRoutes = require("./Routes/Material.js")
const CategoryRoutes = require("./Routes/Category.js")
// const User = require("./db/user")
// const Product = require("./db/produc")
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

// app.post("/register", async (req, resp) => {
//     try {
//       const newUser = new User(req.body); // Create a new User instance
//       const result = await newUser.save(); // Save the new user
//       result = result.toObject();
//       delete result.password
//       resp.send(result);
//     } catch (error) {
//       resp.status(500).send(error);
//     }
//   });

// app.post("/login", async (req, resp) => {
//     try {
//         if (req.body.password && req.body.email) {
//       let user = await User.findOne(req.body).select("-password");
//       if (user) {
//         resp.send(user)
//       }
//       else {
//         resp.send({result : "No Data Found "})
//       }
//     }else {
//         resp.send({result : "No Data Found "})
//     }
      
//     } catch (error) {
//       resp.status(500).send(error);
//     }
//   });

// app.post("/add-product", async (req, resp) => {
//     try {
//       console.log("req.body" , req.body)
//       const { productName, productId, sku, price,  categoryId , materialId   } = req.body;
//       // Ensure required fields are present
//       if (!productName || !productId || !sku || !price  || !categoryId || !materialId ) {
//         return resp.status(400).send("Missing required fields");
//     } 

//     // Start a transaction
//     await connection.beginTransaction(); 



//     const productInsertResult = await connection.query("INSERT INTO product (product_id, SKU, product_name, category_id, material_ids , price) VALUES (?, ?, ?, ?, ?)", [productId, sku, productName, categoryId, materialId , price]);

//     await connection.commit();

//     resp.send("Product added successfully");
// } catch (error) {
//     // Rollback the transaction in case of an error
//     await connection.rollback();
//     console.error("Error adding product:", error);
//     resp.status(500).send("Internal server error");
// }
//       // const product = new Product(req.body); // Create a new User instance
//       // const result = await product.save(); // Save the new user
//       // // result = result.toObject();
//       // // delete result.password
//       // resp.send(result);
//     // } catch (error) {
//     //   resp.status(500).send(error);
//     // } 
//   });


//   app.post("/add-category", async (req, resp) => {
//     try {
//       console.log("req.body" , req.body)
//       const {   categoryId , category   } = req.body;
//       // Ensure required fields are present
//       if ( !categoryId || !category ) {
//         return resp.status(400).send("Missing required fields");
//     } 

//     // Start a transaction
//     await connection.beginTransaction(); 

//     // Insert material data
//     // const materialInsertResult = await connection.query("INSERT INTO material (material_id, material_name) VALUES (?, ?)", [materialId, material_name]);

//     // Insert category data
//     const categoryInsertResult = await connection.query("INSERT INTO category (category_id, category_name) VALUES (?, ?)", [categoryId, category]);


//     // Insert product data
//     // const productInsertResult = await connection.query("INSERT INTO product (product_id, SKU, product_name, category_id, material_ids , price) VALUES (?, ?, ?, ?, ?)", [productId, sku, productName, categoryId, materialId , price]);

//     // Insert product media data
//     // const productMediaInsertResult = await connection.query("INSERT INTO product_media (media_id, product_id, url) VALUES (?, ?, ?)", [media_id, productId, mediaUrl]);

//     // Commit the transaction
//     await connection.commit();

//     resp.send("Product added successfully");
// } catch (error) {
//     // Rollback the transaction in case of an error
//     await connection.rollback();
//     console.error("Error adding product:", error);
//     resp.status(500).send("Internal server error");
// }
//       // const product = new Product(req.body); // Create a new User instance
//       // const result = await product.save(); // Save the new user
//       // // result = result.toObject();
//       // // delete result.password
//       // resp.send(result);
//     // } catch (error) {
//     //   resp.status(500).send(error);
//     // } 
//   });

//   app.post("/add-material", async (req, resp) => {
//     try {
//       console.log("req.body" , req.body)
//       const {   materialId , material_name   } = req.body;
//       // Ensure required fields are present
//       if ( !materialId || !material_name ) {
//         return resp.status(400).send("Missing required fields");
//     } 

//     // Start a transaction
//     await connection.beginTransaction(); 

//     // Insert material data
//     const materialInsertResult = await connection.query("INSERT INTO material (material_id, material_name) VALUES (?, ?)", [materialId, material_name]);

//     // Insert category data
//     // const categoryInsertResult = await connection.query("INSERT INTO category (category_id, category_name) VALUES (?, ?)", [categoryId, category]);


//     // Insert product data
//     // const productInsertResult = await connection.query("INSERT INTO product (product_id, SKU, product_name, category_id, material_ids , price) VALUES (?, ?, ?, ?, ?)", [productId, sku, productName, categoryId, materialId , price]);

//     // Insert product media data
//     // const productMediaInsertResult = await connection.query("INSERT INTO product_media (media_id, product_id, url) VALUES (?, ?, ?)", [media_id, productId, mediaUrl]);

//     // Commit the transaction
//     await connection.commit();

//     resp.send("Product added successfully");
// } catch (error) {
//     // Rollback the transaction in case of an error
//     await connection.rollback();
//     console.error("Error adding product:", error);
//     resp.status(500).send("Internal server error");
// }
//       // const product = new Product(req.body); // Create a new User instance
//       // const result = await product.save(); // Save the new user
//       // // result = result.toObject();
//       // // delete result.password
//       // resp.send(result);
//     // } catch (error) {
//     //   resp.status(500).send(error);
//     // } 
//   });

//   app.post("/add-media", async (req, resp) => {
//     try {
//       console.log("req.body" , req.body)
//       const {   media_id , productId , mediaUrl   } = req.body;
//       // Ensure required fields are present
//       if ( !media_id || !productId || !mediaUrl ) {
//         return resp.status(400).send("Missing required fields");
//     } 

//     // Start a transaction
//     await connection.beginTransaction(); 

//     // Insert material data
//     // const materialInsertResult = await connection.query("INSERT INTO material (material_id, material_name) VALUES (?, ?)", [materialId, material_name]);

//     // Insert category data
//     // const categoryInsertResult = await connection.query("INSERT INTO category (category_id, category_name) VALUES (?, ?)", [categoryId, category]);


//     // Insert product data
//     // const productInsertResult = await connection.query("INSERT INTO product (product_id, SKU, product_name, category_id, material_ids , price) VALUES (?, ?, ?, ?, ?)", [productId, sku, productName, categoryId, materialId , price]);

//     // Insert product media data
//     const productMediaInsertResult = await connection.query("INSERT INTO product_media (media_id, product_id, url) VALUES (?, ?, ?)", [media_id, productId, mediaUrl]);

//     // Commit the transaction
//     await connection.commit();

//     resp.send("Product added successfully");
// } catch (error) {
//     // Rollback the transaction in case of an error
//     await connection.rollback();
//     console.error("Error adding product:", error);
//     resp.status(500).send("Internal server error");
// }
//       // const product = new Product(req.body); // Create a new User instance
//       // const result = await product.save(); // Save the new user
//       // // result = result.toObject();
//       // // delete result.password
//       // resp.send(result);
//     // } catch (error) {
//     //   resp.status(500).send(error);
//     // } 
//   });

//   app.get("/products", async (req, resp) => {
//     try {
//         let page = req.query.page ? req.query.page : 1;
//         let limit = 5;
//         let skip = (Number(page) - 1) * Number(limit);

//         await connection.beginTransaction();

//         const [products] = await connection.execute('SELECT * FROM product LIMIT ? OFFSET ?', [limit, skip]);
//         await connection.commit();

//         if (products.length > 0) {
//             resp.send(products);
//         } else {
//             resp.send({ result: "No Product found" });
//         }
//     } catch (error) {
//         await connection.rollback();
//         resp.status(500).send(error);
//     }
//   });

//   app.get("/getCategory", async (req, resp) => {
//     try {
//       let page = req.query.page ? req.query.page : 1;
//       let limit = 5;
//       let skip = (Number(page) - 1) * Number(limit);
  
//       await connection.beginTransaction();
  
//       const results = await connection.query('SELECT * FROM category LIMIT ? OFFSET ?', [limit, skip]);
//       console.log("Results:", results); // Log the value of results to the console
  
//       await connection.commit();
  
//       if (results._results && results._results.length > 0) {
//         resp.send(results._results);
//       } else {
//         resp.send({ result: "No Product found" });
//       }
//     } catch (error) {
//       await connection.rollback();
//       console.error("Error executing SQL query:", error);
//       resp.status(500).send(error);
//     }
//   });
  

//   app.get("/getMaterial", async (req, resp) => {
//   try {
//       let page = req.query.page ? req.query.page : 1;
//       let limit = 5;
//       let skip = (Number(page) - 1) * Number(limit);

//       await connection.beginTransaction();

//       const results = await connection.query('SELECT * FROM material LIMIT ? OFFSET ?', [limit, skip]);
//       await connection.commit();

//       if (results._results && results._results.length > 0) {
//         resp.send(results._results);
//       } else {
//         resp.send({ result: "No Product found" });
//       }
//   } catch (error) {
//       await connection.rollback();
//       resp.status(500).send(error);
//   }
//   });

  

//   app.delete("/products/:id", async (req, resp) => {
//     try {
//       const { id } = req.params;
  
//       if (!id) {
//         return resp.status(400).send("Missing required fields");
//       }
  
//       await connection.beginTransaction();
  
//       const deleteResult = await connection.query('DELETE FROM product WHERE product_id = ?', [id]);
  
//       await connection.commit();
  
//       if (deleteResult.affectedRows > 0) {
//         resp.send({ message: "Product deleted successfully" });
//       } else {
//         resp.status(404).send({ message: "No product found with the provided ID" });
//       }
//     } catch (error) {
//       await connection.rollback();
//       console.error("Error deleting product:", error);
//       resp.status(500).send("Error deleting product");
//     }
//   });
  

//   app.get("/products/:id", async (req, resp) => {
//     try {
//       const { id } = req.params; // Destructure 'id' directly from req.params
  
//       if (!id) {
//         return resp.status(400).send("Missing required fields");
//       }
  
//       await connection.beginTransaction();
  
//       const productInsertResult = await connection.query('SELECT * FROM product WHERE product_id = ? LIMIT 1', [id]); // Corrected SQL query
  
//       await connection.commit();
  
//       if (productInsertResult.length > 0) {
//         resp.send(productInsertResult);
//       } else {
//         resp.send({ result: "No Product found" });
//       }
//     } catch (error) {
//       await connection.rollback();
//       resp.status(500).send(error);
//     }
//   });
  

//   app.put("/products/:id", async (req, resp) => {
//     try {
//       const { productName, sku, price, categoryId, materialId } = req.body;
//       const { id } = req.params;
  
//       // Ensure required fields are present
//       if (!productName || !sku || !price || !categoryId || !materialId) {
//         return resp.status(400).send("Missing required fields");
//       }
  
//       if (!id) {
//         return resp.status(400).send("Missing required fields");
//       }
  
//       await connection.beginTransaction();
  
//       // Update the product using a parameterized query to prevent SQL injection
//       const updateResult = await connection.query(
//         'UPDATE product SET productName = ?, sku = ?, price = ?, categoryId = ?, materialId = ? WHERE product_id = ?',
//         [productName, sku, price, categoryId, materialId, id]
//       );
  
//       await connection.commit();
  
//       if (updateResult.affectedRows > 0) {
//         // If any rows were affected, send a success message
//         resp.send({ message: "Product updated successfully" });
//       } else {
//         resp.status(404).send({ message: "No product found with the provided ID" });
//       }
//     } catch (error) {
//       await connection.rollback();
//       console.error("Error updating product:", error);
//       resp.status(500).send("Error updating product");
//     }
//   });
  

//   app.get("/search/:key", async (req, resp) => {
//     try {
//       const key = req.params.key;
//       let page = req.query.page ? req.query.page : 1;
//       let limit = 5;
//       let skip = (Number(page) - 1) * Number(limit);
  
//       // Construct the SQL query to search on multiple fields using OR condition
//       const query = `
//         SELECT * FROM products
//         WHERE productName LIKE ? 
//         OR sku LIKE ? 
//         OR price LIKE ? 
//         OR categoryId LIKE ? 
//         OR materialId LIKE ?
//         LIMIT ? OFFSET ?
//       `;
  
//       // Use '%' to allow partial matches
//       const searchKey = `%${key}%`;
//       await connection.beginTransaction();
  
//       // Execute the query with the search key parameterized for security
//       const [result] = await connection.query(query, [searchKey, searchKey, searchKey, searchKey, searchKey , limit, skip]);
//       await connection.commit();
//       if (result.length > 0) {
//         resp.send(result);
//       } else {
//         resp.send({ result: "No Product found" });
//       }
//     } catch (error) {
//       await connection.rollback();
//       console.error("Error updating product:", error);
//       resp.status(500).send("Error getting product");
//     }
//   });

//   app.get("/getNoMediaProducts", async (req, res) => {
//     try {
//       await connection.beginTransaction();
  
//       const [products] = await connection.query(`
//         SELECT product.*
//         FROM product
//         LEFT JOIN product_media ON product.product_id = product_media.product_id
//         WHERE product_media.product_id IS NULL
//       `);
  
//       await connection.commit();
  
//       if (products.length > 0) {
//         res.send(products);
//       } else {
//         res.send({ result: "No Product found" });
//       }
//     } catch (error) {
//       await connection.rollback();
//       res.status(500).send(error);
//     }
//   });

//   app.get("/categoryStats", async (req, res) => {
//     try {
//       await connection.beginTransaction();
  
//       // SQL Query to fetch category-wise highest price and product count within specified price ranges
//       const query = `
//         SELECT 
//             c.category_name,
//             p.category_id,
//             MAX(p.price) AS max_price,
//             COUNT(*) AS product_count,
//             CASE
//                 WHEN p.price BETWEEN 0 AND 500 THEN '0-500'
//                 WHEN p.price BETWEEN 501 AND 1000 THEN '501-1000'
//                 ELSE '1000+'
//             END AS price_range
//         FROM 
//             products p
//         JOIN
//             categories c ON p.category_id = c.category_id
//         GROUP BY 
//             p.category_id,
//             c.category_name,
//             CASE
//                 WHEN p.price BETWEEN 0 AND 500 THEN '0-500'
//                 WHEN p.price BETWEEN 501 AND 1000 THEN '501-1000'
//                 ELSE '1000+'
//             END;
//       `;
  
//       const [results] = await connection.query(query);
  
//       await connection.commit();
  
//       if (results.length > 0) {
//         res.send(results);
//       } else {
//         res.send({ result: "No Product found" });
//       }
//     } catch (error) {
//       await connection.rollback();
//       console.error("Error:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });
  
  


app.listen(process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}`)
});  