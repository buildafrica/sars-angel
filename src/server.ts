import express from 'express';
import * as BullBoard from 'bull-board';
// import bullRoutes from './domains/bull/routes';

const server = express();

/* For the UI */
server.use('/', BullBoard.UI);
server.use('/_healthcheck', (_req, res) => {
	res.status(200).json({ uptime: process.uptime() });
});

export default server;
