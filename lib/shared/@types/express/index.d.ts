import LoggerInterface from '@lib/application/ports/logger.interface';

declare global {
	namespace Express {
		interface Request {
			logger: LoggerInterface;
		}
	}
}
