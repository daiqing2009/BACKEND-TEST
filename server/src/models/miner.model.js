const mongoose = require('mongoose');

const { Schema } = mongoose;

// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const MinerStatus = {
  IDLE: 'IDLE',
  TRAVELING: 'Traveling',
  MINING: 'Mining',
  TRANSFERING: 'Transfering',
};

const TravelTo = {
  ASTEROID: 'ASTEROID',
  PLANET: 'PLANET',
};

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
    load: {
      type: Number,
      min: 0,
      max: 200,
      required: true,
    },
    travelSpeed: {
      type: Number,
      min: 1,
      max: 200,
      required: true,
    },
    travelTo: {
      type: String,
      enum: [TravelTo.ASTEROID, TravelTo.PLANET],
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
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    angle: { type: Number },
    status: {
      type: String,
      enum: [MinerStatus.IDLE, MinerStatus.Mining, MinerStatus.Traveling, MinerStatus.Transfering],
      required: true,
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

module.exports = { Miner, MinerStatus, TravelTo };
