import { Request, Response, NextFunction } from 'express';
import DeckService from '@lib/application/deck-service.js';
import LoggerInterface from '@lib/application/ports/logger.interface';

export default class DeckController {
	private deckService: DeckService;
	private logger: LoggerInterface;

	constructor(deckService: DeckService, logger: LoggerInterface) {
		this.deckService = deckService;
		this.logger = logger;
	}

	getDeck = () => async (req: Request, res: Response, next: NextFunction) => {
		const deckId = req?.params?.deckId;

		if (!deckId) {
			return next(new Error('DECKID_MISSING'));
		}

		const deck = await this.deckService.openDeck(deckId).catch((err) => {
			return next(err);
		});

		this.logger.info({ message: 'deck reqeusted ' });

		res.json(deck);
	};

	createDeck = () => async (req: Request, res: Response, next: NextFunction) => {
		const { type, shuffled } = req?.body ?? {};

		if (!type) {
			return next(new Error('TYPE_MISSING'));
		}

		if (typeof shuffled !== 'boolean') {
			return next(new Error('SHUFFLED_MISSING'));
		}

		const deckId = await this.deckService.createDeck(type, shuffled).catch((err) => {
			return next(err);
		});

		this.logger.info({ message: 'deck created' });

		res.json(deckId);
	};

	drawCards = () => async (req: Request, res: Response, next: NextFunction) => {
		const { deckId, amount } = req?.body ?? {};

		if (!deckId) {
			return next(new Error('DECKID_MISSING'));
		}

		if (!amount) {
			return next(new Error('AMOUNT_MISSING'));
		}

		const response = await this.deckService.drawCards(deckId, amount).catch((err) => {
			return next(err);
		});

		this.logger.info({ message: `${response?.cards.length} card(s) drawn` });

		res.json(response);
	};
}
