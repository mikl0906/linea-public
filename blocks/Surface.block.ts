import { defineBlock } from "lineadraw";

export default defineBlock({
  id: "9f6f9dd3-361a-4046-aeb7-4cbe97fb7aa2",
  name: "Surface",
  description: "Draws a surface between two points.",
  version: "1.0.0",
  authors: ["Your Name"],
  tags: ["surface", "line", "draw"],
  params: [
    {
      name: "type",
      label: "Type",
      type: "enum",
      default: "rock",
      options: ["rock", "ground"],
    },
  ],
  paramVisibility: ({ params }) => {
    return {
      type: true,
    };
  },
  place: async ({ pickPoint }) => {
    const start = await pickPoint("Start point");
    const end = await pickPoint("End point");

    return [start, end];
  },
  draw: ({ params, inputs: [start, end] }) => {
    if (params.type === "rock") {
      // Rock!
    }

    return [
      {
        type: "line",
        a: start,
        b: end,
      },
    ];
  },
});
