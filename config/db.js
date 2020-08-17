const mongoose = require('mongoose');

const connectDb = async () => {

    try {
        const con = await mongoose.connect(process.env.CONNECT_DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to ${con.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDb;