import tuple from './tuple';
import { Point, Vector, Tuple } from './types';

test( 'A Tuple with w=1.0 is a Point', () => {
    const point: Tuple = tuple.create(4.3, -4.2, 3.2, 1.0);
    expect(point.x).toBe(4.3);
    expect(point.y).toBe(-4.2);
    expect(point.z).toBe(3.2);
    expect(point.w).toBe(1.0);
    expect(tuple.isPoint(point)).toBeTruthy();
    expect(tuple.isVector(point)).toBeFalsy();
});

test( 'A Tuple with w=0.0 is a Vector', () => {
    const vector: Tuple = tuple.create(4.3, -4.2, 3.2, 0.0);
    expect(vector.x).toBe(4.3);
    expect(vector.y).toBe(-4.2);
    expect(vector.z).toBe(3.2);
    expect(vector.w).toBe(0.0);
    expect(tuple.isVector(vector)).toBeTruthy();
    expect(tuple.isPoint(vector)).toBeFalsy();
});

test( 'getPoint function creates a new Tuple with w=1', () => {
    expect(tuple.point(4, -4, 3)).toEqual(tuple.create(4, -4, 3, 1));
});

test( 'getVector function creates a new Tuple with w=0', () => {
    expect(tuple.vector(4, -4, 3)).toEqual(tuple.create(4, -4, 3, 0));
});

test( 'compare function returns false if not equal', () => {
    expect(tuple.compare(tuple.point(4,-4,3), tuple.create(4,-4.1,3,1))).toBeFalsy();
    expect(tuple.compare(tuple.create(4,-4,3, 0.0001), tuple.create(4,-4.1,3,1))).toBeFalsy();
    expect(tuple.compare(tuple.create(4,-4,3, 0.00001), tuple.create(4,-4,3, 0.00003))).toBeFalsy();
});

test( 'compare function returns true if equal', () => {
    expect(tuple.compare(tuple.point(4,-4,3), tuple.create(4,-4,3,1))).toBeTruthy();
    expect(tuple.compare(tuple.vector(4,-4,3), tuple.create(4,-4,3,0))).toBeTruthy();
    expect(tuple.compare(tuple.create(4,-4,3, 0.00001), tuple.create(4,-4,3, 0.00002))).toBeTruthy();
});

test( 'Adding two Tuples', () => {
    const a = tuple.create(3, -2, 5, 1);
    const b = tuple.create(-2, 3, 1, 0);
    const resA = tuple.create(1, 1, 6, 1)
    expect(tuple.compare(tuple.add(a, b), resA )).toBeTruthy();
    expect(tuple.isPoint(tuple.add(a, b))).toBeTruthy();
    const e = tuple.vector(1, 2, 3);
    const f = tuple.vector(1, 2, 3);
    const resB = tuple.create(2, 4, 6, 0);
    expect(tuple.compare(tuple.add(e, f), resB)).toBeTruthy();
    expect(tuple.isVector(tuple.add(e, f))).toBeTruthy();
})

test('Subtracting two Points returns a Vector', () => {
    const a = tuple.point(3, 2, 1);
    const b = tuple.point(5, 6, 7);
    const res = tuple.vector(-2, -4, -6);
    expect(tuple.compare(tuple.sub(a, b), res)).toBeTruthy();
    expect(tuple.isVector(tuple.sub(a, b))).toBeTruthy();
})

test('Subtracting a Vector from a Point returns a Point', () => {
    const a = tuple.point(3, 2, 1);
    const b = tuple.vector(5, 6, 7);
    expect(tuple.compare(tuple.sub(a, b), tuple.point(-2, -4, -6))).toBeTruthy();
    expect(tuple.isPoint(tuple.sub(a, b))).toBeTruthy();
})

test('Subtracting a Vector from a Vector returns a Vector', () => {
    const a = tuple.vector(3, 2, 1);
    const b = tuple.vector(5, 6, 7);
    expect(tuple.compare(tuple.sub(a, b), tuple.vector(-2, -4, -6))).toBeTruthy();
})

test('Subtracting a Vector from a 0 Vector returns negated one', () => {
    const a = tuple.vector(0, 0, 0);
    const b = tuple.vector(1, -2, 3);
    expect(tuple.compare(tuple.sub(a, b), tuple.vector(-1, 2, -3))).toBeTruthy();
})

test('Negating a Tuple trough static and instance methods', () => {
    const a = tuple.create(1, -2, 3, -4);
    const res = tuple.create(-1, 2, -3, 4)
    expect(tuple.compare(tuple.negate(a), res)).toBeTruthy();
})

test('Multiply a Tuple by a scalar', () => {
    const a = tuple.create(1, -2, 3, -4);
    const res = tuple.create(3.5, -7, 10.5, -14);
    expect(tuple.compare(tuple.multiply(a, 3.5), res)).toBeTruthy();
})

test('Multiply a tuple by a fraction', () => {
    const a = tuple.create(1, -2, 3, -4);
    const res =  tuple.create(0.5, -1, 1.5, -2);
    expect(tuple.compare(tuple.multiply(a, 0.5), res)).toBeTruthy();
})

test('Divide a tuple by a scalar', () => {
    const a = tuple.create(1, -2, 3, -4);
    const res =  tuple.create(0.5, -1, 1.5, -2);
    expect(tuple.compare(tuple.divide(a, 2), res)).toBeTruthy();
})

test('Computing the magnitude of vectors', () => {
    const vec1 = tuple.vector(1, 0, 0);
    expect(tuple.magnitude(vec1)).toBe(1);
    const vec2 = tuple.vector(0, 1, 0);
    expect(tuple.magnitude(vec2)).toBe(1);
    const vec3 = tuple.vector(0, 0, 1);
    expect(tuple.magnitude(vec3)).toBe(1);
    const vec4 = tuple.vector(1, 2, 3);
    expect(tuple.magnitude(vec4)).toBe(Math.sqrt(14));
    const vec5 = tuple.vector(-1, -2, -3);
    expect(tuple.magnitude(vec5)).toBe(Math.sqrt(14));
})

test('Normalize a Vector', () => {
    const vector = tuple.vector(4, 0, 0);
    const res = tuple.vector(1, 0, 0);
    expect(tuple.compare(tuple.normalize(vector), res)).toBeTruthy();
})

test('Normalize vector aproximately', () => {
    const vector = tuple.vector(1, 2, 3);
    const res = tuple.vector(0.26726, 0.53452, 0.80178);
    expect(tuple.compare(tuple.normalize(vector), res)).toBeTruthy();
})

test('The magnitude of a normalized vector', () => {
    const vector = tuple.vector(1, 2, 3);
    expect(tuple.magnitude(tuple.normalize(vector))).toBe(1);
})

test('The dot product of two tuples', () => {
    const vec1 = tuple.vector(1, 2, 3);
    const vec2 = tuple.vector(2, 3, 4);
    expect(tuple.dot(vec1,vec2)).toBe(20);
})

test('The cross product of two vectors', () => {
    const vec1 = tuple.vector(1, 2, 3);
    const vec2 = tuple.vector(2, 3, 4);
    expect(tuple.compare(tuple.cross(vec1,vec2), tuple.vector(-1, 2, -1))).toBeTruthy();
    expect(tuple.compare(tuple.cross(vec2,vec1), tuple.vector(1, -2, 1))).toBeTruthy();
})