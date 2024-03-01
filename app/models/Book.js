import mongoose from "mongoose"
import Category from "./Category"

const BookSchema = new mongoose.Schema({
    title:{type:String, required:true},
    author:{type:String, required:true},
    description:{type:String, required:true},
    category:{type:mongoose.Schema.Types.ObjectId, required:true, ref:Category},
    price:{type:Number, required:true},
    discountPrice:{type:Number},
    status:{type:Boolean, default:true},
    coverImage:{type:String, required:true},

},{timestamps:true})


export default mongoose.models.Book || mongoose.model("Book", BookSchema)

