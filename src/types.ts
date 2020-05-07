export type Vec3 = {
    x: number,
    y: number,
    z: number,
};

export type Tuple = Vec3 & { w: number };
export type Point = Vec3 & { w: 1 };
export type Vector = Vec3 & { w: 0 };
