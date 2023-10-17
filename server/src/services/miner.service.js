const httpStatus = require('http-status');
const { Miner } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a miner
 * @param {Object} minerBody
 * @returns {Promise<Miner>}
 */
const createMiner = async (minerBody) => {
  return Miner.create(minerBody);
};

/**
 * Query for miners
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMiners = async (filter, options) => {
  const miners = await Miner.paginate(filter, { ...options, populate: 'planet' });
  return miners;
};

/**
 * Get miner by id
 * @param {ObjectId} id
 * @returns {Promise<Miner>}
 */
const getMinerById = async (id) => {
  return Miner.findById(id).populate('planet');
};

/**
 * Update miner by id
 * @param {ObjectId} minerId
 * @param {Object} updateBody
 * @returns {Promise<Miner>}
 */
const updateMinerById = async (minerId, updateBody) => {
  const miner = await getMinerById(minerId);
  if (!miner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Miner not found');
  }
  Object.assign(miner, updateBody);
  await miner.save();
  return miner;
};

/**
 * Delete miner by id
 * @param {ObjectId} minerId
 * @returns {Promise<Miner>}
 */
const deleteMinerById = async (minerId) => {
  const miner = await getMinerById(minerId);
  if (!miner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Miner not found');
  }
  await miner.remove();
  return miner;
};

/**
 * Query for history of certain miner
 * @param {ObjectId} minerId
 * @returns {Promise<History>}
 */
const getMinerHistory = async (minerId, filter, options) => {
  const miner = await getMinerById(minerId);
  if (!miner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Miner not found');
  }
  const history = await Miner.paginate(filter, options);
  return history;
};

module.exports = {
  createMiner,
  queryMiners,
  getMinerById,
  updateMinerById,
  deleteMinerById,
  getMinerHistory,
};
