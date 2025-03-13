import mongoose from 'mongoose';

const connectToDatabase=async ()=>{
    try{
        const databaseResponse=await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB:host:",databaseResponse.connection.name);

    }catch(error){
      console.log("Error connecting to databasse",error);
    }
}

export  default connectToDatabase;