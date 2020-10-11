import logger from './core/logger';
import secrets from './core/secrets';
import server from './server';
import queue from './queue';
import * as airtable from './core/airtable.provider';

async function main() {
	const options = {
		baseName: 'Scheduled_Processes',
		limit: 10,
		baseView: 'Main'
	};
	const payload = {
		Name: 'west',
		Notes: 'note',
		Status: 'island',
		'No of Recipients': '20'
	};

	const simple = airtable.getSimpleCollection(options);
	console.log(await simple.all().then((v) => v.map((w) => w._rawJson)));
	const create = airtable.createOneRecord('Scheduled_Processes', payload);
	console.log(create);

	/* Instantiate the Redis Queue Here */
	queue();

	/* Start & Listen on HTTP Server */
	await server.listen({ port: secrets.PORT, host: secrets.HOST });
	logger.info(`Running at http://${secrets.HOST}:${secrets.PORT}`);
}

process.on('unhandledRejection', (err) => {
	if (err) {
		console.error(err);
		logger.debug(err);
	}
	process.exit(1);
});

main();
