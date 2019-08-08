import { Rand } from "./util";
import Boid from "./boid";

const CONFIG = () => {
  return {
    alignmentR: 50,
    cohesionR: 50,
    separationR: 50,
    maxAF: 0.2,
    maxCF: 0.2,
    maxSF: 0.3,
    maxSpeed: 3,
    maxAcc: 0.1,
    alignmentFalloff: function(boid, otherBoid) {
      const dist = boid.pos.distTo(otherBoid.pos);
      if (dist < this.alignmentR && dist > 0) return 1;
      else return 0;
    },
    cohesionFalloff: function(boid, otherBoid) {
      const dist = boid.pos.distTo(otherBoid.pos);
      if (dist < this.cohesionR && dist > 0) return 1;
      else return 0;
    },
    separationFalloff: function(boid, otherBoid) {
      const dist = boid.pos.distTo(otherBoid.pos);
      if (dist < this.separationR && dist > 0) return dist;
      else return 0;
    }
  }
}

class Swarm {
  constructor(offset, config) {
    this.offset = offset || 8;

    let newConfig = config || CONFIG();
    Object.assign(this, newConfig);
    console.log(this);
  }

  newSwarm(size, width, height) {
    this.boids = new Array(size);
    for (let i = 0; i < size; i++) {
      this.boids[i] = new Boid({x: Rand(0, width), y: Rand(0, height)});
    }
    return this.boids;
  }

  swarm() {
    let boidsNext = new Array(this.boids.length);
    for (let i = 0, len = this.boids.length; i < len; i++) {
      boidsNext[i] = this.boids[i].acsFunc(this, this.boids);
      boidsNext[i].update(this);
    }

    Object.assign(this.boids, boidsNext);
  }

  swarmWrap(width, height) {
    const offset = this.offset;
    for (let boid of this.boids) {
      let { x, y } = boid.pos;
      if (x > width + offset) boid.pos.x = -offset
      else if (x < -offset) boid.pos.x = width + offset;
      if (y > height + offset) boid.pos.y = -offset
      else if (y < -offset) boid.pos.y = height + offset;
    }
  }

  drawSwarm(ctx) {
    for (let boid of this.boids) {
      ctx.circle(boid.pos.x, boid.pos.y, 8, "yellow");
    }
  }

  drawSwarmAdv(ctx) {
    const pointer = document.getElementById("pointer");
    let heading;
    for ( let boid of this.boids) {
      ctx.save();
      heading = boid.vel.getHeading();
      ctx.translate(boid.pos.x, boid.pos.y);
      ctx.rotate( heading );
      ctx.drawImage(pointer, -10/2, -10/2, 10, 10);
      ctx.rotate(-heading);
      ctx.translate(-boid.pos.x, -boid.pos.y);
      ctx.restore();
    }
  }


}
export default Swarm;