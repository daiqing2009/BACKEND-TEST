const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { asteroidService } = require('../services');

const getAsteroids = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await asteroidService.queryAsteroids(filter, options);
  res.send(result);
});

module.exports = {
  getAsteroids,
};
