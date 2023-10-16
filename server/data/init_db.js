const mongoose = require('mongoose');
const config = require('../src/config/config');
const { Miner, Planet, Asteroid } = require('../src/models');

const main = async () => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
  await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));

  await seedPlanet(3);
  await seedAsteriod(20);
  await seedMiner(9);

  await mongoose.disconnect();
};

const seedAsteriod = async (numOfAsteriod) => {
  try {
    let data = []
    for (let i = 1; i <= numOfAsteriod; i++) {
      data.push({
        "name": "Asteroid " + i,
        "mineral": Math.floor(Math.random() * (1200 - 800 + 1) + 800),
        // "position": {
        //   "x": Math.floor(Math.random() * 1000),
        //   "y": Math.floor(Math.random() * 1000)
        // },
        "status": 1,
        "currentMiner": null
      })
    }

    await Asteroid.insertMany(data);
    console.log('Seeded Asteroid data successfully.');
  } catch (error) {
    console.error('Error seeding Asteroid data: ', error);
  }
}

const seedPlanet = async (numOfPlanet) => {

  try {
    let data = []

    for (let i = 1; i <= numOfPlanet; i++) {
      data.push({
        "name": "Planet " + i,
        "mineral": 0,
        "position": {
          "x": Math.floor(Math.random() * 1000),
          "y": Math.floor(Math.random() * 1000)
        },
      })
    }

    await Planet.insertMany(data);
    console.log('Seeded Planet data successfully.');
  } catch (error) {
    console.error('Error seeding Planet data: ', error);
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
        carryCapacity: Math.floor(Math.random() * 200) + 1,
        travelSpeed: Math.floor(Math.random() * 200) + 1, // 10 for debug
        miningSpeed: Math.floor(Math.random() * 200) + 1,
        status: 0,
        load: 0,
        // angle: 0, // For CSS rotation
      })
    }
    await Miner.insertMany(data);
    // const miners = await Miner.find().populate('planet').exec();
    // for (let miner of miners) {
    //   await storeHistory(miner, 0, HistoryModelStatus.MINER_SPAWN_ON_PLANET)
    // }
    console.log('Seeded Miner data successfully.');
  } catch (error) {
    console.error('Error seeding Miner data: ', error);
  }
}

const getRandomPlanet = async () => {
  // Get the count of all users
  const count = await Planet.count().exec();
  const random = Math.floor(Math.random() * count);
  const planet = await Planet.findOne().skip(random).exec()
  // planet.miners += 1;
  await planet.save();
  return planet;
}

main().then(() => {
  console.log("DB Flushed");
}, console.error);
