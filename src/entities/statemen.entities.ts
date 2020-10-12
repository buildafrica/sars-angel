import { IStatemen } from './interface';
import * as airtable from '../core/airtable.provider';

export const getStatemen = async (): Promise<IStatemen[]> => {
	const params = {
		baseName: 'Recipients',
		baseView: 'Main'
	};

	const data = await airtable
		.getSimpleCollection(params)
		.all()
		.then((v) => v.map((record) => ({ id: record.id, ...record.fields })));
	return data;
};
