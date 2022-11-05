import { expect } from 'chai';

import {
	FrenchShortDeck,
	FrenchShortCard,
	SUITS as FRENCH_SHORT_SUITS,
	VALUES as FRENCH_SHORT_VALUES,
} from '@lib/domain/cardGames/french-short';

const getCode = (value: string, suit: string): string => {
	if (value === '10') {
		return `${value}${suit[0]}`;
	}

	return `${value[0]}${suit[0]}`;
};

const getFrenchShortCards = () =>
	FRENCH_SHORT_SUITS.flatMap((suit) => {
		return FRENCH_SHORT_VALUES.map((value) => {
			const code = getCode(value, suit);

			return new FrenchShortCard(value, suit, code);
		});
	});

describe('french-short-deck', () => {
	it('should throw INVALID_DECK Error', () => {
		expect(function () {
			new FrenchShortDeck('1', 'SHORT', false, []);
		}).to.throw('INVALID_DECK');
	});

	it('should throw NOT_ENOUGH_CARDS if there are no cards left during drawing', () => {
		expect(function () {
			const testDeck = new FrenchShortDeck('1', 'SHORT', false, getFrenchShortCards());
			testDeck.drawCards(33);
		}).to.throw('NOT_ENOUGH_CARDS');
	});

	it('should return all 32 cards', () => {
		const testDeck = new FrenchShortDeck('1', 'SHORT', false, getFrenchShortCards());
		expect(testDeck.getAllCards().length).to.equal(32);
	});

	it('should return correct amout of drawn cards', () => {
		const testDeck = new FrenchShortDeck('1', 'SHORT', false, getFrenchShortCards());
		expect(testDeck.drawCards(10).length).to.equal(10);
	});

	it('should return correct amout of remaining cards', () => {
		const newDeck = new FrenchShortDeck('2', 'SHORT', false, getFrenchShortCards());

		newDeck.drawCards(2);

		expect(newDeck.remainingCards().length).to.equal(30);
	});
});
