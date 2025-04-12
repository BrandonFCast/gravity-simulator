export class Entity {
    static entities = [];
    static currentID = 0;
    static config = null;

    constructor() {
        this.id = Entity.currentID++;
        Entity.entities.push(this);
    }

    static setConfig(config) {
        if (config instanceof Config && config.isValid()) {
            Entity.config = config;
        }
    }

    update() {
        this.draw(this.ctx);
    }

    draw() {
        console.log("this entity is not drawable")
    }

}