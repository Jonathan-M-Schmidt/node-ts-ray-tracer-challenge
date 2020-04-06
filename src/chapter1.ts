import { Point, Vector, Tuple } from './Tuple';

class Projectile {
    constructor(public position: Tuple, public velocity: Tuple) {}
}

class Environment {
    constructor(public gravity: Tuple, public wind: Tuple){}
}

function tick(env: Environment, proj: Projectile) {
    const position = proj.position.add( proj.velocity );
    const velocity = proj.velocity.add(env.gravity.add(env.wind));
    return new Projectile(position, velocity);
}

const env: Environment = new Environment(Tuple.getVector(0, -0.1, 0), Tuple.getVector(-0.01, 0, 0));
let proj: Projectile = new Projectile(Tuple.getPoint(0, 1, 0), Tuple.getVector(1, 1, 0));

while( proj.position.y > 0 ) {
    console.log(proj.position.y);
    proj = tick(env, proj);
}