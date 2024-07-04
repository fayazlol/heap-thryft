import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema= new Schema(
  {
    username: {
        type: String,
        required: true,
      },

      productId: {
        type: mongoose.Types.ObjectId,
        ref: "ProductListing", 
        required: true,
      },

      isSent: {
        type: Boolean,
        required: true,
      },
      isReceived: {
        type: Boolean,
        required: true,
      },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);