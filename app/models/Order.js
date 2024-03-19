import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dateOfOrder: {
        type: Date,
        default: Date.now
    },
    ordered: {
        type: Boolean,
        default: false
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Address",
        default: null
    }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
