import mongoose from "mongoose";

const { Schema } = mongoose;

const FavouriteSchema = new Schema(
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

export default mongoose.models.Favourite || mongoose.model("Favourite", FavouriteSchema);