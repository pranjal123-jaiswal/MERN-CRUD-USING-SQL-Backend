const {connection} = require("../db/config") 

 const addCategory = async(req , resp) => {
    try {
        console.log("req.body" , req.body)
        const {   categoryId , category   } = req.body;
        // Ensure required fields are present
        if ( !categoryId || !category ) {
          return resp.status(400).send("Missing required fields");
      } 
      await connection.beginTransaction(); 



      const insertQuery = `INSERT INTO category (category_id, category_name) VALUES (?, ?)`;
      const insertValues = [categoryId, category];
      
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
  
  
  } catch (error) {
      // Rollback the transaction in case of an error
      await connection.rollback();
      console.error("Error adding product:", error);
      resp.status(500).send("Internal server error");
  }
}

const getCategory = async (req, resp) => {
  try {
      let page = req.query.page ? parseInt(req.query.page) : 1;
      let limit = 5;
      let skip = (page - 1) * limit;

      // Begin a database transaction
      await connection.beginTransaction();

      // Execute SQL query to fetch categories with pagination
      const query = `SELECT * FROM category LIMIT ? OFFSET ?`;
      console.log("SQL Query:", query);
      console.log("Parameters:", [limit, skip]);
      
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


 const categoryStats = async(req , resp) => {
    try {
        await connection.beginTransaction();

      // Execute SQL query to fetch categories with pagination
      const query = ` SELECT 
      category_name,
      MAX(price) AS highest_price,
      SUM(CASE 
          WHEN price BETWEEN 0 AND 500 THEN 1
          ELSE 0
      END) AS 'fivehundred',
      SUM(CASE 
          WHEN price BETWEEN 501 AND 1000 THEN 1
          ELSE 0
      END) AS 'onethousand',
      SUM(CASE 
          WHEN price > 1000 THEN 1
          ELSE 0
      END) AS 'onethousandPlus'
  FROM 
      (
          SELECT 
              c.category_name,
              p.price
          FROM 
              product p
          JOIN 
              category c ON p.category_id = c.category_id
      ) AS subquery
  GROUP BY 
      category_name;`;
    //   console.log("SQL Query:", query);
    //   console.log("Parameters:", [limit, skip]);
      
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


        // await connection.beginTransaction();
    
        // // SQL Query to fetch category-wise highest price and product count within specified price ranges
        // const query = `
        //   SELECT 
        //       c.category_name,
        //       p.category_id,
        //       MAX(p.price) AS max_price,
        //       COUNT(*) AS product_count,
        //       CASE
        //           WHEN p.price BETWEEN 0 AND 500 THEN '0-500'
        //           WHEN p.price BETWEEN 501 AND 1000 THEN '501-1000'
        //           ELSE '1000+'
        //       END AS price_range
        //   FROM 
        //       products p
        //   JOIN
        //       categories c ON p.category_id = c.category_id
        //   GROUP BY 
        //       p.category_id,
        //       c.category_name,
        //       CASE
        //           WHEN p.price BETWEEN 0 AND 500 THEN '0-500'
        //           WHEN p.price BETWEEN 501 AND 1000 THEN '501-1000'
        //           ELSE '1000+'
        //       END;
        // `;
    
        // const [results] = await connection.query(query);
    
        // await connection.commit();
    
        // if (results.length > 0) {
        //   res.send(results);
        // } else {
        //   res.send({ result: "No Product found" });
        // }
      } catch (error) {
        await connection.rollback();
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }
}

module.exports = {
  addCategory , getCategory , categoryStats
}