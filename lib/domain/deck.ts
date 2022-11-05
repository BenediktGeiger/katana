export interface IDeck {
	deckId: string;
	type: string;
	shuffled: boolean;
	cards: ICard[];
	remainingCards(): ICard[];
	drawCards(amount: number): ICard[];
	getAllCards(): ICard[];
}

export interface ICard {
	value: string;
	suit: string;
	code: string;
	isDrawn: boolean;
	isCardDrawn(): boolean;
	drawCard(): this;
}
