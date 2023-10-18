const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createMiner = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('miner', 'admin'),
  }),
};

const getMiners = {
  query: Joi.object().keys({
    planet: Joi.string(),
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
