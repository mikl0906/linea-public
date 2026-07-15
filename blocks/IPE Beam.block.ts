// IPE beam block

import {
  type BlockFn,
  type DefineInputFn,
  type BlockParameter,
  type Vec2,
} from "linea";
import { sub, add, scale, norm, rotate } from "linea/helpers";

// name, h, w, tw, tf, r
const ipe = [
  ["IPE80", 80, 46, 3.8, 5.2, 5],
  ["IPE100", 100, 55, 4.1, 5.7, 7],
  ["IPE120", 120, 64, 4.4, 6.3, 7],
  ["IPE140", 140, 73, 4.7, 6.9, 7],
  ["IPE160", 160, 82, 5, 7.4, 9],
  ["IPE180", 180, 91, 5.3, 8, 9],
  ["IPE200", 200, 100, 5.6, 8.5, 12],
  ["IPE220", 220, 110, 5.9, 9.2, 12],
  ["IPE240", 240, 120, 6.2, 9.8, 15],
  ["IPE270", 270, 135, 6.6, 10.2, 15],
  ["IPE300", 300, 150, 7.1, 10.7, 15],
  ["IPE330", 330, 160, 7.5, 11.5, 18],
  ["IPE360", 360, 170, 8, 12.7, 18],
  ["IPE400", 400, 180, 8.6, 13.5, 21],
  ["IPE450", 450, 190, 9.4, 14.6, 21],
  ["IPE500", 500, 200, 10.2, 16, 21],
  ["IPE550", 550, 210, 11.1, 17.2, 24],
  ["IPE600", 600, 220, 12, 19, 24],
] as const;

export const id = "fa9c5e7e-4629-40ee-9eed-313495c10743";

export const name = "IPE Beam";

export const params = [
  {
    name: "profile",
    label: "Profile",
    type: "enum",
    default: "IPE300",
    options: ipe.map((p) => p[0]),
  },
  {
    name: "orientation",
    label: "Orientation",
    type: "enum",
    default: "front",
    options: [
      { value: "front", label: "Front" },
      { value: "top", label: "Top" },
    ],
  },
] as const satisfies readonly BlockParameter[];

export const defineInput: DefineInputFn<typeof params> = async ({
  pickPoint,
}) => {
  const p1 = await pickPoint("Start point");
  const p2 = await pickPoint("End point");
  return [p1, p2];
};

export const main: BlockFn<typeof params> = ({ params, inputs }) => {
  const { profile, orientation } = params;
  const [p1, p2] = inputs as [Vec2, Vec2];

  const p = ipe.find((p) => p[0] === profile);

  if (!p) {
    return [];
  }

  const [_, h, w, tw, tf, r] = p;

  const lines: [Vec2, Vec2][] = [];
  const hiddenLines: [Vec2, Vec2][] = [];

  const dir = sub(p2, p1);
  const n = norm(rotate(dir, Math.PI / 2));

  if (orientation === "front") {
    const top = scale(n, h / 2);
    const topFlange = scale(n, h / 2 - tf);
    const bottom = scale(n, -h / 2);
    const bottomFlange = scale(n, -h / 2 + tf);

    lines.push([top, bottom]);
    lines.push([add(dir, top), add(dir, bottom)]);

    lines.push([top, add(dir, top)]);
    lines.push([bottom, add(dir, bottom)]);

    lines.push([topFlange, add(dir, topFlange)]);
    lines.push([bottomFlange, add(dir, bottomFlange)]);
  } else {
    const left = scale(n, w / 2);
    const leftFlange = scale(n, tw / 2);
    const right = scale(n, -w / 2);
    const rightFlange = scale(n, -tw / 2);

    lines.push([left, right]);
    lines.push([add(dir, left), add(dir, right)]);

    lines.push([left, add(dir, left)]);
    lines.push([right, add(dir, right)]);

    hiddenLines.push([leftFlange, add(dir, leftFlange)]);
    hiddenLines.push([rightFlange, add(dir, rightFlange)]);
  }

  return [
    ...lines.map(
      (l): Line => ({
        type: "line",
        a: l[0],
        b: l[1],
      }),
    ),
    ...hiddenLines.map(
      (l): Line => ({
        lineType: "hidden",
        type: "line",
        a: l[0],
        b: l[1],
      }),
    ),
  ];
};
