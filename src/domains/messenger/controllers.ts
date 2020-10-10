import express from 'express';

export default {
	index: (_req: express.Request, res: express.Response) => {
		res.send('messenger#index');
	},
	show: (_req: express.Request, res: express.Response) => {
		res.send('messenger#show');
	}
};
