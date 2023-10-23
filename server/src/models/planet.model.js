const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const planetSchema = mongoose.Schema(
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
    totalOfMiners: {
      type: Number,
      min: 0,
      required: true,
    },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
planetSchema.plugin(toJSON);
planetSchema.plugin(paginate);

/**
 * @typedef Miner
 */
const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;
