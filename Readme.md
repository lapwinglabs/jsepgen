
# jsepgen

  Tiny module (15 LOC) to generate code from the [jsep](https://github.com/soney/jsep) AST.

## Example

Convert all variables and functions to an object with the same key

```js
var jsep = require('jsep');
var gen = require('gen');

// parse the expression into an AST
var ast = jsep('-A1 + SUM(A5, A6) + " %"')

// replace variables and functions
var expr = gen(ast, function(node) {
  if (node.type != 'Identifier') return node;
  node.name = '_.' + node.name;
})

expr // ((-_.A1 + _.SUM(_.A5, _.A6)) + "%")
```

It's pretty easy to turn this into a function:

```js
var fn = new Function('_', 'return ' + expr);

var total = fn({
  A1: 2,
  A5: 5,
  A6: 6,
  SUM: function(a, b) { return a + b }
})

total // 9% 
```

## Installation

```
npm install jsepgen
```

## Contact

- [friends@lapwinglabs.com](mailto:friends@lapwinglabs.com)
- [@lapwinglabs](https://twitter.com/lapwinglabs)
- [lapwinglabs.com](http://lapwinglabs.com)

## License 

MIT
