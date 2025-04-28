export class Config {

    static ctx = null;

    constructor(options = {}) {
        if (!options) return;
        this.gravityForce = options.gravityForce;
    }

    setCtx(ctx) {
        Config.ctx = ctx;
    }
    setGravityForce(gravityForce) {
        this.gravityForce = gravityForce;
    }
    getGravityForce() {
        return this.gravityForce;
    }

    isValid() {
        const value = Config.ctx !== null && this.gravityForce !== null;
        return value;
    }
}