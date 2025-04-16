import { Config } from "./classes/Config.js";
import { Entity } from "./classes/Entity.js";
import { Particle } from "./classes/Particle.js";

const cnv = document.getElementById('canvas');
const ctx = cnv.getContext('2d');

cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

const config = new Config({ ctx });
Config.ctx = ctx;
Entity.setConfig(config);


const particle = new Particle({
    x: 500,
    y: 300
});


setInterval(() => {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (const entity of Entity.entities) {
        entity.update();
    }
}, 100);

particle.addForce({ angle: 180, force: 10 })
setTimeout(() => {
    particle.addForce({ angle: 270, force: 10 })
}, 2000)