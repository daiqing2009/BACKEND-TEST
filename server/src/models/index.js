module.exports.Token = require('./token.model');
module.exports.User = require('./user.model');
const { Miner, MinerStatus, TravelTo } = require('./miner.model');
module.exports = { ...module.exports, Miner, MinerStatus, TravelTo };
module.exports.Planet = require('./planet.model');
module.exports.Asteroid = require('./asteroid.model');
const { History, HistoryStatus } = require('./history.model');
module.exports = { ...module.exports, History, HistoryStatus };
