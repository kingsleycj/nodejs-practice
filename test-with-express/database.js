const mongoose = require("mongoose");
const constants = require("./constant/constants");
const uri = process.env.DATABASE_URI;

const connectToMongoDB = () => {
  console.log("connecting to MongoDB...");
  mongoose.set("strictQuery", true);
  mongoose
    .connect(uri, {
      dbName: "hotel-management",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully Connected to MongoDB!");
    })
    .catch((err) => {
      console.log(err);
      console.log("An error occurred while connecting to MongoDB");
    });
};

module.exports = connectToMongoDB;
