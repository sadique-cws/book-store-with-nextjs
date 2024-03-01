import mongoose from "mongoose";


const ConnectDb = () => {
    try{
        const connect = mongoose.connect("mongodb://localhost:27017/book-store");
    }
    catch(e){
        throw new Error("db connection failed");
    }
}

export default ConnectDb