import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const databaseName = process.env.DBNAME;
const databaseURL = process.env.DBURL;
console.log("HERE")
mongoose.connect(`${databaseURL}`,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console,"MongoDB connection error:"));

db.once('open', () => {
    console.log('Connected to MongoDB')
})

export default db;
