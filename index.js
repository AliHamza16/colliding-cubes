import { Cube } from './objects/Cube.js';
import { Wall } from './objects/Wall.js';
import { polysIntersect } from './utils.js';

const canvas = document.querySelector('#canvas');
const tools = document.querySelector('#tools');
const collusion_count_el = document.querySelector('#collusion-count');
const slider = document.querySelector('input#cube1-mass');
const ctx = canvas.getContext('2d');

let slider_value = 0;

slider.addEventListener('input', (e) => {
    if (animating) return;
    cube2.mass = 10 ** Number(e.target.value);
    document.querySelector(
        '#tools > .section-2 > span[data-mass]',
    ).innerText = `mass: ${cube2.mass}`;
    slider_value = e.target.value;
    document.querySelector('#tools > .section-4 > button[data-reset]').click();
});

document
    .querySelector('#tools > .section-4 > button[data-start]')
    .addEventListener('click', () => {
        animating = true;
    });

document
    .querySelector('#tools > .section-4 > button[data-reset]')
    .addEventListener('click', () => {
        animating = false;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth * 0.8;
        tools.style.width = `${window.innerWidth - canvas.width}px`;
        cube_velocities = [0, -1 / 3 ** slider_value];

        const wall = new Wall(10, canvas.height * 0.4, 50, canvas.height * 0.6);
        wall.draw(ctx);

        const cubeSize = 50;
        cube1.update(
            wall.x + wall.w + -cube_velocities[1] * 200,
            canvas.height - cubeSize,
            cubeSize,
            cubeSize,
        );
        cube1.draw(ctx, 'blue');
        cube2.update(
            cube1.x + cube1.w + -cube_velocities[1] * 200,
            canvas.height - cubeSize,
            cubeSize,
            cubeSize,
        );
        cube2.draw(ctx, 'rgb(0, 0, 167)');
        collusion_count = 0;
        collusion_count_el.innerText = collusion_count;
        document.querySelector(
            '#tools > .section-2 > span[data-velocity]',
        ).innerText = `velocity: ${cube_velocities[0] < 0 ? '-' : ' '}${
            cube_velocities[0] < 0 ? -cube_velocities[0] : cube_velocities[0]
        }`;
        document.querySelector(
            '#tools > .section-3 > span[data-velocity]',
        ).innerText = `velocity: ${cube_velocities[1]}`;
    });

let cube_velocities = [0, -1 / 3 ** slider_value];
let collusion_count = 0;
let animating = false;

function elastic_collusion(m1, u1, m2, u2) {
    let v1 = ((m1 - m2) / (m1 + m2)) * u1 + ((2 * m2) / (m1 + m2)) * u2;
    let v2 = ((2 * m1) / (m1 + m2)) * u1 + ((m2 - m1) / (m1 + m2)) * u2;
    return [v1, v2];
}

canvas.height = window.innerHeight;
canvas.width = window.innerWidth * 0.8;
tools.style.width = `${window.innerWidth - canvas.width}px`;

const wall = new Wall(10, canvas.height * 0.4, 50, canvas.height * 0.6);
wall.draw(ctx);

const cubeSize = 50;

const cube1 = new Cube(
    wall.x + wall.w + -cube_velocities[1] * 200,
    canvas.height - cubeSize,
    cubeSize,
    cubeSize,
    'K',
    1,
);
cube1.draw(ctx, 'blue');
const cube2 = new Cube(
    cube1.x + cube1.w + -cube_velocities[1] * 200,
    canvas.height - cubeSize,
    cubeSize,
    cubeSize,
    'L',
    1,
);
cube2.draw(ctx, 'rgb(0, 0, 167)');

setInterval(() => {
    if (!animating) return;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth * 0.8;
    tools.style.width = `${window.innerWidth - canvas.width}px`;

    wall.draw(ctx);
    cube1.x += cube_velocities[0];

    cube1.draw(ctx, 'blue');
    cube2.x = cube2.x + cube_velocities[1];
    cube2.draw(ctx, 'rgb(0, 0, 167)');
    if (polysIntersect(cube1.getPolygon(), cube2.getPolygon())) {
        cube_velocities = elastic_collusion(
            cube1.mass,
            cube_velocities[0],
            cube2.mass,
            cube_velocities[1],
        );
        collusion_count++;
        collusion_count_el.innerText = collusion_count;
    }
    if (polysIntersect(cube1.getPolygon(), wall.getPolygon())) {
        cube_velocities[0] = -cube_velocities[0];
        collusion_count++;
        collusion_count_el.innerText = collusion_count;
    }
    document.querySelector(
        '#tools > .section-2 > span[data-velocity]',
    ).innerHTML = `velocity: ${cube_velocities[0] < 0 ? '-' : '&nbsp;'}${
        cube_velocities[0] < 0 ? -cube_velocities[0] : cube_velocities[0]
    }`;
    document.querySelector(
        '#tools > .section-3 > span[data-velocity]',
    ).innerText = `velocity: ${cube_velocities[1]}`;
}, 0);
