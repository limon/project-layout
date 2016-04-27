import { assert } from 'chai';
import hello from '../lib/hello';

describe('Hello', () => {
  it('should say hello', () => {
    assert.equal('Hello World!', hello());
  });
});
