const { Schema, model } = require("mongoose");

const courtSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    },
    details: {
        accessibility: {
            fulltime: Boolean,
            opening: Number, 
            closing: Number
        },
        surface: {
            type: String,
            enum: [
                'concrete',
                'rubber',
                'other'
            ]
        },
        basketType: {
            type: String,
            enum: [
                'chain',
                'rope',
                'other'
            ]
        },
        lighting: Boolean,
        numBaskets: Number,
    },
    description: String,
    image: String
  },
  {
    timestamps: true,
  }
);

const Court = model("Court", courtSchema);

module.exports = Court;
