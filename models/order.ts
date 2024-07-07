import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema= new Schema(
  {
    buyer: {
        type: String,
        required: true,
      },
      seller: {
        type: String,
        required: true,
      },
      address: {
        type: Schema.Types.Mixed,
        required: true,
      },
      email: {
        type: String,
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
      xyz: {
        type: String,
        required: true,
      },
      created: {
        type: Number,  // Assuming it's a timestamp
        required: true,
      },
      cartId: {
        type: String,
        required: true,
      },
      productId: {
        type: String,
        required: true,
      },

  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);