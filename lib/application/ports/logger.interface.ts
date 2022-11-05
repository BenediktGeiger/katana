export type LogPayload = {
	message: string;
};

export default interface Logger {
	info(payload: LogPayload): void;
	warning(payload: LogPayload): void;
	error(payload: LogPayload): void;
}
