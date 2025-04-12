export class Config {
    constructor(options = {}) {
        this.ctx = options.ctx;
    }

    setCtx(ctx) {
        this.ctx = ctx;
    }

    isValid() {
        return this.ctx !== null;
    }
}