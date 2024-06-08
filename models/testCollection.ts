import mongoose, {Document, Schema } from "mongoose";

export interface ITestCollection extends Document {
    name: string;
    price: number;
    description: string;
}

const testcollectionSchema: Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,

    },
    description:{
        type: String,
    },
});

const TestCollection = mongoose.models.TestCollection || mongoose.model<ITestCollection>("TestCollection", testcollectionSchema);

export default TestCollection;