/**
 * Export `gen`
 */

module.exports = gen;

/**
 * Generate a string from an AST
 *
 * @param {Object} node
 * @param {Function} fn (optional)
 */

function gen(node, fn) {
  fn && fn(node);

  if(node.type === "BinaryExpression") {
    return '(' + gen(node.left, fn) + ' ' + node.operator + ' ' + gen(node.right, fn) + ')'
  } else if (node.type === 'CallExpression') {
    var args = node.arguments.map(function(n) { return gen(n, fn) });
    return gen(node.callee, fn) + '(' + args.join(', ') + ')';
  } else if(node.type === "UnaryExpression") {
    return node.operator + gen(node.argument, fn);
  } else if(node.type === "Literal") {
    return node.raw;
  } else if (node.type === 'Identifier') {
    return node.name;
  }
}
