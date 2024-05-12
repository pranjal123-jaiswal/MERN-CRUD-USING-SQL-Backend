// const mongoose = require("mongoose")
// mongoose.connect("mongodb://localhost:27017/e-commerce")
// // mongoose.connect("mongodb+srv://pranjalunoffical:Pranjal123@cluster0.aarjf5c.mongodb.net/")

// const { connection } = require("mongoose")
var mysql = require("mysql")
var connection = mysql.createConnection({
    host: "localhost",
    database: "products",
    user: "root",
    password: "root"
})

const createTables = () => {
    // Define SQL queries to create tables
    

  const createMaterialsTableQuery = `
    CREATE TABLE IF NOT EXISTS material (
      material_id INT AUTO_INCREMENT PRIMARY KEY,
      material_name VARCHAR(255)
    );
  `;

  const createCategoryTableQuery = `
    CREATE TABLE IF NOT EXISTS category (
      category_id INT AUTO_INCREMENT PRIMARY KEY,
      category_name VARCHAR(255)
    );
  `;

  const createProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS product (
      product_id INT AUTO_INCREMENT PRIMARY KEY,
      SKU VARCHAR(255),
      product_name VARCHAR(255),
      category_id INT,
      material_ids INT,
      FOREIGN KEY (category_id) REFERENCES category(category_id),
      FOREIGN KEY (material_ids) REFERENCES material(material_id),
      price DECIMAL(10, 2)
    );
  `;

  const createProductMediaTableQuery = `
    CREATE TABLE IF NOT EXISTS product_media (
      media_id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT,
      FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
      url VARCHAR(255) 
    );
  `;

    // Execute SQL queries to create tables   


    connection.query(createCategoryTableQuery, (err, results) => {
        if (err) throw err;
        console.log('Category table created successfully');
    });

      
    connection.query(createMaterialsTableQuery, (err, results) => {
        if (err) throw err;
        console.log('Materials table created successfully');
    });

    

    connection.query(createProductsTableQuery, (err, results) => {
        if (err) throw err;
        console.log('Products table created successfully');
    });

    connection.query(createProductMediaTableQuery, (err, results) => {
        if (err) throw err;
        console.log('Product_materials table created successfully'); 
    });
};

module.exports = { createTables , connection };
