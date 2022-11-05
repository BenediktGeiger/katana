import { Schema, Connection, Model, model } from 'mongoose';
import { IDeck } from '@lib/domain/deck';

export type DeckModel = Model<IDeck>;

const deckSchema = new Schema<IDeck, DeckModel>({
	deckId: { type: String, required: true },
	type: { type: String, required: true },
	shuffled: { type: Boolean, required: true },
	cards: [{ type: Schema.Types.Mixed, required: true }],
});

const Deck = model<IDeck, DeckModel>('Deck', deckSchema);

const create = (connection: Connection) => connection.model('deck', deckSchema, 'decks');

export default {
	model: Deck,
	schema: deckSchema,
	create,
};
