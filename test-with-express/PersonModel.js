const { model, Schema, Types } = require("mongoose");
const constants = require("constants");
const { DATABASES } = constants;
const ObjectId = Types.ObjectId;

const room_Schema = new Schema(
  {
    codeName: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    roomType: {
      type: ObjectId,
      required: true,
      enum: ["Suites", "Presidential Suites", "Deluxe", "Twin Room"],
    },
  },
  {
    timestamps: true,
  }
);

const Rooms = model(constants.DATABASES, room_Schema);

module.exports = Rooms;
