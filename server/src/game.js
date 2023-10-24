const { minerService, planetService, asteroidService, historyService } = require("./services");
const { HistoryStatus } = require("./models/history.model");
const { MinerStatus, TravelTo, Miner } = require("./models/miner.model");
const logger = require('./config/logger');

function Game(io) {

  let currentTick = 1;

  const tick = async () => {
    logger.debug(`Tick: ${currentTick}`);

    // const miners = await minerService.queryMiners();
    const miners = await Miner.find().populate('planet').populate('target').exec();
    // const planets = await planetService.queryPlanets();
    // const asteroids = await asteroidService.queryAsteroids();
    // minerService.bulkProcess(handleMiner);
    miners.map((miner) => {
      handleMiner(miner);
    })
    // await Miner.bulkSave(miners);

    io.emit('tick', {
      'miners': miners,
      // 'planets': planets,
      // 'asteroids': asteroids,
      'currentTick': currentTick
    });
    currentTick++;
    // setTimeout(tick, 1000/240); // 60 FPS for test
    setTimeout(tick, 1000);
  }

  // Update the miner
  const handleMiner = async (miner) => {
    switch (miner.status) {
      case MinerStatus.IDLE:
        await idle(miner);
        break;
      case MinerStatus.TRAVELING:
        await travelling(miner);
        break;
      case MinerStatus.MINING:
        await mining(miner);
        break;
      case MinerStatus.TRANSFERING:
        await transferring(miner);
        break;
      default:
        logger.error(`Unknown miner status: ${miner.status}`);
    }
    // if (miner.target._id !== miner.planet._id) await miner.planet.save();
  };

  const idle = async (miner) => {
    const asteroid = await asteroidService.findNextTarget(miner);
    // logger.debug(asteroid);
    if (asteroid) {
      miner.target = asteroid;
      miner.travelTo = TravelTo.ASTEROID;
      miner.status = MinerStatus.TRAVELING;
      await travelling(miner);
    }
  }

  // Move the miner to a target
  const travelling = async (miner) => {
    const historyStatus = (miner.travelTo === TravelTo.ASTEROID) ? HistoryStatus.TRAVELING_FROM_PLANET : HistoryStatus.TRAVELING_BACK_FROM_ASTEROID
    // logger.debug(miner.target.position);
    // logger.debug(miner.planet.position);
    let destX = (miner.travelTo === TravelTo.ASTEROID) ? miner.target.position.x : miner.planet.position.x;
    let destY = (miner.travelTo === TravelTo.ASTEROID) ? miner.target.position.y : miner.planet.position.y;
    let dx = destX - miner.position.x;
    let dy = destY - miner.position.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // logger.debug(`dx=${dx }& dy = ${dy} => distance = ${distance} vs. miner.travelSpeed = ${miner.travelSpeed}`)
    // arrived
    if (distance <= miner.travelSpeed) {
      miner.x = destX
      miner.y = destY
      miner.status = (miner.travelTo === TravelTo.ASTEROID) ? MinerStatus.MINING : MinerStatus.TRANSFERING
      await miner.save();
      return
    }

    // Travel
    let angle = Math.atan2(dy, dx);
    miner.position.x += Math.round(Math.cos(angle) * miner.travelSpeed);
    miner.position.y += Math.round(Math.sin(angle) * miner.travelSpeed);

    miner.angle = Math.round((angle * 180) / Math.PI);
    logger.debug(`${miner.name}: miner.position=${miner.position}& miner.angle = ${miner.angle} & distance = ${distance} vs. miner.travelSpeed = ${miner.travelSpeed}`);
    await miner.save();

    await historyService.storeHistory(miner, currentTick, historyStatus);
  }

  // Mine the asteroid
  const mining = async (miner) => {

    // // if no more minerals left or if we are full, return home
    // if (miner.load === miner.carryCapacity || miner.target.minerals === 0) {
    //   miner.status = MinerStatus.TRAVELING;
    //   miner.travelTo = TravelTo.PLANET;
    //   miner.target.currentMiner = null;
    //   await miner.target.save();
    //   await miner.save();
    //   return;
    // }

    // Start mining
    // miningSpeed = (miner.load + miner.miningSpeed) > miner.carryCapacity? miner.carryCapacity - miner.load: miner.miningSpeed;
    miner.load += Math.min(miner.miningSpeed, miner.carryCapacity);
    miner.target.minerals -= Math.min(miner.miningSpeed, miner.carryCapacity);
    // miner.target.currentMiner = miner;

    // if we over exceed our carry capacity, compensate @TODO this could be simplified with Math.min Math.max
    if (miner.load > miner.carryCapacity) {
      miner.load -= miner.load - miner.carryCapacity;
      miner.target.minerals += miner.load - miner.carryCapacity;
    }

    // if we go under zero, compensate @TODO this could be simplified with Math.min Math.max
    if (miner.target.minerals < 0) {
      miner.load -= miner.target.minerals;
      miner.target.minerals = 0;
    }

    // If we depleted the planet or reached mining capacity, return home
    if (miner.load === miner.carryCapacity || miner.target.minerals === 0) {
      miner.status = MinerStatus.TRAVELING;
      miner.travelTo = TravelTo.PLANET;
      miner.target.currentMiner = null;
      await miner.target.save();
      miner.target = null;
    }
    await miner.save();

    await historyService.storeHistory(miner, currentTick, HistoryStatus.MINING_ASTEROID);
  };

  // Transfer the minerals to the planet
  const transferring = async (miner) => {
    miner.planet.minerals += miner.load;
    miner.load = 0;
    miner.status = MinerStatus.IDLE;
    await miner.save();
    await historyService.storeHistory(miner, currentTick, HistoryStatus.TRANSFERRING_MINERALS_TO_PLANET);
  };

  tick().catch((err) => logger.error(err));
}

// export default Game
module.exports = { Game };
