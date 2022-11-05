import { expect } from 'chai';

import {
	FrenchFullCard,
	FrenchFullDeck,
	SUITS as FRENCH_FULL_SUITS,
	VALUES as FRENCH_FULL_VALUES,
} from '@lib/domain/cardGames/french-full';

const getCode = (value: string, suit: string): string => {
	if (value === '10') {
		return `${value}${suit[0]}`;
	}

	return `${value[0]}${suit[0]}`;
};

const getFrenchFullCards = () =>
	FRENCH_FULL_SUITS.flatMap((suit) => {
		return FRENCH_FULL_VALUES.map((value) => {
			const code = getCode(value, suit);

			return new FrenchFullCard(value, suit, code);
		});
	});

describe('french-short-deck', () => {
	it('should throw INVALID_DECK Error', () => {
		expect(function () {
			new FrenchFullDeck('1', 'FULL', false, []);
		}).to.throw('INVALID_DECK');
	});

	it('should throw NOT_ENOUGH_CARDS if there are no cards left during drawing', () => {
		expect(function () {
			const testDeck = new FrenchFullDeck('1', 'FULL', false, getFrenchFullCards());
			testDeck.drawCards(53);
		}).to.throw('NOT_ENOUGH_CARDS');
	});

	it('should return all 52 cards', () => {
		const testDeck = new FrenchFullDeck('1', 'FULL', false, getFrenchFullCards());
		expect(testDeck.getAllCards().length).to.equal(52);
	});

	it('should return correct amout of drawn cards', () => {
		const testDeck = new FrenchFullDeck('1', 'FULL', false, getFrenchFullCards());
		expect(testDeck.drawCards(10).length).to.equal(10);
	});

	it('should return correct amout of remaining cards', () => {
		const newDeck = new FrenchFullDeck('2', 'FULL', false, getFrenchFullCards());

		newDeck.drawCards(2);

		expect(newDeck.remainingCards().length).to.equal(50);
	});
});
