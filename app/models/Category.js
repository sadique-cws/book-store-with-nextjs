import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
    catTitle:{type:String, required:true},
    catDesc:{type:String, required:true},
},{timestamps:true})


export default mongoose.models.Category || mongoose.model("Category", CategorySchema)

