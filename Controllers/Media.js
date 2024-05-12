const {connection} = require("../db/config") 

 const addMedia = async(req , resp) => {
    try {
        console.log("req.body" , req.body)
        const {   media_id , productId , mediaUrl   } = req.body;
        // Ensure required fields are present
        if ( !media_id || !productId || !mediaUrl ) {
          return resp.status(400).send("Missing required fields");
      } 

      await connection.beginTransaction(); 



    const insertQuery = `INSERT INTO product_media (media_id, product_id, url) VALUES (?, ?, ?)`;
    const insertValues = [media_id, productId, mediaUrl];
    
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
module.exports = {
    addMedia
}