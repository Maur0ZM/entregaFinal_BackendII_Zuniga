import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    code: { type: Number, required: true, unique: true, index: true }, 
    price: { type: Number, required: true, min: 0 }, 
    status: { type: Boolean, default: true }, 
    stock: { type: Number, required: true, min: 0 }, 
    category: { type: String, required: true, trim: true, index: true },
    // image: { type: String },
}, { timestamps: true }); 

export const productModel = model('products', ProductSchema);
