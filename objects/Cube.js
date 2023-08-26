export class Cube {
    constructor(x, y, w, h, n, mass) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.n = n;
        this.mass = mass;
    }

    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(this.n, this.x + this.w * 0.3, this.y + this.h * 0.75);
    }

    update(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    getPolygon() {
        return [
            { x: this.x, y: this.y },
            { x: this.x + this.w, y: this.y },
            { x: this.x + this.w, y: this.y + this.h },
            { x: this.x, y: this.y + this.h },
        ];
    }
}
