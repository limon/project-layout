assert = require('chai').assert
hello = require('../lib/hello')

describe 'Hello', ->
  it 'should say hello', ->
    assert.equal 'Hello World', hello()
