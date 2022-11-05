import mongoose from 'mongoose';

import DeckRepositoryInterface from '@lib/application/ports/deck-repository.interface';
import MongoDeckRepository from './mongo-deck-repository';
import deckModel from '@lib/infrastructure/repository/mongo-deck-repository/models/deck';

export default {
	async getDeckRepository(): Promise<DeckRepositoryInterface> {
		const { DB_HOST, DB_PORT, DB_NAME } = process.env;

		const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
		const dbConnection = await mongoose.createConnection(connectionString);

		const deckModelReal = await deckModel.create(dbConnection);

		const repo = new MongoDeckRepository(deckModelReal);

		return repo;
	},
};
