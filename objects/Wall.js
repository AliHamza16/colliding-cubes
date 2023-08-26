export class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    getPolygon() {
        return [
            { x: this.x, y: this.y },
            { x: this.x + this.w, y: this.y },
            { x: this.x + this.w, y: this.y + this.h },
            { x: this.x, y: this.y + this.h },
        ];
    }
    update(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}
