const mongoose = require("mongoose");
const { config } = require("dotenv");
config();

const mongoURI = process.env.MONGODB_URI;

async function start() {
  try {
    // Connecting to MongoDB using Mongoose
    await mongoose.connect(mongoURI);

    console.log("Connected to Database");

    // Exporting the mongoose connection
    module.exports = mongoose;

    const app = require("./app");

    // Starting the server
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with failure
  }
}

start();
