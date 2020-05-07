import { Tuple, Point, Vector } from './types';

function add(p: Point, v: Vector): Point;
function add(v: Vector, e: Vector): Vector;
function add(t: Tuple, u: Tuple): Tuple;
function add<A extends Tuple, B extends Tuple>(a: A, b: B): Tuple | Point | Vector {
    const x = a.x + b.x;
    const y = a.y + b.y;
    const z = a.z + b.z;
    const w = a.w + b.w;
    if ( tuple.isPoint(a) && tuple.isVector(b)) return tuple.point(x, y, z);
    if ( tuple.isVector(a) && tuple.isVector(b)) return tuple.vector(x, y, z);
    return tuple.create(x, y, z, w);
};

const tuple = {
    EPSILON: 0.00001,
    create(x: number, y: number, z: number, w: number): Tuple {
        return { x, y, z, w }
    },
    point(x: number, y: number, z: number): Point {
        return { x, y, z, w: 1 };
    },
    vector(x: number, y: number, z: number): Vector {
        return { x, y, z, w: 0 };
    },
    compare(a: Tuple, b: Tuple): boolean {
        let equal = true;
        if ( Math.abs(a.x - b.x) > this.EPSILON ) equal = false;
        if ( Math.abs(a.y - b.y) > this.EPSILON ) equal = false;
        if ( Math.abs(a.z - b.z) > this.EPSILON ) equal = false;
        if ( Math.abs(a.w - b.w) > this.EPSILON ) equal = false;
        return equal;
    },
    add,
    sub(a: Tuple, b: Tuple): Tuple {
        const x = a.x - b.x;
        const y = a.y - b.y;
        const z = a.z - b.z;
        const w = a.w - b.w;
        return this.create(x, y, z, w);
    },
    negate(tuple: Tuple): Tuple {
        return this.create(-tuple.x, -tuple.y, -tuple.z, -tuple.w);
    },
    multiply(tuple: Tuple, times: number): Tuple {
        const x = tuple.x * times;
        const y = tuple.y * times;
        const z = tuple.z * times;
        const w = tuple.w * times;
        return this.create(x, y, z, w);
    },
    divide(tuple: Tuple, divideBy: number): Tuple {
        const x = tuple.x / divideBy;
        const y = tuple.y / divideBy;
        const z = tuple.z / divideBy;
        const w = tuple.w / divideBy;
        return this.create(x, y, z, w);
    },
    magnitude(tuple: Tuple): number {
        return Math.sqrt(
            tuple.x ** 2 +
            tuple.y ** 2 +
            tuple.z ** 2 +
            tuple.w ** 2
          )
    },
    normalize(tuple: Tuple): Tuple {
        const x = tuple.x / this.magnitude(tuple);
        const y = tuple.y / this.magnitude(tuple);
        const z = tuple.z / this.magnitude(tuple);
        const w = tuple.w / this.magnitude(tuple);
        return this.create(x, y, z, w);
    },
    dot(a: Tuple, b: Tuple): number {
        return (
            (a.x * b.x) +
            (a.y * b.y) +
            (a.z * b.z) +
            (a.w * b.w)
        )
    },
    cross(a: Vector, b: Vector): Vector {
        const x = (a.y * b.z) - (a.z * b.y);
        const y = (a.z * b.x) - (a.x * b.z);
        const z = (a.x * b.y) - (a.y * b.x);
        return this.vector(x, y, z);
    },
    isPoint(tuple: Tuple): boolean {
        return tuple.w === 1;
    },
    isVector(tuple: Tuple): boolean {
        return tuple.w === 0;
    },
}

export default tuple;