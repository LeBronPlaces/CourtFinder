const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    invitedPlayers: [
      {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }
  ],
    court: {
        type: Schema.Types.ObjectId,
        ref: 'Court'
    },
    date: Date,
    name: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;