const mongoose = require('mongoose');

const { Schema } = mongoose;

// const validator = require('validator');
const { toJSON, paginate, geo } = require('./plugins');
// const { roles } = require('../config/roles');

const minerSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    carryCapacity: {
      type: Number,
      min: 1,
      max: 200,
      required: true,
    },
    travelSpeed: {
      type: Number,
      min: 1,
      max: 200,
      required: true,
    },
    miningSpeed: {
      type: Number,
      min: 1,
      max: 200,
      required: true,
    },
    planet: {
      type: Schema.Types.ObjectId,
      ref: 'Planet',
      required: true,
    },
    target: {
      type: Schema.Types.ObjectId,
      ref: 'Asteroid',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
minerSchema.plugin(toJSON);
minerSchema.plugin(paginate);

/**
 * @typedef Miner
 */
const Miner = mongoose.model('Miner', minerSchema);

module.exports = Miner;
