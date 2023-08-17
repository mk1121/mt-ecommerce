// to run the script use node vesion:18
const fs = require("fs");
const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    // product delete from db
    await Product.deleteMany();
    console.log("Products are deleted");

    //check  images url response valid or not
    const data = JSON.parse(fs.readFileSync("backend/data/chaldalProducts.json"));
    let tempData = [];

    console.log('images response validate')
    for (let i = 0; i < data.length; i++) {
      const url = data[i].images[0].url;
      const response = await fetch(url);

      if (response.status === 200) {
        // Iterate over the existing data.
        console.log(i, 'of', data.length, 'image response status 200');
        tempData.push(data[i])
      }
    }
    const jsonString = JSON.stringify(tempData, null, 2);

    // product update in db
    await Product.insertMany(tempData);
    console.log("All Products are added.");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
