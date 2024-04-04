import express from 'express';
import healthRoute from './health.route';
import docsRoute from './docs.route';
import config from '../../config/config';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/health',
    route: healthRoute
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
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

export default router;
