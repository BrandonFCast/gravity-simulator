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

    isValid() {
        return this.ctx !== null && this.gravityForce !== null;
    }
}