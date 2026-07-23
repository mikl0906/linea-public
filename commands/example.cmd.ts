import { defineCommand } from "lineadraw";

export default defineCommand({
  id: "543f132f-7da1-4de6-8d14-2da3121a644d",
  name: "Circle Example",
  description: "An example command for demonstration purposes",
  version: "0.1.0",
  authors: ["Linea Team"],
  tags: ["example", "circle", "command"],
  run: async ({ document, pickPoint, prompt, showToast }) => {
    const center = await pickPoint("Center point");
    const r = await prompt("Radius");
    document.add([{ type: "circle", center, radius: parseFloat(r) }]);
    showToast("Done", "success");
  },
});
