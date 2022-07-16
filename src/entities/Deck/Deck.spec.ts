import Card from '../Card/Card';
import Deck from './Deck';

describe('deck', () => {
  let deck: Deck;
  let cards: Card[];
  beforeEach(() => {
    cards = [
      new Card('a'),
      new Card('b'),
      new Card('c'),
      new Card('d'),
      new Card('e'),
      new Card('f'),
      new Card('g'),
      new Card('h'),
      new Card('i'),
      new Card('j')
    ];
    deck = new Deck('player1', cards);
  });

  test('init', () => {
    expect(deck).toBeInstanceOf(Deck);
  });

  test('getCards', () => {
    expect(deck.getLength()).toEqual(10);
  });

  test('shuffle', () => {
    deck.shuffle();
    expect(deck.getCards()).not.toEqual(cards);
  });

  test('drawCard', () => {
    const drawnCard = deck.drawCard();
    expect(deck.getLength()).toEqual(9);
    expect(drawnCard.name).toEqual('j');
  });

  test('drawManyCards', () => {
    const drawnCards = deck.drawManyCards(3);
    expect(deck.getLength()).toEqual(7);
    expect(drawnCards[0].name).toEqual('j');
    expect(drawnCards[1].name).toEqual('i');
    expect(drawnCards[2].name).toEqual('h');
  });

  describe('addCard', () => {
    test('to top', () => {
      const card = new Card('k');
      deck.addCard('top', card);
      expect(deck.getLength()).toEqual(11);
      const drawnCard = deck.drawCard();
      expect(drawnCard.name).toEqual('k');
    });
    test('to bottom', () => {
      const card = new Card('k');
      deck.addCard('bottom', card);
      expect(deck.getLength()).toEqual(11);
      const drawnCard = deck.drawCard();
      expect(drawnCard.name).toEqual('j');
    });
  });

  describe('reveal', () => {
    test('fromTop', () => {
      const cards = deck.reveal('top', 3);

      expect(deck.getLength()).toEqual(10);
      expect(cards).toHaveLength(3);
      expect(cards[0].name).toEqual('j');
      expect(cards[1].name).toEqual('i');
      expect(cards[2].name).toEqual('h');
    });

    test('fromBottom', () => {
      const cards = deck.reveal('bottom', 3);

      expect(deck.getLength()).toEqual(10);
      expect(cards).toHaveLength(3);
      expect(cards[0].name).toEqual('a');
      expect(cards[1].name).toEqual('b');
      expect(cards[2].name).toEqual('c');
    });
  });
});
