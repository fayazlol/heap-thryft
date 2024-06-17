import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductListingSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImagePath: {
        type: String,
        required: true
    },
    productBrand: {
        type: String
    },
    productSize: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isDiscounted: {
        type: Boolean
    }
},
{ timestamps: true }
);

export default mongoose.models.ProductListing || mongoose.model("ProductListing", ProductListingSchema);

