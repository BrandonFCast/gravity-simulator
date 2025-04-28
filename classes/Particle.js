import { Entity } from "./Entity.js";

export class Particle extends Entity {
    constructor({ x, y, radius = 10, color = 'red', mass = 1, debugMode = false, debugColor = 'white' }) {
        super({ mass, x, y });
        this.radius = radius;
        this.color = color;
        this.points = [];
        this.debugMode = debugMode;
        this.debugColor = debugColor;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        if (!this.debugMode) return;
        ctx.strokeStyle = this.debugColor;
        for (let i = 0; i < this.points.length - 1; i++) {
            const current = this.points[i];
            const next = this.points[i + 1];
            ctx.beginPath();
            ctx.moveTo(current.x, current.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
        }
    }

    applyForces() {
        const rads = this.moveVector.angle * (Math.PI / 180);

        const a = this.moveVector.force / this.mass;

        const dx = Math.cos(rads) * a;
        const dy = Math.sin(rads) * a;

        this.x += dx;
        this.y += dy;
        this.points.push({ x: this.x, y: this.y });
    }

}