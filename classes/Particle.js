import { Entity } from "./Entity.js";

export class Particle extends Entity {
    constructor({ x, y, radius = 10, color = 'red' }) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.moveVector = { angle: 0, force: 0 }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    addForce({ angle = 0, force = 10 }) {
        const vector = sumForces(this.moveVector.force, this.moveVector.angle, force, angle);

        this.moveVector.angle = vector.angle;
        this.moveVector.force = vector.force;
    }

    applyForces() {
        const rads = this.moveVector.angle * (Math.PI / 180);

        const dx = Math.cos(rads) * this.moveVector.force;
        const dy = Math.sin(rads) * this.moveVector.force;

        this.x += dx;
        this.y += dy;
    }

}

const sumForces = (f1, a1, f2, a2) => {
    const rads1 = a1 * (Math.PI / 180);
    const rads2 = a2 * (Math.PI / 180);

    const fx1 = Math.cos(rads1) * f1;
    const fy1 = Math.sin(rads1) * f1;

    const fx2 = Math.cos(rads2) * f2;
    const fy2 = Math.sin(rads2) * f2;

    const fxTotal = fx1 + fx2;
    const fyTotal = fy1 + fy2;

    const totalForce = Math.sqrt(fxTotal ** 2 + fyTotal ** 2);
    const totalAngle = Math.atan2(fyTotal, fxTotal) * 180 / Math.PI;

    return { force: totalForce, angle: totalAngle };
}