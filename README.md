# Linea

This is a public repository for Linea project. It contais user materials, public block library, agent setup etc.

# Blocks

/blocks - public registry of blocks

A block is a JS module with a single export member `defineBlock`

```js
// surface.block.js
import { defineBlock } from "lineadraw";

export default defineBlock({
  id: "9f6f9dd3-…", // unique — a UUID is a good choice
  name: "Surface", // Visible name
  params: [
    {
      name: "type",
      type: "enum",
      default: "rock",
      options: ["rock", "ground"],
    },
  ],
  place: ["Start point", "End point"], // one point pick per label, in order
  draw: ({ params, inputs: [start, end] }) => {
    params.type; // "rock" | "ground" — inferred
    return [{ type: "line", a: start, b: end }];
  },
});
```

# Commands

/commands - public registry of commands

A command is a JS module with

```js
// circle.cmd.ts
import { defineCommand } from "lineadraw";

export default defineCommand({
  id: "543f132f-7da1-4de6-8d14-2da3121a644d",
  name: "Circle Example",
  run: async ({ document, pickPoint, prompt, showToast }) => {
    const center = await pickPoint("Center point");
    const r = await prompt("Radius");
    document.add([{ type: "circle", center, radius: parseFloat(r) }]);
    showToast("Done", "success");
  },
});
```
