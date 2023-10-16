const mongoose = require('mongoose');

// const validator = require('validator');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate, geo } = require('./plugins');
// const { roles } = require('../config/roles');
const { minerStatus } = require('../config/minerStatus');

const { Schema } = mongoose;
const historySchema = mongoose.Schema(
  {
    miner: {
      type: Schema.Types.ObjectId,
      ref: 'Miner',
      required: true,
    },
    year: {
      type: Number,
      min: 0,
    },
    minerLoad: {
      type: Number,
      required: true,
    },
    position: {
      type: geo.pointSchema,
      required: true,
    },
    planet: {
      type: Schema.Types.ObjectId,
      ref: 'Planet',
    },
    target: {
      type: Schema.Types.ObjectId,
      ref: 'Asteroid',
    },
    stay: {
      place: String,
      id: mongoose.ObjectId,
    },
    status: {
      type: String,
      enum: [minerStatus.Idle, minerStatus.Mining, minerStatus.Traveling, minerStatus.Transfering],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
historySchema.plugin(toJSON);
historySchema.plugin(paginate);

/**
 * @typedef Miner
 */
const History = mongoose.model('History', historySchema);

module.exports = History;
