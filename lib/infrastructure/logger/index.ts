import ConsoleLogger from '@lib/infrastructure/logger/consoleLogger/console-logger';

import LoggerInterface from '@lib/application/ports/logger.interface';

export default {
	getLogger(): LoggerInterface {
		return new ConsoleLogger();
	},
};
