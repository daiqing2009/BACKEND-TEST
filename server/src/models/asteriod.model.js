const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');

const asteriodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mineral: {
      type: Number,
      min: 0,
      required: true,
    },
    initMineral: {
      type: Number,
      min: 0,
      required: true,
    },
    status: { type: Number, required: true },
    currentMiner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Miner',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
asteriodSchema.plugin(toJSON);
asteriodSchema.plugin(paginate);

/**
 * @typedef Miner
 */
const Asteriod = mongoose.model('Asteriod', asteriodSchema);

module.exports = Asteriod;
