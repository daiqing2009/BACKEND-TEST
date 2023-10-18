const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { minerService } = require('../services');

const createMiner = catchAsync(async (req, res) => {
  const miner = await minerService.createMiner(req.body);
  res.status(httpStatus.CREATED).send(miner);
});

const getMiners = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['planet']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await minerService.queryMiners(filter, options);
  res.send(result);
});

const getMiner = catchAsync(async (req, res) => {
  const miner = await minerService.getMinerById(req.params.minerId);
  if (!miner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Miner not found');
  }
  res.send(miner);
});

const updateMiner = catchAsync(async (req, res) => {
  const miner = await minerService.updateMinerById(req.params.minerId, req.body);
  res.send(miner);
});

const deleteMiner = catchAsync(async (req, res) => {
  await minerService.deleteMinerById(req.params.minerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMiner,
  getMiners,
  getMiner,
  updateMiner,
  deleteMiner,
};
