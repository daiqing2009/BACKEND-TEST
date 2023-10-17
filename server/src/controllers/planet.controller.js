const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { planetService } = require('../services');

const getPlanets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await planetService.queryPlanets(filter, options);
  res.send(result);
});

module.exports = {
  getPlanets,
};
