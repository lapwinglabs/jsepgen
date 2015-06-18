/**
 * Module Dependencies
 */

var assert = require('assert')
var jsep = require('jsep')
var gen = require('./')

jsep.addBinaryOp('^', 10);

describe('jsepgen', function() {

  it('should support rewriting parts of the tree', function() {
    var expr = gen(jsep('Math.round((A ^ B ^ C + 5) + 10 ^ 5'), function(node) {
      if (node.type == 'BinaryExpression' && node.operator == '^') {
        var e = jsep('Math.pow()');
        e.arguments = [node.left, node.right];
        return e;
      }
    })

    assert.equal('Math.round(((Math.pow(Math.pow(A, B), C) + 5) + Math.pow(10, 5)))', expr);
  })

})
