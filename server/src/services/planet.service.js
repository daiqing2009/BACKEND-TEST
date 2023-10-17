const httpStatus = require('http-status');
const { Planet } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for Planet
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPlanets = async (filter, options) => {
  const planets = await Planet.paginate(filter, options);
  return planets;
};

/**
 * Get Planet by id
 * @param {ObjectId} id
 * @returns {Promise<Planet>}
 */
const getPlanetById = async (id) => {
  return Planet.findById(id);
};

/**
 * Update Planet by id
 * @param {ObjectId} PlanetId
 * @param {Object} updateBody
 * @returns {Promise<Planet>}
 */
const updatePlanetById = async (PlanetId, updateBody) => {
  const planet = await getPlanetById(PlanetId);
  if (!planet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Planet not found');
  }

  Object.assign(planet, updateBody);
  await Planet.save();
  return Planet;
};

module.exports = {
  queryPlanets,
  getPlanetById,
  updatePlanetById,
};
