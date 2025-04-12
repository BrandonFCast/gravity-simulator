import { Entity } from "./Entity.js";

export class Particle extends Entity {
    constructor(x, y, radius, color) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
}