import express from 'express';
import * as BullBoard from 'bull-board';
import messengerRoute from './domains/messenger/routes';

const server = express();

/* For the UI */
server.use('/ui', BullBoard.UI);
server.use('/send', messengerRoute);
server.use('/_healthcheck', (_req, res) => {
	res.status(200).json({ uptime: process.uptime() });
});

export default server;
