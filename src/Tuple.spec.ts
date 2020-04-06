import { Tuple } from './Tuple';

test( 'A Tuple with w=1.0 is a Point', () => {
    const point: Tuple = new Tuple(4.3, -4.2, 3.2, 1.0);
    expect(point.x).toBe(4.3);
    expect(point.y).toBe(-4.2);
    expect(point.z).toBe(3.2);
    expect(point.w).toBe(1.0);
    expect(point.isPoint).toBeTruthy();
    expect(point.isVector).toBeFalsy();
});

test( 'A Tuple with w=0.0 is a Vector', () => {
    const vector: Tuple = new Tuple(4.3, -4.2, 3.2, 0.0);
    expect(vector.x).toBe(4.3);
    expect(vector.y).toBe(-4.2);
    expect(vector.z).toBe(3.2);
    expect(vector.w).toBe(0.0);
    expect(vector.isVector).toBeTruthy();
    expect(vector.isPoint).toBeFalsy();
});

test( 'getPoint function creates a new Tuple with w=1', () => {
    expect(Tuple.getPoint(4, -4, 3)).toEqual(new Tuple(4, -4, 3, 1));
});

test( 'getVector function creates a new Tuple with w=0', () => {
    expect(Tuple.getVector(4, -4, 3)).toEqual(new Tuple(4, -4, 3, 0));
});

test( 'compare function returns false if not equal', () => {
    expect(Tuple.compare(Tuple.getPoint(4,-4,3), new Tuple(4,-4.1,3,1))).toBeFalsy();
    expect(Tuple.compare(new Tuple(4,-4,3, 0.0001), new Tuple(4,-4.1,3,1))).toBeFalsy();
    expect(Tuple.compare(new Tuple(4,-4,3, 0.00001), new Tuple(4,-4,3, 0.00003))).toBeFalsy();
});

test( 'compare function returns true if equal', () => {
    expect(Tuple.compare(Tuple.getPoint(4,-4,3), new Tuple(4,-4,3,1))).toBeTruthy();
    expect(Tuple.compare(Tuple.getVector(4,-4,3), new Tuple(4,-4,3,0))).toBeTruthy();
    expect(Tuple.compare(new Tuple(4,-4,3, 0.00001), new Tuple(4,-4,3, 0.00002))).toBeTruthy();
});

test( 'Adding two Tuples', () => {
    const a = new Tuple(3, -2, 5, 1);
    const b = new Tuple(-2, 3, 1, 0);
    const resA = new Tuple(1, 1, 6, 1)
    expect(Tuple.compare(Tuple.add(a, b), resA )).toBeTruthy();
    expect(Tuple.compare(a.add(b), resA )).toBeTruthy();
    expect(Tuple.add(a, b).isPoint).toBeTruthy();
    const e = Tuple.getVector(1, 2, 3);
    const f = Tuple.getVector(1, 2, 3);
    const resB = new Tuple(2, 4, 6, 0);
    expect(Tuple.compare(Tuple.add(e, f), resB)).toBeTruthy();
    expect(Tuple.compare(e.add(f), resB)).toBeTruthy();
    expect(Tuple.add(e, f).isVector).toBeTruthy();
})

test('Subtracting two Points returns a Vector', () => {
    const a = Tuple.getPoint(3, 2, 1);
    const b = Tuple.getPoint(5, 6, 7);
    const res = Tuple.getVector(-2, -4, -6);
    expect(Tuple.compare(Tuple.sub(a, b), res)).toBeTruthy();
    expect(Tuple.compare(a.sub(b), res)).toBeTruthy();
    expect(Tuple.sub(a, b).isVector).toBeTruthy();
    expect(a.sub(b).isVector).toBeTruthy();
})

test('Subtracting a Vector from a Point returns a Point', () => {
    const a = Tuple.getPoint(3, 2, 1);
    const b = Tuple.getVector(5, 6, 7);
    expect(Tuple.compare(Tuple.sub(a, b), Tuple.getPoint(-2, -4, -6))).toBeTruthy();
    expect(Tuple.sub(a, b).isPoint).toBeTruthy();
})

test('Subtracting a Vector from a Vector returns a Vector', () => {
    const a = Tuple.getVector(3, 2, 1);
    const b = Tuple.getVector(5, 6, 7);
    expect(Tuple.compare(Tuple.sub(a, b), Tuple.getVector(-2, -4, -6))).toBeTruthy();
})

test('Subtracting a Vector from a 0 Vector returns negated one', () => {
    const a = Tuple.getVector(0, 0, 0);
    const b = Tuple.getVector(1, -2, 3);
    expect(Tuple.compare(Tuple.sub(a, b), Tuple.getVector(-1, 2, -3))).toBeTruthy();
})

test('Negating a Tuple trough static and instance methods', () => {
    const a = new Tuple(1, -2, 3, -4);
    const res = new Tuple(-1, 2, -3, 4)
    expect(Tuple.compare(a.negate(), res)).toBeTruthy();
    expect(Tuple.compare(Tuple.negate(a), res)).toBeTruthy();
})

test('Multiply a Tuple by a scalar', () => {
    const a = new Tuple(1, -2, 3, -4);
    const res = new Tuple(3.5, -7, 10.5, -14);
    expect(Tuple.compare(Tuple.multiply(a, 3.5), res)).toBeTruthy();
    expect(Tuple.compare(a.multiply(3.5), res)).toBeTruthy();
})

test('Multiply a tuple by a fraction', () => {
    const a = new Tuple(1, -2, 3, -4);
    const res =  new Tuple(0.5, -1, 1.5, -2);
    expect(Tuple.compare(Tuple.multiply(a, 0.5), res)).toBeTruthy();
    expect(Tuple.compare(a.multiply(0.5), res)).toBeTruthy();
})

test('Divide a tuple by a scalar', () => {
    const a = new Tuple(1, -2, 3, -4);
    const res =  new Tuple(0.5, -1, 1.5, -2);
    expect(Tuple.compare(Tuple.divide(a, 2), res)).toBeTruthy();
    expect(Tuple.compare(a.divide(2), res)).toBeTruthy();
})

test('Computing the magnitude of vectors', () => {
    const vec1 = Tuple.getVector(1, 0, 0);
    expect(vec1.magnitude).toBe(1);
    const vec2 = Tuple.getVector(0, 1, 0);
    expect(vec2.magnitude).toBe(1);
    const vec3 = Tuple.getVector(0, 0, 1);
    expect(vec3.magnitude).toBe(1);
    const vec4 = Tuple.getVector(1, 2, 3);
    expect(vec4.magnitude).toBe(Math.sqrt(14));
    const vec5 = Tuple.getVector(-1, -2, -3);
    expect(vec5.magnitude).toBe(Math.sqrt(14));
})

test('Normalize a Vector', () => {
    const vector = Tuple.getVector(4, 0, 0);
    const res = Tuple.getVector(1, 0, 0);
    expect(Tuple.compare(vector.normalize(), res)).toBeTruthy();
    expect(Tuple.compare(Tuple.normalize(vector), res)).toBeTruthy();
})

test('Normalize vector aproximately', () => {
    const vector = Tuple.getVector(1, 2, 3);
    const res = Tuple.getVector(0.26726, 0.53452, 0.80178);
    expect(Tuple.compare(vector.normalize(), res)).toBeTruthy();
})

test('The magnitude of a normalized vector', () => {
    const vector = Tuple.getVector(1, 2, 3);
    expect(vector.normalize().magnitude).toBe(1);
})

test('The dot product of two tuples', () => {
    const vec1 = Tuple.getVector(1, 2, 3);
    const vec2 = Tuple.getVector(2, 3, 4);
    expect(vec1.dot(vec2)).toBe(20);
})

test('The cross product of two vectors', () => {
    const vec1 = Tuple.getVector(1, 2, 3);
    const vec2 = Tuple.getVector(2, 3, 4);
    expect(Tuple.compare(vec1.cross(vec2), Tuple.getVector(-1, 2, -1))).toBeTruthy();
    expect(Tuple.compare(vec2.cross(vec1), Tuple.getVector(1, -2, 1))).toBeTruthy();
})