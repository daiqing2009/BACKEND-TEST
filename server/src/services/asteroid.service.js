const httpStatus = require('http-status');
const { Asteroid } = require('../models');
const ApiError = require('../utils/ApiError');

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
  const asteroids = await Asteroid.paginate(filter, options);
  return asteroids;
};

/**
 * Get asteroid by id
 * @param {ObjectId} id
 * @returns {Promise<Asteroid>}
 */
const getAsteroidById = async (id) => {
  return Asteroid.findById(id);
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

module.exports = {
  queryAsteroids,
  getAsteroidById,
  updateAsteroidById,
};
