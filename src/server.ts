import express from 'express';

import bullRoutes from './domains/bull/routes';

const server = express();

server.use('/bull', bullRoutes);
server.use('/_healthcheck', (_req, res) => {
	res.status(200).json({ uptime: process.uptime() });
});

export default server;
