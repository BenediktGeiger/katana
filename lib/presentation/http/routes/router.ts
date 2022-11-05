import express from 'express';
import DeckController from '@lib/presentation/http/controllers/deckController';
import { Services } from '@lib/config/service-locator';
import { sanitizer } from '@lib/presentation/http/middlewares/index';

const router = express.Router();

const Endpoints = Object.freeze({
	DECKS: '/decks',
	DECK: '/decks/:deckId',
});

export default (server: express.Express, services: Services) => {
	const deckController = new DeckController(services.deckService, services.logger);

	router.get(Endpoints.DECK, sanitizer, deckController.getDeck());
	router.post(Endpoints.DECKS, sanitizer, deckController.createDeck());
	router.patch(Endpoints.DECKS, sanitizer, deckController.drawCards());
	router.get('*', function (req, res) {
		res.status(404).json({
			message: 'Not found',
			status: 404,
		});
	});

	server.use('/v1', router);
};
