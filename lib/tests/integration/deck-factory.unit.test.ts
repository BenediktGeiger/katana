import DeckFactory from '@lib/domain/deck-factory';

import { expect } from 'chai';

describe('deck-factory', () => {
	const deckFactory = new DeckFactory();

	describe('create not shuffled french short deck', () => {
		const deck = deckFactory.createDeck('SHORT', false);

		it('should have type SHORT', () => {
			expect(deck.type).to.equal('SHORT');
		});

		it('should have 32 cards', () => {
			expect(deck.getAllCards().length).to.equal(32);
		});

		it('should have SPADES ACE on top', () => {
			const firstCard = deck.cards[0];
			expect(firstCard.suit).to.equal('SPADES');
			expect(firstCard.value).to.equal('ACE');
			expect(firstCard.code).to.equal('AS');
		});

		it('should have HEARTS KING on the bottom', () => {
			const lastCard = deck.cards[31];
			expect(lastCard.suit).to.equal('HEARTS');
			expect(lastCard.value).to.equal('KING');
			expect(lastCard.code).to.equal('KH');
		});
	});

	describe('create not shuffled french long deck', () => {
		const deck = deckFactory.createDeck('FULL', false);

		it('should have type SHORT', () => {
			expect(deck.type).to.equal('FULL');
		});

		it('should have 52 cards', () => {
			expect(deck.getAllCards().length).to.equal(52);
		});

		it('should have SPADES ACE on top', () => {
			const firstCard = deck.cards[0];
			expect(firstCard.suit).to.equal('SPADES');
			expect(firstCard.value).to.equal('ACE');
			expect(firstCard.code).to.equal('AS');
		});

		it('should have HEARTS KING on the bottom', () => {
			const lastCard = deck.cards[51];
			expect(lastCard.suit).to.equal('HEARTS');
			expect(lastCard.value).to.equal('KING');
			expect(lastCard.code).to.equal('KH');
		});
	});

	describe('create deck with invalid type', () => {
		it('should throw TYPE_NOT_SUPPORTED Error', () => {
			expect(function () {
				deckFactory.createDeck('INVALID', false);
			}).to.throw('TYPE_NOT_SUPPORTED');
		});
	});
});
