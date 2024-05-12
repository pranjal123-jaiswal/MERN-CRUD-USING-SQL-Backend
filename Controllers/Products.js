const {connection} = require("../db/config") 

 const addProduct = async (req, resp) => {
    try {
      console.log("req.body" , req.body)
      const { productName, productId, sku, price,  categoryId , materialId   } = req.body;
      // Ensure required fields are present
      if (!productName || !productId || !sku || !price  || !categoryId || !materialId ) {
        return resp.status(400).send("Missing required fields");
    } 

    // Start a transaction
    await connection.beginTransaction(); 



    const insertQuery = `INSERT INTO product (product_id, SKU, product_name, category_id, material_ids, price) VALUES (?, ?, ?, ?, ?, ?)`;
    const insertValues = [productId, sku, productName, categoryId, materialId, price];
    
    await connection.query(insertQuery, insertValues, (err, results, fields) => {
        if (err) {
            // Rollback the transaction if an error occurs during insertion
            console.error("Error inserting product:", err);
            connection.rollback();
            return resp.status(500).send("Error adding product");
        } else {
            console.log("Product inserted successfully");
            // Commit the transaction after successful insertion
            connection.commit();
            resp.send("Product added successfully");
        }
    });

    // resp.send("Product added successfully");
} catch (error) {
    // Rollback the transaction in case of an error
    await connection.rollback();
    console.error("Error adding product:", error);
    resp.status(500).send("Internal server error");
}
      // const product = new Product(req.body); // Create a new User instance
      // const result = await product.save(); // Save the new user
      // // result = result.toObject();
      // // delete result.password
      // resp.send(result);
    // } catch (error) {
    //   resp.status(500).send(error);
    // } 
  }

 const getProducts = async(req, resp) => {
  try {
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = 5;
    let skip = (page - 1) * limit;

    // Begin a database transaction
    await connection.beginTransaction();

    // Execute SQL query to fetch categories with pagination
    const query = `SELECT p.*, c.category_name, m.material_name
    FROM product p
    INNER JOIN category c ON p.category_id = c.category_id
    INNER JOIN material m ON FIND_IN_SET(m.material_id, p.material_ids)
    LIMIT ? OFFSET ?`;
    // console.log("SQL Query:", query);
    // console.log("Parameters:", [limit, skip]);
    
    await connection.query(query, [limit, skip], (err, results, fields) => {
        if (err) {
            // Rollback the transaction in case of an error
            connection.rollback();
            console.error("Error executing SQL query:", err);
            resp.status(500).send("Internal Server Error");
        } else {
            
            // Commit the transaction as the query was successful
            connection.commit();
            
            // Check if results were returned
            if (results && results.length > 0) {
              console.log("Results:", results);
                resp.send(results);
            } else {
                resp.send({ result: "No Category found" });
            }
        }
    });
} catch (error) {
    console.error("Error:", error);
    resp.status(500).send("Internal Server Error");
}
  }

 const deleteProduct = async(req , resp) => {
    try {
        const { id } = req.params;
    
        if (!id) {
          return resp.status(400).send("Missing required fields");
        }

        const parsedId = parseInt(id)

        await connection.beginTransaction();

    // Execute SQL query to fetch categories with pagination
    const query = `DELETE FROM product WHERE product_id = ?`;
    // console.log("SQL Query:", query);
    // console.log("Parameters:", [limit, skip]);
    
    await connection.query(query, [parsedId ], (err, results, fields) => {
        if (err) {
            // Rollback the transaction in case of an error
            connection.rollback();
            console.error("Error executing SQL query:", err);
            resp.status(500).send("Internal Server Error");
        } else {
            
            // Commit the transaction as the query was successful
            connection.commit();
            
            // Check if results were returned
            if (results.affectedRows > 0) {
              resp.send({ message: "Product deleted successfully" });
            } else {
              resp.status(404).send({ message: "No product found with the provided ID" });
            }
        }
    });
    

        // }
      } catch (error) {
        await connection.rollback();
        console.error("Error deleting product:", error);
        resp.status(500).send("Error deleting product");
      }
    }

 const getProductById = async(req , resp) => {
    try {
        const { id } = req.params; // Destructure 'id' directly from req.params
    
        if (!id) {
          return resp.status(400).send("Missing required fields");
        }

        await connection.beginTransaction();

    // Execute SQL query to fetch categories with pagination
    const query = `SELECT 
    p.*,
    c.category_name,
    GROUP_CONCAT(m.material_name) AS material_names
  FROM 
    product p
  LEFT JOIN 
    category c ON p.category_id = c.category_id
  LEFT JOIN 
    material m ON FIND_IN_SET(m.material_id, p.material_ids)
  WHERE 
    p.product_id = ?
  LIMIT ?;`;
    // console.log("SQL Query:", query);
    // console.log("Parameters:", [limit, skip]);
    
    await connection.query(query, [id , 1], (err, results, fields) => {
        if (err) {
            // Rollback the transaction in case of an error
            connection.rollback();
            console.error("Error executing SQL query:", err);
            resp.status(500).send("Internal Server Error");
        } else {
            
            // Commit the transaction as the query was successful
            connection.commit();
            
            // Check if results were returned
            if (results && results.length > 0) {
              console.log("Results:", results);
                resp.send(results);
            } else {
                resp.send({ result: "No Category found" });
            }
        }
    });
    
        // await connection.beginTransaction();
    
        // const productInsertResult = await connection.query('SELECT * FROM product WHERE product_id = ? LIMIT 1', [id]); // Corrected SQL query
    
        // await connection.commit();
    
        // if (productInsertResult.length > 0) {
        //   resp.send(productInsertResult);
        // } else {
        //   resp.send({ result: "No Product found" });
        // }
      } catch (error) {
        await connection.rollback();
        resp.status(500).send(error);
      }
} 

 const updateProduct = async(req , resp) => {
    try {
        const { product_name, SKU, price, category_id, material_ids } = req.body;
        const { id } = req.params;
        const parsedId = parseInt(id)
    
        // Ensure required fields are present
        if (!product_name || !SKU || !price || !category_id || !material_ids) {
          return resp.status(400).send("Missing required fields");
        }
    
        if (!parsedId) {
          return resp.status(400).send("Missing required fields");
        }
    
        await connection.beginTransaction();

        const query = `UPDATE product SET product_name = ?, SKU = ?, price = ?, category_id = ?, material_ids = ? WHERE product_id = ?`;

        await connection.query(query, [product_name, SKU, price, category_id, material_ids, parsedId], (err, results, fields) => {
          if (err) {
              // Rollback the transaction in case of an error
              connection.rollback();
              console.error("Error executing SQL query:", err);
              resp.status(500).send("Internal Server Error");
          } else {
              
              // Commit the transaction as the query was successful
              connection.commit();
               
              // Check if results were returned
              if (results.affectedRows > 0) {  
                // If any rows were affected, send a success message
                resp.send({ message: "Product updated successfully" });
              } else {
                resp.status(404).send({ message: "No product found with the provided ID" });
              }
          }
      });
    
        // Update the product using a parameterized query to prevent SQL injection
        // const updateResult = await connection.query(
        //   'UPDATE product SET product_name = ?, SKU = ?, price = ?, category_id = ?, material_ids = ? WHERE product_id = ?',
        //   [product_name, SKU, price, category_id, material_ids, parsedId]
        // );
    
        // await connection.commit();
    
        // if (updateResult.affectedRows > 0) {
        //   // If any rows were affected, send a success message
        //   resp.send({ message: "Product updated successfully" });
        // } else {
        //   resp.status(404).send({ message: "No product found with the provided ID" });
        // }
      } catch (error) {
        await connection.rollback();
        console.error("Error updating product:", error);
        resp.status(500).send("Error updating product");
      }
}

 const getNoMediaProducts = async(req , resp) => {  
    try {
      await connection.beginTransaction();

      // Execute SQL query to fetch categories with pagination
      const query = `SELECT p.product_id, p.SKU, p.product_name, p.category_id, p.material_ids, p.price
      FROM product p
      LEFT JOIN product_media pm ON p.product_id = pm.product_id
      WHERE pm.product_id IS NULL;`;

      await connection.query(query, (err, results, fields) => {
          if (err) {
              // Rollback the transaction in case of an error
              connection.rollback();
              console.error("Error executing SQL query:", err);
              resp.status(500).send("Internal Server Error");
          } else {
              
              // Commit the transaction as the query was successful
              connection.commit();
              
              // Check if results were returned
              if (results && results.length > 0) {
                console.log("Results:", results);
                  resp.send(results);
              } else {
                  resp.send({ result: "No Category found" });
              }
          }
      });

    }catch (error) {
      await connection.rollback();
      resp.status(500).send(error);
    }
  }


  const search = async (req, resp) => {
    try {
        const { key } = req.query;
        let page = req.query.page ? req.query.page : 1;
        let limit = 5;
        let skip = (Number(page) - 1) * Number(limit);
    
        // Construct the SQL query to search on multiple fields using OR condition
        const query = `
        SELECT 
        p.product_id,
        p.SKU,
        p.product_name,
        c.category_name AS category,
        m.material_name AS material,
        CASE
            WHEN pm.media_id IS NOT NULL THEN 'Available'
            ELSE 'Not Available'
        END AS status
    FROM 
        product p
    JOIN 
        category c ON p.category_id = c.category_id
    JOIN 
        material m ON FIND_IN_SET(m.material_id, p.material_ids)
    LEFT JOIN 
        product_media pm ON p.product_id = pm.product_id
    WHERE 
        p.SKU LIKE ?
        OR p.product_name LIKE ?
        OR c.category_name LIKE ?
        OR m.material_name LIKE ?
    LIMIT ? OFFSET ?
        `;
    
        // Use '%' to allow partial matches
        const searchKey = `%${key}%`;
        await connection.beginTransaction();

        await connection.query(query, [searchKey, searchKey, searchKey, searchKey, limit, skip], (err, results, fields) => {
            if (err) {
                // Rollback the transaction in case of an error
                connection.rollback();
                console.error("Error executing SQL query:", err);
                resp.status(500).send("Internal Server Error");
            } else {
                // Commit the transaction as the query was successful
                connection.commit();
                
                // Check if results were returned
                if (results && results.length > 0) {
                    console.log("Results:", results);
                    resp.send(results);
                } else {
                    resp.send({ result: "No Category found" });
                }
            }
        });
    } catch (error) {
        await connection.rollback();
        console.error("Error searching products:", error);
        resp.status(500).send("Error searching products");
    }
};

    
      

module.exports = {
  addProduct , getProducts , deleteProduct , getProductById , updateProduct , getNoMediaProducts , search
}
