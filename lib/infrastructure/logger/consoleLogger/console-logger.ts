/* eslint-disable no-console */
import LoggerInterface from '@lib/application/ports/logger.interface';
import { LogPayload } from '@lib/application/ports/logger.interface';

export default class ConsoleLogger implements LoggerInterface {
	info(payload: LogPayload): void {
		console.info(payload.message);
	}
	warning(payload: LogPayload): void {
		console.warn(payload.message);
	}
	error(payload: LogPayload): void {
		console.error(payload.message);
	}
}
