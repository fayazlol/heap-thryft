import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  test:{
    type: String,
    required: true,
  },
  created: {
    type: Number,  // Assuming it's a timestamp
    required: true,
  },
  lineItems: {
    type: Array,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
