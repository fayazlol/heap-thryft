import mongoose from "mongoose";

const { Schema } = mongoose;

const CartSchema = new Schema(
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
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);