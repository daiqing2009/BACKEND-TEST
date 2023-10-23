const { History } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Store a history Item
 * @param {Object} minerBody
 * @returns {Promise<Miner>}
 */
const storeHistory = async (miner, currentTick, status) => {
  return await HistoryModel.create({
    year: currentTick,
    planet: miner.planet.name,
    mining: {
      current: miner.load,
      max: miner.carryCapacity,
      speed: miner.miningSpeed,
    },
    // traveling: {
    //   speed: {
    //     dx: travel.dx,
    //     dy: travel.dx,
    //   },
    //   angel: travel.angel,
    // },
    position: {
      x: Math.round(miner.x),
      y: Math.round(miner.y),
    },
    status: status,
    miner: miner,
  });
};

/**
 * Get miner by id
 * @param {ObjectId} id
 * @returns {Promise<Miner>}
 */
const getHistoryByMiner = async (miner) => {
  return History.find().where({ miner: miner.id }).populate('miner').exec();
};

/**
 * Update Planet by id
 * @param {ObjectId} PlanetId
 * @param {Object} updateBody
 * @returns {Promise<Planet>}
 */
// const fetchLatestHistories = async () => {
//   //TODO: find nearest asteroid
//   const history = await History.find().where({ miner: miner }).sort({ "year": -1 }).limit(1);
//   if (history && history.length > 0) {
//     return history[0];
//   } else {
//     return null;
//   }
// };

module.exports = {
  getHistoryByMiner,
  storeHistory,
  // fetchLatestHistories,
};
