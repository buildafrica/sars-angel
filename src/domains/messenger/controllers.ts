import { Request, Response, NextFunction } from 'express';

export default {
	createWorker: async (req: Request, res: Response, next: NextFunction) => {
		console.log(req.body);

		try {
			const model = req.body;
			const data = { holder: model };
			if (data !== null) {
				res.status(201).json({
					status: 'success',
					data
				});
			}
		} catch (error) {
			next(error);
		}
	},
	show: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const data = await { holder: id };
			res.status(200).json({
				status: 'success',
				data
			});
		} catch (error) {
			next(error);
		}
	}
};
