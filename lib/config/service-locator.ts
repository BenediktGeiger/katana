import LoggerFactory from '@lib/infrastructure/logger/index';
import DeckRepositoryFactory from '@lib/infrastructure/repository';
import LoggerInterface from '@lib/application/ports/logger.interface';
import DeckService from '@lib/application/deck-service';
import DeckFactory from '@lib/domain/deck-factory';

export type Services = {
	deckService: DeckService;
	logger: LoggerInterface;
};

export async function buildServices(): Promise<Services> {
	const logger = LoggerFactory.getLogger();

	const deckRepository = await DeckRepositoryFactory.getDeckRepository();

	const deckService = new DeckService(deckRepository, new DeckFactory());

	const services = {
		deckService,
		logger,
	};

	return services;
}
