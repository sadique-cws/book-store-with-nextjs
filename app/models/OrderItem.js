import mongoose from "mongoose";


let OrderItemSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    OrderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required:true
    }
})

export default mongoose.models.OrderItem || mongoose.model("OrderItem", OrderItemSchema)