const mongoose = require('mongoose');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

const HistorySchema = new Schema(
  {
    year: { type: Number, required: true },
    planet: { type: String, required: true },
    capacity: {
      current: { type: Number, required: true },
      max: { type: Number, required: true },
      speed: { type: Number, required: true },
    },
    traveling: {
      speed: {
        dx: { type: Number, required: true },
        dy: { type: Number, required: true },
      },
      angel: { type: Number, required: true },
    },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    status: { type: Number, required: true },
    miner: { type: mongoose.Schema.Types.ObjectId, ref: 'Miner' },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
HistorySchema.plugin(toJSON);
HistorySchema.plugin(paginate);

const History = mongoose.model('History', HistorySchema);

const HistoryModelStatus = {
  MINER_SPAWN_ON_PLANET: 1,
  TRAVELING_FROM_PLANET: 2,
  MINING_ASTEROID: 3,
  TRAVELING_BACK_FROM_ASTEROID: 4,
  TRANSFERRING_MINERALS_TO_PLANET: 5,
};

module.exports = { History, HistoryModelStatus };
