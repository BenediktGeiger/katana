import { Request, Response, NextFunction } from 'express';
import { Services } from '@lib/config/service-locator';

const bindServices = (services: Services) => (req: Request, res: Response, next: NextFunction) => {
	req.logger = services.logger;
	next();
};

export default bindServices;
