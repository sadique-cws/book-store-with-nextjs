import mongoose from "mongoose";


const AddressSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact:{
        type:String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    type:{
        type: String,
        required: true,
        default: "home"
    }
});

export default mongoose.models.Address || mongoose.model("Address", AddressSchema);