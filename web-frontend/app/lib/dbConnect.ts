import mongoose from "mongoose";

const connection : {isConnected?:number}={};

async function dbConnect(){
    if (connection.isConnected){
        return (console.log("connected to db"));
    }
    const db = await mongoose.connect(process.env.MONGODB_URI!);

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;

//this is to connect to the database

