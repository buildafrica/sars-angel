import logger from './core/logger';
import secrets from './core/secrets';
import server from './server';
import queue from './queue';

async function main() {
	queue();
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
