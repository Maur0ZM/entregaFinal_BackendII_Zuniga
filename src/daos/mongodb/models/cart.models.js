import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const CartSchema = new Schema({
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, default: 1 }
        }
    ], 
    total: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
});

CartSchema.plugin(mongoosePaginate);

// Popula los productos cuando se use `find`
CartSchema.pre('find', function () {
    this.populate('products.productId'); // Ahora hay que popular `productId`
});

export const CartModel = model('cart', CartSchema);
