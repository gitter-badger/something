- Original purescript source is in ./src/Main.purs
- Library I used (purescript-node-readline) was missing a function, so I added
  it using FFI in ./src/Main.js
- `index.js` may be run from the command line with `node index.js` and was
  created with `pulp browserify -O --to index.js`.
