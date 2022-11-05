import { v4 as uuidv4 } from 'uuid';
import {
	FrenchFullDeck,
	FrenchFullCard,
	SUITS as FRENCH_FULL_SUITS,
	VALUES as FRENCH_FULL_VALUES,
} from './cardGames/french-full';
import {
	FrenchShortDeck,
	FrenchShortCard,
	SUITS as FRENCH_SHORT_SUITS,
	VALUES as FRENCH_SHORT_VALUES,
} from './cardGames/french-short';
import { IDeck } from './deck';

export default class DeckFactory {
	createDeck(type: string, shuffled: boolean): IDeck {
		if (type === 'FULL') {
			return this.createFrenchFullDeck(type, shuffled);
		}

		if (type === 'SHORT') {
			return this.createFrenchShortDeck(type, shuffled);
		}

		throw new Error('TYPE_NOT_SUPPORTED');
	}

	private createFrenchFullDeck(type: string, shuffled: boolean): FrenchFullDeck {
		const deckId = uuidv4();
		const frenchFullCards = FRENCH_FULL_SUITS.flatMap((suit) => {
			return FRENCH_FULL_VALUES.map((value) => {
				const code = this.getCode(value, suit);

				return new FrenchFullCard(value, suit, code);
			});
		});

		const deck = new FrenchFullDeck(deckId, type, shuffled, frenchFullCards);

		if (shuffled) {
			deck.shuffleDeck();
		}

		return deck;
	}

	private createFrenchShortDeck(type: string, shuffled: boolean): FrenchFullDeck {
		const deckId = uuidv4();
		const frenchShortCards = FRENCH_SHORT_SUITS.flatMap((suit) => {
			return FRENCH_SHORT_VALUES.map((value) => {
				const code = this.getCode(value, suit);

				return new FrenchShortCard(value, suit, code);
			});
		});

		const deck = new FrenchShortDeck(deckId, type, shuffled, frenchShortCards);

		if (shuffled) {
			deck.shuffleDeck();
		}

		return deck;
	}

	private getCode(value: string, suit: string): string {
		if (value === '10') {
			return `${value}${suit[0]}`;
		}

		return `${value[0]}${suit[0]}`;
	}
}
