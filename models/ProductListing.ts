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
    },
    discountPrice: {
        type: Number
    },
    productDescription: {
        type: String,
        required: true
    },
    productImage1: {
        type: String,
        required: true
    },
    productImage2: {
        type: String,
    },
    productImage3: {
        type: String,
    },
    productImage4: {
        type: String,
    },
    isMeetup: {
        type: Boolean
    },
    meetupLocation:{
        type: String
    },
    isDelivery: {
        type: Boolean
    },
    deliveryCost: {
        type: Number
    },
    isSold:{
        type: Boolean
    }

},
{ timestamps: true }
);

export default mongoose.models.ProductListing || mongoose.model("ProductListing", ProductListingSchema);

