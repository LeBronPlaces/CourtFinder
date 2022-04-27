const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: [
        'admin',
        'user'
      ],
    },
    image: String,
    organizedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    playedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    invitations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
