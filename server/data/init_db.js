const mongoose = require('mongoose');
const config = require('../src/config/config');
const { Planet, Asteroid } = require('../src/models');
const { MinerStatus, TravelTo, Miner } = require("../src/models/miner.model");
const logger = require('../src/config/logger')

const main = async () => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
  await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));

  await seedPlanet(3);
  await seedAsteroid(20);
  await seedMiner(9);

  await mongoose.disconnect();
};

const seedAsteroid = async (numOfAsteroid) => {
  try {
    let data = []
    for (let i = 1; i <= numOfAsteroid; i++) {
      let initMinerals = Math.floor(Math.random() * (1200 - 800 + 1) + 800);
      data.push({
        "name": "Asteroid " + i,
        "minerals": initMinerals,
        "initMinerals": initMinerals,
        "position": {
          "x": Math.floor(Math.random() * 1000),
          "y": Math.floor(Math.random() * 1000)
        },
        "status": 1,
        "currentMiner": null
      })
    }

    await Asteroid.insertMany(data);
    logger.info('Seeded Asteroid data successfully.');
  } catch (error) {
    logger.error('Error seeding Asteroid data: ', error);
  }
}

const seedPlanet = async (numOfPlanet) => {

  try {
    let data = []

    for (let i = 1; i <= numOfPlanet; i++) {
      data.push({
        "name": "Planet " + i,
        "minerals": Math.floor(Math.random() * 3000),
        "totalOfMiners": 0,
        "position": {
          "x": Math.floor(Math.random() * 1000),
          "y": Math.floor(Math.random() * 1000)
        },
      });
    }
    await Planet.insertMany(data);
    logger.info('Seeded Planet data successfully.');

  } catch (error) {
    logger.error('Error seeding Planet data: ', error);
  }
}

const seedMiner = async (numOfPlanet) => {
  try {
    let data = []

    for (let i = 1; i <= numOfPlanet; i++) {

      const planet = await getRandomPlanet();

      data.push({
        name: 'Miner ' + i,
        planet: planet,
        // x: planet.position.x,
        // y: planet.position.y,
        carryCapacity: Math.floor(Math.random() * 100) + 1,
        travelSpeed: Math.floor(Math.random() * 100) + 1, // 10 for debug
        miningSpeed: Math.floor(Math.random() * 50) + 1,
        status: MinerStatus.IDLE,
        position: {
          x: planet.position.x,
          y: planet.position.y,
        },
        load: 0,
        // angle: 0, // For CSS rotation
      });
    }
    await Miner.insertMany(data);
    // const miners = await Miner.find().populate('planet').exec();
    // for (let miner of miners) {
    //   await storeHistory(miner, 0, HistoryModelStatus.MINER_SPAWN_ON_PLANET)
    // }
    logger.info('Seeded Miner data successfully.');
  } catch (error) {
    logger.error('Error seeding Miner data: ', error);
  }
}

const getRandomPlanet = async () => {
  // Get the count of all users
  const count = await Planet.count().exec();
  const random = Math.floor(Math.random() * count);
  const planet = await Planet.findOne().skip(random).exec();
  planet.totalOfMiners += 1;
  await planet.save();
  return planet;
}

main().then(() => {
  logger.info("DB Flushed");
}, logger.error);
