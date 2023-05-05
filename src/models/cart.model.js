import mongoose from "mongoose";
const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  id: Number,
  products: [
    {
      code: String,
      quantity: Number,
    },
  ],
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
