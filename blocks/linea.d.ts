// GENERATED — do not edit. Typings for the virtual "linea" and
// "linea/helpers" modules block scripts import from, emitted from
// packages/core/src/blocks/{blockTypes,blockHelpers}.ts. Regenerate with:
//   npm run gen:linea-dts -w @linea/core

declare module "linea" {
  /** A 2D point (mm, y-up). Point-valued fields also accept [x, y]. */
  export type Vec2 = {
      x: number;
      y: number;
  };
  export type Vec2Like = Vec2 | readonly [number, number];
  /** Polyline vertex; bulge = tan(sweep/4), 0 = straight. Accepts [x, y, bulge?]. */
  export type PolylineVertexLike = {
      x: number;
      y: number;
      bulge?: number;
  } | readonly [number, number, number?];
  /**
   * A line-type name from the library (curated `continuous`/`dashed`/… plus the
   * AutoCAD catalogue). Kept as a string so scripts can name any catalogue entry;
   * unknown names fall back to continuous when painted.
   */
  export type LineTypeName = string;
  /** Style overrides children may carry (otherwise inherited from the instance). */
  export type BaseStyle = {
      /** #rrggbb; absent = by layer. */
      color?: string;
      /** Line type; absent = by layer. */
      lineType?: LineTypeName;
      /** Dash-pattern length multiplier; absent = 1. */
      lineTypeScale?: number;
      /** Line weight in mm; absent = by layer. */
      lineWidth?: number;
  };
  /**
   * T plus the shared style fields, FLATTENED (the homomorphic map forces the
   * intersection to resolve): hovers then list every member inline instead of
   * the opaque `BaseStyle & { … }` — the block editor has no expand-type
   * affordance, so the alias display is all a script author gets.
   */
  type Styled<T> = {
      [K in keyof (T & BaseStyle)]: (T & BaseStyle)[K];
  } & {};
  export type Line = Styled<{
      type: "line";
      a: Vec2Like;
      b: Vec2Like;
  }>;
  export type Polyline = Styled<{
      type: "polyline";
      /** At least 2 vertices. */
      points: readonly PolylineVertexLike[];
      closed?: boolean;
  }>;
  export type Circle = Styled<{
      type: "circle";
      center: Vec2Like;
      radius: number;
  }>;
  /** Runs CCW from startAngle to endAngle (radians; DXF ARC convention). */
  export type Arc = Styled<{
      type: "arc";
      center: Vec2Like;
      radius: number;
      startAngle: number;
      endAngle: number;
  }>;
  /** majorAxis = endpoint vector from center; ratio = minor/major in (0, 1]. */
  export type Ellipse = Styled<{
      type: "ellipse";
      center: Vec2Like;
      majorAxis: Vec2Like;
      ratio: number;
      startAngle?: number;
      endAngle?: number;
  }>;
  export type Hatch = Styled<{
      type: "hatch";
      /** loops[0] = outer boundary, the rest are holes (even-odd). */
      loops: readonly {
          points: readonly PolylineVertexLike[];
      }[];
      fill?: {
          kind: "solid";
      } | {
          kind: "lines";
          angle: number;
          spacing: number;
      };
      /** Pattern spacing multiplier. */
      scale?: number;
  }>;
  export type Text = Styled<{
      type: "text";
      position: Vec2Like;
      content: string;
      /** Cap height in mm (before `scale`). */
      height?: number;
      rotation?: number;
      /** Where the text SITS relative to the point. */
      hAlign?: "left" | "center" | "right";
      vAlign?: "bottom" | "center" | "top";
      /** MLEADER-style arrow polylines pointing at the text (arrowhead at [0]). */
      leaderLines?: readonly (readonly Vec2Like[])[];
      arrowSize?: number;
      /** Size multiplier for height + arrowSize. */
      scale?: number;
  }>;
  export type Dimension = Styled<{
      type: "dimension";
      kind?: "linear" | "angular" | "radial" | "diameter";
      /** linear: 2+ chained points (measured point to point); angular: [vertex, a, b]; radial: [center, p]; diameter: [p1, p2]. */
      points: readonly Vec2Like[];
      /** Dimension line offset from the kind's anchor (points[0]; diameter: the
       * points' midpoint). anchor + offset lies on the dimension line (angular:
       * on the arc; radial/diameter: at the text). */
      offset: Vec2Like;
      textOverride?: string;
      styleOverride?: {
          textHeight?: number;
          arrowSize?: number;
          arrowType?: "filled" | "open" | "tick" | "dot" | "none";
          extensionOffset?: number;
          extensionOvershoot?: number;
          textOffset?: number;
          precision?: number;
          scale?: number;
      };
  }>;
  /** Nested block instance (inputs may hold points, never object references). */
  export type Block = Styled<{
      type: "block";
      definitionId: string;
      /** Applied last, about the pivot (the first input point). */
      rotation?: number;
      scale?: number;
      params?: Record<string, number | string | boolean>;
      /** Input points in the PARENT's local coords; the first is the pivot. */
      inputs?: readonly Vec2Like[];
  }>;
  export type ModelObject = Line | Polyline | Circle | Arc | Ellipse | Hatch | Text | Dimension | Block;
  /**
   * One choice of a "Select" parameter: the value (what scripts receive) with
   * an optional properties-panel label. A plain string is shorthand for
   * `{ value }`.
   */
  export type ParameterOption = string | {
      value: string;
      label?: string;
  };
  /**
   * One entry of the module's optional `params` export — the block's
   * parameters table. `name` is the key scripts read from `params`, `label`
   * the properties-panel caption (defaults to the name).
   */
  export type BlockParameter = {
      name: string;
      label?: string;
      type: "number";
      default: number;
      min?: number;
      max?: number;
  } | {
      name: string;
      label?: string;
      type: "string";
      default: string;
  } | {
      name: string;
      label?: string;
      type: "boolean";
      default: boolean;
  } | {
      name: string;
      label?: string;
      type: "enum";
      default: string;
      options: readonly ParameterOption[];
  };
  /** What the script's `main` export must return. */
  export type BlockScriptResult = ModelObject[];
  /** The value an enum option denotes (its string, or `value` of the record form). */
  type OptionValue<O extends ParameterOption> = O extends string ? O : O extends {
      value: infer V extends string;
  } ? V : never;
  /** The runtime value type of one `params` table entry. */
  type ParamValue<Q extends BlockParameter> = Q extends {
      type: "enum";
  } ? OptionValue<Q["options"][number]> : Q extends {
      type: "number";
  } ? number : Q extends {
      type: "boolean";
  } ? boolean : string;
  /**
   * Precise params value type derived from the module's own `params` table:
   * declare the table `as const` (so names and enum options stay literal) and
   * annotate the exported functions — the annotation must sit on the CONST,
   * not on its destructured argument, where `typeof params` would circularly
   * resolve to the argument itself:
   *
   *   export const params = [
   *     { name: "width", type: "number", default: 900 },
   *     { name: "side", type: "enum", default: "left", options: ["left", "right"] },
   *   ] as const satisfies readonly BlockParameter[];
   *
   *   export const main: BlockFn<typeof params> = ({ params }) => {
   *     params.width; // number
   *     params.side;  // "left" | "right"
   *   };
   *
   * A non-table type (an already-derived values record, or the open
   * BlockParams default) passes through unchanged — which is what lets
   * BlockProps/BlockFn accept `typeof params` and plain records alike.
   */
  export type ParamValues<P> = P extends readonly (infer Q extends BlockParameter)[] ? {
      readonly [E in Q as E["name"]]: ParamValue<E>;
  } : P;

  // ——— Script contract ———

  // #region BlockParams
  /**
   * This block's parameters, by name. The in-app block editor regenerates
   * this interface from the module's own `params` export, so each entry
   * gets its precise type; outside the app it is an open record. For
   * precise types outside the app, declare the table `as const` and
   * annotate the exported functions with `BlockFn<typeof params>` /
   * `DefineInputFn<typeof params>` (see ParamValues).
   */
  export interface BlockParams {
    readonly [name: string]: string | number | boolean;
  }
  // #endregion BlockParams

  /**
   * The inputs `defineInput` acquired at placement, in pick order: points
   * (localized against the first point — the pivot) or object ids.
   */
  export type BlockInputs = readonly (Vec2 | string)[];

  /**
   * The argument of the script's `main` export (pure, runs per evaluation).
   * The generic accepts either a params TABLE type (`typeof params` of an
   * `as const` table) or an already-derived values record — ParamValues
   * maps the former and passes the latter through.
   */
  export interface BlockProps<P = BlockParams> {
    params: ParamValues<P>;
    inputs: BlockInputs;
  }

  /**
   * The argument of the script's optional `defineInput` export — runs once
   * at insertion; await the pickers for whatever inputs the block needs and
   * return them as an array (catch the pick rejection to end an open-ended
   * collection when the user presses Escape). Without a `defineInput`, the
   * block gets a single "Insertion point" pick.
   */
  export interface DefineInputProps<P = BlockParams> {
    params: ParamValues<P>;
    pickPoint: (label?: string) => Promise<Vec2>;
    pickObject: (label?: string) => Promise<string>;
  }

  /**
   * Type of the module's `main` export. Annotating the const (instead of
   * its destructured argument) keeps `typeof params` pointing at the table
   * export — inside the argument's own annotation it would resolve to the
   * argument and be circular:
   *
   *   export const main: BlockFn<typeof params> = ({ params, inputs }) => …
   */
  export type BlockFn<P = BlockParams> = (
    props: BlockProps<P>,
  ) => BlockScriptResult;

  /** Type of the module's optional `defineInput` export (see BlockFn). */
  export type DefineInputFn<P = BlockParams> = (
    props: DefineInputProps<P>,
  ) => BlockInputs | Promise<BlockInputs>;
}

declare module "linea/helpers" {
  /** A 2D point (mm, y-up). A type ALIAS so editor hovers expand its shape. */
  export type Vec2 = {
      x: number;
      y: number;
  };
  /** [0, 1, ..., n-1] — handy for repeating geometry. */
  export const range: (n: number) => number[];
  /** Point at `distance` from `p` in direction `angle` (radians, CCW). */
  export const polar: (p: Vec2, angle: number, distance: number) => Vec2;
  /** Radians → degrees. */
  export const toDeg: (r: number) => number;
  /** Degrees → radians. */
  export const toRad: (d: number) => number;
  /** Length of a vector/point. */
  export const len: (p: Vec2) => number;
  /** Distance between two points. */
  export const dist: (a: Vec2, b: Vec2) => number;
  /** Vector/point sum. */
  export const add: (a: Vec2, b: Vec2) => Vec2;
  /** Vector/point difference (a − b). */
  export const sub: (a: Vec2, b: Vec2) => Vec2;
  /** Scale a vector by a factor. */
  export const scale: (p: Vec2, s: number) => Vec2;
  /** Unit vector (a zero vector stays zero). */
  export const norm: (p: Vec2) => Vec2;
  /** Dot product. */
  export const dot: (a: Vec2, b: Vec2) => number;
  /** Rotate vector by `angle` (radians, CCW). */
  export const rotate: (p: Vec2, angle: number) => Vec2;
  /**
   * All helpers as one object — what migration-wrapped legacy scripts receive
   * via `import { helpers } from "linea"`. New scripts import the named
   * functions from "linea/helpers" instead.
   */
  export const helpers: Readonly<{
      range: (n: number) => number[];
      polar: (p: Vec2, angle: number, distance: number) => Vec2;
      toDeg: (r: number) => number;
      toRad: (d: number) => number;
      len: (p: Vec2) => number;
      dist: (a: Vec2, b: Vec2) => number;
      add: (a: Vec2, b: Vec2) => Vec2;
      sub: (a: Vec2, b: Vec2) => Vec2;
      scale: (p: Vec2, s: number) => Vec2;
      norm: (p: Vec2) => Vec2;
      dot: (a: Vec2, b: Vec2) => number;
      rotate: (p: Vec2, angle: number) => Vec2;
  }>;
}

// The same declarations again at GLOBAL scope, so scripts can annotate
// without importing. Structurally identical to the "linea" exports, so the
// two mix freely. Requires a DOM-less lib (blocks/tsconfig and the in-app
// editor both use lib es2022) — with lib.dom, `Text` would collide.
/** A 2D point (mm, y-up). Point-valued fields also accept [x, y]. */
type Vec2 = {
    x: number;
    y: number;
};
type Vec2Like = Vec2 | readonly [number, number];
/** Polyline vertex; bulge = tan(sweep/4), 0 = straight. Accepts [x, y, bulge?]. */
type PolylineVertexLike = {
    x: number;
    y: number;
    bulge?: number;
} | readonly [number, number, number?];
/**
 * A line-type name from the library (curated `continuous`/`dashed`/… plus the
 * AutoCAD catalogue). Kept as a string so scripts can name any catalogue entry;
 * unknown names fall back to continuous when painted.
 */
type LineTypeName = string;
/** Style overrides children may carry (otherwise inherited from the instance). */
type BaseStyle = {
    /** #rrggbb; absent = by layer. */
    color?: string;
    /** Line type; absent = by layer. */
    lineType?: LineTypeName;
    /** Dash-pattern length multiplier; absent = 1. */
    lineTypeScale?: number;
    /** Line weight in mm; absent = by layer. */
    lineWidth?: number;
};
/**
 * T plus the shared style fields, FLATTENED (the homomorphic map forces the
 * intersection to resolve): hovers then list every member inline instead of
 * the opaque `BaseStyle & { … }` — the block editor has no expand-type
 * affordance, so the alias display is all a script author gets.
 */
type Styled<T> = {
    [K in keyof (T & BaseStyle)]: (T & BaseStyle)[K];
} & {};
type Line = Styled<{
    type: "line";
    a: Vec2Like;
    b: Vec2Like;
}>;
type Polyline = Styled<{
    type: "polyline";
    /** At least 2 vertices. */
    points: readonly PolylineVertexLike[];
    closed?: boolean;
}>;
type Circle = Styled<{
    type: "circle";
    center: Vec2Like;
    radius: number;
}>;
/** Runs CCW from startAngle to endAngle (radians; DXF ARC convention). */
type Arc = Styled<{
    type: "arc";
    center: Vec2Like;
    radius: number;
    startAngle: number;
    endAngle: number;
}>;
/** majorAxis = endpoint vector from center; ratio = minor/major in (0, 1]. */
type Ellipse = Styled<{
    type: "ellipse";
    center: Vec2Like;
    majorAxis: Vec2Like;
    ratio: number;
    startAngle?: number;
    endAngle?: number;
}>;
type Hatch = Styled<{
    type: "hatch";
    /** loops[0] = outer boundary, the rest are holes (even-odd). */
    loops: readonly {
        points: readonly PolylineVertexLike[];
    }[];
    fill?: {
        kind: "solid";
    } | {
        kind: "lines";
        angle: number;
        spacing: number;
    };
    /** Pattern spacing multiplier. */
    scale?: number;
}>;
type Text = Styled<{
    type: "text";
    position: Vec2Like;
    content: string;
    /** Cap height in mm (before `scale`). */
    height?: number;
    rotation?: number;
    /** Where the text SITS relative to the point. */
    hAlign?: "left" | "center" | "right";
    vAlign?: "bottom" | "center" | "top";
    /** MLEADER-style arrow polylines pointing at the text (arrowhead at [0]). */
    leaderLines?: readonly (readonly Vec2Like[])[];
    arrowSize?: number;
    /** Size multiplier for height + arrowSize. */
    scale?: number;
}>;
type Dimension = Styled<{
    type: "dimension";
    kind?: "linear" | "angular" | "radial" | "diameter";
    /** linear: 2+ chained points (measured point to point); angular: [vertex, a, b]; radial: [center, p]; diameter: [p1, p2]. */
    points: readonly Vec2Like[];
    /** Dimension line offset from the kind's anchor (points[0]; diameter: the
     * points' midpoint). anchor + offset lies on the dimension line (angular:
     * on the arc; radial/diameter: at the text). */
    offset: Vec2Like;
    textOverride?: string;
    styleOverride?: {
        textHeight?: number;
        arrowSize?: number;
        arrowType?: "filled" | "open" | "tick" | "dot" | "none";
        extensionOffset?: number;
        extensionOvershoot?: number;
        textOffset?: number;
        precision?: number;
        scale?: number;
    };
}>;
/** Nested block instance (inputs may hold points, never object references). */
type Block = Styled<{
    type: "block";
    definitionId: string;
    /** Applied last, about the pivot (the first input point). */
    rotation?: number;
    scale?: number;
    params?: Record<string, number | string | boolean>;
    /** Input points in the PARENT's local coords; the first is the pivot. */
    inputs?: readonly Vec2Like[];
}>;
type ModelObject = Line | Polyline | Circle | Arc | Ellipse | Hatch | Text | Dimension | Block;
/**
 * One choice of a "Select" parameter: the value (what scripts receive) with
 * an optional properties-panel label. A plain string is shorthand for
 * `{ value }`.
 */
type ParameterOption = string | {
    value: string;
    label?: string;
};
/**
 * One entry of the module's optional `params` export — the block's
 * parameters table. `name` is the key scripts read from `params`, `label`
 * the properties-panel caption (defaults to the name).
 */
type BlockParameter = {
    name: string;
    label?: string;
    type: "number";
    default: number;
    min?: number;
    max?: number;
} | {
    name: string;
    label?: string;
    type: "string";
    default: string;
} | {
    name: string;
    label?: string;
    type: "boolean";
    default: boolean;
} | {
    name: string;
    label?: string;
    type: "enum";
    default: string;
    options: readonly ParameterOption[];
};
/** What the script's `main` export must return. */
type BlockScriptResult = ModelObject[];
/** The value an enum option denotes (its string, or `value` of the record form). */
type OptionValue<O extends ParameterOption> = O extends string ? O : O extends {
    value: infer V extends string;
} ? V : never;
/** The runtime value type of one `params` table entry. */
type ParamValue<Q extends BlockParameter> = Q extends {
    type: "enum";
} ? OptionValue<Q["options"][number]> : Q extends {
    type: "number";
} ? number : Q extends {
    type: "boolean";
} ? boolean : string;
/**
 * Precise params value type derived from the module's own `params` table:
 * declare the table `as const` (so names and enum options stay literal) and
 * annotate the exported functions — the annotation must sit on the CONST,
 * not on its destructured argument, where `typeof params` would circularly
 * resolve to the argument itself:
 *
 *   export const params = [
 *     { name: "width", type: "number", default: 900 },
 *     { name: "side", type: "enum", default: "left", options: ["left", "right"] },
 *   ] as const satisfies readonly BlockParameter[];
 *
 *   export const main: BlockFn<typeof params> = ({ params }) => {
 *     params.width; // number
 *     params.side;  // "left" | "right"
 *   };
 *
 * A non-table type (an already-derived values record, or the open
 * BlockParams default) passes through unchanged — which is what lets
 * BlockProps/BlockFn accept `typeof params` and plain records alike.
 */
type ParamValues<P> = P extends readonly (infer Q extends BlockParameter)[] ? {
    readonly [E in Q as E["name"]]: ParamValue<E>;
} : P;

// Script-contract globals: aliases into the module (not re-declarations),
// so the in-app editor's BlockParams substitution flows through them.
declare type BlockParams = import("linea").BlockParams;
declare type BlockInputs = import("linea").BlockInputs;
declare type BlockProps<P = BlockParams> = import("linea").BlockProps<P>;
declare type DefineInputProps<P = BlockParams> =
  import("linea").DefineInputProps<P>;
declare type BlockFn<P = BlockParams> = import("linea").BlockFn<P>;
declare type DefineInputFn<P = BlockParams> =
  import("linea").DefineInputFn<P>;
