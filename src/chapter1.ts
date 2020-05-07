import { Tuple, Point, Vector } from './types';
import tuple from './tuple';

type Projectile = {
    position: Point,
    velocity: Vector,
}

type Environment = {
    gravity: Vector,
    wind: Vector,
}

const createProjectile = (position: Point, velocity: Vector ): Projectile => ( {
    position,
    velocity,
} );
const createEnvironment = (gravity:Vector, wind: Vector): Environment => ({
    gravity,
    wind,
});

function tick(env: Environment, proj: Projectile) {
    const position = tuple.add(proj.position, proj.velocity);
    const velocity = tuple.add(proj.velocity, tuple.add(env.gravity, env.wind));
    return createProjectile(position, velocity);
}

const environment: Environment = createEnvironment(tuple.vector(0, -0.1, 0), tuple.vector(-0.01, 0, 0));
let projectile: Projectile = createProjectile(tuple.point(0, 1, 0), tuple.vector(1, 1, 0));

function run() {
    while( projectile.position.y > 0 ) {
        console.log(projectile.position.y);
        projectile = tick(environment, projectile);
    }
}

export default run;
