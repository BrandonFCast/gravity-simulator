import { Config } from "./classes/Config.js";
import { Entity } from "./classes/Entity.js";
import { Particle } from "./classes/Particle.js";

const cnv = document.getElementById('canvas');
const ctx = cnv.getContext('2d');

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

const config = new Config({ ctx: ctx, gravityForce: 1 });
Config.ctx = ctx;
Entity.setConfig(config);


const blue = new Particle({
    x: 1400,
    y: 1000,
    color: "cyan",
    mass: 1,
    debugMode: true,
    debugColor: 'green'
});
const orange = new Particle({
    x: 1500,
    y: 900,
    color: "orange",
    mass: 200,
    debugMode: true,
    debugColor: "red"
});

const start = () => {
    setInterval(() => {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        Entity.calculateTotalForces();
        for (const entity of Entity.entities) {
            entity.update();
        }
    }, 1);

    const f = 1;
    blue.addForce({ angle: 0, force: f })
        // orange.addForce({ angle: 0, force: 40 })
}

document.addEventListener("keydown", (e) => {
    if (e.key === "a") {
        start();
    }
})

cnv.addEventListener("click", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const mass = prompt("Enter the mass of the particle");
    const angle = prompt("Enter the angle of force");
    const force = prompt("Enter the force of the particle");

    const particle = new Particle({
        x,
        y,
        color: "red",
        mass: mass
    })
    particle.addForce({ angle: angle, force: force })
    for (const entity of Entity.entities) {
        entity.draw(Config.ctx);
    }

})

for (const entity of Entity.entities) {
    entity.draw(Config.ctx);
}