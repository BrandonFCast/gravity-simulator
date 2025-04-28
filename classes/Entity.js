import { Config } from "./Config.js";

export class Entity {
    static entities = [];
    static currentID = 0;
    static config = null;

    constructor({ mass, x, y }) {
        this.mass = mass;
        this.x = x;
        this.y = y;
        this.moveVector = { angle: 0, force: 0 }
        this.id = Entity.currentID++;
        Entity.entities.push(this);
    }

    static setConfig(config) {
        if (config instanceof Config && config.isValid()) {
            Entity.config = config;
        }
    }

    update() {
        this.applyForces();
        this.draw(Config.ctx);
    }

    draw() {
        console.log("this entity is not drawable")
    }

    addForce({ angle = 0, force = 10 }) {
        const vector = sumForces(this.moveVector.force, this.moveVector.angle, force, angle);

        this.moveVector.angle = vector.angle;
        this.moveVector.force = vector.force;
    }

    static calculateTotalForces() {
        for (let i = 0; i < Entity.entities.length - 1; i++) {
            const currentEntity = Entity.entities[i];
            for (let j = i + 1; j < Entity.entities.length; j++) {
                const otherEntity = Entity.entities[j];
                const force = calculateForceBetween(currentEntity, otherEntity);
                const a1 = getAngleTo(currentEntity, otherEntity).normalizedDegrees;
                const a2 = getAngleTo(otherEntity, currentEntity).normalizedDegrees;
                currentEntity.addForce({ angle: a1, force: force })
                otherEntity.addForce({ angle: a2, force: force })
            }
        }
    }

    applyForces() {
        console.log("this entity has no function applyForces")
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

// F = (G * m1 * m2) / (d*d)
// d=√( (x2 - x1)² + ( y2 - y1)² )
const getDistanceBetween = (entity1, entity2) => {
    const dx = entity2.x - entity1.x;
    const dy = entity2.y - entity1.y;
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return distance;
}

const calculateForceBetween = (entity1, entity2) => {
    const distance = getDistanceBetween(entity1, entity2);
    const force = (Entity.config.getGravityForce() * entity1.mass * entity2.mass) / (Math.pow(distance, 2));
    return force;
}

const getAngleTo = (entity1, entity2) => {
    const x1 = entity1.x;
    const y1 = entity1.y;
    const x2 = entity2.x;
    const y2 = entity2.y;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const radians = Math.atan2(dy, dx); // Ángulo en radianes (-π a π)
    const degrees = radians * (180 / Math.PI); // Conversión a grados

    // Opcional: hacer que el ángulo esté entre 0° y 360°
    const normalizedDegrees = (degrees + 360) % 360;

    return {
        radians,
        degrees,
        normalizedDegrees
    };
}