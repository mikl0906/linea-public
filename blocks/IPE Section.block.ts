// IPE section catalog block

import {
  type BlockFn,
  type DefineInputFn,
  type BlockParameter,
  type Polyline,
} from "linea";

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

export const id = "20784907-4ec4-44b2-934c-54f3456f5d6c";

export const name = "IPE Section";

export const params = [
  {
    name: "profile",
    label: "Profile",
    type: "enum",
    default: "IPE300",
    options: ipe.map((p) => p[0]),
  },
] as const satisfies readonly BlockParameter[];

export const defineInput: DefineInputFn<typeof params> = async ({
  pickPoint,
}) => {
  return [await pickPoint("Insertion point")];
};

export const main: BlockFn<typeof params> = ({ params }) => {
  const { profile } = params;

  const p = ipe.find((p) => p[0] === profile);

  if (!p) {
    return [];
  }

  const [_, h, w, tw, tf, r] = p;

  const line: Polyline = {
    type: "polyline",
    points: [
      [-w / 2, -h / 2],
      [w / 2, -h / 2],
      [w / 2, -h / 2 + tf],
      [tw / 2 + r, -h / 2 + tf, -0.4142],
      [tw / 2, -h / 2 + tf + r],
      [tw / 2, h / 2 - tf - r, -0.4142],
      [tw / 2 + r, h / 2 - tf],
      [w / 2, h / 2 - tf],
      [w / 2, h / 2],
      [-w / 2, h / 2],
      [-w / 2, h / 2 - tf],
      [-tw / 2 - r, h / 2 - tf, -0.4142],
      [-tw / 2, h / 2 - tf - r],
      [-tw / 2, -h / 2 + tf + r, -0.4142],
      [-tw / 2 - r, -h / 2 + tf],
      [-w / 2, -h / 2 + tf],
    ],
    closed: true,
  };

  return [line];
};
