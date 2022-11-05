import { IDeck } from '@lib/domain/deck';
import { DeckDto } from '../dto';

export default interface DeckRepositoryInterface {
	get(deckId: string): Promise<DeckDto>;
	create(deck: IDeck): Promise<DeckDto>;
	updateCards(deck: IDeck): Promise<{ success: boolean }>;
}
