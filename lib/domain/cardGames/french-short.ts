import { v4 as uuidv4 } from 'uuid';
import { IDeck, ICard } from '../deck';

const TYPE = 'SHORT';
export const SUITS: string[] = ['SPADES', 'CLUBS', 'DIAMONDS', 'HEARTS'];
export const VALUES: string[] = ['ACE', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];

export class FrenchShortCard implements ICard {
	value: string;
	suit: string;
	code: string;
	isDrawn: boolean;

	constructor(value: string, suit: string, code: string, isDrawn = false) {
		if (!SUITS.includes(suit)) {
			throw new Error('INVALID_CARD');
		}
		if (!VALUES.includes(value)) {
			throw new Error('INVALID_CARD');
		}
		this.value = value;
		this.suit = suit;
		this.code = code;
		this.isDrawn = isDrawn;
	}

	isCardDrawn(): boolean {
		return this.isDrawn;
	}

	drawCard(): this {
		this.isDrawn = true;
		return this;
	}
}

export class FrenchShortDeck implements IDeck {
	deckId: string;
	type: string;
	shuffled: boolean;
	cards: FrenchShortCard[];

	constructor(deckId: string = uuidv4(), type: string = TYPE, shuffled: boolean, cards: FrenchShortCard[]) {
		if (cards.length !== 32 || type !== TYPE) {
			throw new Error('INVALID_DECK');
		}

		this.type = type;
		this.deckId = deckId;
		this.cards = cards;
		this.shuffled = shuffled;
	}

	getAllCards(): ICard[] {
		return this.cards;
	}

	drawCards(amount: number): FrenchShortCard[] {
		const remainingCards = this.remainingCards();

		if (amount > remainingCards.length) {
			throw new Error('NOT_ENOUGH_CARDS');
		}

		return remainingCards.slice(0, amount).map((card) => card.drawCard());
	}

	remainingCards(): FrenchShortCard[] {
		return this.cards.filter((card) => !card.isCardDrawn());
	}

	shuffleDeck() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		this.cards.sort((card, cardToCompare) => 0.5 - Math.random());
	}
}
