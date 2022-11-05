import { IDeck } from '@lib/domain/deck';
import DeckRepositoryInterface from './ports/deck-repository.interface';
import DeckFactory from '@lib/domain/deck-factory';
import { FrenchShortCard, FrenchShortDeck } from '@lib/domain/cardGames/french-short';
import { FrenchFullCard, FrenchFullDeck } from '@lib/domain/cardGames/french-full';
import { CardDto, DeckDto, DeckResponseDto, DrawCardsResponseDto } from './dto';

export default class DeckService {
	private deckRepository;
	private deckFactory;
	constructor(deckRepository: DeckRepositoryInterface, deckFactory: DeckFactory) {
		this.deckRepository = deckRepository;
		this.deckFactory = deckFactory;
	}
	async openDeck(deckId: string): Promise<DeckResponseDto> {
		const repoDeck = await this.deckRepository.get(deckId);

		const deck = this.mapDeck(repoDeck);

		return {
			deckId: deck.deckId,
			type: deck.type,
			shuffled: deck.shuffled,
			remaining: deck.remainingCards().length,
			cards: deck.remainingCards(),
		};
	}

	async createDeck(type: string, shuffled: boolean): Promise<DeckResponseDto> {
		const deck: IDeck = this.deckFactory.createDeck(type, shuffled);

		const repoDeck = await this.deckRepository.create(deck);

		if (!repoDeck) {
			throw new Error('DECK_CREATION_FAILED');
		}

		return {
			deckId: deck.deckId,
			type: deck.type,
			shuffled: deck.shuffled,
			remaining: deck.remainingCards().length,
		};
	}

	async drawCards(deckId: string, amount: number): Promise<DrawCardsResponseDto> {
		const repoDeck = await this.deckRepository.get(deckId);

		const deck = this.mapDeck(repoDeck);

		const cards = deck.drawCards(amount);

		const { success } = await this.deckRepository.updateCards(deck);

		if (!success) {
			throw new Error('DRAWING_CARDS_FAILED');
		}

		return {
			cards: cards.map((card) => ({
				value: card.value,
				suit: card.suit,
				code: card.code,
			})),
		};
	}

	private mapDeck(deck: DeckDto): IDeck {
		const { deckId, type, shuffled, cards } = deck;

		if (type === 'FULL') {
			const fullCards = cards.map((card: CardDto) => {
				const { value, suit, code, isDrawn } = card;
				return new FrenchFullCard(value, suit, code, isDrawn);
			});
			return new FrenchFullDeck(deckId, type, shuffled, fullCards);
		}

		if (type === 'SHORT') {
			const fullCards = cards.map((card: CardDto) => {
				const { value, suit, code, isDrawn } = card;
				return new FrenchShortCard(value, suit, code, isDrawn);
			});
			return new FrenchShortDeck(deckId, type, shuffled, fullCards);
		}

		throw new Error('TYPE_NOT_SUPPORTED');
	}
}
