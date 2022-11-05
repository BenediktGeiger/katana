import DeckRepositoryInterface from '@lib/application/ports/deck-repository.interface';
import { DeckModel } from './models/deck';
import { IDeck } from '@lib/domain/deck';
import { DeckDto } from '@lib/application/dto';

export default class MongoDeckRepository implements DeckRepositoryInterface {
	private deckModel;

	constructor(deckModel: DeckModel) {
		this.deckModel = deckModel;
	}

	async get(deckId: string): Promise<DeckDto> {
		const deck = await this.deckModel.findOne({ deckId: deckId });

		if (!deck) {
			throw new Error('DECK_NOT_FOUND');
		}

		return deck;
	}

	async create(deck: IDeck): Promise<DeckDto> {
		return this.deckModel.create({
			deckId: deck.deckId,
			type: deck.type,
			shuffled: deck.shuffled,
			cards: deck.getAllCards(),
		});
	}

	async updateCards(deck: IDeck): Promise<{ success: boolean }> {
		const response = await this.deckModel.updateOne(
			{
				deckId: deck.deckId,
			},
			{
				cards: deck.getAllCards(),
			}
		);

		return { success: Boolean(response.modifiedCount) };
	}
}
