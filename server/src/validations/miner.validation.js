const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createMiner = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    carryCapacity: Joi.number().integer().min(1).max(120),
    load: Joi.number().integer().min(0).max(120),
    travelSpeed: Joi.number().integer().min(1).max(120),
    miningSpeed: Joi.number().integer().min(1).max(120),
    planet: Joi.string().required(),
    status: Joi.string().required(),
  }),
};

const getMiners = {
  query: Joi.object().keys({
    planet: Joi.string(),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMiner = {
  params: Joi.object().keys({
    minerId: Joi.string().custom(objectId),
  }),
};

const updateMiner = {
  params: Joi.object().keys({
    minerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteMiner = {
  params: Joi.object().keys({
    minerId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMiner,
  getMiners,
  getMiner,
  updateMiner,
  deleteMiner,
};
