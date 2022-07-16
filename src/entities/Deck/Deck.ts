import Card from '@/entities/Card/Card';
type PositionInDeck = 'bottom' | 'top';
class Deck {
  private deckId: string;
  private cards: Card[];

  constructor(deckId: string, cards: Card[]) {
    this.deckId = deckId;
    this.cards = cards;
  }

  getLength(): number {
    return this.cards.length;
  }

  getDeckId(): string {
    return this.deckId;
  }

  getCards(): Card[] {
    return this.cards;
  }

  shuffle(): void {
    this.cards = this.cards
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  drawCard(): Card {
    return this.cards.pop();
  }

  drawManyCards(amount: number): Card[] {
    return this.cards.splice(-amount).reverse();
  }
  addCard(position: PositionInDeck, card: Card): void {
    if (position === 'bottom') this.cards = [card, ...this.cards];
    if (position === 'top') this.cards = [...this.cards, card];
  }

  reveal(position: PositionInDeck, amount: number): Card[] {
    if (position === 'bottom') return this.cards.slice(0, amount);
    return this.cards.slice(-amount).reverse();
  }
}

export default Deck;
