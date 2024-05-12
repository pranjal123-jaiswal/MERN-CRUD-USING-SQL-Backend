const {connection} = require("../db/config") 

 const addMaterial = async(req , resp) => {
    try {
        console.log("req.body" , req.body)
        const {   materialId , material_name   } = req.body;
        // Ensure required fields are present
        if ( !materialId || !material_name ) {
          return resp.status(400).send("Missing required fields");
      } 
  
      // Start a transaction
      await connection.beginTransaction(); 



      const insertQuery = `INSERT INTO material (material_id, material_name) VALUES (?, ?)`;
      const insertValues = [materialId, material_name];
      
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

 const getMaterial = async(req , resp) => {
  try {
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = 5;
    let skip = (page - 1) * limit;

    // Begin a database transaction
    await connection.beginTransaction();

    // Execute SQL query to fetch categories with pagination
    const query = `SELECT * FROM material LIMIT ? OFFSET ?`;
    console.log("SQL Query:", query);
    console.log("Parameters:", [limit, skip]);
    
    await connection.query(query, [limit, skip], (err, results, fields) => {
        if (err) {
            // Rollback the transaction in case of an error
            connection.rollback();
            console.error("Error executing SQL query:", err);
            resp.status(500).send("Internal Server Error");
        } else {
            console.log("Results:", results);
            // Commit the transaction as the query was successful
            connection.commit();
            
            // Check if results were returned
            if (results && results.length > 0) {
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

module.exports = {
  addMaterial, getMaterial
}
