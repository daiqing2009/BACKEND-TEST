const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');

const asteroidSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    minerals: {
      type: Number,
      min: 0,
      required: true,
    },
    initMinerals: {
      type: Number,
      min: 0,
      required: true,
    },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
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
asteroidSchema.plugin(toJSON);
asteroidSchema.plugin(paginate);

/**
 * @typedef Miner
 */
const Asteroid = mongoose.model('Asteroid', asteroidSchema);

module.exports = Asteroid;
