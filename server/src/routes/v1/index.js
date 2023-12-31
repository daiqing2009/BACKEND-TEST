const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const minerRoute = require('./miner.route');
const asteroidRoute = require('./asteroid.route');
const planetRoute = require('./planet.route');

const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/miners',
    route: minerRoute,
  },
  {
    path: '/asteroids',
    route: asteroidRoute,
  },
  {
    path: '/planets',
    route: planetRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
