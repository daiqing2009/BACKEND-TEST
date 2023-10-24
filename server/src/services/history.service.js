const { History, HistoryStatus } = require('../models/history.model');
const logger = require('../config/logger');

const ApiError = require('../utils/ApiError');

/**
 * Store a history Item
 * @param {Object} minerBody
 * @returns {Promise<Miner>}
 */
const storeHistory = async (miner, currentTick, status) => {
  // logger.debug(miner);
  return await History.create({
    year: currentTick,
    planet: miner.planet.name,
    mining: {
      load: miner.load,
      max: miner.carryCapacity,
      speed: (status === HistoryStatus.MINING_ASTEROID) ? miner.miningSpeed : 0,
    },
    traveling: {
      speed: (status === HistoryStatus.TRAVELING_FROM_PLANET | status === HistoryStatus.TRAVELING_BACK_FROM_ASTEROID) ? miner.travelSpeed : 0,
      angel: miner.angel,
    },
    position: {
      x: Math.round(miner.position.x),
      y: Math.round(miner.position.y),
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
  logger.debug(miner);
  return History.find({miner:miner }).sort({ 'year': -1 }).populate('miner').exec();
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
