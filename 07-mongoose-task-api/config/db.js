const mongoose = require("mongoose");

const connectToDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/assignments")
}

module.exports = connectToDB;