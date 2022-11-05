import { Request, Response, NextFunction } from 'express';

type ErrorType = {
	message: string;
	status: number;
};

type ErrorMap = { [key: string]: ErrorType };

const errors: ErrorMap = {
	TYPE_NOT_SUPPORTED: {
		message: 'Deck type not supported',
		status: 400,
	},
	NOT_ENOUGH_CARDS: {
		message: 'Not enough cards remaining in the deck',
		status: 400,
	},
	DECKID_MISSING: {
		message: 'Please provide a deckId',
		status: 400,
	},
	AMOUNT_MISSING: {
		message: 'Please provide the amount of cards you want to draw',
		status: 400,
	},
	TYPE_MISSING: {
		message: 'Please provide a deck type',
		status: 400,
	},
	SHUFFLED_MISSING: {
		message: 'Please say if the deck should be shuffled or not',
		status: 400,
	},
	DECK_NOT_FOUND: {
		message: 'Deck not found',
		status: 404,
	},
	DECK_CREATION_FAILED: {
		message: 'Unable to create Deck',
		status: 500,
	},
	INVALID_DECK: {
		message: 'the processed deck is invalid',
		status: 500,
	},
	DRAWING_CARDS_FAILED: {
		message: 'unexpected error drawing cards',
		status: 500,
	},
	INVALID_CARD: {
		message: 'the processed card is invalid',
		status: 500,
	},
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	const knownError = errors[err.message];

	if (knownError) {
		return res.status(knownError.status).send(knownError);
	}

	return res.status(500).send({
		message: 'Server error',
		status: 500,
	});
};

export default errorHandler;
