const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: { type: String, required: true },
  hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
  room: { type: Array, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  createdAt: { type: Date, required: true },
  // status: { type: String, required: true },
});
module.exports = mongoose.model("Transaction", transactionSchema);
