import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const TicketSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: "cart",
    default: null,
  },
  code: { type: Number, unique: true, index: true },
  purchase_datetime: { type: Date, default: Date.now },
  purchaser: { type: String, unique: true, index: true },
});

TicketSchema.plugin(mongoosePaginate);

TicketSchema.pre("save", async function (next) {
  if (!this.code) {
    const lastProduct = await this.constructor.findOne().sort({ code: -1 });
    const lastCode = lastProduct ? lastProduct.code : 0;
    this.code = lastCode + 1; 
  }
  next();
});

export const ticketModel = model("ticket", TicketSchema);
