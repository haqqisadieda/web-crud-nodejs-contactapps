/* eslint-disable no-undef */
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected : ${con.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;