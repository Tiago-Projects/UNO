import { Suit } from '../enum/Suit';
import { Type } from '../enum/Type';
import { Card } from './card';

describe('Card', () => {
  it('should create an instance', () => {
    expect(new Card(Suit.BLUE, Type.DRAW_TWO)).toBeTruthy();
  });
});
