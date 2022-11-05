export type CardDto = {
	value: string;
	suit: string;
	code: string;
	isDrawn?: boolean;
};
export type DeckDto = {
	deckId: string;
	type: string;
	shuffled: boolean;
	cards: CardDto[];
};

export type DeckResponseDto = {
	deckId: string;
	type: string;
	shuffled: boolean;
	remaining: number;
	cards?: CardDto[];
};

export type DrawCardsResponseDto = {
	cards: {
		value: string;
		suit: string;
		code: string;
	}[];
};
