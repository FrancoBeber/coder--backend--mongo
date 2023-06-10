import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  role: String,
  carts: {
    type: [
      {
        cart: {
          type: mongoose.Schema.Types.Number,
          ref: "carts",
        },
      },
    ],
    default: [],
  },
});

mongoose.set("strictQuery", false);

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
