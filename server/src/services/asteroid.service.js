const httpStatus = require('http-status');
const { Asteroid } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

/**
 * Query for asteroids
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAsteroids = async (filter, options) => {
  const asteroids = await Asteroid.paginate(filter, { ...options, populate: 'currentMiner' });
  return asteroids;
};

/**
 * Get asteroid by id
 * @param {ObjectId} id
 * @returns {Promise<Asteroid>}
 */
const getAsteroidById = async (id) => {
  return Asteroid.findById(id).populate('currentMiner');
};

/**
 * Update asteroid by id
 * @param {ObjectId} asteroidId
 * @param {Object} updateBody
 * @returns {Promise<Asteroid>}
 */
const updateAsteroidById = async (asteroidId, updateBody) => {
  const asteroid = await getAsteroidById(asteroidId);
  if (!asteroid) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Asteroid not found');
  }
  if (updateBody.email && (await Asteroid.isEmailTaken(updateBody.email, asteroidId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(asteroid, updateBody);
  await asteroid.save();
  return asteroid;
};

const findNextTarget = async (miner) => {
  // const random = Math.floor(Math.random() * arr.length);
  const asteroid = await Asteroid.findOneAndUpdate(
    { minerals: { $gt: 0 }, currentMiner: null },
    { currentMiner: miner.id }
  ).exec();
  // if (asteroid) {
  //   asteroid.currentMiner = miner;
  //   await asteroid.save();
  // }
  logger.debug(asteroid);

  return asteroid;
};

module.exports = {
  queryAsteroids,
  getAsteroidById,
  updateAsteroidById,
  findNextTarget,
};
