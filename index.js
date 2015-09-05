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
  var p = fn && fn(node);
  if (p) return gen(p, fn);

  if(node.type === "BinaryExpression") {
    return '(' + gen(node.left, fn) + ' ' + node.operator + ' ' + gen(node.right, fn) + ')'
  } else if (node.type === 'CallExpression') {
    var args = node.arguments.map(function(n) { return gen(n, fn) });
    return gen(node.callee, fn) + '(' + args.join(', ') + ')';
  } else if(node.type === "UnaryExpression") {
    return node.operator + gen(node.argument, fn);
  } else if (node.type == 'MemberExpression') {
    return gen(node.object) + '.' + gen(node.property);
  } else if (node.type == 'ArrayExpression') {
    var arr = node.elements.map(function (n) { return gen(n, fn) }).join(',');
    return '[' + arr + ']';
  } else if(node.type === "Literal") {
    return node.raw;
  } else if (node.type === 'Identifier') {
    return node.name;
  }
}
