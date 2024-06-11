import mongoose from "mongoose";

async function dbConnect(){
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("Connected to DB successfully");
    } catch (error) {
        throw new Error("Error connecting to mongoose");
    }

}
export default dbConnect;

//this is to connect to the database

