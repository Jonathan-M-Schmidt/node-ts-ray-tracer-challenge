export interface Vector extends Tuple{
    w: 0,
}

export interface Point extends Tuple{
    w: 1,
}

export class Tuple {
    private static readonly EPSILON = 0.00001;
    constructor(
        public x: number,
        public y: number,
        public z: number,
        public w: number
    ) {}

    static getPoint(x: number, y: number, z: number) {
        return new Tuple(x, y, z, 1);
    }
    static getVector(x: number, y: number, z: number) {
        return new Tuple(x, y, z, 0);
    }
    static compare(a: Tuple, b: Tuple): boolean {
        let equal = true;
        if ( Math.abs(a.x - b.x) > this.EPSILON ) equal = false;
        if ( Math.abs(a.y - b.y) > this.EPSILON ) equal = false;
        if ( Math.abs(a.z - b.z) > this.EPSILON ) equal = false;
        if ( Math.abs(a.w - b.w) > this.EPSILON ) equal = false;
        return equal;
    }

    static add(a: Tuple, b: Tuple): Tuple {
        const x = a.x + b.x;
        const y = a.y + b.y;
        const z = a.z + b.z;
        const w = a.w + b.w;
        return new Tuple(x, y, z, w);
    }
    static sub(a: Tuple, b: Tuple): Tuple {
        const x = a.x - b.x;
        const y = a.y - b.y;
        const z = a.z - b.z;
        const w = a.w - b.w;
        return new Tuple(x, y, z, w);
    }

    static negate(tuple: Tuple): Tuple {
        return new Tuple(-tuple.x, -tuple.y, -tuple.z, -tuple.w);
    }

    static multiply(tuple: Tuple, times: number): Tuple {
        const x = tuple.x * times;
        const y = tuple.y * times;
        const z = tuple.z * times;
        const w = tuple.w * times;
        return new Tuple(x, y, z, w);
    }

    static divide(tuple: Tuple, divideBy: number): Tuple {
        const x = tuple.x / divideBy;
        const y = tuple.y / divideBy;
        const z = tuple.z / divideBy;
        const w = tuple.w / divideBy;
        return new Tuple(x, y, z, w);
    }

    static magnitude(tuple: Tuple): number {
        return Math.sqrt(
            tuple.x ** 2 +
            tuple.y ** 2 +
            tuple.z ** 2 +
            tuple.w ** 2
          )
    }

    static normalize(tuple: Tuple): Tuple {
        const x = tuple.x / tuple.magnitude;
        const y = tuple.y / tuple.magnitude;
        const z = tuple.z / tuple.magnitude;
        const w = tuple.w / tuple.magnitude;
        return new Tuple(x, y, z, w);
    }

    add(tuple: Tuple): Tuple {
        const x = this.x + tuple.x;
        const y = this.y + tuple.y;
        const z = this.z + tuple.z;
        const w = this.w + tuple.w;
        return new Tuple(x, y, z, w);
    }

    sub(tuple: Tuple): Tuple {
        const x = this.x - tuple.x;
        const y = this.y - tuple.y;
        const z = this.z - tuple.z;
        const w = this.w - tuple.w;
        return new Tuple(x, y, z, w);
    }

    multiply(times: number): Tuple {
        const x = this.x * times;
        const y = this.y * times;
        const z = this.z * times;
        const w = this.w * times;
        return new Tuple(x, y, z, w);
    }

    divide(divideBy: number): Tuple {
        const x = this.x / divideBy;
        const y = this.y / divideBy;
        const z = this.z / divideBy;
        const w = this.w / divideBy;
        return new Tuple(x, y, z, w);
    }

    negate(): Tuple {
        return this.multiply(-1);
    }

    normalize(): Tuple {
        const x = this.x / this.magnitude;
        const y = this.y / this.magnitude;
        const z = this.z / this.magnitude;
        const w = this.w / this.magnitude;
        return new Tuple(x, y, z, w);
    }

    dot(tuple: Tuple): number {
        return (
            (this.x * tuple.x) +
            (this.y * tuple.y) +
            (this.z * tuple.z) +
            (this.w * tuple.w)
        )
    }

    cross(tuple: Tuple): Tuple {
        const x = (this.y * tuple.z) - (this.z * tuple.y);
        const y = (this.z * tuple.x) - (this.x * tuple.z);
        const z = (this.x * tuple.y) - (this.y * tuple.x);
        return Tuple.getVector(x, y, z);
    }

    get magnitude(): number {
        return Math.sqrt(
          this.x ** 2 +
          this.y ** 2 +
          this.z ** 2 +
          this.w ** 2
        )
    }

    get isPoint(): boolean { return this.w === 1 }
    
    get isVector(): boolean { return this.w === 0 }
}