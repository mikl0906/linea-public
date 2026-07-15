# Blocks

Working folder for creating Linea blocks outside Linea block editor.

A block definition is a javascript/typescript module (single file). Block files have .block.js/ts extension to make them recognizable.

# Block module

A valid block module have the following structure

```js
// Globally unique identifier for the block definition.
// Make sure to generate a new one for every new block definition.
export const id = "d995a4be-cbe0-487c-8231-f37006a0b7ae";

// Public name. This is how block appears in block panel in Linea
export const name = "Block name";

// An array of parameters - block properties
export const params = [...];

// Main block function. Runs on every block evaluation.
// Receives block parameters and inputs
// Returns an array of model objects
export const main = ({params, inputs}) => { return [...] }

// Define input function (optional, may be omitted)
// Runs on block insertion.
// Returns an array of block inputs (points, objects)
// if omitted, a default implementation with a single point pick is used
export const defineInput = async () => { return [...] }
```

# Folder files

`linea.d.ts` - block types. Provides all nessesary type annotations for block scripts

`tsconfig.json` - typescript configuration
